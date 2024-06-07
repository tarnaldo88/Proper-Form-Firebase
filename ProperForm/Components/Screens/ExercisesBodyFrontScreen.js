import React, {useState} from "react";
import {View, Image, SafeAreaView, ScrollView} from "react-native";
import {views, button, image} from "./Styles";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Paragraph} from "react-native-paper";
import {useFocusEffect} from "@react-navigation/native";


function ExercisesBodyFrontScreen({route, navigation}) {
	const ExOrStretch = route.params.pageSelected;

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

	const DisplayButtons = () => {
		if (ExOrStretch) {
			//display buttons for stretches
			return (
				<View style={{justifyContent: "center"}}>
					<Paragraph
						style={{
							fontWeight: "bold",
							justifyContent: "center",
							margin: 5,
							marginLeft: 20
						}}
					>
						Stretches: Select the Area to Focus
					</Paragraph>
					<View style={image.bodyIconView}>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("ExerciseList", {
									areaSelected: "0",
									StrOrEx: 1
								})
							}
						>
							<Image
								source={require("./../../img/iconArms.png")}
								style={button.bodyIcon}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("ExerciseList", {
									areaSelected: "1",
									StrOrEx: 1
								})
							}
						>
							<Image
								source={require("./../../img/iconsAbs.png")}
								style={button.bodyIcon}
							/>
						</TouchableOpacity>
					</View>
					<View style={image.bodyIconView}>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("ExerciseList", {
									areaSelected: "2",
									StrOrEx: 1
								})
							}
						>
							<Image
								source={require("./../../img/iconLeg.png")}
								style={button.bodyIcon}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("ExerciseList", {
									areaSelected: "3",
									StrOrEx: 1
								})
							}
						>
							<Image
								source={require("./../../img/iconShoulders.png")}
								style={button.bodyIcon}
							/>
						</TouchableOpacity>
					</View>
					<View style={image.bodyIconView}>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("ExerciseList", {
									areaSelected: "4",
									StrOrEx: 1
								})
							}
						>
							<Image
								source={require("./../../img/iconBack.png")}
								style={button.bodyIcon}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("ExerciseList", {
									areaSelected: "5",
									StrOrEx: 1
								})
							}
						>
							<Image
								source={require("./../../img/iconChest.png")}
								style={button.bodyIcon}
							/>
						</TouchableOpacity>
					</View>
				</View>
			);
		} else {
			//display buttons for exercises
			return (
				<View style={{justifyContent: "center"}}>
					<Paragraph
						style={{
							fontWeight: "bold",
							justifyContent: "center",
							margin: 5,
							marginLeft: 20
						}}
					>
						Exercise: Select the Area to Focus
					</Paragraph>
					<View style={image.bodyIconView}>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("ExerciseList", {
									areaSelected: "0",
									StrOrEx: 0
								})
							}
						>
							<Image
								source={require("./../../img/iconArms.png")}
								style={button.bodyIcon}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("ExerciseList", {
									areaSelected: "1",
									StrOrEx: 0
								})
							}
						>
							<Image
								source={require("./../../img/iconsAbs.png")}
								style={button.bodyIcon}
							/>
						</TouchableOpacity>
					</View>
					<View style={image.bodyIconView}>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("ExerciseList", {
									areaSelected: "2",
									StrOrEx: 0
								})
							}
						>
							<Image
								source={require("./../../img/iconLeg.png")}
								style={button.bodyIcon}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("ExerciseList", {
									areaSelected: "3",
									StrOrEx: 0
								})
							}
						>
							<Image
								source={require("./../../img/iconShoulders.png")}
								style={button.bodyIcon}
							/>
						</TouchableOpacity>
					</View>
					<View style={image.bodyIconView}>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("ExerciseList", {
									areaSelected: "4",
									StrOrEx: 0
								})
							}
						>
							<Image
								source={require("./../../img/iconBack.png")}
								style={button.bodyIcon}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate("ExerciseList", {
									areaSelected: "5",
									StrOrEx: 0
								})
							}
						>
							<Image
								source={require("./../../img/iconChest.png")}
								style={button.bodyIcon}
							/>
						</TouchableOpacity>
					</View>
				</View>
			);
		}
	};
	return (
		<SafeAreaView>
			<ScrollView>
				<DisplayButtons />
			</ScrollView>
		</SafeAreaView>
	);
}
export {ExercisesBodyFrontScreen};
