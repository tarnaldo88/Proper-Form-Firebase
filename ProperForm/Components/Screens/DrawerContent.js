import React, {useState, useEffect} from "react";
import {View, AsyncStorage} from "react-native";
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    Button    
} from "react-native-paper";
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {styleDrawContent} from "./Styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useFocusEffect} from "@react-navigation/native";
import { getFirestore, collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import app from "../firebase";
import { parseISO, isSameDay, addDays } from 'date-fns';
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

//style={styles.row} can also be used for the View style holding the double paragraph caption section

function DrawerContent({props, navigation}) {
	//values used to determine if dark theme is active or not
	const [isDarkTheme, setIsDarkTheme] = React.useState(false);

	const [name, setName] = useState("Username");
	const [isLog, setIsLog] = useState(false);
	const [isSign, setIsSign] = useState(false);
	const [userID, setUserID] = useState(null);
	const [currentStreak, setCurrentStreak] = useState(0);
	const [weightDiff, setWeightDiff] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
    const [goalWeight, setGoalWeight] = useState(0);
	const db = getFirestore(app);
	const auth = getAuth(app);

	// Function to check and update streak
    const checkAndUpdateStreak = (workoutDates) => {
        if (!workoutDates || workoutDates.length === 0) {
            setCurrentStreak(0);
            return;
        }

        // Convert string dates to Date objects and sort in descending order
        const sortedDates = [...workoutDates]
            .map(dateStr => parseISO(dateStr))
            .sort((a, b) => b - a);

        let streak = 0;
        let currentDate = new Date();
        
        // Check if today is already logged
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // If today is already logged, start counting from yesterday
        if (sortedDates.length > 0 && isSameDay(parseISO(workoutDates[0]), today)) {
            streak = 1;
            currentDate = addDays(today, -1);
        }

        // Check for consecutive days
        for (const workoutDate of sortedDates) {
            const workoutDay = new Date(workoutDate);
            workoutDay.setHours(0, 0, 0, 0);
            
            if (isSameDay(workoutDay, currentDate) || 
                isSameDay(workoutDay, addDays(currentDate, -1))) {
                if (!isSameDay(workoutDay, today)) {
                    streak++;
                }
                currentDate = workoutDay;
            } else {
                break;
            }
        }

        setCurrentStreak(streak);
    };

    // Load user data including workout days and weight information
    useEffect(() => {
        let isMounted = true;
        const auth = getAuth(app);
        const user = auth.currentUser;
        setIsLog(!!user);  // This will set isLog to true if user exists, false otherwise
        
        if (!user) {
            setCurrentStreak(0);
            setWeightDiff(0);
            return;
        }

        // Subscribe to workout days for streak calculation
        const workoutRef = collection(db, "users", user.uid, "workoutDays");
        const workoutQuery = query(workoutRef, orderBy("date", "desc"));
        
        const unsubscribeWorkouts = onSnapshot(workoutQuery, (querySnapshot) => {
            if (isMounted) {
                const dates = querySnapshot.docs.map(doc => doc.data().date);
                checkAndUpdateStreak(dates);
            }
        });

        // Function to update weight difference
        const updateWeightDifference = async () => {
            try {
                const user = auth.currentUser;
				if (!user) {
					console.log("No user logged in");
					navigation.navigate("Login");
					return;
				}
	
				const userDoc = await getDoc(doc(db, "users", user.uid));
				if (userDoc.exists()) {
					const data = userDoc.data();
                    setWeightDiff(data.weight - data.goalWeight);							
				}
            } catch (error) {
                console.error("Error updating weight difference:", error);
            }
        };

        // Subscribe to user document for weight data
        const userRef = doc(db, "users", user.uid);
        const unsubscribeUser = onSnapshot(userRef, updateWeightDifference);

        // Initial fetch
        // updateWeightDifference();

        // Clean up subscriptions
        return () => {
            isMounted = false;
            unsubscribeWorkouts();
            unsubscribeUser();
        };
    	}, []);		

	const paperTheme = useTheme();

	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
	};

    return (
        <View style={{flex: 1}}>
            {isLog ? (
                <DrawerContentScrollView {...props}>
                    <View style={styleDrawContent.drawerContent}>
                        <View style={styleDrawContent.userInfoSection}>
                            <View style={{flexDirection: "row", marginTop: 15}}>
                                <Avatar.Image
                                    source={require("./../../img/user.png")}
                                    size={50}
                                />
                                <View style={{
                                    marginLeft: 15,
                                    flexDirection: "column"
                                }}>
                                    <Title style={styleDrawContent.title}>
                                        {name}
                                    </Title>
                                    <Caption style={styleDrawContent.caption}>
                                        {userID ? `ID: ${userID.substring(0, 8)}...` : ''}
                                    </Caption>
                                </View>
                            </View>
                            <View>
                                <View style={styleDrawContent.section}>
                                    <Paragraph
                                        style={[
                                            styleDrawContent.paragraph,
                                            styleDrawContent.caption
                                        ]}
                                    >
                                        Workout Day Streak: {currentStreak}
                                    </Paragraph>
                                    <Caption style={styleDrawContent.caption}>
                                        {currentStreak === 0 ? 'Start your fitness journey today!' : ''}
                                    </Caption>
                                </View>
                                <View style={styleDrawContent.section}>
                                    <Paragraph
                                        style={[
                                            styleDrawContent.paragraph,
                                            styleDrawContent.caption
                                        ]}
                                    >
                                        Current Weight: {weightDiff} lbs
                                    </Paragraph>
                                    <Caption style={styleDrawContent.caption}>
                                        {weightDiff > 0 
                                            ? `to reach your goal of ${goalWeight} lbs` 
                                            : weightDiff < 0 
                                                ? `You've reached your goal weight! 🎉` 
                                                : 'Set a goal weight in your profile'}
                                    </Caption>
                                </View>
                            </View>
                        </View>
                        <Drawer.Section style={{marginTop: 15}}>
                            <DrawerItem
                                icon={({color, size}) => (
                                    <Icon name="home" color={color} size={size} />
                                )}
                                label="Home"
                                onPress={() => navigation.navigate("mainHome")}
                            />
                            <DrawerItem
                                icon={({color, size}) => (
                                    <Icon name="format-list-numbered" color={color} size={size} />
                                )}
                                label="My Routines"
                                onPress={() => navigation.navigate("MyRoutines")}
                            />
                            <DrawerItem
                                icon={({color, size}) => (
                                    <Icon name="food-variant" color={color} size={size} />
                                )}
                                label="My Nutrition"
                                onPress={() => navigation.navigate("MyNutrition")}
                            />
                            <DrawerItem
                                icon={({color, size}) => (
                                    <Icon name="account" color={color} size={size} />
                                )}
                                label="My Account"
                                onPress={() => navigation.navigate("Account")}
                            />
                        </Drawer.Section>
                    </View>
                </DrawerContentScrollView>
            ) : (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
                    <Icon name="account-lock" size={50} color="#666" style={{marginBottom: 20}} />
                    <Title>Not Logged In</Title>
                    <Paragraph style={{textAlign: 'center', marginTop: 10, marginBottom: 20}}>
                        Please log in to access your profile and track your fitness journey.
                    </Paragraph>
                    <Button 
                        mode="contained" 
                        onPress={() => navigation.navigate("Login")}
                        style={{marginTop: 10}}
                    >
                        Go to Login
                    </Button>
                </View>
            )}
        </View>
	);
}	
export {DrawerContent};
