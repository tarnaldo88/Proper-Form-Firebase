import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { text } from "./Styles";
import { collection, query, where, getDocs, orderBy, limit, getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';

class PostScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			userSteps: 0,
			userName: 'User',
			userImage: 'https://img.icons8.com/color/96/000000/user-male-circle--v1.png',
			today: new Date().toLocaleDateString()
		};
	}

	componentDidMount() {
		this.fetchUserSteps();
	}

	fetchUserSteps = async () => {
		try {
			const user = auth.currentUser;
			if (!user) {
				throw new Error('No user logged in');
			}

			// Get user's display name and photo URL
			const userDoc = await getDoc(doc(db, 'users', user.uid));
			const userData = userDoc.data();

			// Get today's steps for the current user
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			
			const stepsRef = collection(db, 'steps');
			const q = query(
				stepsRef,
				where('userId', '==', user.uid),
				where('date', '>=', today),
				orderBy('date', 'desc'),
				limit(1)
			);

			const querySnapshot = await getDocs(q);
			let latestSteps = 0;

			if (!querySnapshot.empty) {
				// Get the latest steps entry
				const latestDoc = querySnapshot.docs[0];
				latestSteps = latestDoc.data().steps || 0;
			}

			this.setState({
				userSteps: latestSteps,
				userName: user.displayName || userData?.displayName || 'User',
				userImage: user.photoURL || userData?.photoURL || 'https://img.icons8.com/color/96/000000/user-male-circle--v1.png',
				loading: false
			});
		} catch (error) {
			console.error("Error fetching steps data: ", error);
			this.setState({ loading: false });
		}
	};
	
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
            case "Aman":
              this.props.navigation.navigate('friendB')
                break;
        }
      }
		navToPostSteps = () => {
			this.props.navigation.navigate('postSteps');
		}

		navToRankings = () => {
			this.props.navigation.navigate('rankings');
		}

		render() {
		const { loading, userName, userSteps, userImage, today } = this.state;

		if (loading) {
			return (
				<View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
					<ActivityIndicator size="large" color="#4CAF50" />
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<Text style={styles.title}>Today's Steps</Text>
				<Text style={styles.date}>{today}</Text>
				
				<View style={styles.statsCard}>
					<Image 
						source={{ uri: userImage }} 
						style={styles.userImage}
						defaultSource={{ uri: 'https://img.icons8.com/color/96/000000/user-male-circle--v1.png' }}
					/>
					<Text style={styles.userName}>{userName}</Text>
					<Text style={styles.stepsCount}>{userSteps.toLocaleString()}</Text>
					<Text style={styles.stepsLabel}>STEPS TODAY</Text>
				</View>

				<View style={styles.buttonsContainer}>
					<TouchableOpacity 
						style={[styles.button, styles.primaryButton]} 
						onPress={this.navToPostSteps}
					>
						<Text style={styles.buttonText}>➕ Log Your Steps</Text>
					</TouchableOpacity>

					<TouchableOpacity 
						style={[styles.button, styles.secondaryButton]}
						onPress={this.navToRankings}
					>
						<Text style={[styles.buttonText, { color: '#333' }]}>👥 View Leaderboard</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.tipsContainer}>
					<Text style={styles.tipsTitle}>💡 Daily Tip</Text>
					<Text style={styles.tipText}>
						Aim for at least 10,000 steps a day for better health. 
						You're {userSteps >= 10000 ? 'doing great!' : 'almost there!'}
					</Text>
				</View>
			</View>
		);
	}
}
export {PostScreen};

const styles = StyleSheet.create({
  // Main container styles
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  date: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  
  // Stats card styles
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  stepsCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 10,
  },
  stepsLabel: {
    fontSize: 16,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  // Buttons container
  buttonsContainer: {
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  // Tips container
  tipsContainer: {
    backgroundColor: '#f0f9f0',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
  },
  tipText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  
  // Card styles
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 10,
  },
  cardContent: {
    paddingVertical: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 10,
  },
  
  // Utility classes
  textCenter: {
    textAlign: 'center',
  },
  mb10: {
    marginBottom: 10,
  },
  mt10: {
    marginTop: 10,
  },
  ml10: {
    marginLeft: 10,
  },
  mr10: {
    marginRight: 10,
  },
  p10: {
    padding: 10,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  halfWidth: {
    width: '50%',
  }
});