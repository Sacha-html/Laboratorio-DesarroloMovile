import { ImageBackground, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useRecetas } from '@/context/recetas-context';

const IMAGEN_FONDO = require('../../assets/Imagenes/fondo3.jpeg');

export default function Favoritos() {
  const router = useRouter();
  const { favoritos } = useRecetas();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={IMAGEN_FONDO} style={styles.fondo}>
        <View style={styles.velo}>
          <ScrollView contentContainerStyle={styles.contenido}>
            <Pressable
              onPress={() => router.back()}
              style={styles.volver}
              accessibilityRole="button"
              accessibilityLabel="Volver al listado de recetas"
            >
              <Text style={styles.volverTexto}>‹ Volver al listado</Text>
            </Pressable>

            <Text style={styles.marca}>RECETARIO</Text>
            <Text style={styles.titulo}>Tus favoritas</Text>

            {/* favoritos ya se deriva del contexto; esta pantalla sólo decide cómo mostrarlo. */}
            {favoritos.length ? favoritos.map((receta) => (
              <Pressable
                key={receta.id}
                style={styles.tarjeta}
                onPress={() => router.push({ pathname: '/receta/[id]', params: { id: receta.id } })}
                accessibilityRole="button"
                accessibilityLabel={`Ver receta favorita ${receta.nombre}`}
              >
                <Text style={styles.icono}>{receta.icono}</Text>
                <View style={styles.info}>
                  <Text style={styles.nombre}>{receta.nombre}</Text>
                  <Text style={styles.meta}>{receta.categoria} · {receta.tiempo}</Text>
                </View>
                <Text style={styles.flecha}>›</Text>
              </Pressable>
            )) : (
              <View accessible accessibilityRole="alert" style={styles.vacio}>
                <Text style={styles.vacioTitulo}>Todavía no tenés favoritas</Text>
                <Text style={styles.meta}>Marcá una receta con la estrella para verla acá.</Text>
              </View>
            )}
          </ScrollView>
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
  marca: { color: '#A7442C', fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  titulo: { color: '#512116', fontSize: 26, fontWeight: '800', marginTop: 3, marginBottom: 19 },
  tarjeta: { alignItems: 'center', backgroundColor: '#FFFDF8', borderColor: '#E7CDBD', borderRadius: 10, borderWidth: 1, flexDirection: 'row', marginBottom: 9, padding: 12 },
  icono: { fontSize: 27, marginRight: 12 },
  info: { flex: 1 },
  nombre: { color: '#482017', fontSize: 16, fontWeight: '800' },
  meta: { color: '#80675B', fontSize: 12, marginTop: 3 },
  flecha: { color: '#A7442C', fontSize: 28 },
  vacio: { alignItems: 'center', backgroundColor: '#FFFDF8', borderColor: '#E7CDBD', borderRadius: 12, borderWidth: 1, padding: 20 },
  vacioTitulo: { color: '#482017', fontSize: 18, fontWeight: '800', marginBottom: 6 },
});
