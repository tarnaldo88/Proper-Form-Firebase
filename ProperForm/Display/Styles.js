import {StyleSheet} from "react-native";
import {Dimensions} from "react-native";
/* Const variables
 *Holds window size of the current screen
 */
const window = Dimensions.get("window");
const logoRatio = window.width / 325; //325 is actual image width

/* Usable styles in the Screens directory
  *views: holds all styles for general views of the screens
  *text:  holds all styles for text formatting
  *image: holds all styles to format images
  *logstyle: holds style specific for logged in

*/

const userDetailsPage = StyleSheet.create({
	container: {
		  flex: 1
		  // backgroundColor: "#f5fcff"
	  },
	  input: {
		  height: 80,
		  textAlign: "center",
		  width: "50%",
		  fontSize: 50,
		  marginTop: 24,
		  color: "#10156F"
	  },
	  slider: {
		  width: 300,
		  opacity: 1,
		  height: 50,
		  marginTop: 50
	  },
	  text: {
		  fontSize: 14,
		  textAlign: "center",
		  fontWeight: "500",
		  margin: 10
	  },
  });
const styleDrawContent = StyleSheet.create({
	drawerContent: {
		flex: 1
	},
	userInfoSection: {
		paddingLeft: 20
	},
	title: {
		fontSize: 16,
		marginTop: 3,
		fontWeight: "bold"
	},
	caption: {
		fontSize: 14,
		lineHeight: 14
	},
	row: {
		marginTop: 20,
		flexDirection: "row",
		alignItems: "center"
	},
	section: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 15
	},
	paragraph: {
		fontWeight: "bold",
		marginRight: 3
	},
	drawerSection: {
		marginTop: 15
	},
	bottomDrawerSection: {
		marginBottom: 15,
		borderTopColor: "#f4f4f4",
		borderTopWidth: 1
	},
	preference: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 12,
		paddingHorizontal: 16
	}
});

const views = StyleSheet.create({
	Primary: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	weightChart: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
	},
	Home: {
		alignItems: "center",
		justifyContent: "center"
	},
	CreateNutHome: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor:'#333131',
	},
	HomeA: {
		//alignItems: "center",
		justifyContent: "center"
	},
	HomeLogged: {
		//backgroundColor: "#97BBCC",
		alignItems: "center",
		justifyContent: "center"
	},
	leftShoulderBtn: {
		position: "absolute",
		top: 75,
		bottom: 10,
		left: -85,
		right: 50
	},
	rightShoulderBtn: {
		position: "absolute",
		top: 75,
		bottom: 10,
		left: 175,
		right: 30
	},
	leftArmBtn: {
		position: "relative",
		top: 145,
		bottom: 10,
		left: 75,
		right: 30
	},
	rightArmBtn: {
		position: "relative",
		top: 145,
		bottom: 10,
		left: 200,
		right: 50
	},
	chestBtn: {
		position: "absolute",
		top: 110,
		bottom: 15,
		left: 50,
		right: 50
	},
	absBtn: {
		position: "relative",
		top: 170,
		bottom: 15,
		left: 70,
		right: 30
		//borderRadius: 35,
	},
	legBtn: {
		position: "absolute",
		top: 235,
		bottom: 15,
		left: 53,
		right: 50
	},
	overlay: {
		opacity: 1,
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	titleHidden: {
		opacity: 0
	},
	chestTitle: {
		position: "absolute",
		top: 270,
		bottom: 15,
		left: 13,
		right: 50,
		height: 30,
		width: 120
	},
	armsTitle: {
		position: "absolute",
		top: 320,
		bottom: 15,
		left: 13,
		right: 50,
		height: 30,
		width: 120
	},
	shouldersTitle: {
		position: "absolute",
		top: 370,
		bottom: 15,
		left: 13,
		right: 50,
		height: 30,
		width: 120
	},
	backTitle: {
		position: "absolute",
		top: 370,
		bottom: 15,
		left: 230,
		right: 50,
		height: 30,
		width: 120
	},
	absTitle: {
		position: "absolute",
		top: 270,
		bottom: 15,
		left: 230,
		right: 50,
		height: 30,
		width: 120
	},
	legsTitle: {
		position: "absolute",
		top: 320,
		bottom: 15,
		left: 230,
		right: 50,
		height: 30,
		width: 120
	},
	routineTitle: {
		fontWeight: "bold",
		justifyContent: "center",
		position: "absolute",
		top: 5,
		bottom: 15,
		left: 95,
		right: 90
	}
});

const nut = StyleSheet.create({
	NutTitle:{
		fontWeight: "bold",
		fontSize:16,
		flexDirection:"row",
		//backgroundColor: "#0088ff",
	},
	NutTitleText:{
		fontWeight: "bold",
		fontSize:14,
		padding: 5,
		//backgroundColor: "#0088ff",
	},
	NutFoodTitleText:{
		fontWeight: "bold",
		fontSize:17,
		padding: 8,		
		color: "white",
		//backgroundColor: "#0088ff",
	},
	input: {
		margin: 15,
		height: 40,
		width: 300,
		borderColor: "#7a42f4",
		borderWidth: 1,
		color:"white",
	},
});

const Nutstyles = StyleSheet.create({
	container: {
	 flex: 1,
	 padding: 10,
	 backgroundColor:"#363534",
	 //justifyContent:'space-between',
	},
	sectionHeader: {
	  paddingTop: 2,
	  paddingLeft: 10,
	  paddingRight: 10,
	  paddingBottom: 2,
	  fontSize: 14,
	  fontWeight: 'bold',
	  backgroundColor: 'rgba(247,247,247,1.0)',
	},
	item: {
		fontSize:18, 
		fontWeight:"bold", 
		backgroundColor:"#0429b3",
		padding: 10,
		color: 'white',
	},
	title: {
		fontWeight: "bold",
		fontSize:20,
		justifyContent:"center",
		alignItems:"center",
		marginLeft:20,
		color: "white",
	},	
	btn: {
		padding: 5,
		margin: 5,
		height: window.height * 0.07,
		width: window.width * .8,
		
	},
  })

const text = StyleSheet.create({
	primary: {
		color: "#EE2F06",
		marginBottom: 4,
		marginRight: 20
	},
	title: {
		fontWeight: "bold",
		fontSize:20,
		justifyContent:"center",
		alignItems:"center",
		marginLeft:20,
		color: "black",
	},
	weightTrackerTile: {
		fontWeight: "bold",
		fontSize:18,
		justifyContent:"center",
		alignItems:"center",
		color: "black",
		marginTop: -250,
	},
	NutTitle:{
		fontWeight: "bold",
		fontSize:16,
		flexDirection:"row",
		//justifyContent:"center",
		//alignItems:"center",
		//marginLeft:20,
		color: "white",
		backgroundColor: "#0088ff",
	},
	NutTitleText:{
		fontWeight: "bold",
		fontSize:14,
		padding: 5,
		color: "white",
		backgroundColor: "#0088ff",
	},
	leadTitleText:{
		fontWeight: "bold",
		fontSize:14,
		padding: 5,
		color: "white",
		backgroundColor: "#a602f7",
	},
	NutFoodTitleText:{
		fontWeight: "bold",
		fontSize:20,
		padding: 6,
		paddingRight:58,
		color: "white",
		backgroundColor: "#0088ff",
	},
	item: {
		fontSize:18, 
		fontWeight:"bold", 
		backgroundColor:"#0429b3",
		padding: 10,
		color: 'white',
	},
	itemLead: {
		fontSize:18, 
		fontWeight:"bold", 
		backgroundColor:"#75009c",
		padding: 10,
		color: 'white',
	},
	Routinetitle: {
		fontWeight: "bold",
		fontSize:28,
		justifyContent:"center",
		alignItems:"center",
		//marginLeft:20,
		marginTop:15,
		color:"black"
	},
	appButtonContainer: {
		elevation: 8,
		backgroundColor: "#cc3300",
		borderRadius: 10,
		paddingVertical: 18,
		paddingHorizontal: 42
	  },
	  appButtonText: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "bold",
		alignSelf: "center",
		textTransform: "uppercase"
	  },

});

const button = StyleSheet.create({
	primary: {
		padding: 10,
		margin: 5,
		height: 100,
		width: 100
	},
	btn: {
		padding: 5,
		margin: 5,
		height: window.height * 0.07,
		width: window.width * .8,		
	},
	secondary: {
		alignSelf: "center",
		padding: 10,
		margin: -12,
		height: 70,
		width: 70
	},
	secondary1: {
		alignSelf: "center",
		padding: 5,
		margin: -10,
		height: 50,
		width: 50
	},
	selector: {
		alignSelf: "center",
		padding: 10,
		margin: -420,
		height: 70,
		width: 70
	},
	selector1: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	tiny: {
		alignSelf: "center",
		padding: 10,
		margin: -3,
		height: 30,
		width: 30
	},
	bodyHiddenButton: {
		alignSelf: "center",
		margin: 5,
		height: 100,
		width: 100,
		opacity: 0
	},
	routineSelectIcon: {
		height: 100,
		width: 100,
		margin: 10
	},
	legHiddenBtn: {
		alignSelf: "center",
		padding: 10,
		margin: -3,
		height: 70,
		width: 70,
		opacity: 90
	},
	clear: {
		marginBottom: 36,
		marginLeft: 30,
		height: 50,
		width: 140
	},
	generate: {
		marginBottom: 36,
		//padding:5,
		height: 50,
		width: 140
	},
	bodyIcon: {
		height: 150,
		width: 150,
		margin: 10
	},
	friendsIcon: {
		alignSelf: "flex-end",
		padding: 10,
		margin: 0,
		height: 60,
		width: 60,
		top: -170,
	},
	messageIcon: {
		alignSelf: "flex-end",
		padding: 10,
		margin: 0,
		height: 80,
		width: 80,
		top: -180,
		right: -10,
	},
	postIcon: {
		alignSelf: "flex-end",
		padding: 10,
		margin: 0,
		height: 60,
		width: 60,
		top: -190,
		right: 0,
	}
});

const image = StyleSheet.create({
	LogoHome: {
		padding: 20,
		width: window.width,
		height: 125 * logoRatio //150 is actual height of image
	},

	Touchable: {
		padding: 10,
		margin: 20,
		height: window.height * 0.13,
		width: window.width * 0.85,
		borderRadius: 15
	},
	TouchableButtonCommSec: {
		// marginTop: 10,
		// marginVertical: 20,
		// marginLeft: 320,
		height: window.height * 0.06,
		width: window.width * 0.06,
		height: 100,
		width: 100,

	},
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
	TouchableA: {
		padding: 0,
		margin: 5,
		marginTop:25,
		height: window.height * 0.13,
		width: window.width * 0.85,
		borderRadius: 35
	},

	hamOpacity: {
		right: -130,
		bottom: -30
	},
	hamImage: {
		height: 70,
		width: 70
	},
	Body: {
		alignSelf: "center",
		margin: -110,
		height: 700,
		width: 500,
		resizeMode: "stretch"
	},
	bodyIconView: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		margin: 5
	}
});

const logstyle = StyleSheet.create({
	container: {
		paddingTop: 10,
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	input: {
		margin: 15,
		height: 40,
		width: 300,
		borderColor: "#7a42f4",
		borderWidth: 1
	},
	submitButton: {
		padding: 5,
		margin: 5,
		height: 80,
		width: 200
	},
	submitProgress: {
		// padding: 5,
		marginBottom: 15,
		height: 40,
		width: 100
	},
	loggedInButtons: {
		height: 80,
		width: 300
	},
	submitButtonText: {
		color: "white"
	}
});
const exerciseStyle = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "black",
		margin:15,
		textShadowColor:"green",
		textShadowOffset:{width:5, height:5}
	},
	wrapPara: {		
		borderWidth:2,
		borderColor:"black",
	},
});
export {views, text, button, image, logstyle, styleDrawContent, exerciseStyle,  nut, Nutstyles, userDetailsPage};
