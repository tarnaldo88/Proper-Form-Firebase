import React from "react";
import {Button, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {button} from "./Styles";
import {TouchableOpacity} from "react-native-gesture-handler";

/* GoToButton is a custom component button that incorporates navigation as a parameter of the button
 * Format <GoToButton screenName = "ExampleScreenName" />
 */

function GoToButton({screenName}) {
	const navigation = useNavigation();
	return (
		<Button
			title={`Go to ${screenName}`}
			onPress={() => navigation.navigate(screenName)}
		/>
	);
}
export {GoToButton};
