import React, {useState, useEffect} from "react";
import {View, AsyncStorage} from "react-native";
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
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {styleDrawContent} from "./Styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useFocusEffect} from "@react-navigation/native";
import {Storage} from "./../AsyncStorage/Storage";

//style={styles.row} can also be used for the View style holding the double paragraph caption section

function DrawerContent({props, navigation}) {
	//values used to determine if dark theme is active or not
	const [isDarkTheme, setIsDarkTheme] = React.useState(false);

	const [name, setName] = useState();
	const [isLog, setIsLog] = useState();
	const [isSign, setIsSign] = useState();
	const [userID, setUserID] = useState();

	useEffect(
		React.useCallback(() => {
		  // Do something when the screen is focused
		  Storage.load(setUserID, setName, setIsLog);
		  Storage.signOut(setIsSign);
		  return () => {
			// Do something when the screen is unfocused
			// Useful for cleanup functions as
		  };
		}, [])
	  );

	const paperTheme = useTheme();

	const toggleTheme = () => {
		//sets dark theme to the opposite of whatever it is currently
		setIsDarkTheme(!isDarkTheme);
	};

	return (
		<View style={{flex: 1}}>
			                {isLog ? (
                    <>
			<DrawerContentScrollView {...props}>
				<View style={styleDrawContent.drawerContent}>
					<View
						style={
							styleDrawContent.userInfoSection
						} /*View section for the user information*/
					>
						<View style={{flexDirection: "row", marginTop: 15}}>
							<Avatar.Image
								source={require("./../../img/user.png")}
								size={50}
							/>
							<View
								style={{
									marginLeft: 15,
									flexDirection: "column"
								}}
							>
								<Title style={styleDrawContent.title}>
								{name}
								</Title>
								<Caption style={styleDrawContent.caption}>
								</Caption>
							</View>
						</View>
						<View>
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
					</View>
					<Drawer.Section
						style={styleDrawContent.bottomDrawerSection}
					>
						<DrawerItem
							icon={({color, size}) => (
								<Icon name="home" color={color} size={size} />
							)}
							label="Home"
							onPress={() => {
								navigation.navigate("mainHome");
							}} //set to home until proper pages are setup
						/>
						<DrawerItem
							icon={({color, size}) => (
								<Icon
									name="account"
									color={color}
									size={size}
								/>
							)}
							label="Account"
							onPress={() => {
								navigation.navigate("AccountHome");
							}} //set to home until proper pages are setup
						/>
						<DrawerItem
							icon={({color, size}) => (
								<Icon
									name="forum-outline"
									color={color}
									size={size}
								/>
							)}
							label="Messages"
							onPress={() => {
								// navigation.navigate( 'Community', { screen: 'chatSelect' });
								navigation.navigate(  'chatSelect' );
							}}
						/>
						<DrawerItem
							icon={({color, size}) => (
								<Icon
									name="format-list-numbered"
									color={color}
									size={size}
								/>
							)}
							label="My Routines"
							onPress={() => {
								navigation.navigate("MyRoutines");
							}}
						/>
						<DrawerItem
							icon={({color, size}) => (
								<Icon
									name="food-variant"
									color={color}
									size={size}
								/>
							)}
							label="My Progress"
							onPress={() => {
								navigation.navigate( 'MyNutrition' )}}
						/>
					</Drawer.Section>		
					
				</View>
			</DrawerContentScrollView>
			{isSign ? (
                    <>
			<Drawer.Section style={styleDrawContent.bottomDrawerSection}>
				<DrawerItem
					icon={({color, size}) => (
						<Icon name="exit-to-app" color={color} size={size} />
					)}
					label="Sign Out"
					onPress={() => {
						navigation.navigate("mainHome"), Storage.logout(setUserID, setName,setIsLog);
					}} //set to nothing until we get the login/logout functions working
				/>
			</Drawer.Section>
				</>
				):(
					<>
					</>
				)}
			</>
                ) : (
                    <>
								<DrawerContentScrollView {...props}>
				<View style={styleDrawContent.drawerContent}>
					<View
						style={
							styleDrawContent.userInfoSection
						} /*View section for the user information*/
					>
						<View style={{flexDirection: "row", marginTop: 15}}>
							<Avatar.Image
								source={require("./../../img/user.png")}
								size={50}
							/>
							<View
								style={{
									marginLeft: 15,
									flexDirection: "column"
								}}
							>
								<Title style={styleDrawContent.title}>
								{name}
								</Title>
								<Caption style={styleDrawContent.caption}>
								</Caption>
							</View>
						</View>
						<View>
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
					</View>
					<Drawer.Section
						style={styleDrawContent.bottomDrawerSection}
					>
						<DrawerItem
							icon={({color, size}) => (
								<Icon name="home" color={color} size={size} />
							)}
							label="Home"
							onPress={() => {
								navigation.navigate("mainHome");
							}} //set to home until proper pages are setup
						/>
						<DrawerItem
							icon={({color, size}) => (
								<Icon
									name="format-list-numbered"
									color={color}
									size={size}
								/>
							)}
							label="My Routines"
							onPress={() => {
								navigation.navigate("MyRoutines");
							}}
						/>
						<DrawerItem
							icon={({color, size}) => (
								<Icon
									name="food-variant"
									color={color}
									size={size}
								/>
							)}
							label="My Nutrition"
							onPress={() => {
								navigation.navigate("MyNutrition");
							}}
						/>
					</Drawer.Section>
				
				</View>
			</DrawerContentScrollView>
					                    </>
                )}
		</View>
	);
}
export {DrawerContent};
