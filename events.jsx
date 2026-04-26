import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { EVENTS, CATEGORIES } from '../data/mockData';

export default function EventsScreen() {
  const router = useRouter();
  const [active, setActive] = useState('All');

  const list =
    active === 'All' ? EVENTS : EVENTS.filter((e) => e.category === active);

  return (
    <View style={styles.container}>
      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterBar}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, active === cat && styles.chipActive]}
            onPress={() => setActive(cat)}
          >
            <Text style={[styles.chipText, active === cat && styles.chipTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.countTxt}>
        {list.length} event{list.length !== 1 ? 's' : ''}
      </Text>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.82}
            onPress={() =>
              router.push({ pathname: '/eventdetail', params: { id: item.id } })
            }
          >
            {/* Icon */}
            <View style={[styles.iconBox, { backgroundColor: item.color + '30' }]}>
              <Text style={{ fontSize: 28 }}>{item.icon}</Text>
            </View>

            {/* Info */}
            <View style={{ flex: 1 }}>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: item.color + '20', borderColor: item.color },
                ]}
              >
                <Text style={[styles.badgeText, { color: item.color }]}>
                  {item.category}
                </Text>
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>📅 {item.date}   🕐 {item.time}</Text>
              <Text style={styles.meta} numberOfLines={1}>📍 {item.location}</Text>
              <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ fontSize: 48 }}>📭</Text>
            <Text style={styles.emptyTxt}>No events in this category</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#0a0018' },
  filterBar:   { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  chip: {
    paddingHorizontal: 16, paddingVertical: 7,
    borderRadius: 20, backgroundColor: '#1e0840',
    borderWidth: 1, borderColor: '#3d1a7a', marginRight: 8,
  },
  chipActive:     { backgroundColor: '#7c3aed', borderColor: '#a855f7' },
  chipText:       { color: '#b39ddb', fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  countTxt:       { color: '#9e86c8', fontSize: 12, paddingHorizontal: 18, paddingBottom: 6 },
  listContent:    { paddingHorizontal: 16, paddingBottom: 30 },
  card: {
    flexDirection: 'row', backgroundColor: '#1e0840',
    borderRadius: 16, padding: 14, marginBottom: 12,
    borderWidth: 1, borderColor: '#3d1a7a', gap: 12,
  },
  iconBox:   { width: 56, height: 56, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  badge:     { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, borderWidth: 1, marginBottom: 4 },
  badgeText: { fontSize: 10, fontWeight: '700' },
  title:     { color: '#fff', fontSize: 15, fontWeight: '700', marginBottom: 4 },
  meta:      { color: '#b39ddb', fontSize: 11, marginBottom: 2 },
  desc:      { color: '#9e86c8', fontSize: 12, marginTop: 4, lineHeight: 17 },
  empty:     { alignItems: 'center', marginTop: 60 },
  emptyTxt:  { color: '#9e86c8', fontSize: 15, marginTop: 10 },
});
