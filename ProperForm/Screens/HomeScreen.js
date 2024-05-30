import React, {useState} from "react";
import {
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    AsyncStorage,
    Text,
    TextInput
} from "react-native";
import {MyNutrition} from "./MyNutrition";
import {views, image, logstyle} from "./Styles";
import {useFocusEffect} from "@react-navigation/native";
import {Storage} from "./../AsyncStorage/Storage";

/* The HomeScreen function sets up the formatting of the HomeScreen page

  *TouchableOpacity component
  *TouchableOpacity is a wrapper for making views respond properly to touches.
  *On press down, the opacity of the wrapped view is decreased, dimming it.
  *We used it over images to make them function as a button
*/

function HomeScreen({navigation}) {
    const [name, setName] = useState();
    const [isLog, setIsLog] = useState();
	const [isSign, setIsSign] = useState(false);
    const [userID, setUserID] = useState();

    // const signOut = async (setSign) => {
    //     try {
    //         const signed = await AsyncStorage.setItem("signed", "false");

    //         // console.log("Signed: " + signed);
    //         if (signed === "true") {
    //             setSign(true);
    //         } else {
    //             await AsyncStorage.setItem("signed", "false");
    //             setSign(false);
    //         }
    //     } catch (err) {
    //         alert(err);
    //     }
    // }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function(user)
        {
            if(user)
            {
               setIsLog(true);
            } else {
                navigation.navigate("Login");
            }
        })
    }

    // useFocusEffect(
    //     React.useCallback(() => {
    //         // Do something when the screen is focused
    //         Storage.load(setUserID, setName, setIsLog);
    //         signOut(setIsSign);
    //         return () => {
    //             // Do something when the screen is unfocused
    //             // Useful for cleanup functions as
    //         };
    //     }, [])
    // );

    return (
        <SafeAreaView style={views.Home}>
            <ScrollView>
                {isLog ? (
                    <>
                        <View style={views.HomeLogged}>
                            <Image
                                source={require("./../../img/loggedLogo.png")}
                                style={image.LogoHome}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("AccountHome");
                                }}
                            >
                                <Image
                                    source={require("./../../img/account.png")}
                                    style={logstyle.loggedInButtons}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("MyRoutines");
                                }}
                            >
                                <Image
                                    source={require("./../../img/myRoutinesHome.png")}
                                    style={logstyle.loggedInButtons}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("MyNutrition");
                                }}
                            >
                                <Image
                                    source={require("./../../img/progress.png")}
                                    style={logstyle.loggedInButtons}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("mainHome"), Storage.logout(setUserID, setName,setIsLog);
                                }}
                            >
                                <Image
                                    source={require("./../../img/logout.png")}
                                    style={logstyle.loggedInButtons}
                                />
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <>
                        <View style={views.Home}>
                            <ImageBackground
                                source={require("./../../img/logo_large.jpg")}
                                style={image.LogoHome}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Login");
                                }}
                            >
                                <Image
                                    source={require("./../../img/login.png")}
                                    style={logstyle.submitButton}
                                />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
export {HomeScreen};
