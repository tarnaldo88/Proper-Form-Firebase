import React, {useState, useEffect, Component} from "react";
import {View, Image, AsyncStorage} from "react-native";
import {NavigationContainer, DrawerActions, useFocusEffect} from "@react-navigation/native";
import {views, text, button, image, styleDrawContent} from "./Styles";
import {TouchableOpacity} from "react-native-gesture-handler";
import {
	useTheme,
	Avatar,
	Title,
	Caption,
	Paragraph,
	Drawer,
	Text,
	TouchableRipple,
	Switch
} from "react-native-paper";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

/* The CommunityHomeScreen function sets up the formatting of the Community Screen page

  *GoToButton component
  *GoToButton is a custom component that allows you to ent
  er the name of the screen
  *you want to navigate to without importing navigate.
  *Format <GoToButton screenName = "ExampleScreenName" />
*/

function WorkoutHomeScreen({navigation}, props) {
	const [name, setName] = useState();
	const [isLog, setIsLog] = useState();
	const [userID, setUserID] = useState();

	/*useEffect(() => {
		props.navigation.addListener(
            'didFocus',
            payload => {
                //call some action here
            }
        );
		load()   
	}, [])*/

	async function getData(){
        const data = await ReactNativeAsyncStorage.getItem('isLoggedIn');
        console.log(data, 'at Workout home');
		setName(ReactNativeAsyncStorage.getItem('email'));
        setIsLog(data);
    }

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

	  useEffect(() => {
        getData();
    }, []);

	return (
		<View style={{marginLeft: 20}}>
			<View
				style={{
					flexDirection: "row",
					marginTop: 15
				}} /* Section with user profile pic and name*/
			>
				<Avatar.Image
					source={require("./../../img/user.png")}
					size={50}
				/>
				<View style={{marginLeft: 15, flexDirection: "column"}}>
				<Title style={styleDrawContent.title}>{name}</Title>
					<Caption style={styleDrawContent.caption}>
					</Caption>
				</View>
			</View>
			<View /* Section with user information*/>
				<View style={styleDrawContent.section}>
					<Paragraph
						style={[
							styleDrawContent.paragraph,
							styleDrawContent.caption
						]}
					>
						Workout Streak: 
					</Paragraph>
					<Caption style={styleDrawContent.caption}>
						8 Days In A Row!
					</Caption>
				</View>
				<View style={styleDrawContent.section}>
					<Paragraph
						style={[
							styleDrawContent.paragraph,
							styleDrawContent.caption
						]}
					>
						Diet Goal:
					</Paragraph>
					<Caption style={styleDrawContent.caption}>
						11 lbs Left To Go
					</Caption>
				</View>
			</View>
			<View
				style={
					views.HomeA
				} /*This is the section that has the buttons to navigate to the different sections within exercise section */
			>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("ExercisesBodyFront", {
							pageSelected: 0
						})
					}
				>
					<Image
						source={require("./../../img/exercisesBtn.png")}
						style={image.TouchableA}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("ExercisesBodyFront", {
							pageSelected: 1
						})
					}
				>
					<Image
						source={require("./../../img/stretches.png")}
						style={image.TouchableA}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate("RoutineHome")}
				>
					<Image
						source={require("./../../img/routines.png")}
						style={image.TouchableA}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export {WorkoutHomeScreen};