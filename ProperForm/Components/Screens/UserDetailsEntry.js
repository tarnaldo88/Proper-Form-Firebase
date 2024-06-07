import React, {Component, useState} from "react";
import axios from "axios";
import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    Button,
    SafeAreaView,
    ScrollView
} from "react-native";
import {NavigationContainer, DrawerActions} from "@react-navigation/native";
import {logstyle, userDetailsPage, image, button, views} from "./Styles";
import {RadioButton} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import Slider from "@react-native-community/slider";

function UserDetailsEntry({navigation}) {
    const [sex, setSex] = useState();
    const [metric_imperial, setMetric_imperial] = useState();
    const [weight, setWeight] = useState(30);
    const [goalWeight, setGoalWeight] = useState(30);
    const [height, setHeight] = useState(90);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [currentdate, setCurrentDate] = useState();

    /*PostSignup takes the current state information and posts it to the api*/
    const PostSignup = async () => {
        // const registerData = await Storage.getRegisterData();
        // const detailsData = await Storage.getDetailsData();

        // await axios
        //     .post("http://52.53.203.248/ProperApi/api/UserInfo", {
        //         username: registerData.username,
        //         password: registerData.password,
        //         email: registerData.email,
        //         verified: Boolean(registerData.verified),
        //         firstName: registerData.firstname,
        //         lastName: registerData.lastname,
        //         gender: detailsData.sex,
        //         weight: Number(detailsData.weight),
        //         goalWeight: Number(detailsData.goalWeight),
        //         height: Number(detailsData.height),
        //         birthday: detailsData.birthday,
        //         token: registerData.token
        //     })

        //     .then(
        //         response => {
        //             console.log(response);
        //         },
        //         error => {
        //             console.log(error);
        //         }
        //     );
    };

    roundToNearest = (num, rounding) => {
        // If rounding is 10, number rounds to nearest 10
        let number = num;
        number /= rounding;
        number = Math.round(number);
        number *= rounding;
        return number;
    };

    cmToFt = num => {
        const ft = (num * 0.393700787) / 12;
        const roundFt = Math.floor(ft);
        const inches = Math.round((ft - roundFt) * 12);
        return inches == 12
            ? `${roundFt + 1}ft 0in`
            : `${roundFt}ft ${inches}in`;
    };

    onChangeState = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(Platform.OS === "ios");
        setDate(currentDate);
    };

    showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    showDatepicker = () => {
        showMode("date");
    };

    setChecked = text => {
        setSex(text);
    };

    const submitPressed = async () => {
        // Storage.initDetailsData();
        // Storage.setDetailsData(
        //     height,
        //     weight,
        //     goalWeight,
        //     sex,
        //     String(date).slice(4, 15)
        // );
        // let userID = await PostSignup();
        // console.log(userID);
        // const detailsData = await Storage.getDetailsData();
        // console.log("Details Height: " + detailsData.height);
        // console.log("Details Weight: " + detailsData.weight);
        // console.log("Details Sex: " + detailsData.sex);
        // console.log("Details Birthday: " + detailsData.birthday);
       // Storage.clearRegisterDetails();
    };

    return (
        <SafeAreaView style={views.Home}>
            <ScrollView>
                <View style={logstyle.container}>
                    <View style={styles.sexBtn}>
                        <Text>Please select your Gender:</Text>
                        <View style={styles.space} />
                        <Button
                            title="Male"
                            style={styles.sexBtn}
                            onPress={() => {
                                setChecked("Male");
                            }}
                        />
                        <View style={styles.space} />
                        <Button
                            title="Female"
                            style={styles.sexBtn}
                            onPress={() => {
                                setChecked("Female");
                            }}
                        />
                        <View style={styles.space} />
                        <Button
                            title="Other"
                            style={styles.sexBtn}
                            onPress={() => {
                                setChecked("Other");
                            }}
                        />
                        <View style={styles.space} />
                        <Text style={{fontWeight: "500"}}>
                            You've Selected: {sex}{" "}
                        </Text>
                    </View>

                    <Text style={styles.text}>
                        Height: {height}cm | {cmToFt(height)}
                    </Text>

                    <Slider
                        style={styles.slider}
                        minimumValue={90}
                        maximumValue={275}
                        step={1}
                        onValueChange={value => setHeight(value)}
                    />

                    <Text style={styles.text}>
                        {" "}
                        Weight: {weight}kg |{" "}
                        {roundToNearest(weight * 2.20462, 1)}lbs
                    </Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={30}
                        maximumValue={363}
                        step={1}
                        onValueChange={value => setWeight(value)}
                    />

                    <Text style={styles.text}>
                        {" "}
                        GoalWeight: {goalWeight}kg |{" "}
                        {roundToNearest(goalWeight * 2.20462, 1)}lbs
                    </Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={30}
                        maximumValue={363}
                        step={1}
                        onValueChange={value => setGoalWeight(value)}
                    />

                    <Text style={userDetailsPage.text}>Birthday</Text>
                    <View>
                        <Button
                            onPress={() => {
                                setShow(true);
                                setMode(date);
                            }}
                            title="Show date picker"
                        />
                    </View>
                    {show && (
                        <DateTimePicker
                            style={{width: 200}}
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minimumDate={new Date(1920, 0, 1)}
                            maximumDate={new Date()}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: "absolute",
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onChange={(event, selectedDate) => {
                                currentDate = selectedDate || date;
                                setShow(Platform.OS === "ios");
                                setDate(currentDate);
                                // console.log(String(currentDate).slice(4, 15));
                            }}
                        />
                    )}
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
export {UserDetailsEntry};

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
