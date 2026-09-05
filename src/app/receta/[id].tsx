import { type ReactNode } from 'react';
import { ImageBackground, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { useRecetas } from '@/context/recetas-context';

const IMAGEN_FONDO = require('../../../assets/Imagenes/fondo3.jpeg');

export default function DetalleReceta() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { obtenerPorId, esFavorita, toggleFavorito } = useRecetas();

  // La ruta aporta sólo el ID; los datos actuales de la receta vienen del catálogo compartido.
  const receta = typeof id === 'string' ? obtenerPorId(id) : undefined;

  return (
    <Pantalla>
      {receta ? (
        <>
          <Pressable onPress={() => router.back()} style={styles.volver} accessibilityRole="button" accessibilityLabel="Volver al listado de recetas">
            <Text style={styles.volverTexto}>‹ Volver al listado</Text>
          </Pressable>

          <View style={styles.tarjeta}>
            <Text style={styles.icono}>{receta.icono}</Text>
            <Text style={styles.titulo}>{receta.nombre}</Text>
            <Text style={styles.meta}>{receta.categoria} · {receta.tiempo} · Dificultad {receta.dificultad}</Text>
            <Pressable
              onPress={() => toggleFavorito(receta.id)}
              style={styles.favorito}
              accessibilityRole="button"
              accessibilityLabel={`${esFavorita(receta.id) ? 'Quitar' : 'Agregar'} ${receta.nombre} de favoritas`}
              accessibilityState={{ selected: esFavorita(receta.id) }}
            >
              <Text style={styles.favoritoTexto}>{esFavorita(receta.id) ? '★ Quitar de favoritas' : '☆ Agregar a favoritas'}</Text>
            </Pressable>

            <Text style={styles.seccion}>Ingredientes</Text>
            {receta.ingredientes.map((ingrediente) => <Text key={ingrediente} style={styles.item}>• {ingrediente}</Text>)}
            <Text style={styles.seccion}>Preparación</Text>
            {receta.pasos.map((paso, indice) => <Text key={paso} style={styles.item}>{indice + 1}. {paso}</Text>)}
          </View>
        </>
      ) : (
        <View accessible accessibilityRole="alert" style={styles.noEncontrada}>
          <Text style={styles.titulo}>Receta no encontrada</Text>
          <Pressable onPress={() => router.back()} style={styles.favorito} accessibilityRole="button" accessibilityLabel="Volver al listado de recetas">
            <Text style={styles.favoritoTexto}>Volver</Text>
          </Pressable>
        </View>
      )}
    </Pantalla>
  );
}

function Pantalla({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={IMAGEN_FONDO} style={styles.fondo}>
        <View style={styles.velo}>
          <ScrollView contentContainerStyle={styles.contenido}>{children}</ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#6B251A' },
  fondo: { flex: 1 },
  velo: { flex: 1, backgroundColor: 'rgba(255, 246, 232, 0.9)' },
  contenido: { padding: 18, paddingBottom: 34 },
  volver: { alignSelf: 'flex-start', marginBottom: 14, paddingVertical: 8 },
  volverTexto: { color: '#8C351F', fontSize: 14, fontWeight: '800' },
  tarjeta: { backgroundColor: '#FFFDF8', borderColor: '#E7CDBD', borderRadius: 12, borderWidth: 1, padding: 20 },
  icono: { fontSize: 42, textAlign: 'center' },
  titulo: { color: '#482017', fontSize: 25, fontWeight: '800', marginTop: 7, textAlign: 'center' },
  meta: { color: '#80675B', fontSize: 12, lineHeight: 18, marginTop: 7, textAlign: 'center' },
  favorito: { alignItems: 'center', borderColor: '#A7442C', borderRadius: 8, borderWidth: 1, marginTop: 18, minHeight: 44, justifyContent: 'center', paddingHorizontal: 12 },
  favoritoTexto: { color: '#8C351F', fontWeight: '800' },
  seccion: { color: '#8C351F', fontSize: 16, fontWeight: '800', marginBottom: 7, marginTop: 23 },
  item: { color: '#4E352B', fontSize: 14, lineHeight: 22, marginBottom: 5 },
  noEncontrada: { alignItems: 'center', backgroundColor: '#FFFDF8', borderRadius: 12, padding: 20 },
});
