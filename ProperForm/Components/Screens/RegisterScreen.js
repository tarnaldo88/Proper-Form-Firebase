import React, {useState} from "react";
import axios from "axios";
import {
	View,
	Image,
	Text,
	TouchableOpacity,
	TextInput,
	SafeAreaView,
	ScrollView,
	Button,
	Alert
} from "react-native";
import {logstyle} from "./Styles";
import { 
	getAuth, 
	createUserWithEmailAndPassword, 
	signInWithEmailAndPassword, 
	onAuthStateChanged, 
	signOut 
} from 'firebase/auth';
import app from "../firebase";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


function RegisterScreen({navigation}) {
	const [email, setEmail] = useState();
	const [pw, setPw] = useState();

	//second password entry for checking
	const [repw, setRePw] = useState();
	//second email entry for checking
	const [rem, setRem] = useState();
	const [curWeight, setWeight] = useState(0);
	const [goalWeight, setGoal] = useState(0);

	const [isLoading, setLoading] = useState(false);
	const [logged,setLogged] = useState(false);

	
	const handlePassword = text => {
		setPw(text);
	};
	const handleRePw = text => {
		setRePw(text);
	};
	const handleEmail = text => {
		setEmail(text);
	};
	const handleRemail = text => {
		setRem(text);
	};

	const handleWeight = text => {
		setWeight(text);
	};

	const handleGoal = text => {
		setGoal(text);
	};

	async function handleSignup(){
        if (ComparePassword() && CompareEmail()){
            if (!email || !pw) {
                Alert.alert("Missing info", "Please enter email and password.");
                return;
            }
            if (pw.length < 6) {
                Alert.alert("Weak password", "Password must be at least 6 characters.");
                return;
            }
            setLoading(true);
            try{
                const auth= getAuth(app);
                await createUserWithEmailAndPassword(auth, email, pw);
                const response = await signInWithEmailAndPassword(auth, email, pw);
                const token = await response.user.getIdToken();
                await ReactNativeAsyncStorage.setItem('token', token);
                await ReactNativeAsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
                setLoading(false);
                setLogged(true);
                Alert.alert("success", response.user.uid);
                navigation.navigate("mainHome");
                return;
            } catch(error){
                setLoading(false);
                const message = error?.message || 'Unknown error';
                const code = error?.code ? `\n(${error.code})` : '';
                Alert.alert("Register error", `${message}${code}`);
            }
        }
    };

	const ComparePassword = () => {
        const a = (pw || '').toString();
        const b = (repw || '').toString();
        if (!a || !b) {
            Alert.alert("Missing password", "Please enter and confirm your password.");
            return false;
        }
        if (a !== b) {
            Alert.alert("Password does not match");
            return false;
        }
        return true;
    };

	const CompareEmail = () => {
        const a = (email || '').toString().trim().toLowerCase();
        const b = (rem || '').toString().trim().toLowerCase();
        if (!a || !b) {
            Alert.alert("Missing email", "Please enter and confirm your email.");
            return false;
        }
        if (a !== b) {
            Alert.alert("Email does not match");
            return false;
        }
        return true;
    };
	// const EmailValidation = () => {
	// 	if (email !== "undefined" && rem !== "undefined") {
	// 		var pattern = new RegExp(
	// 			/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
	// 		);

	// 		if (pattern.test(email) && email.localeCompare(rem) == 0) {
	// 			//email is valid
	// 			return true;
	// 		} else {
	// 			alert(txtEm);
	// 			return false;
	// 		}
	// 	}
	// };

	/*
	//function used to decrypt
	  decryptPassword = () => {
		var decode = Base64.decode(state.showData);
		setState({ showData: decode });
  	  }
	*/

	/*Axios calls to the APi*/

	const VerifyExists = async () => {
		
	};

	
	const Loading = () => {
		if (isLoading) {
			return (
				<View style={logstyle}>
					<Text style={{fontWeight: "bold"}}>
						Registering User...
					</Text>
				</View>
			);
		} else {
			return <View></View>;
		}
	};

	return (
		<SafeAreaView style={logstyle.container}>
			<ScrollView>
				<View style={logstyle.container}>
					
					<TextInput
						style={logstyle.input}
						underlineColorAndroid="transparent"
						placeholder=" Enter Your Email"
						placeholderTextColor="#9a73ef"
						autoCapitalize="none"
						onChangeText={handleEmail}
					/>
					<TextInput
						style={logstyle.input}
						underlineColorAndroid="transparent"
						placeholder=" Please Re-Enter Your Email"
						placeholderTextColor="#9a73ef"
						autoCapitalize="none"
						onChangeText={handleRemail}
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
					<Text>Please Re-Enter your Password</Text>
					<TextInput
						style={logstyle.input}
						secureTextEntry={true}
						underlineColorAndroid="transparent"
						placeholder=" Password"
						placeholderTextColor="#9a73ef"
						autoCapitalize="none"
						onChangeText={handleRePw}
            		/>
					<TextInput
						style={logstyle.input}
						keyboardType="numeric"
						underlineColorAndroid="transparent"
						placeholder=" Enter Your current weight"
						placeholderTextColor="#9a73ef"
						autoCapitalize="none"
						onChangeText={handleWeight}
            		/>
					<TextInput
						style={logstyle.input}
						keyboardType="numeric"
						underlineColorAndroid="transparent"
						placeholder=" Enter Your goal weight"
						placeholderTextColor="#9a73ef"
						autoCapitalize="none"
						onChangeText={handleGoal}
            		/>
					<Loading />
					<TouchableOpacity
						onPress={() => {							
							handleSignup();
						}}
					>
						<Image
							source={require("./../../img/submit.png")}
							style={logstyle.submitButton}
						/>
					</TouchableOpacity>					
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export {RegisterScreen};


/* 
					<TextInput
						style={logstyle.input}
						underlineColorAndroid="transparent"
						placeholder="Enter Your First Name"
						placeholderTextColor="#9a73ef"
						autoCapitalize="none"
						onChangeText={handleFirst}
					/>
					<TextInput
						style={logstyle.input}
						underlineColorAndroid="transparent"
						placeholder=" Enter Your Last Name"
						placeholderTextColor="#9a73ef"
						autoCapitalize="none"
						onChangeText={handleLast}
					/>
					<TextInput
						style={logstyle.input}
						underlineColorAndroid="transparent"
						placeholder=" Enter your Username"
						placeholderTextColor="#9a73ef"
						autoCapitalize="none"
						onChangeText={handleUsername}
					/>

*/