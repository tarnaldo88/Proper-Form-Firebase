import {StyleSheet} from "react-native";

/* Usable styles in the Button directory
 *styles:
 *buttonBody for the general format of the button
 *buttonText is for the text in the title
 */

const styles = StyleSheet.create({
	buttonBody: {
		backgroundColor: "#7a42f4",
		padding: 10,
		margin: 15,
		height: 40,
		width: 100
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "600"
	}
});

export {styles};
