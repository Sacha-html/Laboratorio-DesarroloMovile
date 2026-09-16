import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { RecetasProvider } from '@/context/recetas-context';

export default function RootLayout() {
  return (
    // El provider se monta una vez para que todas las rutas compartan el catálogo de esta sesión.
    <RecetasProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          // Cada pantalla diseña su propio encabezado dentro del contenido.
          headerShown: false,
          contentStyle: { backgroundColor: '#F8F9FA' },
        }}
      />
    </RecetasProvider>
  );
}
