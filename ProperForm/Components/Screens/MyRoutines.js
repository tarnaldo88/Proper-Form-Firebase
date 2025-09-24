import React, {useState} from "react";
import {View, Image, Button, FlatList, Text, TouchableOpacity, SafeAreaView, ScrollView} from "react-native";
import {views, text, button, image} from "./Styles";
import {useFocusEffect} from "@react-navigation/native";
import app from "../firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

//function to setup the WorkoutHome screen
function MyRoutines({navigation}) {	
	const [name, setName] = useState();
	const [isLog, setIsLog] = useState();
	const [userID, setUserID] = useState();
	
	useFocusEffect(
		React.useCallback(() => {
		  // Do something when the screen is focused

		  getRoutineNames();
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
		setRout(newArr);
		setLoad(l => !l);
	};	
	
	const getRoutineNames = async () => {
		// Fetch routine names from Firestore users/{uid}/routines
		try {
			const auth = getAuth(app);
			const uid = auth.currentUser?.uid;
			if (!uid) {
				setRout([]);
				return [];
			}
			const db = getFirestore(app);
			const routinesRef = collection(db, "users", uid, "routines");
			const snap = await getDocs(routinesRef);
			const namesSet = new Set();
			snap.forEach(doc => {
				const data = doc.data();
				if (data?.name) namesSet.add(data.name);
			});
			const arr = Array.from(namesSet);
			await waitForRoutine(arr);
			setLoad(l => !l);
			return arr;
		} catch (e) {
			console.log('Firestore read error (MyRoutines):', e);
			setRout([]);
			return [];
		}
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
								style={[text.appButtonContainer, {
									width: '100%',
									maxWidth: 400, // Optional: max width for better appearance on tablets
									backgroundColor: '#aa2a2a', // Slightly lighter than background
									borderRadius: 8,
									elevation: 3, // Android shadow
									shadowColor: '#000', // iOS shadow
									shadowOffset: { width: 0, height: 2 },
									shadowOpacity: 0.25,
									shadowRadius: 3.84,
								}]}
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