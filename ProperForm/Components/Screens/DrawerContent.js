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
    Switch
} from "react-native-paper";
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {styleDrawContent} from "./Styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useFocusEffect} from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import app from "../firebase";
import { parseISO, isSameDay, addDays } from 'date-fns';
import { doc, getDoc } from "firebase/firestore";

//style={styles.row} can also be used for the View style holding the double paragraph caption section

function DrawerContent({props, navigation}) {
	//values used to determine if dark theme is active or not
	const [isDarkTheme, setIsDarkTheme] = React.useState(false);

	const [name, setName] = useState("Username");
	const [isLog, setIsLog] = useState();
	const [isSign, setIsSign] = useState();
	const [userID, setUserID] = useState();
	const [currentStreak, setCurrentStreak] = useState(0);
	const [weightDiff, setWeightDiff] = useState(0);
	const db = getFirestore(app);

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
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (!userDoc.exists()) return;
                
                const userData = userDoc.data();
                const goalWeight = userData.goalWeight;
                
                if (!goalWeight) {
                    if (isMounted) setWeightDiff(0);
                    return;
                }
                
                // Get the most recent weight from weightHistory
                const weightHistoryRef = collection(db, "users", user.uid, "weightHistory");
                const weightQuery = query(weightHistoryRef, orderBy("timestamp", "desc"), limit(1));
                const weightSnapshot = await getDocs(weightQuery);
                
                if (weightSnapshot.empty) {
                    if (isMounted) setWeightDiff(goalWeight);
                    return;
                }
                
                const currentWeight = weightSnapshot.docs[0].data().weight;
                const difference = Math.round((goalWeight - currentWeight) * 10) / 10; // Round to 1 decimal place
                
                if (isMounted) {
                    setWeightDiff(difference);
                }
            } catch (error) {
                console.error("Error updating weight difference:", error);
            }
        };

        // Subscribe to user document for weight data
        const userRef = doc(db, "users", user.uid);
        const unsubscribeUser = onSnapshot(userRef, updateWeightDifference);

        // Initial fetch
        updateWeightDifference();

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
		                            <Caption style={styleDrawContent.caption}></Caption>
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
		                                Workout Streak: {currentStreak}
		                            </Paragraph>
		                            <Caption style={styleDrawContent.caption}>
		                                Days In A Row!
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
		                                {weightDiff > 0 ? `${weightDiff} lbs To Go` : weightDiff === 0 ? 'Set a goal weight' : 'Goal Reached! 🎉'}
		                            </Caption>
		                        </View>
		                   	</View>
		                </View>
		                <Drawer.Section>
		                   	<DrawerItem
		                        icon={({color, size}) => (
		                            <Icon name="home" color={color} size={size} />
		                        )}
		                        label="Home"
		                        onPress={() => {
		                            navigation.navigate("mainHome");
		                        }}
		                   	/>
		                   	<DrawerItem
		                        icon={({color, size}) => (
		                            <Icon
		                                name="format-list-numbered"
		                                color={color}
		                                size={size}
		                            />
		                        )}
		                        label="My Routines"
		                        onPress={() => {
		                            navigation.navigate("MyRoutines");
		                        }}
		                   	/>
		                   	<DrawerItem
		                        icon={({color, size}) => (
		                            <Icon
		                                name="food-variant"
		                                color={color}
		                                size={size}
		                            />
		                        )}
		                        label="My Nutrition"
		                        onPress={() => {
		                            navigation.navigate("MyNutrition");
		                        }}
		                   	/>
		                </Drawer.Section>
		            </View>
		        </DrawerContentScrollView>
		    ) : null}
		</View>
	);
}	
export {DrawerContent};
