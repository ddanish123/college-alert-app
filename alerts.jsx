import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ALERTS } from '../data/mockData';

const TYPE = {
  warning: { bg: '#422006', border: '#92400e', icon: '⚠️', color: '#fbbf24' },
  info:    { bg: '#0c1a3a', border: '#1d4ed8', icon: 'ℹ️',  color: '#60a5fa' },
  error:   { bg: '#3b0a0a', border: '#991b1b', icon: '🚨', color: '#f87171' },
  success: { bg: '#052e16', border: '#166534', icon: '✅', color: '#4ade80' },
};

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState(ALERTS);
  const [tab, setTab]       = useState('All');

  const markAll    = ()  => setAlerts((p) => p.map((a) => ({ ...a, read: true })));
  const toggleRead = (id) =>
    setAlerts((p) => p.map((a) => (a.id === id ? { ...a, read: !a.read } : a)));

  const shown =
    tab === 'Unread' ? alerts.filter((a) => !a.read) :
    tab === 'Read'   ? alerts.filter((a) =>  a.read) : alerts;

  const unread = alerts.filter((a) => !a.read).length;

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.unreadLbl}>
          {unread > 0 ? `${unread} unread` : 'All caught up 🎉'}
        </Text>
        {unread > 0 && (
          <TouchableOpacity onPress={markAll}>
            <Text style={styles.markAll}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {['All', 'Unread', 'Read'].map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tabBtn, tab === t && styles.tabBtnActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabTxt, tab === t && { color: '#fff' }]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={shown}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ fontSize: 46 }}>🔕</Text>
            <Text style={styles.emptyTxt}>No alerts here</Text>
          </View>
        }
        renderItem={({ item }) => {
          const s = TYPE[item.type] || TYPE.info;
          return (
            <TouchableOpacity
              style={[
                styles.alertCard,
                { backgroundColor: s.bg, borderColor: s.border },
                !item.read && styles.unreadCard,
              ]}
              onPress={() => toggleRead(item.id)}
              activeOpacity={0.85}
            >
              <View style={styles.alertTop}>
                <Text style={{ fontSize: 22 }}>{s.icon}</Text>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={[styles.alertTitle, { color: s.color }]}>
                    {item.title}
                  </Text>
                  <Text style={styles.alertTime}>{item.time}</Text>
                </View>
                {!item.read && <View style={styles.dot} />}
              </View>
              <Text style={styles.alertMsg}>{item.message}</Text>
              <Text style={styles.tapHint}>
                {item.read ? 'Tap to mark unread' : 'Tap to mark as read'}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#0a0018' },
  topBar:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 14, paddingBottom: 6 },
  unreadLbl:  { color: '#b39ddb', fontSize: 13 },
  markAll:    { color: '#a855f7', fontSize: 13, fontWeight: '700' },
  tabRow:     { flexDirection: 'row', paddingHorizontal: 16, gap: 10, paddingBottom: 12 },
  tabBtn:     { paddingHorizontal: 18, paddingVertical: 7, borderRadius: 20, backgroundColor: '#1e0840', borderWidth: 1, borderColor: '#3d1a7a' },
  tabBtnActive: { backgroundColor: '#7c3aed', borderColor: '#a855f7' },
  tabTxt:     { color: '#9e86c8', fontSize: 13, fontWeight: '600' },
  listContent: { paddingHorizontal: 16, paddingBottom: 30 },
  alertCard:  { borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1 },
  unreadCard: { borderLeftWidth: 3 },
  alertTop:   { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  alertTitle: { fontSize: 14, fontWeight: '700' },
  alertTime:  { color: '#9e86c8', fontSize: 11, marginTop: 2 },
  dot:        { width: 10, height: 10, borderRadius: 5, backgroundColor: '#a855f7', marginTop: 4 },
  alertMsg:   { color: '#c4b5fd', fontSize: 13, lineHeight: 19 },
  tapHint:    { color: '#6d5a9e', fontSize: 10, marginTop: 8, textAlign: 'right' },
  empty:      { alignItems: 'center', marginTop: 60 },
  emptyTxt:   { color: '#9e86c8', fontSize: 15, marginTop: 10 },
});
