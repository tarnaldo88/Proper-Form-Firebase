import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {views, text, button, image} from "./Styles";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

class ChatSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const currentUser = auth.currentUser;
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role', '==', 'trainer'));
    this.unsubscribeUsers = onSnapshot(q, (snap) => {
      const list = snap.docs
        .map((d) => {
          const u = d.data();
          return {
            uid: u.uid || d.id,
            name: u.displayName || 'Trainer',
            image: u.photoURL || 'https://bootdey.com/img/Content/avatar/avatar4.png',
            position: u.title || '',
          };
        })
        .filter((it) => !currentUser || it.uid !== currentUser.uid);
      this.setState({ data: list });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeUsers) this.unsubscribeUsers();
  }

  async clickEventListener(item) {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        Alert.alert('Not signed in', 'Please sign in to start a chat.');
        return;
      }

      const otherUserId = item.uid;
      if (!otherUserId) {
        Alert.alert('Missing user', 'Selected user is missing an id (uid).');
        return;
      }

      const a = currentUser.uid < otherUserId ? currentUser.uid : otherUserId;
      const b = currentUser.uid < otherUserId ? otherUserId : currentUser.uid;
      const participantsHash = `${a}_${b}`;

      const convsRef = collection(db, 'conversations');
      const q = query(convsRef, where('participantsHash', '==', participantsHash));
      const snap = await getDocs(q);

      let chatId;
      if (!snap.empty) {
        chatId = snap.docs[0].id;
      } else {
        const docRef = await addDoc(convsRef, {
          participants: [currentUser.uid, otherUserId],
          participantsHash,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          lastMessage: null,
        });
        chatId = docRef.id;
      }

      this.props.navigation.navigate('Messages', {
        chatId,
        otherUser: { uid: otherUserId, name: item.name, image: item.image },
      });
    } catch (e) {
      Alert.alert('Chat error', e?.message || 'Unable to open chat');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.uid;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
                <View style={styles.cardHeader}>
                  <Image style={styles.icon} source={{uri:"https://img.icons8.com/flat_round/64/000000/hearts.png"}}/>
                </View>
                <Image style={styles.userImage} source={{uri:item.image}}/>
                <View style={styles.cardFooter}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.position}>{item.position}</Text>
                    <TouchableOpacity style={styles.followButton} onPress={()=> this.clickEventListener(item)}>
                      <Text style={styles.followButtonText}>Chat</Text>  
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}/>
      </View>
    );
  }
}

export {ChatSelect}

const styles = StyleSheet.create({
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