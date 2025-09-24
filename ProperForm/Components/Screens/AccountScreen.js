import React, {useState, useEffect} from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    Alert
} from "react-native";
import {Title} from "react-native-paper";
import {useFocusEffect} from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import app from "../firebase";

function AccountScreen({navigation}) {
    const [sex, setSex] = useState("");
    const [weight, setWeight] = useState(150);
    const [goalWeight, setGoalWeight] = useState(150);
    const [height, setHeight] = useState(70);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    const auth = getAuth();
    const db = getFirestore();

    // Load user profile data
    const loadProfile = async () => {
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
                setSex(data.gender || "");
                setWeight(data.weight || 150);
                setGoalWeight(data.goalWeight || 150);
                setHeight(data.height || 70);
            }
        } catch (error) {
            console.error("Error loading profile:", error);
            Alert.alert("Error", "Failed to load profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Save profile to Firestore
    const saveProfile = async () => {
        try {
            setSaving(true);
            const user = auth.currentUser;
            if (!user) {
                navigation.navigate("Login");
                return;
            }

            await setDoc(doc(db, "users", user.uid), {
                gender: sex,
                weight: weight,
                goalWeight: goalWeight,
                height: height,
                updatedAt: serverTimestamp()
            }, { merge: true });
            
            Alert.alert("Success", "Profile updated successfully!");
        } catch (error) {
            console.error("Error saving profile:", error);
            Alert.alert("Error", "Failed to save profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    // Load profile when screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            loadProfile();
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1f65ff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.userInfoSection}>
                    <Title style={styles.title}>Profile Settings</Title>
                    
                    <View style={styles.settingRow}>
                        <Text style={styles.label}>Gender:</Text>
                        <View style={styles.genderContainer}>
                            {["Male", "Female", "Other"].map((gender) => (
                                <TouchableOpacity
                                    key={gender}
                                    style={[
                                        styles.genderButton,
                                        sex === gender && styles.genderButtonSelected
                                    ]}
                                    onPress={() => setSex(gender)}
                                >
                                    <Text style={[
                                        styles.genderText,
                                        sex === gender && styles.genderTextSelected
                                    ]}>
                                        {gender}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.settingRow}>
                        <Text style={styles.label}>Weight: {weight} lbs</Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={80}
                            maximumValue={400}
                            step={1}
                            value={weight}
                            onValueChange={value => setWeight(Math.round(value))}
                            minimumTrackTintColor="#1f65ff"
                            maximumTrackTintColor="#d3d3d3"
                        />
                    </View>

                    <View style={styles.settingRow}>
                        <Text style={styles.label}>Goal Weight: {goalWeight} lbs</Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={80}
                            maximumValue={400}
                            step={1}
                            value={goalWeight}
                            onValueChange={value => setGoalWeight(Math.round(value))}
                            minimumTrackTintColor="#1f65ff"
                            maximumTrackTintColor="#d3d3d3"
                        />
                    </View>

                    <View style={styles.settingRow}>
                        <Text style={styles.label}>Height: {Math.floor(height/12)}' {Math.round(height%12)}"</Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={48}
                            maximumValue={96}
                            step={0.5}
                            value={height}
                            onValueChange={value => setHeight(value)}
                            minimumTrackTintColor="#1f65ff"
                            maximumTrackTintColor="#d3d3d3"
                        />
                    </View>
                </View>

                <TouchableOpacity 
                    style={[styles.saveButton, saving && styles.saveButtonDisabled]} 
                    onPress={saveProfile}
                    disabled={saving}
                >
                    {saving ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    userInfoSection: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1a1a1a',
    },
    settingRow: {
        marginBottom: 25,
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 10,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    slider: {
        width: '100%',
        height: 40,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    genderButton: {
        flex: 1,
        marginHorizontal: 5,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    genderButtonSelected: {
        backgroundColor: '#1f65ff',
    },
    genderText: {
        color: '#555',
        fontWeight: '500',
        fontSize: 14,
    },
    genderTextSelected: {
        color: '#fff',
    },
    saveButton: {
        backgroundColor: '#1f65ff',
        padding: 15,
        borderRadius: 10,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    saveButtonDisabled: {
        backgroundColor: '#a0c0ff',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export { AccountScreen };