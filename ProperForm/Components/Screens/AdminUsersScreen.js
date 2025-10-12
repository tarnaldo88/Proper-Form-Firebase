import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { auth, db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { promoteUserToTrainer } from '../admin/promoteTrainer';

function AdminUsersScreen() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged(async (u) => {
      if (!u) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      try {
        const token = await u.getIdTokenResult(true);
        setIsAdmin(token?.claims?.admin === true);
      } catch (e) {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });
    return unsubAuth;
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(db, 'users'));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => {
        const u = d.data();
        return {
          uid: u.uid || d.id,
          displayName: u.displayName || '(no name)',
          role: u.role || 'user',
        };
      });
      setUsers(list);
    });
    return unsub;
  }, [isAdmin]);

  const onPromote = useCallback(async (uid) => {
    try {
      await promoteUserToTrainer(uid);
      Alert.alert('Success', 'User promoted to trainer');
    } catch (e) {
      Alert.alert('Error', e?.message || 'Unable to promote');
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAdmin) {
    return (
      <View style={styles.center}>
        <Text style={styles.denied}>Not authorized</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.displayName}</Text>
              <Text style={styles.meta}>{item.uid}</Text>
              <Text style={styles.meta}>role: {item.role}</Text>
            </View>
            {item.role !== 'trainer' ? (
              <TouchableOpacity style={styles.btn} onPress={() => onPromote(item.uid)}>
                <Text style={styles.btnTxt}>Promote to Trainer</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.trainer}>Trainer</Text>
            )}
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

export { AdminUsersScreen };

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  denied: { fontSize: 18, color: 'crimson' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  name: { fontSize: 16, fontWeight: '600', color: '#111' },
  meta: { fontSize: 12, color: '#666' },
  sep: { height: 1, backgroundColor: '#eee', marginVertical: 8 },
  btn: { backgroundColor: '#694fad', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
  btnTxt: { color: 'white', fontWeight: '600' },
  trainer: { color: '#04b043', fontWeight: '700' },
});
