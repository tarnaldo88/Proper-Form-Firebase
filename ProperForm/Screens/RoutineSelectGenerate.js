import React, {useState} from "react";
import {View, Image, SafeAreaView, ScrollView} from "react-native";
import {views, button, image} from "./Styles";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Paragraph} from "react-native-paper";
import {useFocusEffect} from "@react-navigation/native";
import {Storage} from "./../AsyncStorage/Storage";
	
function RoutineSelectGenerate({navigation}){

	const [chest, setChest] = useState(true);
	const [back, setBack] = useState(true);
	const [shoulders, setShoulders] = useState(true);
	const [abs, setAbs] = useState(true);
	const [legs, setLegs] = useState(true);
	const [arms, setArms] = useState(true);

	const clearSelection = () => {
			setChest(true);
			setBack(true);
			setShoulders(true);
			setAbs(true);
			setLegs(true);
			setArms(true);
	}
	
	const listPassed = () => {
		let arr = [];
		if (!arms) {
			arr.push("arms");
		}
		if (!abs) {
			arr.push("abs");
		}
		if (!legs) {
			arr.push("legs");
		}
		if (!shoulders) {
			arr.push("shoulders");
		}
		if (!back) {
			arr.push("back");
		}
		if (!chest) {
			arr.push("chest");
		}

		return arr;
	}
	const toggleArms = () => {
		setArms(!arms);
	}
	const toggleChest = () => {
		setChest(!chest);
	}
	const toggleShoulders = () => {
		setShoulders(!shoulders);
	}
	const toggleLegs = () => {
		setLegs(!legs);
	}
	const toggleAbs = () => {
		setAbs(!abs);
	}
	const toggleBack = () => {
		setBack(!back);
	}

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
	
		const ShowChest = () => {
			return chest ? (
				<Image
					source={require("./../../img/iconChest.png")}
					style={button.routineSelectIcon}
				/>
			) : (
				<Image
					source={require("./../../img/iconChest.png")}
					style={button.bodyHiddenButton}
				/>
			);
		};
		const ShowBack = () => {
			return back ? (
				<Image
					source={require("./../../img/iconBack.png")}
					style={button.routineSelectIcon}
				/>
			) : (
				<Image
					source={require("./../../img/iconBack.png")}
					style={button.bodyHiddenButton}
				/>
			);
		};
		const ShowAbs = () => {
			return abs ? (
				<Image
					source={require("./../../img/iconsAbs.png")}
					style={button.routineSelectIcon}
				/>
			) : (
				<Image
					source={require("./../../img/iconsAbs.png")}
					style={button.bodyHiddenButton}
				/>
			);
		};
		const ShowLegs = () => {
			return legs ? (
				<Image
					source={require("./../../img/iconLeg.png")}
					style={button.routineSelectIcon}
				/>
			) : (
				<Image
					source={require("./../../img/iconLeg.png")}
					style={button.bodyHiddenButton}
				/>
			);
		};
		const ShowArms = () => {
			return arms ? (
				<Image
					source={require("./../../img/iconArms.png")}
					style={button.routineSelectIcon}
				/>
			) : (
				<Image
					source={require("./../../img/iconArms.png")}
					style={button.bodyHiddenButton}
				/>
			);
		};
		const ShowShoulders = () => {
			return shoulders ? (
				<Image
					source={require("./../../img/iconShoulders.png")}
					style={button.routineSelectIcon}
				/>
			) : (
				<Image
					source={require("./../../img/iconShoulders.png")}
					style={button.bodyHiddenButton}
				/>
			);
		};
		const ShowAbSelect = () => {
			return abs ? (
				<Image
					source={require("./../../img/iconsAbs.png")}
					style={button.bodyHiddenButton}
				/>
			) : (
				<Image
					source={require("./../../img/iconsAbs.png")}
					style={button.routineSelectIcon}
				/>
			);
		};
		const ShowChestSelect = () => {
			return chest ? (
				<Image
					source={require("./../../img/iconChest.png")}
					style={button.bodyHiddenButton}
				/>
			) : (
				<Image
					source={require("./../../img/iconChest.png")}
					style={button.routineSelectIcon}
				/>
			);
		};
		const ShowBackSelect = () => {
			return back ? (
				<Image
					source={require("./../../img/iconBack.png")}
					style={button.bodyHiddenButton}
				/>
			) : (
				<Image
					source={require("./../../img/iconBack.png")}
					style={button.routineSelectIcon}
				/>
			);
		};
		const ShowLegSelect = () => {
			return legs ? (
				<Image
					source={require("./../../img/iconLeg.png")}
					style={button.bodyHiddenButton}
				/>
			) : (
				<Image
					source={require("./../../img/iconLeg.png")}
					style={button.routineSelectIcon}
				/>
			);
		};
		const ShowArmSelect = () => {
			return arms ? (
				<Image
					source={require("./../../img/iconArms.png")}
					style={button.bodyHiddenButton}
				/>
			) : (
				<Image
					source={require("./../../img/iconArms.png")}
					style={button.routineSelectIcon}
				/>
			);
		};
		const ShowShoulderSelect = () => {
			return shoulders ? (
				<Image
					source={require("./../../img/iconShoulders.png")}
					style={button.bodyHiddenButton}
				/>
			) : (
				<Image
					source={require("./../../img/iconShoulders.png")}
					style={button.routineSelectIcon}
				/>
			);
		};

		return (
			<SafeAreaView>
				<ScrollView>
					<View>
						<Paragraph
							style={{
								fontWeight: "bold",
								justifyContent: "center",
								margin: 5,
								marginLeft: 20
							}}
						>
							Select the Areas to Focus
						</Paragraph>

						<View style={image.bodyIconView}>
							<TouchableOpacity
								onPress={() => {
									toggleChest();
								}}
							>
								<ShowChest />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									toggleArms();
								}}
							>
								<ShowArms />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									toggleAbs();
								}}
							>
								<ShowAbs />
							</TouchableOpacity>
						</View>

						<View style={image.bodyIconView}>
							<TouchableOpacity
								onPress={() => {
									toggleLegs();
								}}
							>
								<ShowLegs />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									toggleShoulders();
								}}
							>
								<ShowShoulders />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									toggleBack();
								}}
							>
								<ShowBack />
							</TouchableOpacity>
						</View>

						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center"
							}}
						>
							<View>
								<TouchableOpacity
									onPress={() => {
										navigation.navigate(
											"RoutineDisplayGenerated",
											{selected: listPassed()}
										);
									}}
								>
									<Image
										source={require("./../../img/generate.png")}
										style={button.generate}
									/>
								</TouchableOpacity>
							</View>
							<View>
								<TouchableOpacity
									onPress={() => clearSelection()}
								>
									<Image
										source={require("./../../img/clear.png")}
										style={button.clear}
									/>
								</TouchableOpacity>
							</View>
						</View>

						<View>
							<Paragraph
								style={{fontWeight: "bold", marginLeft: 20}}
							>
								Areas Selected:
							</Paragraph>
						</View>

						<View style={image.bodyIconView}>
							<TouchableOpacity
								onPress={() => {
									toggleChest();
								}}
							>
								<ShowChestSelect />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									toggleArms();
								}}
							>
								<ShowArmSelect />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									toggleAbs();
								}}
							>
								<ShowAbSelect />
							</TouchableOpacity>
						</View>
						<View style={image.bodyIconView}>
							<TouchableOpacity
								onPress={() => {
									toggleLegs();
								}}
							>
								<ShowLegSelect />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									toggleShoulders();
								}}
							>
								<ShowShoulderSelect />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									toggleBack();
								}}
							>
								<ShowBackSelect />
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}

export {RoutineSelectGenerate};
