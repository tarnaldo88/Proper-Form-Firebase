import React, {useState} from "react";
import {View, Image, Text, SafeAreaView, ScrollView, TextInput} from "react-native";
import {views, button, image, text, logstyle} from "./Styles";
import {TouchableOpacity} from "react-native-gesture-handler";
import {DisplayExButton} from "./../Display/DisplayExButtons";
import {useFocusEffect} from "@react-navigation/native";
import app from "../firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

let singleton = true;
let num = [];

const generateRando = arr => {
    let nums = [];
    let x = 0;
    let rando = 0;
    let arms = 1,
        abs = 7,
        legs = 13,
        shoulders = 18,
        back = 24,
        chest = 30;
    let inc = 6;
    /*
 EXERCISES++++++++++++++++++++
 Arms: 1-6
 Abs: 7-12
 Legs: 13-17
 Shoulders:18-23
 Back:24-29
 Chest:30-35
 +++++++++++++++++++++++++++++++
 */
    if (singleton) {
        for (let i = 0; i < 6; i++) {
            if (arr[x].localeCompare("arms") == 0) {
                rando = Math.floor(Math.random() * inc) + arms;
                if (nums.includes(rando)) {
                    i--;
                    continue;
                } else {
                    nums.push(rando);
                }
            } else if (arr[x].localeCompare("abs") == 0) {
                rando = Math.floor(Math.random() * inc) + abs;
                if (nums.includes(rando)) {
                    i--;
                    continue;
                } else {
                    nums.push(rando);
                }
            } else if (arr[x].localeCompare("legs") == 0) {
                rando = Math.floor(Math.random() * inc) + legs;
                if (nums.includes(rando)) {
                    i--;
                    continue;
                } else {
                    nums.push(rando);
                }
            } else if (arr[x].localeCompare("shoulders") == 0) {
                rando = Math.floor(Math.random() * inc) + shoulders;
                if (nums.includes(rando)) {
                    i--;
                    continue;
                } else {
                    nums.push(rando);
                }
            } else if (arr[x].localeCompare("back") == 0) {
                rando = Math.floor(Math.random() * inc) + back;
                if (nums.includes(rando)) {
                    i--;
                    continue;
                } else {
                    nums.push(rando);
                }
            } else if (arr[x].localeCompare("chest") == 0) {
                rando = Math.floor(Math.random() * inc) + chest;
                if (nums.includes(rando)) {
                    i--;
                    continue;
                } else {
                    nums.push(rando);
                }
            }
            x = x + 1 >= arr.length ? (x = 0) : (x += 1);
        }
        singleton = false;
        num = nums;
        console.log("Generated routine exercise IDs:", num);
    }
};

const saveRoutine = async (num, routine, arr) => {
    const db = getFirestore(app);
    const auth = getAuth();
    const user = auth.currentUser;
    const routineRef = collection(db, "users", user.uid, "routines");
    try {
        await addDoc(routineRef, {
            name: routine,
            exercises: num,
            area: arr,
            timestamp: serverTimestamp(),
        });
        return true;
    } catch (error) {
        console.error("Error saving routine:", error);
        return false;
    }
};

function RoutineDisplayGenerated({navigation, route}) {
    const [routine, setRoutine] = useState();
    const arr = route.params.selected;
    generateRando(arr);

    const setRoutineName = (text) => {
        setRoutine(text);
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={views.Home}>
                    <Text style={text.title}> Your Newly Generated Routine</Text>
                    <View>
                        <Text>
                            Standard Workout estimated Time to Complete: 15min.
                            Beginner: 2 sets of 8-12 reps per set 
                        </Text>
                        <Text>
                            Intermediate: 3 sets of 10-15 reps per set
                        </Text>
                        <Text>
                            Advanced: 5 sets of 10-20 reps per set
                        </Text>
                    </View>
                    {num[0] !== undefined && <DisplayExButton val={num[0]} navigation={navigation} />}
                    {num[1] !== undefined && <DisplayExButton val={num[1]} navigation={navigation} />}
                    {num[2] !== undefined && <DisplayExButton val={num[2]} navigation={navigation} />}
                    {num[3] !== undefined && <DisplayExButton val={num[3]} navigation={navigation} />}
                    {num[4] !== undefined && <DisplayExButton val={num[4]} navigation={navigation} />}
                    {num[5] !== undefined && <DisplayExButton val={num[5]} navigation={navigation} />}
                    <TextInput
                        style={logstyle.input}
                        underlineColorAndroid="transparent"
                        placeholder="Enter Routine Name"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        onChangeText={setRoutineName}
                    />
                    <TouchableOpacity
                        onPress={async () => {
                            const ok = await saveRoutine(num, routine, arr);
                            if (ok) {
                                navigation.navigate(
                                    "MyRoutines",
                                    { areaSelected: 1 }
                                );
                            }
                        }}
                    >
                        <Image
                            source={require("./../../img/saveRoutine.png")}
                            style={image.Touchable}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export {RoutineDisplayGenerated};
