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
	Button
} from "react-native";
import {logstyle} from "./Styles";
import RNPasswordStrengthMeter from "react-native-password-strength-meter";
import {Base64} from "js-base64";
import {Storage} from "./../AsyncStorage/Storage";

function RegisterScreen({navigation}) {
	const [email, setEmail] = useState();
	const [username, setUsername] = useState();
	const [pw, setPw] = useState();
	const [repw, setRePw] = useState();
	const [pwScore, setPwScore] = useState();
	const [rem, setRem] = useState();
	const [last, setLast] = useState();
	const [first, setFirst] = useState();
	const txtEm = "Email provided does not match";
	const [isLoading, setLoading] = useState(false);

	onChange = (password, score, {label, labelColor, activeBarColor}) => {
		// console.log(password, score, {label, labelColor, activeBarColor});
		setPw(password);
		setPwScore(score);
	};
	onChangeSecond = (password, score, {label, labelColor, activeBarColor}) => {
		// console.log(password, score, {label, labelColor, activeBarColor});
		setRePw(password);
	};
	const handleUsername = text => {
		setUsername(text);
	};
	const handleFirst = text => {
		setFirst(text);
	};
	const handleLast = text => {
		setLast(text);
	};
	const handleEmail = text => {
		setEmail(text);
	};
	const handleRemail = text => {
		setRem(text);
	};

	const ComparePassword = () => {
		if (pw.localeCompare(repw) == 0 && pwScore >= 24) {
			//strings are equal let user continue & score is high enough
			return true;
		} else {
			//strings are not equal and/or score not appropriate
			alert("Password not strong enough");
			return false;
		}
	};
	const EmailValidation = () => {
		if (email !== "undefined" && rem !== "undefined") {
			var pattern = new RegExp(
				/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
			);

			if (pattern.test(email) && email.localeCompare(rem) == 0) {
				//email is valid
				return true;
			} else {
				alert(txtEm);
				return false;
			}
		}
	};

	/*
	//function used to decrypt
	  decryptPassword = () => {
		var decode = Base64.decode(state.showData);
		setState({ showData: decode });
  	  }
	*/

	/*Axios calls to the APi*/

	const VerifyExists = async () => {
		var arr = [];
		//setLoading(true);
		await axios
			.get(
				"http://52.53.203.248/ProperApi/api/signup/" +
					email +
					"/" +
					username,
				{}
			)
			.then(response => {
				arr.push(response.data.emailExists);
				arr.push(response.data.usernameExists);
			});
		return arr;
	};

	const validNav = async () => {
		if (ComparePassword() && EmailValidation()) {
			let check = await VerifyExists();
			if (check[0] == true) {
				if (check[1] == true) {
					// PostSignup();
					var encode = Base64.encode(pw);
					let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
					Storage.setRegisterData(username, encode, email, false, first, last, token);
		
					return navigation.navigate("userDetails");
				} else {
					//print Username already exists error
					alert("Username already exists error");
				}
			} else {
				//print account under email already exists
				alert("account under email already exists");
			}
		}
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
					<RNPasswordStrengthMeter
						onChangeText={onChange}
						meterType="box"
					/>
					<Text>Please Re-Enter your Password</Text>
					<RNPasswordStrengthMeter
						onChangeText={onChangeSecond}
						meterType="box"
					/>
					<Loading />
					<TouchableOpacity
						onPress={() => {
							Storage.initRegistrationData();
							setLoading(true);
							validNav();
							//navigation.navigate("mainHomeLogged");
						}}
					>
						<Image
							source={require("./../../img/next.png")}
							style={logstyle.submitButton}
						/>
					</TouchableOpacity>					
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export {RegisterScreen};
