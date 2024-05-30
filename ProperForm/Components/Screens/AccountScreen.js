import React, {useState} from "react";
import axios from "axios";
import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from "react-native";
import {logstyle, views, styleDrawContent} from "./Styles";
import {Title, Caption, Paragraph} from "react-native-paper";
import {useFocusEffect} from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import {Storage} from "./../AsyncStorage/Storage";

function AccountScreen({navigation}) {
    const [sex, setSex] = useState();
    const [metric_imperial, setMetric_imperial] = useState();
    const [weight, setWeight] = useState(30);
    const [goalWeight, setGoalWeight] = useState(100);
    const [height, setHeight] = useState(90);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [currentdate, setCurrentDate] = useState();
    const [loading, setLoad] = useState(false);

    const [name, setName] = useState();
    const [isLog, setIsLog] = useState();
    const [userID, setUserID] = useState();

    const [selectedItems, setSelected] = useState([
        {
            id: 0,
            userID: 0,
            userName: "",
            email: "",
            firstName: "",
            lastName: "",
            gender: "",
            weight: 0,
            goalWeight: 0,
            height: 0
        }
    ]);

    const storeProfile = async (results) => {
        var newArr = [];
        var i = 0;
		console.log("length TEST:::::::: "+results.length)
		setGoalWeight(results[0].goalWeight)
        //loop to go through all entries and add them to array
        for (i = 0; i < results.length; i++) {
            //for first element, add each entry manually since array is empty and without structure
			console.log("GOALWEIGHT TEST:::::::: " + results[0].goalWeight);
            if (i == 0) {
                newArr = [
                    {
                        id: i,
                        userID: results[i].userID,
                        userName: results[i].username,
                        email: results[i].email,
                        firstName: results[i].firstName,
                        lastName: results[i].lastName,
                        gender: results.gender,
                        weight: results[i].weight,
                        goalWeight: results[i].goalWeight,
                        height: results[i].height
                    }
                ];
            } else {
                //afterwards, add on to existing array
                newArr = [
                    ...newArr,
                    {
                        id: i,
                        userID: results[i].userID,
                        userName: results[i].username,
                        email: results[i].email,
                        firstName: results[i].firstName,
                        lastName: results[i].lastName,
                        gender: results.gender,
                        weight: results[i].weight,
                        goalWeight: results[i].goalWeight,
                        height: results[i].height
                    }
                ];
            }
        }
        setSelected(newArr);
		// console.log(selectedItems);
    };

	useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            Storage.load(setUserID, setName, setIsLog);
            Storage.setSignOut();

            let results = loadProfile();
            //console.log("exampleState = " + route.params.exampleState[0].fat);

            // if (loading == true) 
			// 	setLoad(false);
            // else
			// 	setLoad(true);
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions as
            };
        }, [])
    );

    /*PostSignup takes the current state information and posts it to the api*/

    const PostSignup = async () => {
        const registerData = await Storage.getRegisterData();
        const detailsData = await Storage.getDetailsData();

        await axios
            .post("http://52.53.203.248/ProperApi/api/UserInfo", {
                username: registerData.username,
                password: registerData.password,
                email: registerData.email,
                verified: Boolean(registerData.verified),
                firstName: registerData.firstname,
                lastName: registerData.lastname,
                gender: detailsData.sex,
                weight: Number(detailsData.weight),
                goalWeight: Number(detailsData.goalWeight),
                height: Number(detailsData.height),
                birthday: detailsData.birthday,
                token: registerData.token
            })

            .then(
                response => {
                    // console.log(response);
                },
                error => {
                    // console.log(error);
                }
            );
    };

    const loadProfile = async () => {
        var arr = [];
        const response = await axios
            .get("http://52.53.203.248/ProperApi/api/UserInfo/25", {})
            .then(response => {
				arr[0] = response.data;
                setLoad(true);
				// setHeight(nameList[i].height);
				// setWeight(nameList[i].weight);
				// setGoalWeight(nameList[i].goalWeight);
            });
			console.log("Test")
        await storeProfile(arr);
		console.log("Test2")
        if (loading == true) setLoad(false);
        else setLoad(true);

        return arr;
    };

    const roundToNearest = (num, rounding) => {
        // If rounding is 10, number rounds to nearest 10
        let number = num;
        number /= rounding;
        number = Math.round(number);
        number *= rounding;
        return number;
    };

    const cmToFt = num => {
        const ft = (num * 0.393700787) / 12;
        const roundFt = Math.floor(ft);
        const inches = Math.round((ft - roundFt) * 12);
        return inches == 12
            ? `${roundFt + 1}ft 0in`
            : `${roundFt}ft ${inches}in`;
    };

    const submitPressed = async () => {
        Storage.initDetailsData();
        Storage.setDetailsData(
            height,
            weight,
            goalWeight,
            sex,
            String(date).slice(4, 15)
        );
        await PostSignup();
        // const detailsData = await Storage.getDetailsData();
        // console.log("Details Height: " + detailsData.height);
        // console.log("Details Weight: " + detailsData.weight);
        // console.log("Details Sex: " + detailsData.sex);
        // console.log("Details Birthday: " + detailsData.birthday);
        Storage.clearRegisterDetails();
    };

    return (
        <SafeAreaView style={views.Home}>
            <ScrollView>
                <View /* Section with user information*/style={{marginTop:55}}>
                    <View style={styleDrawContent.section}>
                        <Paragraph
                            style={[
                                styleDrawContent.paragraph,
                                styleDrawContent.caption
                            ]}
                        >
                            Workout Streak:
                        </Paragraph>
                        <Caption style={styleDrawContent.caption}>
                            8 Days In A Row!
                        </Caption>
                    </View>
                    <View style={styleDrawContent.section}>
                        <Paragraph
                            style={[
                                styleDrawContent.paragraph,
                                styleDrawContent.caption
                            ]}
                        >
                            Diet Goal:
                        </Paragraph>
                        <Caption style={styleDrawContent.caption}>
                            {roundToNearest(selectedItems[0].weight * 2.20462, 1) - selectedItems[0].goalWeight} lbs Left To Go
                        </Caption>
                    </View>
                </View>

                <View style={logstyle.container}>
                    <Text style={styles.text}>
                        Height: {selectedItems[0].height}cm | {cmToFt(selectedItems[0].height)}
                    </Text>
{/* 
                    <Slider
                        style={styles.slider}
                        minimumValue={90}
                        maximumValue={275}
                        step={1}
                        onValueChange={value => setHeight(value)}
                    /> */}

                    <Text style={styles.text}>
                        {" "}
                        Weight: {selectedItems[0].weight}kg |{" "}
                        {roundToNearest(selectedItems[0].weight * 2.20462, 1)}lbs
                    </Text>
                    {/* <Slider
                        style={styles.slider}
                        minimumValue={30}
                        maximumValue={363}
                        step={1}
                        onValueChange={value => setWeight(value)}
                    /> */}

                    <Text style={styles.text}>
                        {" "}
                        GoalWeight: {roundToNearest(goalWeight / 2.20462, 1)}kg |{" "}
                        {goalWeight}lbs
                    </Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={30}
                        maximumValue={363}
						value={selectedItems[0].goalWeight}
                        step={1}
                        onValueChange={value => setGoalWeight(value)}
                    />
					<View style={{marginTop:25}}><Text></Text></View>
                    <TouchableOpacity
                        onPress={() => {
                            submitPressed();
                            navigation.navigate("mainHome");
                        }}
                    >
                        <Image
                            source={require("./../../img/submit.png")}
                            style={logstyle.submitButton}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export {AccountScreen};

const styles = StyleSheet.create({
    container: {
        flex: 1
        // backgroundColor: "#f5fcff"
    },
    input: {
        height: 80,
        textAlign: "center",
        width: "50%",
        fontSize: 50,
        marginTop: 24,
        color: "#10156F"
    },
    slider: {
        width: 300,
        opacity: 1,
        height: 50,
        marginTop: 50
    },
    text: {
        fontSize: 14,
        textAlign: "center",
        fontWeight: "500",
        margin: 10
    },
    sexBtn: {
        padding: 45,
        color: "#f194ff"
    },
    space: {
        width: 20, // or whatever size you need
        height: 20
    }
});
