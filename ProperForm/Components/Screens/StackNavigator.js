import * as React from "react";
import {WorkoutHomeScreen} from "./WorkoutHomeScreen";
import {DietHomeScreen} from "./DietHomeScreen";
import {CommunityHomeScreen} from "./CommunityHomeScreen";
import {HomeScreen} from "./HomeScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {createStackNavigator} from "@react-navigation/stack";
import {MyNutrition} from "./MyNutrition";
import {CreateNutrition} from "./CreateNutrition";
import {NutJournal} from "./NutJournal";
import {LoginScreen} from "./LoginScreen";
import {RegisterScreen} from "./RegisterScreen";
import {ExercisesBodyFrontScreen} from "./ExercisesBodyFrontScreen";
import {RoutineHomeScreen} from "./RoutineHomeScreen";
import {RoutineSelectGenerate} from "./RoutineSelectGenerate";
import {ExerciseList} from "./ExerciseList";
import {ExerciseDisplay} from "./ExerciseDisplay";
import {AccountScreen} from "./AccountScreen";
import {MessagesScreen} from "./MessagesScreen";
import {RoutineDisplayGenerated} from "./RoutineDisplayGenerated";
import {DisplayExButton} from "./../Display/DisplayExButtons";
import { UserDetailsEntry } from "./UserDetailsEntry";
import {Friends} from "./Friends";
import {TodayFriend} from "./TodayFriend";
import {AddFriend} from "./AddFriend";
import {postScreen} from "./postScreen";
import { testCHat } from "./testCHat";
import { ChatSelect } from "./ChatSelect";
import {FriendChatB} from "./FriendChatB";
import {FriendChatA} from "./FriendChatA";
import {postSteps} from "./postSteps";
import {rankings} from "./rankings";
import {MyRoutines} from "./MyRoutines";
// import {TodayNut} from "./TodayNut";
import TodayNut from "./TodayNut";
import {DisplayMyRoutines} from "./DisplayMyRoutines";

const HomeStack = createStackNavigator();
const DietStack = createStackNavigator();
const CommunityStack = createStackNavigator();
const ExerciseStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => {
	return(
        <HomeStack.Navigator
            initialRouteName="mainHome"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#c70212"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold"
                }
            }}
        >            
            <HomeStack.Screen
                name="mainHome"
                component={HomeScreen}
                options={{
                    title: "Home",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#c70212"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />           
            
            <HomeStack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: "Login",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#c70212"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <HomeStack.Screen
                name="register"
                component={RegisterScreen}
                options={{
                    title: "Register",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#c70212"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <HomeStack.Screen
                name="AccountHome"
                component={AccountScreen}
                options={{
                    title: "My Account",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#c70212"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <HomeStack.Screen
                name="MyRoutines"
                component={MyRoutines}
                options={{
                    title: "My Routines",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#c70212"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <HomeStack.Screen
                name="userDetails"
                component={UserDetailsEntry}
                options={{
                    title: "UserDetails",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#c70212"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />                
            <HomeStack.Screen
                name="MyNutrition"
                component={MyNutrition}
                options={{
                    title: "My Progress",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#c70212"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />          
        </HomeStack.Navigator>
    );
};

const ExerciseStackScreen = ({navigation}) => {
    return(
        <ExerciseStack.Navigator
                initialRouteName="Exercise"
                screenOptions={{
                    lazy: false,
                    headerStyle: {
                        backgroundColor: "#04b043"
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    }
                }}
        >
            <ExerciseStack.Screen
                name="Exercise"
                component={WorkoutHomeScreen}
                options={{
                    title: "Exercise",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
    
            <ExerciseStack.Screen
                name="ExerciseList"
                component={ExerciseList}
                options={{
                    title: "Exercise Selector",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
    
            <ExerciseStack.Screen
                name="ExerciseDisplay"
                component={ExerciseDisplay}
                options={{
                    title: "Exercise Selector",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <ExerciseStack.Screen
                name="ExercisesBodyFront"
                component={ExercisesBodyFrontScreen}
                options={{
                    title: "Select Area",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <ExerciseStack.Screen
                name="RoutineHome"
                component={RoutineHomeScreen}
                options={{
                    title: "Routines",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <ExerciseStack.Screen
                name="RoutineSelectGenerate"
                component={RoutineSelectGenerate}
                options={{
                    title: "Routine Generator",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <ExerciseStack.Screen
                name="RoutineDisplayGenerated"
                component={RoutineDisplayGenerated}
                options={{
                    title: "Routine Generated",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />		
            <ExerciseStack.Screen
                name="DisplayMyRoutines"
                component={DisplayMyRoutines}
                options={{
                    title: "Your Routine",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <ExerciseStack.Screen
                name="DisplayExDontGOHere"
                component={DisplayExButton}
                options={{
                    title: "Routine Generated",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#04b043"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
        </ExerciseStack.Navigator>
    );
};

const DietStackScreen = ({navigation}) => {
    return(
        <DietStack.Navigator
            initialRouteName="Diet"
            screenOptions={{
                lazy: false,
                headerStyle: {
                    backgroundColor: "#1f65ff"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold"
                }
            }}
        >
            <DietStack.Screen
                name="Diet"
                component={DietHomeScreen}
                options={{
                    title: "Nutrition",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#1f65ff"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <DietStack.Screen
                name="nutJournal"
                component={NutJournal}
                options={{
                    title: "Nutrition Journal",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#1f65ff"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <DietStack.Screen
                name="createDiet"
                component={CreateNutrition}
                options={{
                    title: "Enter Your Food",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#1f65ff"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <DietStack.Screen
                name="todayNut"
                component={TodayNut}
                options={{
                    title: "Today's Journal",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#1f65ff"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />                
        </DietStack.Navigator>
    );
};

const CommunityStackScreen = ({navigation}) => {
    return(
        <CommunityStack.Navigator
            initialRouteName="Community"
            screenOptions={{
                lazy: false,
                headerStyle: {
                    backgroundColor: "#694fad"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold"
                }
            }}
        >
            <CommunityStack.Screen
                name="Community"
                component={CommunityHomeScreen}
                options={{
                    title: "Community",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#694fad"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <CommunityStack.Screen
                name="rankings"
                component={rankings}
                options={{
                    title: "Leaderboard",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#694fad"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            {/* <CommunityStack.Screen
                name="meetFriends"
                component={meetFriendsScreen}
                options={{
                    title: "Community of Friends",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#694fad"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            /> */}
                       
            <CommunityStack.Screen
                name="Messages"
                component={MessagesScreen}
                options={{
                    title: "Josh",
                    headerRight: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#694fad"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <CommunityStack.Screen
                name="postScreen"
                component={postScreen}
                options={{
                    title: "Compeitions",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#694fad"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <CommunityStack.Screen
                name="test"
                component={testCHat}
                options={{
                    title: "John",
                    headerRight: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#694fad"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <CommunityStack.Screen
                name="chatSelect"
                component={ChatSelect}
                options={{
                    title: "Choose which Chat",
                    headerLeft: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#694fad"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
             <CommunityStack.Screen
                name="friendA"
                component={FriendChatA}
                options={{
                    title: "Ariel",
                    headerRight: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#694fad"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
             <CommunityStack.Screen
                name="friendB"
                component={FriendChatB}
                options={{
                    title: "Aman",
                    headerRight: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#694fad"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
             <CommunityStack.Screen
                name="Friends"
                component={Friends}
                options={{
                    title: "Friends",
                    headerRight: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#694fad"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
            <CommunityStack.Screen
                name="addFriend"
                component={AddFriend}
                options={{
                    title: "Add a Friend",
                    headerRight: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#694fad"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
             <CommunityStack.Screen
                name="postSteps"
                component={postSteps}
                options={{
                    title: "Steps Taken",
                    headerRight: () => (
                        <Icon.Button
                            name="menu"
                            size={25}
                            backgroundColor="#694fad"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    )
                }}
            />
        </CommunityStack.Navigator>
        
    );
};

export {CommunityStackScreen, ExerciseStackScreen, DietStackScreen, HomeStackScreen};