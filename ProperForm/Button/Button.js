import React from "react";
import {Text, StyleSheet, TouchableOpacity} from "react-native";
import {styles} from "./Styles";

/* Button is a custom component button that allows you to use the text that is between
 * the button wrappers as the title of your button
 * Format <Button>"ExampleTitle" /Button>
 */
const Button = props => {
	return (
		<TouchableOpacity onPress={props.onPress} style={styles.buttonBody}>
			<Text style={styles.buttonText}>{props.children}</Text>
		</TouchableOpacity>
	);
};
export {Button};
