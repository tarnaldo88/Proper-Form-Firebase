import React, {useEffect, useState} from "react";
import {View, Image, Text, SafeAreaView} from "react-native";
import {views, button, image, logstyle, exerciseStyle} from "./Styles";
import {TouchableOpacity} from "react-native-gesture-handler";
import {DisplayExercise} from "./../Display/DisplayExercise";
import {useFocusEffect} from "@react-navigation/native";
import {Storage} from "./../AsyncStorage/Storage";

function ExerciseDisplay({route, navigation}) {
	const exSelected = route.params.areaSelected;

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
		<SafeAreaView>
			<View style={views.Home}>
				<DisplayExercise val={exSelected} />
			</View>
		</SafeAreaView>
	);
}
export {ExerciseDisplay};
