import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";
import {
	View,
	Image,
	Text,
	TouchableOpacity,
	TextInput,
	SafeAreaView,
	ScrollView,
	FlatList,
	Button
} from "react-native";
import {logstyle, views, text, button, image, nut} from "./Styles";
import {useFocusEffect} from "@react-navigation/native";
import SearchableDropdown from 'react-native-searchable-dropdown';
import { List } from "react-native-paper";
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import {Dimensions} from "react-native";

function rankings({navigation, route}) {
    const [data, setData] = useState([]);
    const [sortType, setSortType] = useState('albums');
    const [loading, setLoad] = useState(false);
    const [initialElements, changeEl]  = useState([
      { id: 0, userId: 0, name : "", steps: 0,},		
      ]);	
    const [selectedItems, setSelected] = useState(initialElements);


    /* Load the route parameters into the state function */ 
    const loadList = () => {
      var tempArr = [];
      var x;
      for(x = 1; x < route.params.length; x++){
        if(x == 1){
          tempArr = [{id: x-1 ,userId: route.params[x].id, name: route.params[x].name, steps: route.params[x].steps}]
        } else{ 
          tempArr = [...tempArr, {id: x-1 ,userId: route.params[x].id, name: route.params[x].name, steps: route.params[x].steps}]
        }
      }
  /*sort largest to smallest by steps*/
      tempArr.sort((a,b) => (a.steps < b.steps) ? 1 : -1)
  /*store in list variable*/
      setSelected(tempArr);

    }

    useFocusEffect(
      React.useCallback( () => {
        // Load the list when the screen is focused
        loadList();
  
        return () => {

        };
      }, [])
      );    
    
    return (
    <SafeAreaView >
      <Image style={image.Touchable} source={require("./../../img/lead.png")}/>
        <FlatList				
          onPress={() => {
          }}
          keyExtractor = {item => item.id.toString()}  
          extraData = {loading}
          data={selectedItems}
          renderItem = {item => ( 
			  	<View style={{flexDirection:"row", padding:10, paddingLeft:0, backgroundColor:"#1b0e21"}}>
						<Collapse>
							<CollapseHeader>
							<View style={{ width: Dimensions.get('window').width, 
											marginLeft: 0, marginRight: 0,
											borderWidth: 1, borderColor: "#000000"}}>								
								<Text style={text.itemLead}>{item.item.name + ": " + item.item.steps + " steps"}</Text>
							</View>
							</CollapseHeader>
							<CollapseBody style={{backgroundColor:"#0269a1"}}>
								<Text style={text.leadTitleText}>Name:		{item.item.name}</Text>
								<Text style={text.leadTitleText}>Steps:		{item.item.steps}</Text>
							</CollapseBody>
						</Collapse>
					</View>
				)} 
			/> 	
    </SafeAreaView>
    );
  }
  
  export {rankings};