import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRecetas } from '../../context/RecetasContext';

const IMAGEN_FONDO = require('../../../assets/Imagenes/fondo3.jpeg');

export default function DetalleReceta() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { recetas } = useRecetas();

  // Buscamos la receta según el ID recibido por la ruta
  const receta = recetas.find((r) => r.id === id);

  if (!receta) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contenedor}>
          <TouchableOpacity style={styles.btnVolver} onPress={() => router.back()}>
            <Text style={styles.btnVolverTexto}>⬅ Volver</Text>
          </TouchableOpacity>
          <Text style={styles.sinResultados}>Receta no encontrada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={IMAGEN_FONDO} style={styles.fondo}>
        <View style={styles.overlay}>
          <View style={styles.contenedor}>
            {/* Botón para volver a la pantalla anterior con router nativo */}
            <TouchableOpacity style={styles.btnVolver} onPress={() => router.back()}>
              <Text style={styles.btnVolverTexto}>⬅ Volver al listado</Text>
            </TouchableOpacity>

            <ScrollView style={styles.cardDetalle} showsVerticalScrollIndicator={false}>
              <Text style={styles.detalleIcono}>{receta.icono}</Text>
              <Text style={styles.detalleTitulo}>{receta.nombre}</Text>
              <Text style={styles.detalleSubtitulo}>
                {receta.categoria} | Tiempo: {receta.tiempo} | Dificultad: {receta.dificultad}
              </Text>

              {/* Ingredientes */}
              <Text style={styles.seccionTitulo}>📋 Ingredientes:</Text>
              {receta.ingredientes.map((ing, i) => (
                <Text key={i} style={styles.itemTexto}>• {ing}</Text>
              ))}

              {/* Pasos de preparación */}
              <Text style={styles.seccionTitulo}>👨‍🍳 Preparación:</Text>
              {receta.pasos.map((paso, i) => (
                <Text key={i} style={styles.itemTexto}>{paso}</Text>
              ))}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3E1212',
  },
  fondo: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.93)',
  },
  contenedor: {
    flex: 1,
    padding: 16,
  },
  btnVolver: {
    backgroundColor: '#8A2B1D',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  btnVolverTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  cardDetalle: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
  },
  detalleIcono: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 4,
  },
  detalleTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  detalleSubtitulo: {
    fontSize: 11,
    color: '#777',
    textAlign: 'center',
    marginBottom: 12,
  },
  seccionTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8A2B1D',
    marginTop: 10,
    marginBottom: 4,
  },
  itemTexto: {
    fontSize: 12,
    color: '#444',
    lineHeight: 18,
    marginBottom: 3,
  },
  sinResultados: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 14,
  },
});
