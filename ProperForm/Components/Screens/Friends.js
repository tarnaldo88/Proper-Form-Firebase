import React, { useState } from "react";
import { SafeAreaView, Button, FlatList, View, Text} from "react-native";
import {text, Nutstyles} from "./Styles";
import axios from "axios";
import {useFocusEffect} from "@react-navigation/native";
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import {Dimensions} from "react-native";

function Friends({navigation}) {

	const [name, setName] = useState();
	
	const [isLog, setIsLog] = useState();
	const [userID, setUserID] = useState();

	const [initialElements, changeEl]  = useState([
		{ id: 0, userID: 0, userName : ""},		
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
				newArr = [{id: i, userID: results[i].friendUserID, userName: results[i].userName, firstName: results[i].firstName, lastName: results[i].lastName}];
			} else {
				//afterwards, add on to existing array
				newArr = [...newArr ,
					{  id: i, userID: results[i].friendUserID, userName: results[i].userName, firstName: results[i].firstName, lastName: results[i].lastName}];
			}			
		}	 
		await setExampleState(newArr);
		await changeEl(newArr);
	}

	useFocusEffect(
		React.useCallback( () => {
		  // Do something when the screen is focused

		//   Storage.load(setUserID, setName, setIsLog);
		//   Storage.setSignOut();
			
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
	   const response = await axios.get("http://52.53.203.248/ProperApi/api/Friends/25", {})
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
				<Text style={text.NutFoodTitleText}>Friends</Text>	
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
								<Text style={text.item}>{item.item.firstName} {item.item.lastName}</Text>
							</View>
							</CollapseHeader>
							<CollapseBody>								
								<Text style={text.NutTitleText}>Username:		{item.item.userName}</Text>
							</CollapseBody>
						</Collapse>
					</View>
				)} 
			/> 	
			<Button
				title="+ Add Friend"
				onPress={() => {
					
					navigation.navigate("addFriend");
				}} 
			/>
			<View style={{padding: 5}}></View>							
		</SafeAreaView>				
	);
}

export {Friends};

const window = Dimensions.get("window");