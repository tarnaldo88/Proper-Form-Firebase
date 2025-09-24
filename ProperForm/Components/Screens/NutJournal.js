import React, { useState, useEffect } from "react";
import { SafeAreaView, Button, FlatList, StyleSheet, View, Image, Text, TouchableOpacity, StatusBar, Alert} from "react-native";
import {views, text, button, image, Nutstyles} from "./Styles";
import {useFocusEffect} from "@react-navigation/native";
import app from "../firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

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
		<SafeAreaView>
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
	// );
}}

export {NutJournal};

const window = Dimensions.get("window");

  