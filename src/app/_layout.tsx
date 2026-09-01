import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false, // Desactiva la barra superior por defecto para que la app controle su propio diseño
          contentStyle: { backgroundColor: '#F8F9FA' }
        }}
      />
    </>
  );
}
