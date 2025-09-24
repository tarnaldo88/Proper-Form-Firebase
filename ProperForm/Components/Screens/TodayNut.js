import React, { useState, useEffect } from "react";
import { SafeAreaView, Button, FlatList, StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { views, text, button, image } from "./Styles";
import { useFocusEffect } from "@react-navigation/native";
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { Dimensions } from "react-native";
import app from "../firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, query, orderBy, where, Timestamp } from "firebase/firestore";

function TodayNut({navigation}) {

	const [initialElements, changeEl]  = useState([]);
	const [exampleState, setExampleState] = useState(initialElements);
	const [loading, setLoad] = useState(false);
	const [totals, setTotals] = useState({cal: 0, protein: 0, sugar:0, carbs:0, fat:0});

	useFocusEffect(
		React.useCallback( () => {
		  // Do something when the screen is focused
	
		  loadTodayFoods();
		  return () => {			  
			// Do something when the screen is unfocused
			// Useful for cleanup functions as
		  };
		}, [])
	  );

	const loadTodayFoods = async () => {
		try {
			const auth = getAuth(app);
			const uid = auth.currentUser?.uid;
			if (!uid) {
				setExampleState([]);
				return;
			}
			const db = getFirestore(app);
			// Build start/end of today in the device's local time
			const now = new Date();
			const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
			const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
			const startTs = Timestamp.fromDate(start);
			const endTs = Timestamp.fromDate(end);

			const foodsRef = collection(db, "users", uid, "foodEntries");
			const q = query(foodsRef, where("date", ">=", startTs), where("date", "<=", endTs), orderBy("date", "desc"));
			const snap = await getDocs(q);
			const arr = [];
			snap.forEach(doc => {
				const data = doc.data();
				arr.push({
					name: data.name || "",
					fat: data.fat || 0,
					sugar: data.sugar || 0,
					carbs: data.carbs || 0,
					protein: data.protein || 0,
					calories: data.calories || 0,
					date: data.date?.toDate ? data.date.toDate().toISOString() : "",
				});
			});

			await addElement(arr);
		} catch (e) {
			console.log("TodayNut loadTodayFoods Firestore error:", e);
			await addElement([]);
		}
	};

		const addElement = async (results) => {
		var newArr = [];
		var i = 0;
		var calo = 0, prot = 0, sug = 0, car = 0, fats = 0;
		//loop to go through all entries and add them to array
		for(i = 0; i < results.length; i++) {
			//for first element, add each entry manually since array is empty and without structure
			if( i == 0) {
				newArr = [{ id: i, text: results[i].name, fat: results[i].fat, sugar: results[i].sugar,
							carbs:results[i].carbs, protein: results[i].protein, totCal: results[i].calories, date: results[i].date.substring(0,10)}];
			} else {
				//afterwards, add on to existing array
				newArr = [...newArr ,
					{ id: i, text: results[i].name, fat: results[i].fat, sugar: results[i].sugar,
						carbs: results[i].carbs, protein: results[i].protein, totCal: results[i].calories, date: results[i].date.substring(0,10)}];
			}
			calo += results[i].calories;
			prot += results[i].protein;
			fats += results[i].fat;
			car += results[i].carbs;
			sug += results[i].sugar;
		}

		// update state with results and totals
		setExampleState(newArr);
		setTotals({ cal: calo, protein: prot, sugar: sug, carbs: car, fat: fats });
		setLoad((prev) => !prev);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={text.NutTitle}>
				<Text style={text.NutFoodTitleText}>Today's Totals</Text>
			</View>
			<View style={{ padding: 10 }}>
				<Text style={styles.title}>Total Calories:   {totals.cal}</Text>
				<Text style={styles.title}>Total Protein:   {totals.protein}</Text>
				<Text style={styles.title}>Total Fat:   {totals.fat}</Text>
				<Text style={styles.title}>Total Sugar:   {totals.sugar}</Text>
				<Text style={styles.title}>Total Carbohydrates:   {totals.carbs}</Text>
			</View>
			<View style={text.NutTitle}>
				<Text style={text.NutFoodTitleText}>Foods</Text>
			</View>
			<FlatList
				keyExtractor={(item) => item.id.toString()}
				extraData={loading}
				data={exampleState}
				renderItem={(item) => (
					<View style={{ flexDirection: "row", padding: 10, paddingLeft: 0, backgroundColor: "#363534" }}>
						<Collapse>
							<CollapseHeader>
								<View
									style={{
										width: Dimensions.get("window").width,
										marginLeft: 0,
										marginRight: 0,
										borderWidth: 1,
										borderColor: "#000000",
									}}
								>
									<Text style={styles.item}>{item.item.text}</Text>
								</View>
							</CollapseHeader>
							<CollapseBody>
								<Text style={text.NutTitleText}>Calories:		{item.item.totCal}</Text>
								<Text style={text.NutTitleText}>Fats:		{item.item.fat}</Text>
								<Text style={text.NutTitleText}>Sugars:		{item.item.sugar}</Text>
								<Text style={text.NutTitleText}>Carbs:		{item.item.carbs}</Text>
								<Text style={text.NutTitleText}>Protein:		{item.item.protein}</Text>
								<Text style={text.NutTitleText}>Date Added:		{item.item.date}</Text>
							</CollapseBody>
						</Collapse>
					</View>
				)}
			/>
			<Button
				title="+ Add element"
				onPress={() => {
					navigation.navigate("createDiet");
				}}
			/>
			<View style={{ padding: 5 }}></View>
			<Button
				color="#2116f5"
				title="Return to All Entries"
				onPress={() => {
					navigation.navigate("nutJournal");
				}}
			/>
		</SafeAreaView>
	);

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor:"#363534",
		//justifyContent:'space-between',
	   },
	   sectionHeader: {
		 paddingTop: 2,
		 paddingLeft: 10,
		 paddingRight: 10,
		 paddingBottom: 2,
		 fontSize: 14,
		 fontWeight: 'bold',
		 backgroundColor: 'rgba(247,247,247,1.0)',
	   },
	   item: {
		   fontSize:18, 
		   fontWeight:"bold", 
		   backgroundColor:"#0429b3",
		   padding: 10,
		   color: 'white',
	   },
	   title: {
		fontWeight: "bold",
		fontSize:20,
		justifyContent:"center",
		alignItems:"center",
		marginLeft:20,
		color: "white",
	},
	btn: {
		padding: 5,
		margin: 5,
		height: Dimensions.get('window').height * 0.07,
		width: Dimensions.get('window').width * .8,
		
	},
	})

export default TodayNut;