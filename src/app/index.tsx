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

// Imágenes
const IMAGEN_FONDO = require('../../assets/Imagenes/fondo3.jpeg');
const IMAGEN_PORTADA = require('../../assets/Imagenes/Sacha2.jpeg');

// 4 Recetas Argentinas
const RECETAS = [
  {
    id: '1',
    nombre: 'Asado Criollo',
    categoria: 'Parrilla',
    tiempo: '2 h 30 min',
    dificultad: 'Media',
    icono: '🥩',
    ingredientes: ['2 kg de carne (asado y vacío)', 'Sal gruesa a gusto', 'Chimichurri casero'],
    pasos: [
      '1. Hacer fuego con carbón y leña.',
      '2. Colocar la carne a fuego medio.',
      '3. Cocinar 1 hora y media del lado del hueso.',
      '4. Dar vuelta y dorar 45 min más.',
    ],
  },
  {
    id: '2',
    nombre: 'Empanadas Mendocinas',
    categoria: 'Tradicional',
    tiempo: '1 hora',
    dificultad: 'Media',
    icono: '🥟',
    ingredientes: ['12 tapas de empanadas', '500g carne cortada a cuchillo', '500g cebolla', '2 huevos duros', 'Pimentón y comino'],
    pasos: [
      '1. Rehogar la cebolla y cocinar la carne.',
      '2. Condimentar y dejar enfriar.',
      '3. Agregar huevo duro y rellenar.',
      '4. Hornear a 200°C por 15 minutos.',
    ],
  },
  {
    id: '3',
    nombre: 'Milanesa Napolitana',
    categoria: 'Minutas',
    tiempo: '35 min',
    dificultad: 'Fácil',
    icono: '🍖',
    ingredientes: ['4 bifes de nalga', 'Huevos y pan rallado', 'Salsa de tomate', 'Jamón y muzzarella'],
    pasos: [
      '1. Pasar carne por huevo y pan rallado.',
      '2. Freír en aceite caliente.',
      '3. Poner salsa, jamón y queso arriba.',
      '4. Gratinar al horno 10 minutos.',
    ],
  },
  {
    id: '4',
    nombre: 'Alfajores de Maicena',
    categoria: 'Dulces',
    tiempo: '40 min',
    dificultad: 'Fácil',
    icono: '🍪',
    ingredientes: ['200g maicena y 150g harina', '100g manteca y 75g azúcar', '2 yemas', 'Dulce de leche y coco rallado'],
    pasos: [
      '1. Mezclar manteca, azúcar, yemas y harinas.',
      '2. Cortar discos y hornear 10 min a 180°C.',
      '3. Rellenar con dulce de leche y pasar por coco.',
    ],
  },
];

const CATEGORIAS = ['Todas', 'Parrilla', 'Tradicional', 'Minutas', 'Dulces'];

export default function App() {
  const [recetaSeleccionada, setRecetaSeleccionada] = useState<any>(null);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas');

  // Filtrar recetas
  const recetasFiltradas = RECETAS.filter((r) => {
    const coincideTexto = r.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCat = categoria === 'Todas' || r.categoria === categoria;
    return coincideTexto && coincideCat;
  });

  // Evento volver
  const volverAlListado = () => {
    setRecetaSeleccionada(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={IMAGEN_FONDO} style={styles.fondo}>
        <View style={styles.overlay}>

          {/* VISTA 1: LISTA */}
          {!recetaSeleccionada ? (
            <View style={styles.contenedor}>
              {/* Portada */}
              <View style={styles.cardPortada}>
                <Image source={IMAGEN_PORTADA} style={styles.imagenPortada} resizeMode="cover" />
                <View style={styles.textosPortada}>
                  <Text style={styles.tituloPortada}>Recetario Argentino</Text>
                  <Text style={styles.subtituloPortada}>Comidas típicas y tradicionales</Text>
                </View>
              </View>

              {/* Buscador */}
              <TextInput
                style={styles.buscador}
                placeholder="🔍 Buscar receta..."
                placeholderTextColor="#888"
                value={busqueda}
                onChangeText={setBusqueda}
              />

              {/* Filtros */}
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

              {/* Listado */}
              <FlatList
                data={recetasFiltradas}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.card} onPress={() => setRecetaSeleccionada(item)}>
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
          ) : (
            /* VISTA 2: DETALLE */
            <View style={styles.contenedor}>
              <TouchableOpacity style={styles.btnVolver} onPress={volverAlListado}>
                <Text style={styles.btnVolverTexto}>⬅ Volver al listado</Text>
              </TouchableOpacity>

              <ScrollView style={styles.cardDetalle} showsVerticalScrollIndicator={false}>
                <Text style={styles.detalleIcono}>{recetaSeleccionada.icono}</Text>
                <Text style={styles.detalleTitulo}>{recetaSeleccionada.nombre}</Text>
                <Text style={styles.detalleSubtitulo}>
                  {recetaSeleccionada.categoria} | Tiempo: {recetaSeleccionada.tiempo} | Dificultad: {recetaSeleccionada.dificultad}
                </Text>

                <Text style={styles.seccionTitulo}>📋 Ingredientes:</Text>
                {recetaSeleccionada.ingredientes.map((ing: string, i: number) => (
                  <Text key={i} style={styles.itemTexto}>• {ing}</Text>
                ))}

                <Text style={styles.seccionTitulo}>👨‍🍳 Preparación:</Text>
                {recetaSeleccionada.pasos.map((paso: string, i: number) => (
                  <Text key={i} style={styles.itemTexto}>{paso}</Text>
                ))}
              </ScrollView>
            </View>
          )}

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
  buscador: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontSize: 13,
    marginBottom: 8,
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
});
