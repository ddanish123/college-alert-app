import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { USER } from '../data/mockData';

export default function ProfileScreen() {
  const [push,  setPush]  = useState(USER.notifications);
  const [email, setEmail] = useState(USER.emailAlerts);
  const [sms,   setSms]   = useState(USER.smsAlerts);

  const initials = USER.name.split(' ').map((n) => n[0]).join('');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTxt}>{initials}</Text>
        </View>
        <Text style={styles.name}>{USER.name}</Text>
        <Text style={styles.rollNo}>{USER.rollNo}</Text>
        <View style={styles.deptBadge}>
          <Text style={styles.deptTxt}>{USER.department}</Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.card}>
        <Text style={styles.cardHead}>STUDENT INFORMATION</Text>
        {[
          ['🎓', 'Department', USER.department],
          ['📚', 'Semester',   USER.semester],
          ['📧', 'Email',      USER.email],
          ['📱', 'Phone',      USER.phone],
        ].map(([icon, lbl, val], i, arr) => (
          <View
            key={lbl}
            style={[styles.row, i < arr.length - 1 && styles.rowBorder]}
          >
            <Text style={{ fontSize: 20 }}>{icon}</Text>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.rowLbl}>{lbl}</Text>
              <Text style={styles.rowVal}>{val}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Notifications */}
      <View style={styles.card}>
        <Text style={styles.cardHead}>NOTIFICATION SETTINGS</Text>
        {[
          ['🔔', 'Push Notifications', push,  setPush],
          ['📧', 'Email Alerts',        email, setEmail],
          ['💬', 'SMS Alerts',          sms,   setSms],
        ].map(([icon, lbl, val, setter], i, arr) => (
          <View
            key={lbl}
            style={[
              styles.row,
              { justifyContent: 'space-between' },
              i < arr.length - 1 && styles.rowBorder,
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Text style={{ fontSize: 20 }}>{icon}</Text>
              <Text style={styles.rowVal}>{lbl}</Text>
            </View>
            <Switch
              value={val}
              onValueChange={setter}
              trackColor={{ false: '#3d1a7a', true: '#7c3aed' }}
              thumbColor={val ? '#a855f7' : '#888'}
            />
          </View>
        ))}
      </View>

      {/* Activity */}
      <View style={styles.card}>
        <Text style={styles.cardHead}>MY ACTIVITY</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
          {[
            ['5',  'Registered', '#7c3aed'],
            ['12', 'Alerts',     '#db2777'],
            ['3',  'Upcoming',   '#059669'],
          ].map(([num, lbl, color]) => (
            <View key={lbl} style={[styles.statBox, { borderColor: color }]}>
              <Text style={[styles.statNum, { color }]}>{num}</Text>
              <Text style={styles.statLbl}>{lbl}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() =>
          Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: () => {} },
          ])
        }
      >
        <Text style={styles.logoutTxt}>🚪  Logout</Text>
      </TouchableOpacity>

      <Text style={styles.version}>College Alert App  v1.0.0</Text>
      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0018', paddingHorizontal: 16 },

  avatarSection: { alignItems: 'center', paddingTop: 24, paddingBottom: 16 },
  avatar: {
    width: 82, height: 82, borderRadius: 41,
    backgroundColor: '#7c3aed',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 12, borderWidth: 3, borderColor: '#a855f7',
  },
  avatarTxt: { color: '#fff', fontSize: 30, fontWeight: '800' },
  name:      { color: '#fff', fontSize: 20, fontWeight: '800' },
  rollNo:    { color: '#9e86c8', fontSize: 13, marginTop: 2 },
  deptBadge: {
    marginTop: 8, backgroundColor: '#2d0d6b',
    paddingHorizontal: 14, paddingVertical: 4,
    borderRadius: 20, borderWidth: 1, borderColor: '#7c3aed',
  },
  deptTxt: { color: '#a855f7', fontSize: 12, fontWeight: '700' },

  card: {
    backgroundColor: '#1e0840', borderRadius: 16,
    padding: 16, marginBottom: 14,
    borderWidth: 1, borderColor: '#3d1a7a',
  },
  cardHead:  { color: '#a855f7', fontSize: 11, fontWeight: '800', letterSpacing: 1, marginBottom: 10 },
  row:       { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#2d1060' },
  rowLbl:    { color: '#9e86c8', fontSize: 11 },
  rowVal:    { color: '#fff', fontSize: 14, fontWeight: '600', marginTop: 2 },

  statBox: {
    flex: 1, borderRadius: 12, borderWidth: 1,
    padding: 12, alignItems: 'center', backgroundColor: '#0a0018',
  },
  statNum: { fontSize: 22, fontWeight: '800' },
  statLbl: { color: '#9e86c8', fontSize: 10, textAlign: 'center', marginTop: 3 },

  logoutBtn: {
    backgroundColor: '#3b0a0a', borderRadius: 14,
    padding: 16, alignItems: 'center',
    borderWidth: 1, borderColor: '#991b1b', marginBottom: 12,
  },
  logoutTxt: { color: '#f87171', fontWeight: '700', fontSize: 15 },
  version:   { color: '#4a3a6a', textAlign: 'center', fontSize: 11 },
});
