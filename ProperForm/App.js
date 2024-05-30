import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from "react";
import {NavigationContainer, DrawerActions} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import MainTabScreen from "./Components/Screens/MainTabScreen";
import {DrawerContent} from "./Components/Screens/DrawerContent";

function AppDrawer() {
	return (
		<Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
			<Drawer.Screen name="DrawHome" component={MainTabScreen} />
		</Drawer.Navigator>
	);
}

export default function App() {
  return (
    <NavigationContainer>
			<AppDrawer />
		</NavigationContainer>
  );
}