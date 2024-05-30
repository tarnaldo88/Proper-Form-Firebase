import React, { useState } from "react";
import { SafeAreaView, Button, FlatList, StyleSheet, View, Image, Text, TouchableOpacity} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {views, text, button, image} from "./Styles";
import axios from "axios";
import {useFocusEffect} from "@react-navigation/native";
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import {Dimensions} from "react-native";

function TodayNut({navigation}) {

	const [initialElements, changeEl]  = useState([
		{ id: 0,text : "Vegetable Smoothie", fat: "10", sugar: "20", carbs: "20", protein: "15", totCal: "230", date: "6/8/2021"},		
	  ]);	
	const [exampleState, setExampleState] = useState(initialElements);
	const [loading, setLoad] = useState(false);
	const [totals, setTotals] = useState([{cal: 230, protein:15, sugar:20, carbs:20, fat:10}]);

	const addElement = async (results) => {
		var newArr = [];
		var i = 0;
		var calo = 0, prot = 0, sug = 0, car = 0, fats = 0;
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
			calo += results[i].calories;
			prot += results[i].protein;
			fats += results[i].fat;
			car += results[i].carbs;
			sug += results[i].sugar;
		}	 
		await setExampleState(newArr);
		setTotals({
			cal: calo, protein: prot, sugar:sug, carbs: car, fat: fats
		});
		await changeEl(newArr);
	}

	useFocusEffect(
		React.useCallback( () => {
		  // Do something when the screen is focused
	
			
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
	   const response = await axios.get("http://52.53.203.248/ProperApi/api/TodaysNut/25", {})
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
		<SafeAreaView style={styles.container}>				
			<View style={{ backgroundColor:"#320140"}}>
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
				title ="+ Add element"
				onPress={() => {					
					navigation.navigate("createDiet");
				}} />
				<View style={{padding: 5}}></View>
				<Button
				color="#2116f5"
				title ="Return to All Entries"
				onPress={() => {					
					navigation.navigate("nutJournal");
				}} />			
		</SafeAreaView>				
	);
}

export {TodayNut};

const window = Dimensions.get("window");

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
		height: window.height * 0.07,
		width: window.width * .8,
		
	},
  })
  