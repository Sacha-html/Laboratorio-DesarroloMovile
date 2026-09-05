import { Alert, ImageBackground, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const IMAGEN_FONDO = require('../../assets/Imagenes/fondo3.jpeg');
const CATEGORIAS = ['Todas', 'Parrilla', 'Tradicional', 'Minutas', 'Dulces'] as const;

type Categoria = (typeof CATEGORIAS)[number];
type Receta = {
  id: string;
  nombre: string;
  categoria: Exclude<Categoria, 'Todas'>;
  tiempo: string;
  dificultad: string;
  icono: string;
  ingredientes: string[];
  pasos: string[];
};

const RECETAS: Receta[] = [
  { id: '1', nombre: 'Asado Criollo', categoria: 'Parrilla', tiempo: '2 h 30 min', dificultad: 'Media', icono: '🥩', ingredientes: ['2 kg de carne (asado y vacío)', 'Sal gruesa a gusto', 'Chimichurri casero'], pasos: ['Hacer fuego con carbón y leña.', 'Colocar la carne a fuego medio.', 'Cocinar 1 hora y media del lado del hueso.', 'Dar vuelta y dorar 45 min más.'] },
  { id: '2', nombre: 'Empanadas Mendocinas', categoria: 'Tradicional', tiempo: '1 hora', dificultad: 'Media', icono: '🥟', ingredientes: ['12 tapas de empanadas', '500 g de carne cortada a cuchillo', '500 g de cebolla', '2 huevos duros', 'Pimentón y comino'], pasos: ['Rehogar la cebolla y cocinar la carne.', 'Condimentar y dejar enfriar.', 'Agregar huevo duro y rellenar.', 'Hornear a 200 °C por 15 minutos.'] },
  { id: '3', nombre: 'Milanesa Napolitana', categoria: 'Minutas', tiempo: '35 min', dificultad: 'Fácil', icono: '🍖', ingredientes: ['4 bifes de nalga', 'Huevos y pan rallado', 'Salsa de tomate', 'Jamón y muzzarella'], pasos: ['Pasar la carne por huevo y pan rallado.', 'Freír en aceite caliente.', 'Poner salsa, jamón y queso arriba.', 'Gratinar al horno 10 minutos.'] },
  { id: '4', nombre: 'Alfajores de Maicena', categoria: 'Dulces', tiempo: '40 min', dificultad: 'Fácil', icono: '🍪', ingredientes: ['200 g de maicena y 150 g de harina', '100 g de manteca y 75 g de azúcar', '2 yemas', 'Dulce de leche y coco rallado'], pasos: ['Mezclar manteca, azúcar, yemas y harinas.', 'Cortar discos y hornear 10 min a 180 °C.', 'Rellenar con dulce de leche y pasar por coco.'] },
];

export default function Recetas() {
  const [textoBuscar, setTextoBuscar] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState<Categoria>('Todas');
  const [recetaSeleccionada, setRecetaSeleccionada] = useState<Receta | null>(null);

  const recetasFiltradas = RECETAS.filter((receta) => (
    receta.nombre.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())
    && (categoria === 'Todas' || receta.categoria === categoria)
  ));

  if (recetaSeleccionada) {
    return <Detalle receta={recetaSeleccionada} onVolver={() => setRecetaSeleccionada(null)} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={IMAGEN_FONDO} style={styles.fondo} resizeMode="cover">
        <View style={styles.velo}>
          <ScrollView contentContainerStyle={styles.contenido} showsVerticalScrollIndicator={false}>
            <Text style={styles.marca}>RECETARIO</Text>
            <Text style={styles.titulo}>Sabores argentinos</Text>
            <Text style={styles.etiqueta}>Buscar recetas</Text>
            <TextInput
              style={styles.buscador}
              placeholder="Ej.: empanadas"
              placeholderTextColor="#8C786C"
              value={textoBuscar}
              onChangeText={setTextoBuscar}
              onSubmitEditing={() => setBusqueda(textoBuscar)}
              returnKeyType="search"
              accessibilityLabel="Buscar receta por nombre"
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtros} contentContainerStyle={styles.filtrosContenido}>
              {CATEGORIAS.map((item) => (
                <Pressable key={item} onPress={() => setCategoria(item)} style={[styles.chip, categoria === item && styles.chipActivo]} accessibilityRole="button" accessibilityState={{ selected: categoria === item }} accessibilityLabel={`Filtrar por ${item}`}>
                  <Text style={[styles.chipTexto, categoria === item && styles.chipTextoActivo]}>{item}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <View style={styles.acciones}>
              <Pressable style={styles.botonBuscar} onPress={() => setBusqueda(textoBuscar)} accessibilityRole="button" accessibilityLabel="Buscar recetas">
                <Text style={styles.botonBuscarTexto}>Buscar</Text>
              </Pressable>
              <Pressable style={styles.botonAgregar} onPress={() => Alert.alert('Próximamente', 'La carga de recetas estará disponible próximamente.')} accessibilityRole="button" accessibilityLabel="Agregar receta, próximamente">
                <Text style={styles.botonAgregarTexto}>Agregar receta</Text>
              </Pressable>
            </View>
            <Text style={styles.resultados}>{recetasFiltradas.length} recetas para compartir</Text>
            {recetasFiltradas.map((receta) => (
              <Pressable key={receta.id} style={styles.tarjeta} onPress={() => setRecetaSeleccionada(receta)} accessibilityRole="button" accessibilityLabel={`Ver receta ${receta.nombre}`}>
                <Text style={styles.icono}>{receta.icono}</Text>
                <View style={styles.tarjetaInfo}>
                  <Text style={styles.tarjetaTitulo}>{receta.nombre}</Text>
                  <Text style={styles.tarjetaDetalle}>{receta.categoria} · {receta.tiempo}</Text>
                </View>
                <Text style={styles.flecha}>›</Text>
              </Pressable>
            ))}
            {recetasFiltradas.length === 0 && <Text style={styles.vacio}>No encontramos recetas con esa búsqueda.</Text>}
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

function Detalle({ receta, onVolver }: { receta: Receta; onVolver: () => void }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={IMAGEN_FONDO} style={styles.fondo} resizeMode="cover">
        <View style={styles.velo}>
          <ScrollView contentContainerStyle={styles.detalleContenido} showsVerticalScrollIndicator={false}>
            <Pressable onPress={onVolver} style={styles.volver} accessibilityRole="button" accessibilityLabel="Volver al listado de recetas">
              <Text style={styles.volverTexto}>‹ Volver al listado</Text>
            </Pressable>
            <View style={styles.detalleTarjeta}>
              <Text style={styles.detalleIcono}>{receta.icono}</Text>
              <Text style={styles.detalleTitulo}>{receta.nombre}</Text>
              <Text style={styles.detalleMeta}>{receta.categoria} · {receta.tiempo} · Dificultad {receta.dificultad}</Text>
              <Text style={styles.seccion}>Ingredientes</Text>
              {receta.ingredientes.map((ingrediente) => <Text key={ingrediente} style={styles.item}>• {ingrediente}</Text>)}
              <Text style={styles.seccion}>Preparación</Text>
              {receta.pasos.map((paso, indice) => <Text key={paso} style={styles.item}>{indice + 1}. {paso}</Text>)}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#6B251A' }, fondo: { flex: 1 }, velo: { flex: 1, backgroundColor: 'rgba(255, 246, 232, 0.9)' },
  contenido: { padding: 18, paddingBottom: 32 }, marca: { color: '#A7442C', fontSize: 11, fontWeight: '800', letterSpacing: 2 }, titulo: { color: '#512116', fontSize: 26, fontWeight: '800', marginTop: 3, marginBottom: 19 }, etiqueta: { color: '#765B4E', fontSize: 13, fontWeight: '700', marginBottom: 6 },
  buscador: { backgroundColor: '#FFFDF8', borderColor: '#D9B6A2', borderWidth: 1, borderRadius: 9, color: '#402018', fontSize: 15, paddingHorizontal: 13, paddingVertical: 11 }, filtros: { marginTop: 13 }, filtrosContenido: { paddingRight: 12 }, chip: { borderColor: '#CFA18B', borderRadius: 18, borderWidth: 1, marginRight: 7, paddingHorizontal: 13, paddingVertical: 7 }, chipActivo: { backgroundColor: '#8C351F', borderColor: '#8C351F' }, chipTexto: { color: '#704535', fontSize: 12, fontWeight: '700' }, chipTextoActivo: { color: '#FFF9EF' },
  acciones: { flexDirection: 'row', gap: 9, marginTop: 14 }, botonBuscar: { alignItems: 'center', backgroundColor: '#A7442C', borderRadius: 8, flex: 1, paddingVertical: 11 }, botonBuscarTexto: { color: '#FFF9EF', fontWeight: '800' }, botonAgregar: { alignItems: 'center', borderColor: '#A7442C', borderRadius: 8, borderWidth: 1, flex: 1, paddingVertical: 10 }, botonAgregarTexto: { color: '#8C351F', fontWeight: '800' }, resultados: { color: '#765B4E', fontSize: 12, fontWeight: '700', marginBottom: 9, marginTop: 21 },
  tarjeta: { alignItems: 'center', backgroundColor: '#FFFDF8', borderColor: '#E7CDBD', borderRadius: 10, borderWidth: 1, flexDirection: 'row', marginBottom: 9, padding: 12 }, icono: { fontSize: 27, marginRight: 12 }, tarjetaInfo: { flex: 1 }, tarjetaTitulo: { color: '#482017', fontSize: 16, fontWeight: '800' }, tarjetaDetalle: { color: '#80675B', fontSize: 12, marginTop: 3 }, flecha: { color: '#A7442C', fontSize: 28, fontWeight: '400' }, vacio: { color: '#765B4E', marginTop: 22, textAlign: 'center' },
  detalleContenido: { padding: 18, paddingBottom: 34 }, volver: { alignSelf: 'flex-start', marginBottom: 14, paddingVertical: 6 }, volverTexto: { color: '#8C351F', fontSize: 14, fontWeight: '800' }, detalleTarjeta: { backgroundColor: '#FFFDF8', borderColor: '#E7CDBD', borderRadius: 12, borderWidth: 1, padding: 20 }, detalleIcono: { fontSize: 42, textAlign: 'center' }, detalleTitulo: { color: '#482017', fontSize: 25, fontWeight: '800', marginTop: 7, textAlign: 'center' }, detalleMeta: { color: '#80675B', fontSize: 12, lineHeight: 18, marginTop: 7, textAlign: 'center' }, seccion: { color: '#8C351F', fontSize: 16, fontWeight: '800', marginBottom: 7, marginTop: 23 }, item: { color: '#4E352B', fontSize: 14, lineHeight: 22, marginBottom: 5 },
});
