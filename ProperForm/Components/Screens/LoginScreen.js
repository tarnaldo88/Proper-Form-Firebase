import React, {useState, useEffect} from "react";
import {
    View,
    Image,
    TouchableOpacity,
    TextInput,    
    Text,
    KeyboardAvoidingView,
    Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {logstyle} from "./Styles";
import app from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginScreen({navigation}) {
    const [testname, setTestname] = useState();
    const [username, setUsername] = useState();
    const [password, setPw] = useState();
    const [token, setToken] = useState();
    const [logged,setLogged] = useState(false);
    const [isLoading, setLoading] = useState(false);

    async function handleSignin(){		
        setLoading(true);
        try{
            setLoading(true);
            const auth = getAuth(app);	
            //await signInWithEmailAndPassword(auth, username, password);	
            Alert.alert("trying to log in")		
            const response = await signInWithEmailAndPassword(auth, username, password);
            setLoading(false);
            setLogged(true);
            Alert.alert("success", response.user.uid);
            return;
        } catch(error){
            setLoading(false);
            Alert.alert("Error in registering");
        }
		
	};

    async function Login(){
        try{
            const auth = getAuth(app);
            await create
        } catch(error) {

        }
    }

    useEffect(() => {
        //getData();
    }, []);

    const handleUsername = text => {
        setUsername(text);
    };
    const handlePassword = text => {
        setPw(text);
    };

    return (
        <View style={logstyle.container}>
            <Text style={{height: 30}}>{testname}</Text>
            
            <KeyboardAvoidingView>
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
            </KeyboardAvoidingView>

            <TouchableOpacity
                onPress={() => {
                    handleSignin()
                    if(logged){
                        navigation.navigate("mainHome");
                    }
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
