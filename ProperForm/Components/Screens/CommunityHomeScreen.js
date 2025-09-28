import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { views, text, button, image } from "./Styles";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import app from "../firebase";

/* The CommunityHomeScreen function sets up the formatting of the Community Screen page

  *GoToButton component
  *GoToButton is a custom component that allows you to enter the name of the screen
  *you want to navigate to without importing navigate.
  *Format <GoToButton screenName = "ExampleScreenName" />
*/

function CommunityHomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [communityStats, setCommunityStats] = useState({
    friendsCount: 0,
    unreadMessages: 0,
    activeCompetitions: 0
  });

  const auth = getAuth();
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        setIsLoggedIn(true);
        try {
          // Fetch user data from Firestore
          const userDoc = await getDocs(query(
            collection(db, "users"),
            where("uid", "==", user.uid)
          ));

          if (!userDoc.empty) {
            setUserData(userDoc.docs[0].data());
          }

          // Fetch community stats (example - adjust according to your Firestore structure)
          const friendsQuery = await getDocs(collection(db, `users/${user.uid}/friends`));
          const messagesQuery = await getDocs(query(
            collection(db, `users/${user.uid}/messages`),
            where("read", "==", false)
          ));
          const competitionsQuery = await getDocs(collection(db, `users/${user.uid}/competitions`));

          setCommunityStats({
            friendsCount: friendsQuery.size,
            unreadMessages: messagesQuery.size,
            activeCompetitions: competitionsQuery.size
          });
        } catch (error) {
          console.error("Error fetching community data:", error);
        }
      } else {
        // User is signed out
        setIsLoggedIn(false);
        setUserData(null);
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#c70212" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.notLoggedInContainer}>
        <Text style={styles.notLoggedInText}>Please log in to access the community features.</Text>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginButtonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Welcome{userData?.displayName ? `, ${userData.displayName}` : ''}!
          </Text>
          <Text style={styles.communityStats}>
            Connect with {communityStats.friendsCount} friends • {communityStats.unreadMessages} unread messages
          </Text>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate("Friends")}
          >
            <Image 
              style={styles.userImage} 
              source={require("./../../img/meetFriendsButton.png")} 
            />
            <View style={styles.cardFooter}>
              <View style={styles.cardContent}>
                <Text style={styles.name}>Social</Text>
                <Text style={styles.cardDescription}>Connect with friends</Text>
                <TouchableOpacity 
                  style={styles.followButton}
                  onPress={() => navigation.navigate("Friends")}
                >
                  <Text style={styles.followButtonText}>
                    {communityStats.friendsCount} Friends
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate("chatSelect")}
          >
            <Image 
              style={styles.userImage} 
              source={require("./../../img/message.png")} 
            />
            <View style={styles.cardFooter}>
              <View style={styles.cardContent}>
                <Text style={styles.name}>Messages</Text>
                <Text style={styles.cardDescription}>Chat with friends</Text>
                <TouchableOpacity 
                  style={[
                    styles.followButton, 
                    communityStats.unreadMessages > 0 && styles.unreadButton
                  ]}
                  onPress={() => navigation.navigate("chatSelect")}
                >
                  <Text style={styles.followButtonText}>
                    {communityStats.unreadMessages > 0 
                      ? `${communityStats.unreadMessages} New` 
                      : 'Chats'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate("postScreen")}
          >
            <Image 
              style={styles.userImageFists} 
              source={require("./../../img/compet_but.png")} 
            />
            <View style={styles.cardFooter}>
              <View style={styles.cardContent}>
                <Text style={styles.name}>Competitions</Text>
                <Text style={styles.cardDescription}>Compete with friends</Text>
                <TouchableOpacity 
                  style={styles.followButton}
                  onPress={() => navigation.navigate("postScreen")}
                >
                  <Text style={styles.followButtonText}>
                    {communityStats.activeCompetitions > 0 
                      ? `${communityStats.activeCompetitions} Active` 
                      : 'Compete!'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export {CommunityHomeScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  notLoggedInText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#c70212',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  welcomeContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  communityStats: {
    fontSize: 14,
    color: '#666',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginVertical: 10,
    backgroundColor: 'white',
    flexBasis: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  cardContent: {
    alignItems: 'center',
  },
  userImage: {
    height: 180,
    width: '100%',
    resizeMode: 'cover',
  },
  userImageFists: {
    height: 180,
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: '#f9f9f9',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  followButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#c70212',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  unreadButton: {
    backgroundColor: '#ff3b30',
  },
  followButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
})