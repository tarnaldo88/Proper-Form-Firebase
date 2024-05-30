import * as React from "react";
import {AsyncStorage} from "react-native";

    const logout = async (setUserID, setName,setIsLog) => {
        try {
            await AsyncStorage.setItem(
                "userProfile",
                JSON.stringify({userID: 0, username: "Guest", token: ""})
            );
            await AsyncStorage.setItem("signedIn", "false");
            
            const userprofile = await AsyncStorage.getItem("userProfile");
            const userProfile = JSON.parse(userprofile);
            // console.log("Username: " + userProfile.username);
            // console.log("UserToken: " + userProfile.token);
            load(setUserID, setName, setIsLog);
        } catch (err) {
            console.log(err);
        }
    }

    const load = async (setUserID, setName,setIsLog) => {
        try {
            const userprofile = await AsyncStorage.getItem("userProfile");
            const signed = await AsyncStorage.getItem("signedIn");
            const userProfile = JSON.parse(userprofile);

            // console.log("Signed: " + signed);
            if (userProfile !== null) {
                setUserID(userProfile.userID);
                setName(userProfile.username);
            }
            if (signed === "true") {
                setIsLog(true);
            } else {
                await AsyncStorage.setItem(
                    "userProfile",
                    JSON.stringify({userID: 0, username: "Guest", token: ""})
                );
                await AsyncStorage.setItem("signedIn", "false");
                setIsLog(false);
            }
        } catch (err) {
            alert(err);
        }
    }
    
    const signOut = async (setSign) => {
        try {
            const signed = await AsyncStorage.getItem("signed");

            // console.log("Signed: " + signed);
            if (signed === "true") {
                setSign(true);
            } else {
                await AsyncStorage.setItem("signed", "false");
                setSign(false);
            }
        } catch (err) {
            alert(err);
        }
    }

    const setSignOut = async () => {
        try {
            await AsyncStorage.setItem("signed", "true");

        } catch (err) {
            alert(err);
        }
    }

    const initRegistrationData = async () => {
        try{
            await AsyncStorage.setItem(
                "userRegistration",
                JSON.stringify({username: "userName", password: "Password", email: "Email", verified: "Verified", firstname: "firstName", lastname: "lastName", token: "0jhgfjhgjhgjhgd7657657657"})
            );
        } catch (err) {
            alert(err);
        }
    }

    const setRegisterData = async (userName, Password, Email, Verified, firstName, lastName, Token) => {
        try {
                await AsyncStorage.setItem(
                "userRegistration",
                JSON.stringify({username: userName, password: Password, email: Email, verified: Verified, firstname: firstName, lastname: lastName, token: Token})
            );

        } catch (err) {
            alert(err);
        }
    }

    const getRegisterData = async () => {
        try {
            
            const userprofile = await AsyncStorage.getItem("userRegistration");
            const userProfile = JSON.parse(userprofile);
            // console.log("Username: " + userProfile.username);
            // console.log("Password: " + userProfile.password);
            // console.log("Email: " + userProfile.email);
            // console.log("Verified: " + userProfile.verified);
            // console.log("FirstName: " + userProfile.firstname);
            // console.log("Lastname: " + userProfile.lastname);
            // console.log("UserToken: " + userProfile.token);
    
            return userProfile;
        } catch (err) {
            alert(err);
        }
    }

    const initDetailsData = async () => {
        try{
            await AsyncStorage.setItem(
                "userDetails",
                JSON.stringify({height: 0, weight: 0, goalWeight: 0, sex: "Sex", birthday: "Birthday"})
            );
        } catch (err) {
            alert(err);
        }
    }

    const setDetailsData = async (Height, Weight, GoalWeight, Sex, Birthday) => {
        try {
            await AsyncStorage.setItem(
                "userDetails",
                JSON.stringify({height: Height, weight: Weight, goalWeight: GoalWeight, sex: Sex, birthday: Birthday})
            );

        } catch (err) {
            alert(err);
        }
    }

    const getDetailsData = async () => {
        try {
            const userdetails = await AsyncStorage.getItem("userDetails");
            const userDetials = JSON.parse(userdetails);

            // console.log("Height: " + userDetials.height);
            // console.log("Weight: " + userDetials.weight);
            // console.log("Sex: " + userDetials.sex);
            // console.log("Birthday: " + userDetials.birthday);
            return userDetials;

        } catch (err) {
            alert(err);
        }
    }

    const clearRegisterDetails = async () => {
        try {
            await AsyncStorage.setItem(
                "userRegistration",
                JSON.stringify({username: "", password: "", email: "", verified:"", firstName: "", lastName:"", token:""})
            );

            await AsyncStorage.setItem(
                "userDetails",
                JSON.stringify({height: "", weight: "", goalWeight: "", sex: "", birthday: ""})
            );

        } catch (err) {
            alert(err);
        }
    }

export const Storage={
	logout, 
	load,
    signOut, 
    setSignOut,
    setRegisterData,
    getRegisterData,
    setDetailsData,
    getDetailsData,
    initDetailsData,
    initRegistrationData,
    clearRegisterDetails};