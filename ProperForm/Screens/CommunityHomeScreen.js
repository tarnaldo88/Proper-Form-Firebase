import React from "react";
import {View, Image, Text, Button, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import {views, text, button, image} from "./Styles";
import {GoToButton} from "./../GoToButton/GoToButton";
import {NavigationContainer, DrawerActions} from "@react-navigation/native";

/* The CommunityHomeScreen function sets up the formatting of the Community Screen page

  *GoToButton component
  *GoToButton is a custom component that allows you to enter the name of the screen
  *you want to navigate to without importing navigate.
  *Format <GoToButton screenName = "ExampleScreenName" />
*/

function CommunityHomeScreen({navigation}) {
	return (
		<SafeAreaView><ScrollView>
		<View style={styles.rowContainer}>				
			<TouchableOpacity style={styles.card} onPress= {() =>navigation.navigate("Friends") }>                   
                    <Image style={styles.userImage} source={require("./../../img/meetFriendsButton.png")}/>
                    <View style={styles.cardFooter}>
                      <View style={{alignItems:"center", justifyContent:"center"}}>
                        <Text style={styles.name}>Social</Text>
                        <TouchableOpacity style={styles.followButton} onPress= {() =>navigation.navigate("Friends") }>
                          <Text style={styles.followButtonText}>Friends</Text>  
                        </TouchableOpacity>
                      </View>
                    </View>
            </TouchableOpacity>	
			<TouchableOpacity style={styles.card} onPress= {() =>navigation.navigate("chatSelect") }>                   
                    <Image style={styles.userImage} source={require("./../../img/message.png")}/>
                    <View style={styles.cardFooter}>
                      <View style={{alignItems:"center", justifyContent:"center"}}>
                        <Text style={styles.name}>Messages</Text>
                        <TouchableOpacity style={styles.followButton} onPress= {() =>navigation.navigate("chatSelect") }>
                          <Text style={styles.followButtonText}>Chats</Text>  
                        </TouchableOpacity>
                      </View>
                    </View>
            </TouchableOpacity>			
			<TouchableOpacity style={styles.card} onPress= {() =>navigation.navigate("postScreen") }>                   
                    <Image style={styles.userImageFists} source={require("./../../img/compet_but.png")}/>
                    <View style={styles.cardFooter}>
                      <View style={{alignItems:"center", justifyContent:"center"}}>
                        <Text style={styles.name}>Competitions</Text>
                        <TouchableOpacity style={styles.followButton} onPress= {() =>navigation.navigate("postScreen") }>
                          <Text style={styles.followButtonText}>Compete!</Text>  
                        </TouchableOpacity>
                      </View>
                    </View>
            </TouchableOpacity>				
		</View>
		</ScrollView></SafeAreaView>
	);
}

export {CommunityHomeScreen};

const styles = StyleSheet.create({
	rowContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',		
		paddingTop: 5,
	  },
	container:{
	  flex:1,
	  marginTop:20,
	},
	list: {
	  paddingHorizontal: 5,
	  backgroundColor:"#E6E6E6",
	},
	listContainer:{
	 alignItems:'center'
	},
	/******** card **************/
	card:{
	  shadowColor: '#00000021',
	  shadowOffset: {
		width: 0,
		height: 6,
	  },
	  shadowOpacity: 0.37,
	  shadowRadius: 7.49,
	  elevation: 12,
  
	  marginVertical: 5,
	  backgroundColor:"white",
	  flexBasis: '46%',
	  marginHorizontal: 5,
	},
	cardFooter: {
	  paddingVertical: 17,
	  paddingHorizontal: 16,
	  borderTopLeftRadius: 1,
	  borderTopRightRadius: 1,
	  flexDirection: 'row',
	  alignItems:"center", 
	  justifyContent:"center"
	},
	cardContent: {
	  paddingVertical: 12.5,
	  paddingHorizontal: 16,
	},
	cardHeader:{
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	  paddingTop: 12.5,
	  paddingBottom: 25,
	  paddingHorizontal: 16,
	  borderBottomLeftRadius: 1,
	  borderBottomRightRadius: 1,
	},
	userImage:{
	  height: 120,
	  width: 120,
	  borderRadius:60,
	  alignSelf:'center',
	  borderColor:"#DCDCDC",
	  borderWidth:3,
	},
	userImageFists:{
		height: 120,
		width: 120,
		borderRadius:60,
		alignSelf:'center',
		borderColor:"#DCDCDC",
		borderWidth:3,
	  },
	name:{
	  fontSize:18,
	  flex:1,
	  alignSelf:'center',
	  color:"#008080",
	  fontWeight:'bold'
	},
	position:{
	  fontSize:14,
	  flex:1,
	  alignSelf:'center',
	  color:"#696969"
	},
	followButton: {
	  marginTop:10,
	  height:35,
	  width:100,
	  flexDirection: 'row',
	  justifyContent: 'center',
	  alignItems: 'center',
	  borderRadius:30,
	  backgroundColor: "#00BFFF",
	},
	followButtonText:{
	  color: "#FFFFFF",
	  fontSize:20,
	},
	icon:{
	  height: 20,
	  width: 20, 
	}
  }); 