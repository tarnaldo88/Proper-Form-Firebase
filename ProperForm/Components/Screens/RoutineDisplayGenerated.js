import React, {useState} from "react";
import {View, Image, Text, SafeAreaView, ScrollView, TextInput} from "react-native";
import {views, button, image, text, logstyle} from "./Styles";
import {TouchableOpacity} from "react-native-gesture-handler";
import {DisplayExButton} from "./../Display/DisplayExButtons";
import axios from "axios";

import {useFocusEffect} from "@react-navigation/native";
import {Storage} from "./../AsyncStorage/Storage";

let singleton = true;
let num = [];

const generateRando = arr => {
	let nums = [];
	let x = 0;
	let rando = 0;
	let arms = 1,
		abs = 7,
		legs = 13,
		shoulders = 18,
		back = 24,
		chest = 30;
	let inc = 6;
	/*
 EXERCISES++++++++++++++++++++
 Arms: 1-6
 Abs: 7-12
 Legs: 13-17
 Shoulders:18-23
 Back:24-29
 Chest:30-35
 +++++++++++++++++++++++++++++++
 */
if(singleton){
	for (let i = 0; i < 6; i++) {
		if (arr[x].localeCompare("arms") == 0) {
			rando = Math.floor(Math.random() * inc) + arms;
			if (nums.includes(rando)) {
				i--;
				continue;
			} else {
				nums.push(rando);
			}
		} else if (arr[x].localeCompare("abs") == 0) {
			rando = Math.floor(Math.random() * inc) + abs;
			if (nums.includes(rando)) {
				i--;
				continue;
			} else {
				nums.push(rando);
			}
		} else if (arr[x].localeCompare("legs") == 0) {
			rando = Math.floor(Math.random() * inc) + legs;
			if (nums.includes(rando)) {
				i--;
				continue;
			} else {
				nums.push(rando);
			}
		} else if (arr[x].localeCompare("shoulders") == 0) {
			rando = Math.floor(Math.random() * inc) + shoulders;
			if (nums.includes(rando)) {
				i--;
				continue;
			} else {
				nums.push(rando);
			}
		} else if (arr[x].localeCompare("back") == 0) {
			rando = Math.floor(Math.random() * inc) + back;
			if (nums.includes(rando)) {
				i--;
				continue;
			} else {
				nums.push(rando);
			}
		} else if (arr[x].localeCompare("chest") == 0) {
			rando = Math.floor(Math.random() * inc) + chest;
			if (nums.includes(rando)) {
				i--;
				continue;
			} else {
				nums.push(rando);
			}
		}
		x = x + 1 >= arr.length ? (x = 0) : (x += 1);
	}
	singleton = false;
	num = nums;
}
	console.log(nums);
};
const saveRoutine = async (num, routine) => {
	//loop through and save every workout number and the name corresponding to it
	for( let i = 0; i < 6; i++){
		axios
		.post("http://52.53.203.248/ProperApi/api/UserRoutines", {
			RtName: routine,
			RtNumber: num[i],
			UserID: 25,
		})

		.then(
			response => {
				console.log(response);
			},
			error => {
				console.log(error);
			}
		);		
	}	
};

function RoutineDisplayGenerated({navigation, route}) {
	const [routine, setRoutine] = useState();
	const arr = route.params.selected;
	console.log(" the selected: " + arr);
	generateRando(arr);

	const [name, setName] = useState();
	const [isLog, setIsLog] = useState();
	const [userID, setUserID] = useState();
	
	useFocusEffect(
		React.useCallback(() => {
		  // Do something when the screen is focused
		  Storage.load(setUserID, setName, setIsLog);
		  Storage.setSignOut();
		  return () => {
			// Do something when the screen is unfocused
			// Useful for cleanup functions as
		  };
		}, [])
	  );

	const setRoutineName = (text) => {
		setRoutine(text);
	};
	console.log(routine);
	return (
		<SafeAreaView>
			<ScrollView>
				<View style={views.Home}>
					<Text style={text.title}> Your Newly Generated Routine</Text>
					<View>
						<Text>
							Standard Workout Estimated Time to Complete: 15min.
							Beginner: 2 sets of 8-12 reps per set 
						</Text>
						<Text>
						Intermediate: 3 sets of 10-15 reps per set
						</Text>
						<Text>
							Advanced: 5 sets of 10-20 reps per set
						</Text>
					</View>
                    <DisplayExButton val = { num[0] } navigation = {navigation}/>
                    <DisplayExButton val = { num[1] } navigation = {navigation}/>
                    <DisplayExButton val = { num[2] } navigation = {navigation}/>
                    <DisplayExButton val = { num[3] } navigation = {navigation}/>
                    <DisplayExButton val = { num[4] } navigation = {navigation}/>
                    <DisplayExButton val = { num[5] } navigation = {navigation}/>
					<TextInput
						style={logstyle.input}
						underlineColorAndroid="transparent"
						placeholder="Enter Routine Name"
						placeholderTextColor="#9a73ef"
						autoCapitalize="none"
						onChangeText={setRoutineName}
					/>
					<TouchableOpacity
					onPress={() => {
						saveRoutine(num, routine),
						navigation.navigate(
							"MyRoutines",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 1}
						);
					}}
				>
					<Image
						source={require("./../../img/saveRoutine.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
export {RoutineDisplayGenerated};
