import React, {Component, useState} from "react";
import {View, Image} from "react-native";
import {views, image, styleDrawContent} from "./Styles";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Avatar, Title, Caption, Paragraph} from "react-native-paper";
import {useFocusEffect} from "@react-navigation/native";

function RoutineHomeScreen({navigation}){
		const [name, setName] = useState();
        const [isLog, setIsLog] = useState();
		const [userID, setUserID] = useState();

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
						onPress={() => navigation.navigate("MyRoutines")}
					>
						<Image
							source={require("./../../img/myRoutines.png")}
							style={image.TouchableA}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("RoutineSelectGenerate")
						}
					>
						<Image
							source={require("./../../img/routineGenerator.png")}
							style={image.TouchableA}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
}
export {RoutineHomeScreen};