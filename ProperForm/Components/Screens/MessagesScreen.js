// @refresh reset

import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import {  StyleSheet, TextInput, View, YellowBox, Button, LogBox } from 'react-native'
import { auth, db } from '../firebase'
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp, doc } from 'firebase/firestore'

function MessagesScreen({ route }) {
  const { chatId, otherUser } = route?.params || {};
  const [messages, setMessages] = useState([]);

  const currentUser = auth.currentUser;
  const giftedUser = currentUser
    ? { _id: currentUser.uid, name: currentUser.displayName || 'You', avatar: currentUser.photoURL || undefined }
    : { _id: 'anon', name: 'You' };

  useEffect(() => {
    if (!chatId) return;
    const msgsRef = collection(doc(collection(db, 'conversations'), chatId), 'messages');
    const q = query(msgsRef, orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => {
        const data = d.data();
        return {
          _id: d.id,
          text: data.text,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
          user: data.user,
        };
      });
      setMessages(list);
    });
    return () => unsub();
  }, [chatId]);

  const handleSend = async (newMessages = []) => {
    if (!chatId) return;
    const msgsRef = collection(doc(collection(db, 'conversations'), chatId), 'messages');
    await Promise.all(
      newMessages.map((m) =>
        addDoc(msgsRef, {
          text: m.text,
          createdAt: serverTimestamp(),
          user: giftedUser,
        })
      )
    );
  };

  return <GiftedChat messages={messages} user={giftedUser} onSend={handleSend} />
}
export { MessagesScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
})