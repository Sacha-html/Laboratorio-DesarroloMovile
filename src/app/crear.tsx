import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useRecetas } from '../context/RecetasContext';
import { CATEGORIAS } from '../constants/recetas';

const IMAGEN_FONDO = require('../../assets/Imagenes/fondo3.jpeg');

const EMOJIS_SUGERIDOS = ['🍲', '🥩', '🥟', '🍖', '🍪', '🥘', '🥧', '🥖', '🧉', '🥗'];
const DIFICULTADES = ['Fácil', 'Media', 'Difícil'];

export default function CrearReceta() {
  const router = useRouter();
  const { agregarReceta } = useRecetas();

  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [icono, setIcono] = useState('🍲');
  const [categoria, setCategoria] = useState('Tradicional');
  const [tiempo, setTiempo] = useState('45 min');
  const [dificultad, setDificultad] = useState('Media');
  const [ingredientesTexto, setIngredientesTexto] = useState('');
  const [pasosTexto, setPasosTexto] = useState('');

  const categoriasDisponibles = CATEGORIAS.filter((c) => c !== 'Todas');

  const handleGuardar = () => {
    if (!nombre.trim()) {
      Alert.alert('Campo obligatorio', 'Por favor ingresa el nombre de la receta.');
      return;
    }

    // Convertimos los saltos de línea en arrays
    const ingredientes = ingredientesTexto
      .split('\n')
      .map((i) => i.trim())
      .filter((i) => i.length > 0);

    const pasos = pasosTexto
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    agregarReceta({
      nombre: nombre.trim(),
      icono: icono.trim() || '🍽️',
      categoria,
      tiempo: tiempo.trim() || '30 min',
      dificultad,
      ingredientes: ingredientes.length > 0 ? ingredientes : ['Ingredientes a gusto'],
      pasos: pasos.length > 0 ? pasos : ['Preparación según preferencia del cocinero.'],
    });

    // Volver a la pantalla principal
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={IMAGEN_FONDO} style={styles.fondo}>
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

            {/* Cabecera */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.btnVolver} onPress={() => router.back()}>
                <Text style={styles.btnVolverTexto}>⬅ Cancelar</Text>
              </TouchableOpacity>
              <Text style={styles.tituloHeader}>Nueva Receta</Text>
            </View>

            {/* Tarjeta del Formulario */}
            <View style={styles.cardForm}>
              
              {/* Nombre */}
              <Text style={styles.label}>Nombre del plato *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Locro Criollo"
                placeholderTextColor="#999"
                value={nombre}
                onChangeText={setNombre}
              />

              {/* Ícono / Emoji */}
              <Text style={styles.label}>Ícono representativo</Text>
              <View style={styles.emojisRow}>
                {EMOJIS_SUGERIDOS.map((e) => (
                  <TouchableOpacity
                    key={e}
                    style={[styles.chipEmoji, icono === e && styles.chipEmojiActivo]}
                    onPress={() => setIcono(e)}
                  >
                    <Text style={styles.emojiTexto}>{e}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Categoría */}
              <Text style={styles.label}>Categoría</Text>
              <View style={styles.chipsRow}>
                {categoriasDisponibles.map((cat) => (
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
              </View>

              {/* Tiempo y Dificultad */}
              <View style={styles.filaDoble}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.label}>Tiempo</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: 1 h 15 min"
                    placeholderTextColor="#999"
                    value={tiempo}
                    onChangeText={setTiempo}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Dificultad</Text>
                  <View style={styles.chipsRowDificultad}>
                    {DIFICULTADES.map((dif) => (
                      <TouchableOpacity
                        key={dif}
                        style={[styles.chipPequeno, dificultad === dif && styles.chipActivo]}
                        onPress={() => setDificultad(dif)}
                      >
                        <Text style={[styles.chipTextoPequeno, dificultad === dif && styles.chipTextoActivo]}>
                          {dif}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              {/* Ingredientes */}
              <Text style={styles.label}>Ingredientes (uno por línea)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder={"1 kg de maíz blanco\n500g falda\n1 chorizo colorado\nCalabaza y cebolla de verdeo"}
                placeholderTextColor="#999"
                value={ingredientesTexto}
                onChangeText={setIngredientesTexto}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />

              {/* Pasos */}
              <Text style={styles.label}>Pasos de preparación (uno por línea)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder={"1. Remojar el maíz la noche anterior.\n2. Cocinar la carne a fuego lento.\n3. Agregar verduras y espesar el caldo.\n4. Servir bien caliente con salsa picante."}
                placeholderTextColor="#999"
                value={pasosTexto}
                onChangeText={setPasosTexto}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />

              {/* Botón Guardar */}
              <TouchableOpacity style={styles.btnGuardar} onPress={handleGuardar}>
                <Text style={styles.btnGuardarTexto}>💾 Guardar Receta</Text>
              </TouchableOpacity>

            </View>

          </ScrollView>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  btnVolver: {
    backgroundColor: '#666',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 6,
    marginRight: 12,
  },
  btnVolverTexto: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tituloHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8A2B1D',
  },
  cardForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: '#333',
  },
  textArea: {
    minHeight: 80,
  },
  emojisRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  chipEmoji: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipEmojiActivo: {
    borderColor: '#8A2B1D',
    backgroundColor: '#FDEAE8',
  },
  emojiTexto: {
    fontSize: 20,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFF',
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
    color: '#FFF',
    fontWeight: 'bold',
  },
  filaDoble: {
    flexDirection: 'row',
    marginTop: 4,
  },
  chipsRowDificultad: {
    flexDirection: 'row',
    gap: 4,
  },
  chipPequeno: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingVertical: 9,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  chipTextoPequeno: {
    fontSize: 11,
    color: '#555',
  },
  btnGuardar: {
    backgroundColor: '#8A2B1D',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
  },
  btnGuardarTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
