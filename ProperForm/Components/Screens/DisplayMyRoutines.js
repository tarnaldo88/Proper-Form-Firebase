import React, {useState} from "react";
import {StyleSheet, View, Image, Text, TouchableOpacity, SafeAreaView, ScrollView} from "react-native";
import {views, text, button, image} from "./Styles";
import {DisplayExButton} from "./../Display/DisplayExButtons";
import axios from "axios";
import {useFocusEffect} from "@react-navigation/native";

//function to setup the WorkoutHome screen
function DisplayMyRoutines({navigation, route}) {

	const [testName, setName] = useState("");
	const [isLog, setIsLog] = useState();
	const [userID, setUserID] = useState(25);
	
	useFocusEffect(
		React.useCallback(() => {
		  // Do something when the screen is focused
		//   Storage.load(setUserID, setName, setIsLog);
		//   Storage.setSignOut();
		  return () => {
			// Do something when the screen is unfocused
			// Useful for cleanup functions as
		  };
		}, [])
	  );

    const [wrkt1, setWrkt1]= useState();
    const [wrkt2, setWrkt2]= useState();
    const [wrkt3, setWrkt3]= useState();
    const [wrkt4, setWrkt4]= useState();
    const [wrkt5, setWrkt5]= useState();
    const [wrkt6, setWrkt6]= useState();
	console.log("inside DisplayMyRoutines");
	console.log(route.params.routName);
    const name = route.params.routName;
    let num = [];

    // console.log(" routname: " + name);

	//function to get the workouts under the given route name
	const getRoutine = async () => {
        var arr = [];
		//setLoading(true);
		await axios
			.get(
				"http://52.53.203.248/ProperApi/api/UserRoutines/"+ userID + "/" + route.params.routName,
				{},				
			)
			.then(response => {
				for(let i = 0; i < response.data.length; i++){
					if(!arr.includes(response.data[i].rtNumber)){
						arr.push(response.data[i].rtNumber);				
					}
				}
				console.log(arr);
			});
		return arr;
	};

	const waitForRoutine = async() =>{
        num = await getRoutine();
        setWrkt1(num[0]);
        setWrkt2(num[1]);
        setWrkt3(num[2]);
        setWrkt4(num[3]);
        setWrkt5(num[4]);
        setWrkt6(num[5]);
        console.log("testing arr:" + num );     
	};	

    waitForRoutine();

	return (
		<SafeAreaView>
			<ScrollView>
				<View style={views.Home}>
                    <Text style={text.Routinetitle}>{name}</Text>	
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
                    <DisplayExButton val = { wrkt1 } navigation = {navigation}/>
                    <DisplayExButton val = { wrkt2 } navigation = {navigation}/>
                    <DisplayExButton val = { wrkt3 } navigation = {navigation}/>
                    <DisplayExButton val = { wrkt4 } navigation = {navigation}/>
                    <DisplayExButton val = { wrkt5 } navigation = {navigation}/>
                    <DisplayExButton val = { wrkt6 } navigation = {navigation}/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
export {DisplayMyRoutines};