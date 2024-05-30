import React, {useState, useEffect} from "react";
import {View, Image, TouchableOpacity, AsyncStorage} from "react-native";
import {views, image, styleDrawContent} from "./Styles";
import {Avatar, Title, Caption, Paragraph, Text} from "react-native-paper";
import {useFocusEffect} from "@react-navigation/native";
import {Storage} from "./../AsyncStorage/Storage";

/* The DietHomeScreen function sets up the formatting of the Diet Screen page

  Page uses touchableOpacity buttons to get to the different screens.
  The top of the screen is populated with nested views to place User Information

*/
function DietHomeScreen({navigation}) {
	const [name, setName] = useState();
	const [isLog, setIsLog] = useState();
	const [userID, setUserID] = useState();
	
	useFocusEffect(
		React.useCallback(() => {
		  // Do something when the screen is focused
		  Storage.load(setUserID, setName, setIsLog);
		  Storage.setSignOut();
		  return () => {
			// Do something when the screen is unfocused
			// Useful for cleanup functions as
		  };
		}, [])
	  );

	return (
		<View
			style={
				styleDrawContent.userInfoSection
			} /*View section for the user information*/
		>
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
			<View style={views.Home}>
				<TouchableOpacity
					onPress={() => navigation.navigate("createDiet")}
				>
					<Image
						source={require("./../../img/food.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate("MyNutrition")}
				>
					<Image
						source={require("./../../img/myProgress.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate("nutJournal")}
				>
					<Image
						source={require("./../../img/nut_journal_larged.png")} //testing size difference for pixelation
						style={image.Touchable}
						dd
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}
export {DietHomeScreen};
