import React, {useState, useEffect} from "react";
import {
    View,
    Image,
    TouchableOpacity,
    TextInput,    
    Text
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {logstyle} from "./Styles";

// Import the functions you need from the SDKs you need.
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { firebaseConfig } from "../AsyncStorage/config";

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

function LoginScreen({navigation}) {
    const [testname, setTestname] = useState();
    const [username, setUsername] = useState();
    const [password, setPw] = useState();
    const [token, setToken] = useState();

    const getData = async () => {
        try {
            const userprofile = await AsyncStorage.getItem("userProfile");
            const userProfile = JSON.parse(userprofile);
            // console.log(userProfile.username);
            // console.log(userProfile.token);
            if (userProfile !== null) {
                setUsername(userProfile.username);
                setToken(userProfile.token);
            }
        } catch (e) {
            //error reading value
        }
    };

    const submitPressed = async () => {
        
    };

    useEffect(() => {
        getData();
    }, []);

    const handleUsername = text => {
        setUsername(text);
    };
    const handlePassword = text => {
        setPw(text);
    };
    const login = (username, pass) => {
        // alert("username: " + username + " password: " + pass);
    };

    const onSubmit = async (userName, userToken, UserID) => {
        
    };

    const VerifyAccount = async () => {
       
    };

    return (
        <View style={logstyle.container}>
            <Text style={{height: 30}}>{testname}</Text>

            <TextInput
                style={logstyle.input}
                underlineColorAndroid="transparent"
                placeholder=" Username"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={handleUsername}
            />
            <TextInput
                style={logstyle.input}
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                placeholder=" Password"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={handlePassword}
            />
            <TouchableOpacity
                onPress={() => {
                    
                }}
            >
                <Image
                    source={require("./../../img/submit.png")}
                    style={logstyle.submitButton}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("register")}>
                <Image
                    source={require("./../../img/register.png")}
                    style={logstyle.submitButton}
                />
            </TouchableOpacity>
        </View>
    );
}
export {LoginScreen};
