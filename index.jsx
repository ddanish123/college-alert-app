import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { EVENTS, ALERTS, USER } from '../data/mockData';

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const unreadCount = ALERTS.filter((a) => !a.read).length;

  const searchResults =
    search.length > 1
      ? EVENTS.filter(
          (e) =>
            e.title.toLowerCase().includes(search.toLowerCase()) ||
            e.category.toLowerCase().includes(search.toLowerCase())
        )
      : null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ── Banner ── */}
      <View style={styles.banner}>
        <View style={{ flex: 1 }}>
          <Text style={styles.greeting}>Welcome back 👋</Text>
          <Text style={styles.userName}>{USER.name}</Text>
          <Text style={styles.userInfo}>
            {USER.department} · {USER.semester}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.bellWrap}
          onPress={() => router.push('/alerts')}
        >
          <Text style={{ fontSize: 30 }}>🔔</Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* ── Search Bar ── */}
      <View style={styles.searchBar}>
        <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search events by name or category…"
          placeholderTextColor="#7a6a9a"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={{ color: '#a855f7', fontSize: 18, marginLeft: 6 }}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Search Results ── */}
      {searchResults && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Search Results ({searchResults.length})
          </Text>
          {searchResults.length === 0 ? (
            <Text style={styles.emptyTxt}>No events match "{search}"</Text>
          ) : (
            searchResults.map((ev) => (
              <EventRow
                key={ev.id}
                ev={ev}
                onPress={() =>
                  router.push({ pathname: '/eventdetail', params: { id: ev.id } })
                }
              />
            ))
          )}
        </View>
      )}

      {/* ── Stats + Main Content ── */}
      {!searchResults && (
        <>
          {/* Stats */}
          <View style={styles.statsRow}>
            <StatBox num={EVENTS.length} label="Events" color="#7c3aed" bg="#2d0d6b" />
            <StatBox num={unreadCount}   label="New Alerts" color="#e11d48" bg="#3b0764" />
            <StatBox num={3}             label="This Week"  color="#059669" bg="#1e3a5f" />
          </View>

          {/* Urgent alert strip */}
          {ALERTS.filter((a) => !a.read)
            .slice(0, 1)
            .map((al) => (
              <TouchableOpacity
                key={al.id}
                style={styles.urgentStrip}
                onPress={() => router.push('/alerts')}
              >
                <Text style={{ fontSize: 22 }}>⚠️</Text>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.urgentTitle}>{al.title}</Text>
                  <Text style={styles.urgentMsg} numberOfLines={1}>
                    {al.message}
                  </Text>
                </View>
                <Text style={{ color: '#fbbf24', fontSize: 20 }}>›</Text>
              </TouchableOpacity>
            ))}

          {/* Upcoming Events */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              <TouchableOpacity onPress={() => router.push('/events')}>
                <Text style={styles.seeAll}>See All →</Text>
              </TouchableOpacity>
            </View>
            {EVENTS.slice(0, 4).map((ev) => (
              <EventRow
                key={ev.id}
                ev={ev}
                onPress={() =>
                  router.push({ pathname: '/eventdetail', params: { id: ev.id } })
                }
              />
            ))}
          </View>
        </>
      )}

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

/* ── Sub-components ── */
function StatBox({ num, label, color, bg }) {
  return (
    <View style={[styles.statCard, { backgroundColor: bg }]}>
      <Text style={[styles.statNum, { color }]}>{num}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function EventRow({ ev, onPress }) {
  return (
    <TouchableOpacity style={styles.eventCard} onPress={onPress} activeOpacity={0.82}>
      <View style={[styles.iconBox, { backgroundColor: ev.color + '30' }]}>
        <Text style={{ fontSize: 26 }}>{ev.icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={[styles.catBadge, { backgroundColor: ev.color + '20', borderColor: ev.color }]}>
          <Text style={[styles.catText, { color: ev.color }]}>{ev.category}</Text>
        </View>
        <Text style={styles.evTitle} numberOfLines={1}>{ev.title}</Text>
        <Text style={styles.evMeta}>📅 {ev.date}   🕐 {ev.time}</Text>
        <Text style={styles.evMeta} numberOfLines={1}>📍 {ev.location}</Text>
      </View>
    </TouchableOpacity>
  );
}

/* ── Styles ── */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0018', paddingHorizontal: 16 },

  banner: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1a0533', borderRadius: 20,
    padding: 18, marginTop: 16,
    borderWidth: 1, borderColor: '#3d1a7a',
  },
  greeting:  { color: '#b39ddb', fontSize: 13 },
  userName:  { color: '#fff', fontSize: 21, fontWeight: '800', marginTop: 2 },
  userInfo:  { color: '#9e86c8', fontSize: 12, marginTop: 2 },
  bellWrap:  { position: 'relative', padding: 4 },
  badge: {
    position: 'absolute', top: 0, right: 0,
    backgroundColor: '#e11d48', borderRadius: 10,
    minWidth: 18, height: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },

  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1e0840', borderRadius: 14,
    paddingHorizontal: 14, paddingVertical: 11,
    marginTop: 14, borderWidth: 1, borderColor: '#3d1a7a',
  },
  searchInput: { flex: 1, color: '#fff', fontSize: 14 },

  statsRow: { flexDirection: 'row', marginTop: 14, gap: 10 },
  statCard: {
    flex: 1, borderRadius: 14, padding: 14,
    alignItems: 'center', borderWidth: 1, borderColor: '#3d1a7a',
  },
  statNum:   { fontSize: 24, fontWeight: '800' },
  statLabel: { color: '#b39ddb', fontSize: 11, marginTop: 2 },

  urgentStrip: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#431407', borderRadius: 14,
    padding: 14, marginTop: 14,
    borderWidth: 1, borderColor: '#92400e',
  },
  urgentTitle: { color: '#fbbf24', fontWeight: '700', fontSize: 13 },
  urgentMsg:   { color: '#fcd34d', fontSize: 11, marginTop: 2 },

  section:       { marginTop: 22 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle:  { color: '#fff', fontSize: 17, fontWeight: '800' },
  seeAll:        { color: '#a855f7', fontSize: 13, fontWeight: '600' },
  emptyTxt:      { color: '#9e86c8', textAlign: 'center', marginTop: 20, fontSize: 14 },

  eventCard: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: '#1e0840', borderRadius: 16,
    padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: '#3d1a7a',
    gap: 12,
  },
  iconBox:  { width: 54, height: 54, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  catBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, borderWidth: 1, marginBottom: 4 },
  catText:  { fontSize: 10, fontWeight: '700' },
  evTitle:  { color: '#fff', fontSize: 14, fontWeight: '700', marginBottom: 4 },
  evMeta:   { color: '#b39ddb', fontSize: 11, marginBottom: 2 },
});
