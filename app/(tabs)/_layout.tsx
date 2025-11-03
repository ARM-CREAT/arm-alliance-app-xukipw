
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { Stack } from 'expo-router';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';
import React from 'react';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      route: '/(tabs)/(home)',
      label: 'Accueil',
      icon: 'house.fill',
    },
    {
      route: '/(tabs)/profile',
      label: 'Membres',
      icon: 'person.3.fill',
    },
  ];

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Screen
          name="(home)"
          options={{
            title: 'Accueil',
            tabBarIcon: ({ color }) => <Icon name="house.fill" color={color} />,
            tabBarLabel: ({ color }) => <Label color={color}>Accueil</Label>,
          }}
        />
        <NativeTabs.Screen
          name="profile"
          options={{
            title: 'Membres',
            tabBarIcon: ({ color }) => <Icon name="person.3.fill" color={color} />,
            tabBarLabel: ({ color }) => <Label color={color}>Membres</Label>,
          }}
        />
      </NativeTabs>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
