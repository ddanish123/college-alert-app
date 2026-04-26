import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { EVENTS } from '../data/mockData';

export default function EventDetailScreen() {
  const { id }  = useLocalSearchParams();
  const router  = useRouter();
  const event   = EVENTS.find((e) => e.id === id) || EVENTS[0];

  const [registered, setRegistered] = useState(false);
  const [reminded,   setReminded]   = useState(false);

  const handleRegister = () => {
    const next = !registered;
    setRegistered(next);
    Alert.alert(
      next ? 'Registered! ✅' : 'Unregistered',
      next
        ? `You have successfully registered for "${event.title}". A confirmation will be sent to your email.`
        : `You have unregistered from "${event.title}".`
    );
  };

  const handleReminder = () => {
    const next = !reminded;
    setReminded(next);
    Alert.alert(
      next ? 'Reminder Set! 🔔' : 'Reminder Removed',
      next
        ? "You'll be notified 1 hour before the event starts."
        : 'Reminder has been removed.'
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Hero */}
      <View style={[styles.hero, { backgroundColor: event.color + '22', borderColor: event.color + '55' }]}>
        <View style={[styles.heroIconBox, { backgroundColor: event.color + '33' }]}>
          <Text style={{ fontSize: 44 }}>{event.icon}</Text>
        </View>
        <View style={[styles.catBadge, { backgroundColor: event.color + '25', borderColor: event.color }]}>
          <Text style={[styles.catText, { color: event.color }]}>{event.category}</Text>
        </View>
        <Text style={styles.heroTitle}>{event.title}</Text>
        <Text style={styles.heroOrg}>Organized by: {event.organizer}</Text>
      </View>

      {/* Date / Time */}
      <View style={styles.infoRow}>
        <InfoBox icon="📅" label="Date" value={event.date} />
        <InfoBox icon="🕐" label="Time" value={event.time} />
      </View>

      {/* Location */}
      <View style={[styles.infoCard, { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 12 }]}>
        <Text style={{ fontSize: 28 }}>📍</Text>
        <View>
          <Text style={styles.infoLabel}>Location</Text>
          <Text style={styles.infoValue}>{event.location}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About This Event</Text>
        <Text style={styles.desc}>{event.description}</Text>
      </View>

      {/* Tags */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tags</Text>
        <View style={styles.tagsRow}>
          {event.tags.map((tag) => (
            <View
              key={tag}
              style={[styles.tag, { borderColor: event.color, backgroundColor: event.color + '18' }]}
            >
              <Text style={[styles.tagText, { color: event.color }]}>#{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[
            styles.btn,
            reminded
              ? { backgroundColor: '#1e3a5f', borderColor: '#2563eb' }
              : { backgroundColor: '#1e0840', borderColor: '#3d1a7a' },
          ]}
          onPress={handleReminder}
        >
          <Text style={styles.btnTxt}>
            {reminded ? '🔔  Reminder Set' : '🔕  Set Reminder'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn,
            { backgroundColor: registered ? '#065f46' : event.color, borderColor: 'transparent' },
          ]}
          onPress={handleRegister}
        >
          <Text style={styles.btnTxt}>
            {registered ? '✅  Registered' : '📋  Register Now'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Back */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backTxt}>← Go Back</Text>
      </TouchableOpacity>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

function InfoBox({ icon, label, value }) {
  return (
    <View style={styles.infoCard}>
      <Text style={{ fontSize: 26, marginBottom: 4 }}>{icon}</Text>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0018', paddingHorizontal: 16 },

  hero: {
    borderRadius: 22, padding: 26,
    alignItems: 'center', marginTop: 16,
    borderWidth: 1,
  },
  heroIconBox: {
    width: 86, height: 86, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  catBadge:  { paddingHorizontal: 14, paddingVertical: 4, borderRadius: 20, borderWidth: 1, marginBottom: 10 },
  catText:   { fontSize: 12, fontWeight: '700' },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 6 },
  heroOrg:   { color: '#b39ddb', fontSize: 13 },

  infoRow:  { flexDirection: 'row', gap: 12, marginTop: 14 },
  infoCard: {
    flex: 1, backgroundColor: '#1e0840',
    borderRadius: 14, padding: 14,
    alignItems: 'center', borderWidth: 1, borderColor: '#3d1a7a',
  },
  infoLabel: { color: '#9e86c8', fontSize: 11, marginBottom: 4 },
  infoValue: { color: '#fff', fontSize: 13, fontWeight: '700', textAlign: 'center' },

  section:      { marginTop: 22 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 10 },
  desc: {
    color: '#c4b5fd', fontSize: 14, lineHeight: 23,
    backgroundColor: '#1e0840', borderRadius: 14,
    padding: 14, borderWidth: 1, borderColor: '#3d1a7a',
  },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag:     { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, borderWidth: 1 },
  tagText: { fontSize: 12, fontWeight: '600' },

  btnRow: { flexDirection: 'row', gap: 12, marginTop: 26 },
  btn: {
    flex: 1, paddingVertical: 15,
    borderRadius: 14, alignItems: 'center',
    borderWidth: 1,
  },
  btnTxt: { color: '#fff', fontWeight: '700', fontSize: 13 },

  backBtn: {
    marginTop: 14, alignItems: 'center',
    paddingVertical: 12,
  },
  backTxt: { color: '#9e86c8', fontSize: 14, fontWeight: '600' },
});
