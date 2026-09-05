import { Image, ImageBackground, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const IMAGEN_FONDO = require('../../assets/Imagenes/fondo3.jpeg');
const IMAGEN_PORTADA = require('../../assets/Imagenes/Sacha2.jpeg');

export default function Inicio() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={IMAGEN_FONDO} style={styles.fondo} resizeMode="cover">
        <View style={styles.velo}>
          <View style={styles.hero}>
            <Image
              source={IMAGEN_PORTADA}
              style={styles.portada}
              resizeMode="contain"
              accessibilityLabel="Plato tradicional argentino"
            />
          </View>
          <View style={styles.contenido}>
            <Text style={styles.titulo}>Recetario Argentino</Text>
            <Text style={styles.subtitulo}>Comidas típicas y tradicionales</Text>
            <Pressable
              style={styles.boton}
              onPress={() => router.push('/recetas')}
              accessibilityRole="button"
              accessibilityLabel="Ingresar al recetario"
            >
              <Text style={styles.botonTexto}>Ingresar</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#6B251A' },
  fondo: { flex: 1 },
  velo: {
    flex: 1,
    backgroundColor: 'rgba(255, 246, 232, 0.72)',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  hero: { height: '68%', alignItems: 'center', justifyContent: 'flex-end', paddingTop: 80, paddingBottom: 18 },
  contenido: { alignItems: 'center' },
  portada: { width: '100%', height: '100%' },
  titulo: { color: '#7D2E1D', fontSize: 31, fontWeight: '800', textAlign: 'center' },
  subtitulo: { color: '#6B564B', fontSize: 16, marginTop: 8, textAlign: 'center' },
  boton: {
    backgroundColor: '#A7442C',
    borderRadius: 10,
    marginTop: 34,
    paddingHorizontal: 44,
    paddingVertical: 14,
  },
  botonTexto: { color: '#FFF9EF', fontSize: 17, fontWeight: '700' },
});
