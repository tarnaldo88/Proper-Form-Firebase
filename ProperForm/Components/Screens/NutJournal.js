import React, { useState } from "react";
import { SafeAreaView, Button, FlatList, StyleSheet, View, Image, Text, TouchableOpacity, StatusBar} from "react-native";
import {views, text, button, image, Nutstyles} from "./Styles";
import axios from "axios";
import {useFocusEffect} from "@react-navigation/native";
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import {Dimensions} from "react-native";

function NutJournal({navigation}) {
	const [name, setName] = useState();
	const [isLog, setIsLog] = useState();
	const [userID, setUserID] = useState();

	const [initialElements, changeEl]  = useState([
		{id: 0,text : "Vegetable Smoothie", fat: "10", sugar: "20", carbs: "20", protein: "15", totCal: "230", date: "6/8/2021"},		
	  ]);	
	const [exampleState, setExampleState] = useState(initialElements);
	const [loading, setLoad] = useState(false);
	
	const addElement = async (results) => {

		var newArr = [];
		var i = 0;

		//loop to go through all entries and add them to array
		for(i = 0; i < results.length; i++) {

			//for first element, add each entry manually since array is empty and without structure

			if( i == 0) {
				newArr = [{ id: i, text: results[i].itemName, fat: results[i].fat, sugar: results[i].sugar,
							carbs:results[i].carbs, protein: results[i].protein, totCal: results[i].calories, date: results[i].dateAdded.substring(0,10)}];
			} else {
				//afterwards, add on to existing array
				newArr = [...newArr ,
					{ id: i, text: results[i].itemName, fat: results[i].fat, sugar: results[i].sugar,
						carbs:results[i].carbs, protein: results[i].protein, totCal: results[i].calories, date: results[i].dateAdded.substring(0,10)}];
			}			
		}	 
		await setExampleState(newArr);
		await changeEl(newArr);
	}

	useFocusEffect(
		React.useCallback( () => {
		  // Do something when the screen is focused

		console.log("1 " + userID);
		// Storage.load(setUserID, setName, setIsLog);
		// Storage.setSignOut();
 
		console.log("2 " + userID);
			
		  let results = testing();
			console.log("results = " + results);

			if(loading == true)
				setLoad(false);
			else
				setLoad(true);

		  return () => {


			// Do something when the screen is unfocused
			// Useful for cleanup functions as
		  };
		}, [])
	  );

	  const testing = async () => {		
	   var arr = [];
	   
	   const response = await axios.get("http://52.53.203.248/ProperApi/api/NutEntries/25", {})
		   .then(
			   response => {
				   const nameList = response.data;					
				   setLoad(true);
				   var i = 0;
				   for(i = 0; i < response.data.length; i++){
					   arr.push(nameList[i]);
				   }				   
			   });
			   
			   await addElement(arr);

			   if(loading == true)
				setLoad(false);
			   else
				setLoad(true);

			   return arr;
   };
	
	return (		
		<SafeAreaView style={Nutstyles.container}>			
				
			
			<View style={text.NutTitle}>
				<Text style={text.NutFoodTitleText}>Foods</Text>	
			</View>		

			<FlatList				
				onPress={() => {
					console.log(data.calories);
				}}
				keyExtractor = {item => item.id.toString()}  
				extraData = {loading}
				data={exampleState}
				renderItem = {item => ( 
				<View style={{flexDirection:"row", padding:10, paddingLeft:0, backgroundColor:"#363534"}}>
						<Collapse>
							<CollapseHeader>
							<View style={{ width: Dimensions.get('window').width, 
											marginLeft: 0, marginRight: 0,
											borderWidth: 1, borderColor: "#000000"}}>								
								<Text style={text.item}>{item.item.text}</Text>
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
				title="+ Add Food Entry"
				onPress={() => {
					
					navigation.navigate("createDiet");
				}} 
			/>
			<View style={{padding: 5}}></View>
			<Button
				color="#2116f5"
				title ="Show Today's Entries"
				onPress={() => {					
					navigation.navigate("todayNut");
				}} />					
		</SafeAreaView>				
	);
}

export {NutJournal};

const window = Dimensions.get("window");

  