import React, {useState, useCallback, useRef} from "react";
import {
	Text,
	View,
	TouchableOpacity,
	Button,
	Image,
	ScrollView
} from "react-native";
import {
	views,
	button,
	image,
	logstyle,
	exerciseStyle
} from "./../Screens/Styles";
//import YoutubePlayer from "react-native-youtube-iframe";

function DisplayExButton({navigation, val}) {
	switch (val) {
		case 1:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 1}
						);
					}}
				>
					<Image
						source={require("./../../img/curl.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 2:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 2}
						);
					}}
				>
					<Image
						source={require("./../../img/hammer_curl.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 3:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 3}
						);
					}}
				>
					<Image
						source={require("./../../img/skull_crusher.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 4:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 4}
						);
					}}
				>
					<Image
						source={require("./../../img/overhead.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 5:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 5}
						);
					}}
				>
					<Image
						source={require("./../../img/dips.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 6:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 6}
						);
					}}
				>
					<Image
						source={require("./../../img/revcurl.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 7:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 7}
						);
					}}
				>
					<Image
						source={require("./../../img/crunch.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 8:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 8}
						);
					}}
				>
					<Image
						source={require("./../../img/plank.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 9:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 9}
						);
					}}
				>
					<Image
						source={require("./../../img/seated_twist.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 10:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 10}
						);
					}}
				>
					<Image
						source={require("./../../img/bic_crunch.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 11:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 11}
						);
					}}
				>
					<Image
						source={require("./../../img/tuckcrunch.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 12:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 12}
						);
					}}
				>
					<Image
						source={require("./../../img/russiantwist.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 13:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 13}
						);
					}}
				>
					<Image
						source={require("./../../img/curtsy_lunge.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 14:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 14}
						);
					}}
				>
					<Image
						source={require("./../../img/lunge.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 15:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 15}
						);
					}}
				>
					<Image
						source={require("./../../img/reverse_lunge.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 16:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 16}
						);
					}}
				>
					<Image
						source={require("./../../img/squats.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 17:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 17}
						);
					}}
				>
					<Image
						source={require("./../../img/sumo_squat.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 18:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 18}
						);
					}}
				>
					<Image
						source={require("./../../img/shouldpress.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 19:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 19}
						);
					}}
				>
					<Image
						source={require("./../../img/reverse_fly.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 20:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 20}
						);
					}}
				>
					<Image
						source={require("./../../img/lateral_press.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 21:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 21}
						);
					}}
				>
					<Image
						source={require("./../../img/arnold_press.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 22:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 22}
						);
					}}
				>
					<Image
						source={require("./../../img/shrugs.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 23:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 23}
						);
					}}
				>
					<Image
						source={require("./../../img/uprightrow.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 24:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 24}
						);
					}}
				>
					<Image
						source={require("./../../img/deadlift.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 25:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 25}
						);
					}}
				>
					<Image
						source={require("./../../img/reverse_row.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 26:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 26}
						);
					}}
				>
					<Image
						source={require("./../../img/reverse_fly.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 27:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 27}
						);
					}}
				>
					<Image
						source={require("./../../img/pullover.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 28:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 28}
						);
					}}
				>
					<Image
						source={require("./../../img/singlearmrow.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 29:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 29}
						);
					}}
				>
					<Image
						source={require("./../../img/renegade.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 30:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 30}
						);
					}}
				>
					<Image
						source={require("./../../img/chest_press.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 31:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 31}
						);
					}}
				>
					<Image
						source={require("./../../img/incline_press.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 32:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 32}
						);
					}}
				>
					<Image
						source={require("./../../img/decline_press.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 33:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 33}
						);
					}}
				>
					<Image
						source={require("./../../img/incline_fly.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 34:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 34}
						);
					}}
				>
					<Image
						source={require("./../../img/fly.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		case 35:
			return (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 35}
						);
					}}
				>
					<Image
						source={require("./../../img/closegrip.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			);
			break;
		default:
			return (
				<View>
					<Text> Loading... </Text>
				</View>
			);
	}
}
export {DisplayExButton};
