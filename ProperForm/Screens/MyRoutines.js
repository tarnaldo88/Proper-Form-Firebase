import React, {useState} from "react";
import {View, Image, Button, FlatList, Text, TouchableOpacity, SafeAreaView, ScrollView} from "react-native";
import {views, text, button, image} from "./Styles";
import axios from "axios";
import {useFocusEffect} from "@react-navigation/native";
import {Storage} from "./../AsyncStorage/Storage";

//function to setup the WorkoutHome screen
function MyRoutines({navigation}) {	
	const [name, setName] = useState();
	const [isLog, setIsLog] = useState();
	const [userID, setUserID] = useState();
	
	useFocusEffect(
		React.useCallback(() => {
		  // Do something when the screen is focused
		  Storage.load(setUserID, setName, setIsLog);
		  Storage.setSignOut();

		  let results = getRoutineNames();
		  // console.log("results = " + results);

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

	const [routines, setRout] = useState([]);
	const [loading, setLoad] = useState(false);

	const waitForRoutine = (results) =>{		
		var newArr = [];
		console.log(results.length);
		// console.log(results[0]);
		//for loop to iterate through all the routine names
		for(let i = 0; i < results.length; i++) {
			if(i == 0){
				newArr = [{id: i, rout: results[i]}];
			} else {
				newArr = [...newArr , {id: i, rout: results[i]}];
			}
		}
		console.log(newArr[1].rout);
		setRout(newArr);
	};	
	
	const getRoutineNames = async () => {
		//function to get the names of the routines
		var arr = [];
		
		await axios
			.get(
				"http://52.53.203.248/ProperApi/api/UserRoutines/All/25",
				{}
			)
			.then(response => {
				//cosole.log(response.data);
				setLoad(true);
				for(let i = 0; i < response.data.length; i++){
					if(!arr.includes(response.data[i].rtName)){
						//console.log(response.data[i].rtName);
						arr.push(response.data[i].rtName);					
					}
				}
				// console.log(arr);
		});		
		await waitForRoutine(arr);

		if(loading == true)
		 setLoad(false);
		else
		 setLoad(true);
	
		return arr;
	};	
	
	return (
		<SafeAreaView style={{backgroundColor:"#363534"}}>
			
			<View style={{backgroundColor:"#363534"}}>
			<View style={{margin:35, marginTop:55, backgroundColor:"#363534"}}>
				<FlatList				
					onPress={() => {
						console.log(data.calories);
					}}
					keyExtractor = {item => item.id.toString()}  
					extraData = {loading}
					data={routines}
					renderItem = {item => ( 
						<View style={{flexDirection:"row", padding:10, paddingLeft:0, backgroundColor:"#363534"}}>
							<TouchableOpacity navigation={navigation}
								onPress={() => {
									navigation.navigate(
										"WorkoutHome", {screen:"DisplayMyRoutines", params: {routName: item.item.rout}}
										// //number chosen needs to be id of the routine in the database
										// { routName: item.item.rout }										
									);
								}}
								style={text.appButtonContainer}
							>
								<Text style={ text.appButtonText}>{item.item.rout}</Text>					
							</TouchableOpacity>
						</View>
					)} 
				/> 	
			</View>
			</View>		
		</SafeAreaView>
	);
}
export {MyRoutines};