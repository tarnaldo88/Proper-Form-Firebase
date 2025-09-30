import React, {useState, useEffect, Fragment} from "react";
import {
	View,
	Image,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Alert
} from "react-native";
import {logstyle, text, nut} from "./Styles";
import {useFocusEffect} from "@react-navigation/native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

//function to setup the create nutrition plan screen
function PostSteps({navigation, route}) {
	//stores all the entries made by the User	
	const [steps, setSteps] = useState('');
	const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    
    // Get current user on component mount
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
        return unsubscribe; // Cleanup subscription on unmount
    }, []);

    // useFocusEffect(
	// 	React.useCallback( () => {  // Do something when the screen is focused	
    //         Storage.load(setUserID, setName, setIsLog);
    //         Storage.setSignOut();		
	// 		if(loading == true)
	// 			setLoad(false);
	// 		else
	// 			setLoad(true);
	// 	  return () => {
	// 	  };
	// 	}, [])
	//   );

	const handleSteps = text => {
        // Only allow numbers and update the state
        const cleanedText = text.replace(/[^0-9]/g, '');
        setSteps(cleanedText);
        setError('');
    };

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
		// console.log("time = " + year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec)
		return ( year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec);
	};

	//axios call to post or put new food entry	
	// const PostStepEntry = async () => {	
	// 	var arr;
    //     await setUserID(1);
    //     console.log(fake + "||" + steps + "||" + date);
	// 	await axios
	// 		.post("http://52.53.203.248/ProperApi/api/Steps", {
	// 			UserId: 25,
	// 			Steps: steps,
	// 			Date: date,
	// 		})
	// 		.then(
	// 			response => {
    //                 console.log(response);
	// 			},
	// 			error => {
	// 				console.log(error);
	// 			}
	// 		);
	// 		return arr;
	// };

    const handleSubmit = async () => {
        if (!steps) {
            setError("Please enter the number of steps taken");
            return;
        }
        
        if (!currentUser) {
            setError("You must be logged in to save steps");
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Add a new document with a generated ID
            await addDoc(collection(db, "steps"), {
                userId: currentUser.uid,
                steps: parseInt(steps),
                date: serverTimestamp(),
                createdAt: new Date().toISOString()
            });
            
            // Navigate to Community screen on success
            navigation.navigate("Community");
        } catch (err) {
            console.error("Error adding document: ", err);
            setError("Failed to save steps. Please try again.");
        } finally {
            setLoading(false);
        }
    };

	return (	
            <View style={{ flex:1, backgroundColor: "black"}}>	
                <ScrollView >
                    <View style={{paddingBottom: 120}}>
                        <Text style={text.NutFoodTitleText}> 
                            Enter the following details:
                        </Text>			
                        <Text style = {nut.NutFoodTitleText}>
                            Total Steps Taken:
                        </Text>
                        <TextInput
                            style={nut.input}
                            underlineColorAndroid="transparent"
                            placeholder=" Enter Your Steps"
                            placeholderTextColor="#ffff"
                            autoCapitalize="none"
                            onChangeText={handleSteps}
                        />	
                        {error ? <Text style={{color: 'red', textAlign: 'center', marginVertical: 10}}>{error}</Text> : null}
                        <TouchableOpacity 
                            onPress={handleSubmit}
                            disabled={loading}>
                            <Image
                                source={require("./../../img/submit.png")}
                                style={[logstyle.submitButton, loading && {opacity: 0.5}]}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>	
            </View>		
	);
}
export {PostSteps};
