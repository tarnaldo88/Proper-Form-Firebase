import * as React from "react";
import {NavigationContainer, DrawerActions} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import MainTabScreen from "./Components/Screens/MainTabScreen";
import {DrawerContent} from "./Components/Screens/DrawerContent";
import { app } from "./Components/firebase";

const Drawer = createDrawerNavigator();

function AppDrawer() {
	return (
		<Drawer.Navigator   
			screenOptions={{
				headerShown:(false)
			}}
		drawerContent={props => <DrawerContent {...props} />}>
			<Drawer.Screen name="Menu" component={MainTabScreen} />
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