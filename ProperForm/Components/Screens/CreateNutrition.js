import React, {useState, Fragment} from "react";
import axios from "axios";
import {
	View,
	Image,
	Text,
	TouchableOpacity,
	TextInput,
	SafeAreaView,
	ScrollView,
} from "react-native";
import {logstyle, text, nut} from "./Styles";
import {useFocusEffect} from "@react-navigation/native";
import SearchableDropdown from 'react-native-searchable-dropdown';

//function to setup the create nutrition plan screen
function CreateNutrition({navigation, route}) {
	//stores all the entries made by the User
	const [id, setId] = useState(1);
	const [food, setFood] = useState("");
	const [fat, setFat] = useState(0);
	const [sugar, setSugar] = useState(0);
	const [carbs, setCarbs] = useState(0);
	const [prot, setProtein] = useState(0);
	const [cal, setCal] = useState(0);
	const [foodId, setFoodId] = useState("wait");
	const [date, setDate] = useState("");
	const [loading, setLoad] = useState(false);
	const [selectedItems, setSelected] = useState(
		[
			{ id: 0, fId: 0, name : "", fat: "0", sugar: "0", carbs: "0", protein: "0", totCal: "0", date: "date"},
		]);

	const handleEntryName = text => {
		setFood(text);	
		console.log(makeDate())
		setDate(makeDate());	
	}
	const handleCal = text => {
		text = text.replace(/[^0-9]/g, '');
		setCal(parseInt(text));		
	}
	const handleFat = text => {
		text = text.replace(/[^0-9]/g, '');
		setFat(parseInt(text));
	}
	const handleCarbs = text => {
		text = text.replace(/[^0-9]/g, '');
		setCarbs(parseInt(text));
	}
	const handleProt = text => {
		text = text.replace(/[^0-9]/g, '');
		setProtein(parseInt(text));
	}
	const handleSugar = text => {
		text = text.replace(/[^0-9]/g, '');
		setSugar(parseInt(text));
	}

	  const storeFoods = async (results) => {
		var newArr = [];
		var i = 0;

		//loop to go through all entries and add them to array
		for(i = 0; i < results.length; i++) {
			//for first element, add each entry manually since array is empty and without structure

			if( i == 0) {
				newArr = [{ id: i, fId: results[i].id, name: results[i].itemName, fat: results[i].fat, sugar: results[i].sugar,
							carbs:results[i].carbs, protein: results[i].protein, totCal: results[i].calories, date: results[i].dateAdded}];
			} else {
				//afterwards, add on to existing array
				newArr = [...newArr ,
					{ id: i, fId: results[i].id, name: results[i].itemName, fat: results[i].fat, sugar: results[i].sugar,
						carbs:results[i].carbs, protein: results[i].protein, totCal: results[i].calories, date: results[i].dateAdded}];
			}			
		}	 
		setSelected(newArr);
	}

	  const loadFoods = async () => {		
	   var arr = [];				
	   const response = await axios.get("http://52.53.203.248/ProperApi/api/AllNuts", {})
		   .then(
			   response => {
				   const nameList = response.data;					
				   setLoad(true);
				   var i = 0;
				   for(i = 0; i < response.data.length; i++){
					   arr.push(nameList[i]);
				   }				   
			   });
			   
			   await storeFoods(arr);

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
        var hour = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();

		if(month < 10 ) {
			month = "0" + month;
		}
		if (day < 10) {
			day = "0" + day;
		}
        if (hour < 10) {
			hour = "0" + hour;
		}
        if (min < 10) {
			min = "0" + min;
		}
        if (sec < 10) {
			sec = "0" + sec;
		}
		// console.log("time = " + year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec)
		return ( year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec);
	};

	//axios call to post or put new food entry	
	const PostFoodEntry = async () => {	
		var arr;
		await axios
			.post("http://52.53.203.248/ProperApi/api/AllNuts", {
				Calories: cal,
				Fat: fat,
				Carbs: carbs,
				Protein: prot,
				Sugar: sugar,
				ItemName: food,

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

		//axios call to post or put new food entry	
		const PostUserFoodEntry = async (fId) => {	
			

			await axios
				.post("http://52.53.203.248/ProperApi/api/NutEntries", {
					FoodId: fId,
					UserId: 25,
					DateAdded: date,
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

				//axios call to post or put new food entry	where we pass in the date as well
				const PostUserFoodEntryPassed = async (fId, Date) => {	
					await axios
						.post("http://52.53.203.248/ProperApi/api/NutEntries", {
							FoodId: fId,
							UserId: 25,
							DateAdded: date,
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

		/*Need to add an axios get call for specifically retrieving the food id by using the item name*/ 
		const GetFoodID = async () => {
			var arr = [];		
			console.log("inside 1 " + food);	
	  		 await axios.get("http://52.53.203.248/ProperApi/api/ItemByName/" + food, {})
		   	.then(
			   response => {
				   console.log("inside 3 " + response.data.id );
				   			arr.push(response.data.id);   
			   });
			   console.log("inside 4 " + arr[0]);
			   return arr;
		}

		const PostNewFood = async () => {
			var retId = await PostFoodEntry();
			setFoodId(retId);
			await PostUserFoodEntry(retId);
		}

		const PostExistingFood = async (fId, foodName) => {
			var Date = makeDate();
			setDate(Date);
			await PostUserFoodEntryPassed(fId, Date);
			alert(foodName + " added succesfully");
			navigation.navigate("nutJournal");
		}


	const validNav = async () => {		
		console.log(date);
		if(food === ""){
			alert("Must Enter Name of Food Eaten");
		} else {
			PostNewFood();
			return (navigation.navigate("nutJournal"));	
		}		
	};

	const [name, setName] = useState();
	const [isLog, setIsLog] = useState();
	const [userID, setUserID] = useState();

	useFocusEffect(
		React.useCallback(() => {
		  // Do something when the screen is focused
		//   Storage.load(setUserID, setName, setIsLog);
		//   Storage.setSignOut();

		  let results = loadFoods();
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
		<SafeAreaView>
				<View style={{backgroundColor:"#030200"}}>
					<Fragment>
						<SearchableDropdown
						onItemSelect={(item) => {
							const items = selectedItems;
							console.log("item.fId = " + item.fId);
							console.log("item.name = " + item.name);
							PostExistingFood(item.fId, item.name);
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
								  borderRadius: 5,
								  color: "white"
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

					<ScrollView >
						<View style={{paddingBottom: 120}}>

							<Text style={text.NutFoodTitleText}> 
								Enter the following details:
							</Text>			
							<Text style = {nut.NutFoodTitleText}>
								*Name of Food(s) Eaten:
							</Text>
							<TextInput
								style={nut.input}
								underlineColorAndroid="transparent"
								placeholder=" What did you eat?"
								placeholderTextColor="#ffff"
								autoCapitalize="none"
								onChangeText={handleEntryName}
							/>
							<Text style = {nut.NutFoodTitleText}>
								Amount of Calories:
							</Text>
							<TextInput
								style={nut.input}
								keyboardType='numeric'
								underlineColorAndroid="transparent"
								placeholder=" How many Calories did you consume?"
								placeholderTextColor="#ffff"
								autoCapitalize="none"
								onChangeText={handleCal}
							/>
							<Text style = {nut.NutFoodTitleText}>
								Grams of Protein:
							</Text>
							<TextInput
								style={nut.input}
								keyboardType='numeric'
								underlineColorAndroid="transparent"
								placeholder=" Enter the amount of Protein:"
								placeholderTextColor="#ffff"
								autoCapitalize="none"
								onChangeText={handleProt}
							/>
							<Text style = {nut.NutFoodTitleText}>
								Grams of Carbohydrates:
							</Text>
							<TextInput
								style={nut.input}
								keyboardType='numeric'
								underlineColorAndroid="transparent"
								placeholder=" Enter the amount of Carbohydrates:"
								placeholderTextColor="#ffff"
								autoCapitalize="none"
								onChangeText={handleCarbs}
							/>
							<Text style = {nut.NutFoodTitleText}>
								Grams of Sugar:
							</Text>
							<TextInput
								style={nut.input}
								keyboardType='numeric'
								underlineColorAndroid="transparent"
								placeholder=" Enter the amount of Sugar:"
								placeholderTextColor="#ffff"
								autoCapitalize="none"
								onChangeText={handleSugar}
							/>
							<Text style = {nut.NutFoodTitleText}>
								Grams of Fat:
							</Text>
							<TextInput
								style={nut.input}
								keyboardType='numeric'
								underlineColorAndroid="transparent"
								placeholder=" Enter the amount of Fat:"
								placeholderTextColor="#ffff"
								autoCapitalize="none"
								onChangeText={handleFat}
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
		</SafeAreaView>
	);
}
export {CreateNutrition};
