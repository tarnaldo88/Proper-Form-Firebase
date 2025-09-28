import React, { useState, useEffect } from "react";
import { SafeAreaView, Button, FlatList, View, Text, ActivityIndicator } from "react-native";
import { text, Nutstyles } from "./Styles";
import { useFocusEffect } from "@react-navigation/native";
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { Dimensions } from "react-native";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";

function Friends({ navigation }) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState('');

  // Initialize Firestore and Auth
  const db = getFirestore(app);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const fetchFriends = async () => {
    if (!currentUser) {
      setError('User not authenticated');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      // Query friends subcollection for the current user
      const friendsRef = collection(db, 'users', currentUser.uid, 'friends');
      const q = query(friendsRef, where('status', '==', 'accepted'));
      const querySnapshot = await getDocs(q);

      const friendsList = [];

      // Process each friend document
      for (const doc of querySnapshot.docs) {
        const friendData = doc.data();
        // Get friend's profile data from users collection
        const friendProfileRef = collection(db, 'users');
        const friendQuery = query(friendProfileRef, where('uid', '==', friendData.friendId));
        const friendSnapshot = await getDocs(friendQuery);

        if (!friendSnapshot.empty) {
          const friendProfile = friendSnapshot.docs[0].data();
          friendsList.push({
            id: doc.id,
            ...friendData,
            ...friendProfile
          });
        }
      }

      setFriends(friendsList);
    } catch (err) {
      console.error('Error fetching friends:', err);
      setError('Failed to load friends. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch friends when component mounts or when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchFriends();

      // Cleanup function
      return () => {
        // Any cleanup if needed
      };
    }, [currentUser])
  );

  // Show loading indicator
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1E1E' }}>
        <ActivityIndicator size="large" color="#00B2FF" />
      </View>
    );
  }

  // Show error message if any
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1E1E' }}>
        <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
        <Button title="Try Again" onPress={fetchFriends} />
      </View>
    );
  }

  return (
    <SafeAreaView style={Nutstyles.container}>
      <View style={text.NutTitle}>
        <Text style={text.NutFoodTitleText}>Friends</Text>
      </View>

      {friends.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#FFFFFF', fontSize: 16 }}>No friends yet. Add some friends to get started!</Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={item => item.id}
          data={friends}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', padding: 10, paddingLeft: 0, backgroundColor: '#363534' }}>
              <Collapse>
                <CollapseHeader>
                  <View style={{
                    width: Dimensions.get('window').width,
                    marginLeft: 0,
                    marginRight: 0,
                    borderWidth: 1,
                    borderColor: '#000000'
                  }}>
                    <Text style={text.item}>
                      {item.firstName || 'User'} {item.lastName || ''}
                    </Text>
                  </View>
                </CollapseHeader>
                <CollapseBody>
                  <Text style={text.NutTitleText}>
                    Username: {item.userName || 'N/A'}
                  </Text>
                  {item.email && (
                    <Text style={[text.NutTitleText, { marginTop: 5 }]}>
                      Email: {item.email}
                    </Text>
                  )}
                </CollapseBody>
              </Collapse>
            </View>
          )}
        />
      )}

      <Button
        title="+ Add Friend"
        onPress={() => {
          navigation.navigate('addFriend');
        }}
      />
      <View style={{ padding: 5 }}></View>

    </SafeAreaView>
  );
}

export {Friends};
const window = Dimensions.get("window");