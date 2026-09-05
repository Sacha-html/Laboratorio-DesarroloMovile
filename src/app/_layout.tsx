import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { RecetasProvider } from '../context/RecetasContext';

export default function RootLayout() {
  return (
    <RecetasProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F8F9FA' }
        }}
      />
    </RecetasProvider>
  );
}
