import React, {useState} from "react";
import {StyleSheet, View, Image, Text, TouchableOpacity, SafeAreaView, ScrollView} from "react-native";
import {views, text, button, image} from "./Styles";
import {DisplayExButton} from "./../Display/DisplayExButtons";
import {useFocusEffect} from "@react-navigation/native";
import app from "../firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";

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

	// Fetch the routine document(s) for this user and name, then set exercises
    const getRoutine = async () => {
        try {
            const auth = getAuth(app);
            const uid = auth.currentUser?.uid;
            if (!uid) return [];
            const db = getFirestore(app);
            const routinesRef = collection(db, "users", uid, "routines");
            const q = query(routinesRef, where("name", "==", route.params.routName));
            const snap = await getDocs(q);
            // choose the most recent by timestamp if multiple
            let chosen = null;
            snap.forEach(doc => {
                const data = doc.data();
                if (!chosen) chosen = data; // first
                else {
                    const a = chosen?.timestamp?.toMillis?.() || 0;
                    const b = data?.timestamp?.toMillis?.() || 0;
                    if (b > a) chosen = data;
                }
            });
            const arr = Array.isArray(chosen?.exercises) ? chosen.exercises : [];
            return arr;
        } catch (e) {
            console.log('Firestore read error (DisplayMyRoutines):', e);
            return [];
        }
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