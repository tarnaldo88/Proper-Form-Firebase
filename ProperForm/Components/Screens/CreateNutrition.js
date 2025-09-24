import React, {useState, Fragment} from "react";
import { Alert } from "react-native";
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
import app from "../firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, getDocs, doc, getDoc } from "firebase/firestore";

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
			{ id: 0, fId: "", name : "", fat: 0, sugar: 0, carbs: 0, protein: 0, totCal: 0, date: "date"},
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
				newArr = [{ id: i, fId: results[i].fId, name: results[i].name, fat: results[i].fat, sugar: results[i].sugar,
							carbs: results[i].carbs, protein: results[i].protein, totCal: results[i].totCal, date: results[i].date}];
			} else {
				//afterwards, add on to existing array
				newArr = [...newArr ,
					{ id: i, fId: results[i].fId, name: results[i].name, fat: results[i].fat, sugar: results[i].sugar,
						carbs: results[i].carbs, protein: results[i].protein, totCal: results[i].totCal, date: results[i].date}];
			}			
		}	 
		setSelected(newArr);
	}

	  const loadFoods = async () => {
    try {
      const auth = getAuth(app);
      const uid = auth.currentUser?.uid;
      if (!uid) return [];
      const db = getFirestore(app);
      const foodsRef = collection(db, "users", uid, "foodEntries");
      const q = query(foodsRef, orderBy("date", "desc"));
      const snap = await getDocs(q);
      const arr = [];
      snap.forEach(d => {
        const data = d.data();
        arr.push({
          fId: d.id,
          name: data.name,
          fat: data.fat || 0,
          sugar: data.sugar || 0,
          carbs: data.carbs || 0,
          protein: data.protein || 0,
          totCal: data.calories || 0,
          date: data.date?.toDate ? data.date.toDate().toISOString().substring(0,10) : "",
        });
      });
      await storeFoods(arr);
      setLoad((prev) => !prev);
      return arr;
    } catch (error) {
      console.log("loadFoods Firestore error:", error);
      return [];
    }
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

	// Save a new food entry to Firestore for the current user
	const PostNewFood = async () => {
	  try {
	    const auth = getAuth(app);
{{ ... }}
	    Alert.alert('Saved', `${data.name || foodName} added successfully`);
	    navigation.navigate("nutJournal");
	  } catch (e) {
	    console.log('Firestore duplicate error (PostExistingFood):', e);
	    Alert.alert('Error', 'Unable to add food entry.');
	  }

    const validNav = async () => {
      console.log(date);
      if (food === "") {
        Alert.alert('Must Enter Name of Food Eaten');
      } else {
        await PostNewFood();
      }
    };

	const [name, setName] = useState();
	const [isLog, setIsLog] = useState();

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
