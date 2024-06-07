import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";
import {
	View,
	Image,
	Text,
	TouchableOpacity,
	TextInput,
	SafeAreaView,
	ScrollView,
	FlatList,
	Button
} from "react-native";
import {logstyle, views, text, button, image, nut} from "./Styles";
import {useFocusEffect} from "@react-navigation/native";
import SearchableDropdown from 'react-native-searchable-dropdown';

//function to setup the create nutrition plan screen
function postSteps({navigation, route}) {
	//stores all the entries made by the User	
	const [steps, setSteps] = useState(10);
	const [loading, setLoad] = useState(false);
    const [name, setName] = useState("");
	const [isLog, setIsLog] = useState();
	const [userID, setUserID] = useState(1);
    const[fake,setFake] = useState(1);    
	const [date, setDate] = useState("");

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
        text = text.replace(/[^0-9]/g, '');
        text = parseInt(text);
		setSteps(text);	
        setDate(makeDate());	
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
		// console.log("time = " + year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec)
		return ( year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec);
	};

	//axios call to post or put new food entry	
	const PostStepEntry = async () => {	
		var arr;
        await setUserID(1);
        console.log(fake + "||" + steps + "||" + date);
		await axios
			.post("http://52.53.203.248/ProperApi/api/Steps", {
				UserId: 25,
				Steps: steps,
				Date: date,
			})
			.then(
				response => {
                    console.log(response);
				},
				error => {
					console.log(error);
				}
			);
			return arr;
	};

    const validNav = async () => {			
		if(steps === 0){
			alert("Must Enter Steps Taken");
		} else {
			PostStepEntry();
			return (navigation.navigate("Community"));	
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
                            keyboardType='numeric'
                            placeholder=" Enter Your Steps"
                            placeholderTextColor="#ffff"
                            autoCapitalize="none"
                            onChangeText={handleSteps}
                        />	
                        <TouchableOpacity onPress={() => { 							
                                validNav();
                            }}>
                            <Image
                                source={require("./../../img/submit.png")}
                                style={logstyle.submitButton}
                            />
                        </TouchableOpacity>	
                    </View>
                </ScrollView>	
            </View>		
	);
}
export {postSteps};
