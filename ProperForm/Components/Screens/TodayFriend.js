import React, { useState } from "react";
import { SafeAreaView, Button, FlatList, StyleSheet, View, Text} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {text} from "./Styles";
import axios from "axios";
import {useFocusEffect} from "@react-navigation/native";
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import {Dimensions} from "react-native";
import {Storage} from "./../AsyncStorage/Storage";

function TodayFriend({navigation}) {

	const [name, setName] = useState();
	const [isLog, setIsLog] = useState();
	const [userID, setUserID] = useState();

	const [initialElements, changeEl]  = useState([
		{id: 0, userID: 0, userName : ""},		
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
				newArr = [{ id: i, userID: results[i].friendUserID, userName: results[i].userName}];
			} else {
				//afterwards, add on to existing array
				newArr = [...newArr ,
					{ id: i, userID: results[i].friendUserID, userName: results[i].userName}];
			}	
		}	 
		await setExampleState(newArr);
		await changeEl(newArr);
	}

	useFocusEffect(
		React.useCallback( () => {
		  // Do something when the screen is focused
		  Storage.load(setUserID, setName, setIsLog);
		  Storage.setSignOut();
			
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
	   const response = await axios.get("http://52.53.203.248/ProperApi/api/Friends/1", {})
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
			<View style={text.NutTitle}>
				<Text style={text.NutFoodTitleText}>Friends</Text>	
			</View>					
			<FlatList				
				onPress={() => {
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
								<Text style={styles.item}>{item.item.userName}</Text>
							</View>
							</CollapseHeader>
							<CollapseBody>
								<Text style={text.NutTitleText}>UserID:		{item.item.userID}</Text>
								<Text style={text.NutTitleText}>Username:		{item.item.userName}</Text>
							</CollapseBody>
						</Collapse>
					</View>
				)} 
			/> 	
			<Button
				title ="+ Add Friend"
				onPress={() => {					
					navigation.navigate("addFriend");
				}} />
				<View style={{padding: 5}}></View>
				<Button
				color="#2116f5"
				title ="Return to All Friends"
				onPress={() => {					
					navigation.navigate("Friends");
				}} />			
		</SafeAreaView>				
	);
}

export {TodayFriend};

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
  