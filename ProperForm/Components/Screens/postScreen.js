import React, { Component, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {views, text, button, image} from "./Styles";
import axios from "axios";

class postScreen extends Component {
	constructor(props) {
		//const { navigation } = this.props;
		super(props);
		this.state = {
		  data: [
			{id:123, name: "None", searched: true,  position:"", steps:0, image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
			{id:25, name: "Arnaldo", searched: false,  position:"", steps:0, image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
			{id:31, name: "Aman", searched: false,  position:"", steps:0, image:"https://bootdey.com/img/Content/avatar/avatar4.png"},
			{id:24, name: "Ariel", searched: false, position:"", steps:0, image:"https://bootdey.com/img/Content/avatar/avatar5.png"} ,
			{id:27, name: "Josh", searched: false, position:"", steps:0, image:"https://bootdey.com/img/Content/avatar/avatar7.png"} ,
		  ],
		 stepData: [ 
			  {date: "2021-04-05T18:15:15" , steps: 10500, userID: 1}
		],
			champ: "None", 
			steps: 0, 
			champimg: "https://bootdey.com/img/Content/avatar/avatar7.png",
			userSteps: 0,
		}
		this.getSteps();
		const selectedItems = [ { id: 0, name: "", steps: 0},]
	}	
	
	makeDate = () => {			
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
		return ( day);
	};
    clickEventListener() {
        // console.log(item.name)
        switch (item.name){
            case "Arnaldo":
              this.props.navigation.navigate('Messages')
                break;
            case "Josh":
              this.props.navigation.navigate('Messages')
                break;
            case "Ariel":
              this.props.navigation.navigate('friendA')
                break;
            case "Aman":
              this.props.navigation.navigate('friendB')
                break;
        }
      }

	getSteps(){
		let arr=[];
		var newArr = [];
		let i = 0, x = 0;
		let day = this.makeDate();
		console.log(this.makeDate());
		axios.get("http://52.53.203.248/ProperApi/api/Steps", {})
            .then(
                response => {             
                    let goalWeight = response.data;
					for(i = 0;i<response.data.length;i++){
						arr.push(goalWeight[i]);
						// console.log(i + " = " + goalWeight[i].userID)
					}
					// console.log(arr.length);
					let today = false;
					let M = new Date().getMonth() + 1;
					var arrM;
					for(i = 0; i < arr.length; i++) {						
						let D = parseInt(day);
						let arrD = parseInt("0" + arr[i].date.substring(8,10));
						arrM = parseInt("0" + arr[i].date.substring(5,7));
						//make sure date of item is from today
						if(arrD == D && arrM == M){
							for(x = 0; x<this.state.data.length;x++){
								if( this.state.data[x].id === arr[i].userID){
									if(this.state.data[x].steps < arr[i].steps){
										this.state.data[x].steps = arr[i].steps;	
									}					
									this.state.data[x].searched = true;
									if(this.state.steps < this.state.data[x].steps){
										console.log(this.state.data[x].name + ":: " + this.state.data[x].steps + "UID " +  arr[i].userID)
										this.setState(({ steps }) => ({
											steps: this.state.data[x].steps
										}));
										this.setState(({ champ }) => ({
											champ: this.state.data[x].name
										}));
										// this.state.steps = this.state.data[x].steps;
										//this.state.champ= this.state.data[x].name;
										this.state.champimg = this.state.data[x].image;
										this.setState(({ champ }) => ({
											champimg: this.state.data[x].image
										}));
									}
								}
							}		
						}										
					}		
            });  
	}
	nav(rout){
		if(rout){
			var testArr = this.state.data;

			console.log("test array = " + testArr[1].name);
			return (this.props.navigation.navigate('rankings', testArr))
		} else{
			return (this.props.navigation.navigate('postSteps'))
		}
	
	}

		render() {				
			var i = 0
			for( i = 0; i < 4; i++){
				if(this.state.champ === this.state.data[i].name){
					let cha = this.state.data[i].name;					
				}
			}
			return(		
				<View style={styles.container}>
					<Text style={styles.name}>Steps Champion with: {this.state.steps}</Text>
					<TouchableOpacity style={styles.card} >
						<View style={styles.cardHeader}>
						<Image style={styles.icon} source={{uri:"https://img.icons8.com/emoji/452/trophy-emoji.png"}}/>
						</View>
						<Text style={styles.name}>{this.state.champ}</Text>
						<Image style={styles.userImage} source={{uri:this.state.champimg}}/>
						
						<View style={styles.cardFooter}>
						<View style={{alignItems:"center", justifyContent:"center"}}>
							
							<TouchableOpacity style={styles.followButton} onPress={()=> {this.nav(1)}}>
							<Text style={styles.followButtonText}>View Rankings</Text>  
							</TouchableOpacity>
						</View>
						</View>
					</TouchableOpacity>			
					<TouchableOpacity style={styles.stepsButton} onPress={()=> {this.nav(0)}}>
					<Text style={styles.followButtonText} >Enter Your Steps</Text>  
					</TouchableOpacity>
					</View>				
			);
		}
	}
	export {postScreen};

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
        paddingBottom: 8,
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
      name:{
        fontSize:18,
        // flex:1,
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
        marginTop:0,
        height:45,
        width:200,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "#00BFFF",
      },
	  stepsButton: {
        marginTop:10,
		marginLeft:15,
        height:45,
        width:200,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "#9602cc",
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