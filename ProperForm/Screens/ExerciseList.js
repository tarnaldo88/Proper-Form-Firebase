import React, {useState} from "react";
import {View, Image, SafeAreaView, FlatList} from "react-native";
import {views, text, button, image, styleDrawContent} from "./Styles";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {Text} from "react-native-paper";
import {useFocusEffect} from "@react-navigation/native";
import {Storage} from "./../AsyncStorage/Storage";

function ExerciseList({route, navigation}) {
	const areaSelected = route.params.areaSelected;
	const exOrStr = route.params.StrOrEx;

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

	const ArmsExercise = () => {
		return (
			<View style={views.backgroundContainerText}>
				<Text style={text.title}>Arms Exercises</Text>
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
			</View>
		);
	};
	const AbsExercise = () => {
		return (
			<View>
				<Text style={text.title}>Abs Exercises</Text>
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
			</View>
		);
	};
	const LegsExercise = () => {
		return (
			<View style={views.backgroundContainerText}>
				<Text style={text.title}>Legs Exercises</Text>
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
			</View>
		);
	};
	const ShouldersExercise = () => {
		return (
			<View style={views.backgroundContainerText}>
				<Text style={text.title}>Shoulder Exercises</Text>
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
			</View>
		);
	};
	const BackExercise = () => {
		return (
			<View>
				<Text style={text.title}>Back Exercises</Text>
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
			</View>
		);
	};
	const ChestExercise = () => {
		return (
			<View>
				<Text style={text.title}>Chest Exercises</Text>
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
			</View>
		);
	};

	//================================
	//========STRETCHES===============
	//================================

	const ArmsStretch = () => {
		return (
			<View style={views.backgroundContainerText}>
				<Text style={text.title}>Arms Stretches</Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 36}
						);
					}}
				>
					<Image
						source={require("./../../img/dynamicarmswing.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 37}
						);
					}}
				>
					<Image
						source={require("./../../img/armshoulderswing.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 38}
						);
					}}
				>
					<Image
						source={require("./../../img/armprayer.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>	
			</View>
		);
	};
	const AbsStretch = () => {
		return (
			<View style={views.backgroundContainerText}>
				<Text style={text.title}>Abs Stretches</Text>
			<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 39}
						);
					}}
				>
					<Image
						source={require("./../../img/cobra.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 40}
						);
					}}
				>
					<Image
						source={require("./../../img/standingob.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 41}
						);
					}}
				>
					<Image
						source={require("./../../img/croc.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				</View>
		);
	};
	const LegsStretch = () => {
		return (
			<View style={views.backgroundContainerText}>
				<Text style={text.title}>Legs Stretches</Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 42}
						);
					}}
				>
					<Image
						source={require("./../../img/toetouch.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 43}
						);
					}}
				>
					<Image
						source={require("./../../img/standingfootgrab.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 44}
						);
					}}
				>
					<Image
						source={require("./../../img/wallham.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				</View>
		);
	};
	const ShouldersStretch = () => {
		return (
			<View style={views.backgroundContainerText}>
				<Text style={text.title}>Shoulder Stretches</Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 45}
						);
					}}
				>
					<Image
						source={require("./../../img/shoulderrolls.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 46}
						);
					}}
				>
					<Image
						source={require("./../../img/crossbody.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 47}
						);
					}}
				>
					<Image
						source={require("./../../img/cowfacepose.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	const BackStretch = () => {
		return (
			<View style={views.backgroundContainerText}>
				<Text style={text.title}>Back Stretches</Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 48}
						);
					}}
				>
					<Image
						source={require("./../../img/lowerbackstretch.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 49}
						);
					}}
				>
					<Image
						source={require("./../../img/rhomboid.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 50}
						);
					}}
				>
					<Image
						source={require("./../../img/catcow.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				</View>
		);
	};
	const ChestStretch = () => {
		return (
			<View style={views.backgroundContainerText}>
				<Text style={text.title}>Chest Stretches</Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 51}
						);
					}}
				>
					<Image
						source={require("./../../img/corner.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 52}
						);
					}}
				>
					<Image
						source={require("./../../img/abovethehead.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(
							"ExerciseDisplay",
							//number chosen needs to be id of the workout in the database
							{areaSelected: 53}
						);
					}}
				>
					<Image
						source={require("./../../img/doorchest.png")}
						style={image.Touchable}
					/>
				</TouchableOpacity>
				</View>
		);
	};
	const ExList = () => {
		//function that deals with which set of workouts to display
		//0= arms, 1 = abs, 2 = legs, 3 = shoulders, 4 = back, 5 = chest
		//SWITCH statement would work wonders here but sadly doesnt work for react native, in the way we would like here
		//SO using a series of if statements instead
		if (exOrStr) {
			//show the list of buttons of stretches
			if (areaSelected == 0) {
				return ArmsStretch();
			} else if (areaSelected == 1) {
				return AbsStretch();
			} else if (areaSelected == 2) {
				return LegsStretch();
			} else if (areaSelected == 3) {
				return ShouldersStretch();
			} else if (areaSelected == 4) {
				return BackStretch();
			} else if (areaSelected == 5) {
				return ChestStretch();
			}
		} else {
			//show list of buttons for exercises
			if (areaSelected == 0) {
				return ArmsExercise();
			} else if (areaSelected == 1) {
				return AbsExercise();
			} else if (areaSelected == 2) {
				return LegsExercise();
			} else if (areaSelected == 3) {
				return ShouldersExercise();
			} else if (areaSelected == 4) {
				return BackExercise();
			} else if (areaSelected == 5) {
				return ChestExercise();
			}
		}
	};

	return (
		<SafeAreaView>
			<ScrollView>
				<ExList style={views.HomeA} />
			</ScrollView>
		</SafeAreaView>
	);
}
export {ExerciseList};
