import React, { useState } from "react";
import { SafeAreaView, Button, FlatList, View, Text, Alert } from "react-native";
import { text as textStyles } from "./Styles";
import { useFocusEffect } from "@react-navigation/native";
import app from "../firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";


function NutJournal({ navigation }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFoods = async () => {
    try {
      setLoading(true);
      const auth = getAuth(app);
      const uid = auth.currentUser?.uid;
      if (!uid) {
        Alert.alert("Error", "User not authenticated");
        setEntries([]);
        setLoading(false);
        return;
      }
      const db = getFirestore(app);
      const foodsRef = collection(db, "users", uid, "foodEntries");
      const q = query(foodsRef, orderBy("date", "desc"));
      const snap = await getDocs(q);
      const arr = [];
      snap.forEach((d) => {
        const data = d.data();
        arr.push({
          id: d.id,
          name: data.name || "",
          fat: data.fat || 0,
          sugar: data.sugar || 0,
          carbs: data.carbs || 0,
          protein: data.protein || 0,
          totCal: data.calories || 0,
          date: data.date?.toDate ? data.date.toDate().toISOString().substring(0, 10) : "",
        });
      });
      setEntries(arr);
    } catch (e) {
      console.log("NutJournal loadFoods Firestore error:", e);
      Alert.alert("Error", "Unable to load nutrition entries");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadFoods();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={{ padding: 12, borderBottomWidth: 1, borderColor: "#333" }}>
      <Text style={textStyles.item}>{item.name}</Text>
      <Text style={textStyles.NutTitleText}>Calories: {item.totCal}</Text>
      <Text style={textStyles.NutTitleText}>Protein: {item.protein}</Text>
      <Text style={textStyles.NutTitleText}>Carbs: {item.carbs}</Text>
      <Text style={textStyles.NutTitleText}>Sugar: {item.sugar}</Text>
      <Text style={textStyles.NutTitleText}>Fat: {item.fat}</Text>
      <Text style={textStyles.NutTitleText}>Date: {item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: 12, paddingTop: 8 }}>
        <Text style={textStyles.NutFoodTitleText}>Foods</Text>
      </View>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={loadFoods}
        ListEmptyComponent={!loading ? (
          <View style={{ padding: 16 }}>
            <Text style={textStyles.NutTitleText}>No entries yet.</Text>
          </View>
        ) : null}
      />
      <View style={{ padding: 12 }}>
        <Button title="+ Add Food Entry" onPress={() => navigation.navigate("createDiet")} />
      </View>
      <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
        <Button color="#2116f5" title="Show Today's Entries" onPress={() => navigation.navigate("todayNut")} />
      </View>
    </SafeAreaView>
  );
}

export { NutJournal };