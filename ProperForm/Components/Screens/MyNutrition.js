import React, {useState, useEffect} from "react";
import {useFocusEffect} from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity, Dimensions, Alert } from "react-native";
import { views, text, button, logstyle, nut, image} from "./Styles";
import { LineChart } from "react-native-chart-kit"
import { TextInput, SafeAreaView, ScrollView, Button } from "react-native";
import app from "../firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, getDocs, query, orderBy, serverTimestamp, onSnapshot } from "firebase/firestore";

//function to setup the Nutrtion Home screen
function MyNutrition({ navigation }) {    

    const [xAxis, setXAxis] = useState(["1","2","3","4","5", "6", "7"]);
    const [weights, setWeights] = useState([232,228,234,229,223,218,220]);
    const [current,setCurrent] = useState(33);
    const [goal,setGoal] = useState(22);
    const [date, setDate] = useState("");
		{ weight: "0", weightChange: "0", date: "date"},		
	  ]);	
	const [exampleState, setExampleState] = useState(initialElements);
    const [name, setName] = useState();
    const [isLog, setIsLog] = useState();
    const [isSign, setIsSign] = useState(false);
    const [userID, setUserID] = useState();

	useFocusEffect(
		React.useCallback(() => {
			const auth = getAuth(app);
			const uid = auth.currentUser?.uid;
			if (!uid) {
				Alert.alert('Sign in required', 'Please sign in to view and save your nutrition data.');
				return () => {};
			}

			// Subscribe to user goal
			const userRef = doc(db, "users", uid);
			const unsubUser = onSnapshot(userRef, (snap) => {
				if (snap.exists()) {
					const data = snap.data();
					if (typeof data.goalWeight === 'number') {
						setGoal(data.goalWeight);
					}
				}
			}, (err) => console.log('onSnapshot user error:', err));

			// Subscribe to weight history
			const weightsRef = collection(db, "users", uid, "weightHistory");
			const qWeights = query(weightsRef, orderBy("date", "asc"));
			const unsubWeights = onSnapshot(qWeights, (snap) => {
				const weightArr = [];
				const dateArr = [];
				snap.forEach(d => {
					const w = d.data();
					if (typeof w.weight === 'number') {
						weightArr.push(w.weight);
						const dt = w.date?.toDate ? w.date.toDate() : new Date();
						const mm = String(dt.getMonth() + 1).padStart(2, '0');
						const dd = String(dt.getDate()).padStart(2, '0');
						dateArr.push(`${mm}-${dd}`);
					}
				});
				if (weightArr.length >= 7) {
					addElement(weightArr.slice(-7), dateArr.slice(-7));
				} else if (weightArr.length > 0) {
					const paddedW = Array(Math.max(0, 7 - weightArr.length)).fill(weightArr[0]).concat(weightArr);
					const paddedD = Array(Math.max(0, 7 - dateArr.length)).fill(dateArr[0]).concat(dateArr);
					addElement(paddedW.slice(-7), paddedD.slice(-7));
				}
			}, (err) => console.log('onSnapshot weights error:', err));

			return () => {
				unsubUser && unsubUser();
				unsubWeights && unsubWeights();
			};
		}, [])
	);

	const db = getFirestore(app);

	const handleCurrent = text => {
		text = text.replace(/[^0-9]/g, '');
		setCurrent(parseInt(text));
		setDate(makeDate());
		postCurrent();
        setDate(makeDate());	
    }
    const handleGoal = text => {
        text = text.replace(/[^0-9]/g, '');
        setGoal(parseInt(text));		
    }

    const makeDate = () => {			
		var day = new Date().getDate();
		var month = new Date().getMonth() + 1;
		var year = new Date().getFullYear();	
        var hour = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();

		if(month < 10 ) {
			month = "0" + month;
		}
		if (day < 10) {
			day = "0" + day;
		}
        if (hour < 10) {
			hour = "0" + hour;
		}
        if (min < 10) {
			min = "0" + min;
		}
        if (sec < 10) {
			sec = "0" + sec;
		}
		console.log("time = " + year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec)
		return (year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec);
	};

    const addElement = (weights, dates) =>{
		var i = 0;
        var transferW = [weights[6], weights[5], weights[4], weights[3], weights[2], weights[1], weights[0],]
        var transferD = [dates[6],  dates[5], dates[4], dates[3], dates[2], dates[1], dates[0],]

        setWeights(transferW);
        setXAxis(transferD);
    };

    const adjust = () =>{
		var i = 0;
        for(i = 0; i<6; i++){
            weights[i] = weights[i+1];
            xAxis[i] = xAxis[i+1];
        }
        weights[6] = current;
        xAxis[6] = date.substring(5,10);
        var transferW = [weights[0], weights[1], weights[2], weights[3], weights[4], weights[5], weights[6],]
        var transferD = [xAxis[0],  xAxis[1], xAxis[2], xAxis[3], xAxis[4], xAxis[5], xAxis[6],]

        setWeights(transferW);
        setXAxis(transferD);
        console.log("adjusted");
    };

    // Removed one-time fetch in favor of realtime listeners above

    // Add current weight to Firestore under users/{uid}/weightHistory
    const postCurrent = async() =>{
        try {
            const auth = getAuth(app);
            const uid = auth.currentUser?.uid || "demoUser";
            const weightsRef = collection(db, "users", uid, "weightHistory");
            await addDoc(weightsRef, {
                weight: current,
                date: serverTimestamp(),
            });
            // refresh chart locally
            adjust();
        } catch (e) {
            console.log('Firestore write error (postCurrent):', e);
        }
    };

    const postGoal = async() =>{
        try {
            const auth = getAuth(app);
            const uid = auth.currentUser?.uid || "demoUser";
            const userRef = doc(db, "users", uid);
            await setDoc(userRef, { goalWeight: goal }, { merge: true });
        } catch (e) {
            console.log('Firestore write error (postGoal):', e);
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
            <View style={{ backgroundColor:"#2d2e2d" }}>
                <View >
                   <LineChart
                        data={{
                            labels: xAxis,
                            datasets: [ { data: [ weights[0], weights[1], weights[2], weights[3], weights[4], 
                                weights[5], weights[6] ]}]
                        }}
                        width={Dimensions.get("window").width*.99} // from react-native
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix=" lbs"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#0a0a00",
                            backgroundGradientFrom: "#0a0a00",
                            backgroundGradientTo: "#0a0a00",
                            decimalPlaces: 1, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 10, padding: 14
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 5,
                            padding: 2
                        }}
                    />
                    
                </View>
                <View >
                    <Text style={text.NutFoodTitleText}>                    
                       Goal weight: {goal}                   
                    </Text>			
                    <Text style = {nut.NutFoodTitleText}>
                        Please enter your current weight:
                    </Text>
                    <TextInput
                        style={nut.input}
                        keyboardType='numeric'
                        underlineColorAndroid="transparent"
                        placeholder=" Current weight?"
                        placeholderTextColor="#ffff"
                        autoCapitalize="none"
                        onChangeText={handleCurrent}
                    />
                    <TouchableOpacity style={logstyle.submitProgress} onPress={() => { 							
                            postCurrent();
                        }}>
                        <Image
                            source={require("./../../img/submit.png")}
                            style={logstyle.submitProgress}
                        />
                    </TouchableOpacity>	                  
                    <Text style = {nut.NutFoodTitleText}>
                        If you would like to alter your goal:
                    </Text>
                    <TextInput
                        style={nut.input}
                        keyboardType='numeric'
                        underlineColorAndroid="transparent"
                        placeholder=" Your new goal?"
                        placeholderTextColor="#ffff"
                        autoCapitalize="none"
                        onChangeText={handleGoal}
                    />                    
                    <TouchableOpacity style={logstyle.submitProgress} onPress={() => { 							
                            postGoal();
                        }}>
                        <Image
                            source={require("./../../img/submit.png")}
                            style={logstyle.submitProgress}
                        />
                    </TouchableOpacity>		
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export { MyNutrition };