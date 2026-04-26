import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

function TabIcon({ name, focused }) {
  const map = {
    index:       { on: '🏠', off: '🏡' },
    events:      { on: '📅', off: '📆' },
    alerts:      { on: '🔔', off: '🔕' },
    profile:     { on: '👤', off: '👥' },
    eventdetail: { on: '📋', off: '📋' },
  };
  const icons = map[name] || { on: '●', off: '○' };
  return <Text style={{ fontSize: 22 }}>{focused ? icons.on : icons.off}</Text>;
}

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#1a0533" />
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <TabIcon name={route.name} focused={focused} />
          ),
          tabBarActiveTintColor: '#a855f7',
          tabBarInactiveTintColor: '#777',
          tabBarStyle: {
            backgroundColor: '#0f0020',
            borderTopColor: '#2d1060',
            borderTopWidth: 1,
            paddingBottom: 6,
            height: 62,
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
          headerStyle: { backgroundColor: '#1a0533' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 17 },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{ title: 'Home', tabBarLabel: 'Home' }}
        />
        <Tabs.Screen
          name="events"
          options={{ title: 'Campus Events', tabBarLabel: 'Events' }}
        />
        <Tabs.Screen
          name="alerts"
          options={{ title: 'My Alerts', tabBarLabel: 'Alerts' }}
        />
        <Tabs.Screen
          name="profile"
          options={{ title: 'My Profile', tabBarLabel: 'Profile' }}
        />
        <Tabs.Screen
          name="eventdetail"
          options={{
            title: 'Event Details',
            tabBarLabel: 'Details',
            href: null,
          }}
        />
      </Tabs>
    </>
  );
}
