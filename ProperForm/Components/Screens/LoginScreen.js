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
        login(username, password);
        let arr = await VerifyAccount();
        console.log(arr);
        if (arr[1]) {
            // alert("logged in");
            console.log(arr[0]);
            onSubmit(username, arr[2], arr[0]);
            getData(setUsername, setToken);
            return navigation.navigate("mainHome");
        } else {
            alert("Username or password incorrect \nPlease try again");
        }
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
        try {
            await AsyncStorage.setItem(
                "userProfile",
                JSON.stringify({userID: UserID, username: userName, token: userToken})
            );
            console.log(UserID);
            await AsyncStorage.setItem("signedIn", "true");
            let test = await AsyncStorage.getItem("signedIn");
            // console.log('Variable Test: ' + test);
        } catch (err) {
            console.log(err);
        }
    };

    const VerifyAccount = async () => {
        var arr = [];
        await axios
            .get(
                "http://52.53.203.248/ProperApi/api/Login/" +
                    username +
                    "/" +
                    password,
                {}
            )
            .then(response => {
                arr.push(response.data.userID);
                arr.push(response.data.equal);
                arr.push(response.data.token);
            });
        return arr;
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
                    console.log(
                        "http://52.53.203.248/ProperApi/api/Login/" +
                            username +
                            "/" +
                            encryptPassword(),
                    );
                    submitPressed();
                    //navigation.navigate("LoggedHomeScreen");
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
