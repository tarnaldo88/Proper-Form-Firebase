import React, {useState, Fragment} from "react";
import axios from "axios";
import {
	View,
	Image,
	Text,
	TouchableOpacity,
	TextInput,
	SafeAreaView,
	ScrollView
} from "react-native";
import {logstyle, text, nut} from "./Styles";
import {useFocusEffect} from "@react-navigation/native";
import SearchableDropdown from 'react-native-searchable-dropdown';

//function to setup the create nutrition plan screen
function AddFriend({navigation, route}) {
	//stores all the entries made by the User
	const [id, setId] = useState(1);
	const [friend, setFriend] = useState("");
	const [cal, setCal] = useState(0);
	const [friendId, setFriendId] = useState("wait");
	const [date, setDate] = useState("");
	const [loading, setLoad] = useState(false);
	const [selectedItems, setSelected] = useState(
		[
			{id: 0, userID: 0, userName : ""},
		]);

	const [name, setName] = useState();
	const [isLog, setIsLog] = useState();
	const [userID, setUserID] = useState();

	const handleEntryName = text => {
		setFriend(text);	
		setDate(makeDate());	
	}
	const handleCal = text => {
		text = text.replace(/[^0-9]/g, '');
		setCal(parseInt(text));		
	}

	  const storeFriends = async (results) => {
		var newArr = [];
		var i = 0;

		//loop to go through all entries and add them to array
		for(i = 0; i < results.length; i++) {
			//for first element, add each entry manually since array is empty and without structure
			if( i == 0) {
				newArr = [{ id: i, userID: results[i].userID, name: results[i].username}];
			} else {
				//afterwards, add on to existing array
				newArr = [...newArr ,
					{ id: i, userID: results[i].userID, name: results[i].username}];
			}			
		}	 
		setSelected(newArr);
	}

	  const loadFriends = async () => {		
	   var arr = [];				
	   const response = await axios.get("http://52.53.203.248/ProperApi/api/UserInfo", {})
		   .then(
			   response => {
				   const nameList = response.data;					
				   setLoad(true);
				   var i = 0;
				   for(i = 0; i < response.data.length; i++){
					   arr.push(nameList[i]);
				   }				   
			   });
			   
			   await storeFriends(arr);

			   if(loading == true)
				setLoad(false);
			   else
				setLoad(true);

			   return arr;
   };


	const makeDate = () => {			
		var day = new Date().getDate();
		var month = new Date().getMonth() + 1;
		var year = new Date().getFullYear();	

		if(month < 10 ) {
			month = "0" + month;
		}
		if (day < 10) {
			day = "0" + day;
		}
		
		return (year + "-" + month + "-" + day);
	};

	//axios call to post or put new friend entry	
	const PostFriendEntry = async () => {	
		var arr;
		await axios
			.post("http://52.53.203.248/ProperApi/api/Friends", {
				UserId: 25,
				FriendUserID: fId,
				userName: friendName,
			})
			.then(
				response => {
					arr = response.data.id;
					console.log("data.id = " + response.data.id);

				},
				error => {
					
					console.log(error);
				}
			);
			return arr;
	};

		//axios call to post or put new friend entry	
		const PostUserFriendEntry = async (fId) => {	

			await axios
				.post("http://52.53.203.248/ProperApi/api/Friends", {
					UserId: 25,
					FriendUserID: fId,
					userName: friendName,
				})
				.then(
					response => {
						console.log(response);
					},
					error => {
						console.log(error);
					}
				);
		};

				//axios call to post or put new friend entry	where we pass in the date as well
				const PostUserFriendEntryPassed = async (fId, friendName) => {
			
					await axios
						.post("http://52.53.203.248/ProperApi/api/Friends", {
							UserId: 25,
							FriendUserID: fId,
							userName: friendName,
						})
						.then(
							response => {
								console.log(response);
							},
							error => {
								console.log(error);
							}
						);
				};

		const PostNewFriend = async () => {
			var retId = await PostFriendEntry();
			setFriendId(retId);
			await PostUserFriendEntry(retId);
		}

		const PostExistingFriend = async (fId, friendName) => {
			var Date = makeDate();
			setDate(Date);
			await PostUserFriendEntryPassed(fId, friendName);
			alert(friendName + " added succesfully");
			navigation.navigate("Friends");
		}


	const validNav = async () => {		
		console.log(date);
		if(friend === ""){
			alert("Must Enter Name of New Friend");
		} else {
			// PostNewFriend();
			return (navigation.navigate("Friends"));	
		}		
	};

	useFocusEffect(
		React.useCallback(() => {
		  // Do something when the screen is focused
		//   Storage.load(setUserID, setName, setIsLog);
		 // Storage.setSignOut();

		  let results = loadFriends();
		  //console.log("exampleState = " + route.params.exampleState[0].fat);

		  if(loading == true)
			  setLoad(false);
		  else
			  setLoad(true);
		  return () => {
			// Do something when the screen is unfocused
			// Useful for cleanup functions as
		  };
		}, [])
	  );

	return (
		
				<View style={{flex:1, backgroundColor:"#1a002b"}}>
					<Fragment>
						<SearchableDropdown
						onItemSelect={(item) => {
							const items = selectedItems;
							PostExistingFriend(item.userID, item.name);
							}}
						containerStyle={{ padding: 5 }}
						onRemoveItem={(item, index) => {
							const items = selectedItems.filter((sitem) => sitem.id !== item.id);
							setSelected(items);
						}}
						itemStyle={{
							padding: 10, 
							marginTop: 2,
							backgroundColor: '#ddd',
							borderColor: '#bbb',
							borderWidth: 1,
							borderRadius: 5,
						  }}
						  itemTextStyle={{ color: '#222' }}
						  itemsContainerStyle={{ maxHeight: 140 }}
						  items={selectedItems}
						  defaultIndex={2}
						  resetValue={false}
						  textInputProps={
							{
							  placeholder: "search...",
							  placeholderTextColor:"white",
							  underlineColorAndroid: "transparent",
							  style: {
								  padding: 12,
								  borderWidth: 1,
								  borderColor: '#ccc',
								  color: 'white',
								  borderRadius: 5,
							  },
							  onTextChange: text => console.log(text)
							}
						  }
						  listProps={
							{
							  nestedScrollEnabled: true,
							}
						  }
					  />
					</Fragment>
					<ScrollView>
						<View>

							<Text style={text.NutFoodTitleText}> 
								Enter the following details:
							</Text>			
							<Text style = {nut.NutFoodTitleText}>
								*Name of Friend:
							</Text>
							<TextInput
								style={nut.input}
								underlineColorAndroid="transparent"
								placeholderTextColor="#ffff"
								autoCapitalize="none"
								onChangeText={handleEntryName}
							/>
							<Text style = {nut.NutFoodTitleText}>
								Email of Friend:
							</Text>
							<TextInput
								style={nut.input}
								underlineColorAndroid="transparent"
								placeholderTextColor="#ffff"
								autoCapitalize="none"
								onChangeText={handleCal}
							/>
							<TouchableOpacity onPress={() => { 							
									validNav();
								}}>
								<Image
									source={require("./../../img/submit.png")}
									style={logstyle.submitButton}
								/>
							</TouchableOpacity>	
						</View>
					</ScrollView>	
				</View>
	);
}
export {AddFriend};
