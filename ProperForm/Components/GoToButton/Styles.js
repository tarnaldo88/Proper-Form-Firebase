import {StyleSheet} from "react-native";
import {Dimensions} from "react-native";
const window = Dimensions.get("window");
const logoRatio = window.width / 325; //325 is actual image width

/* Usable styles in the GoToButton directory
  *image: holds all styles to format images
  *button: holds style to format buttons

*/
const image = StyleSheet.create({
	Primary: {
		padding: 10,
		margin: 20,
		height: window.height * 0.12,
		width: window.width * 0.85
	}
});

const button = StyleSheet.create({
	Primary: {
		backgroundColor: "#7a42f4",
		padding: 10,
		margin: 15,
		height: 40,
		width: 100
	}
});

export {image, button};
