import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useRecetas } from '../context/RecetasContext';
import { CATEGORIAS, Receta } from '../constants/recetas';

// Imágenes de activos
const IMAGEN_FONDO = require('../../assets/Imagenes/fondo3.jpeg');
const IMAGEN_PORTADA = require('../../assets/Imagenes/Sacha2.jpeg');

export default function PantallaPrincipal() {
  const router = useRouter();
  const { recetas } = useRecetas();

  // Estados locales para búsqueda y filtro de categoría
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas');

  // Filtrado reactivo de recetas
  const recetasFiltradas = recetas.filter((r) => {
    const coincideTexto = r.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCat = categoria === 'Todas' || r.categoria === categoria;
    return coincideTexto && coincideCat;
  });

  // Navegar a la pantalla de detalle pasando el ID
  const irAlDetalle = (receta: Receta) => {
    router.push({
      pathname: '/receta/[id]',
      params: { id: receta.id }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={IMAGEN_FONDO} style={styles.fondo}>
        <View style={styles.overlay}>
          <View style={styles.contenedor}>

            {/* Portada */}
            <View style={styles.cardPortada}>
              <Image source={IMAGEN_PORTADA} style={styles.imagenPortada} resizeMode="cover" />
              <View style={styles.textosPortada}>
                <Text style={styles.tituloPortada}>Recetario Argentino</Text>
                <Text style={styles.subtituloPortada}>Comidas típicas y tradicionales</Text>
              </View>
            </View>

            {/* Buscador con Botón "+ Agregar" al lado */}
            <View style={styles.buscadorRow}>
              <TextInput
                style={styles.buscador}
                placeholder="🔍 Buscar receta..."
                placeholderTextColor="#888"
                value={busqueda}
                onChangeText={setBusqueda}
              />
              <TouchableOpacity
                style={styles.btnAgregar}
                onPress={() => router.push('/crear')}
              >
                <Text style={styles.btnAgregarTexto}>+ Agregar</Text>
              </TouchableOpacity>
            </View>

            {/* Filtro horizontal de categorías */}
            <View style={styles.filtrosRow}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {CATEGORIAS.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.chip, categoria === cat && styles.chipActivo]}
                    onPress={() => setCategoria(cat)}
                  >
                    <Text style={[styles.chipTexto, categoria === cat && styles.chipTextoActivo]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Listado de recetas */}
            <FlatList
              data={recetasFiltradas}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.card} onPress={() => irAlDetalle(item)}>
                  <Text style={styles.cardIcono}>{item.icono}</Text>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitulo}>{item.nombre}</Text>
                    <Text style={styles.cardDetalles}>{item.categoria} • ⏱️ {item.tiempo}</Text>
                  </View>
                  <Text style={styles.flecha}>→</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={styles.sinResultados}>No se encontraron recetas.</Text>}
            />

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
  cardPortada: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    elevation: 2,
  },
  imagenPortada: {
    width: '100%',
    height: 110,
  },
  textosPortada: {
    padding: 8,
    alignItems: 'center',
  },
  tituloPortada: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#8A2B1D',
  },
  subtituloPortada: {
    fontSize: 12,
    color: '#666',
  },
  buscadorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  buscador: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontSize: 13,
  },
  btnAgregar: {
    backgroundColor: '#8A2B1D',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  btnAgregarTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  filtrosRow: {
    height: 36,
    marginBottom: 8,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 6,
    justifyContent: 'center',
  },
  chipActivo: {
    backgroundColor: '#8A2B1D',
    borderColor: '#8A2B1D',
  },
  chipTexto: {
    fontSize: 12,
    color: '#555',
  },
  chipTextoActivo: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },
  cardIcono: {
    fontSize: 26,
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDetalles: {
    fontSize: 11,
    color: '#777',
    marginTop: 2,
  },
  flecha: {
    fontSize: 16,
    color: '#8A2B1D',
    fontWeight: 'bold',
  },
  sinResultados: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});
