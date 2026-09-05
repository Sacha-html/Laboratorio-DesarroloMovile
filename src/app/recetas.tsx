import { ImageBackground, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useRecetas } from '@/context/recetas-context';
import { RECIPE_CATEGORIES, type RecipeCategory } from '@/types/receta';

const IMAGEN_FONDO = require('../../assets/Imagenes/fondo3.jpeg');
const CATEGORIAS = ['Todas', ...RECIPE_CATEGORIES] as const;
type Categoria = 'Todas' | RecipeCategory;

export default function Recetas() {
  const router = useRouter();
  const { recetas, esFavorita, toggleFavorito } = useRecetas();
  const [textoBuscar, setTextoBuscar] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState<Categoria>('Todas');

  // La búsqueda confirmada y la categoría transforman el catálogo compartido sin modificarlo.
  const recetasFiltradas = recetas.filter((receta) => (
    receta.nombre.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())
    && (categoria === 'Todas' || receta.categoria === categoria)
  ));

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
              // La persona puede confirmar la búsqueda con el teclado o con el botón.
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
              <Pressable style={styles.botonAgregar} onPress={() => router.push('/receta/nueva')} accessibilityRole="button" accessibilityLabel="Agregar una receta">
                <Text style={styles.botonAgregarTexto}>Agregar receta</Text>
              </Pressable>
            </View>
            <Pressable style={styles.enlaceFavoritos} onPress={() => router.push('/favoritos')} accessibilityRole="button" accessibilityLabel="Ver recetas favoritas">
              <Text style={styles.enlaceFavoritosTexto}>Ver favoritas</Text>
            </Pressable>
            <Text style={styles.resultados}>{recetasFiltradas.length} recetas para compartir</Text>
            {recetasFiltradas.map((receta) => (
              <View key={receta.id} style={styles.tarjeta}>
                <Pressable
                  style={styles.tarjetaPrincipal}
                  onPress={() => router.push({ pathname: '/receta/[id]', params: { id: receta.id } })}
                  accessibilityRole="button"
                  accessibilityLabel={`Ver receta ${receta.nombre}`}
                >
                  <Text style={styles.icono}>{receta.icono}</Text>
                  <View style={styles.tarjetaInfo}>
                    <Text style={styles.tarjetaTitulo}>{receta.nombre}</Text>
                    <Text style={styles.tarjetaDetalle}>{receta.categoria} · {receta.tiempo}</Text>
                  </View>
                  <Text style={styles.flecha}>›</Text>
                </Pressable>
                <Pressable
                  onPress={() => toggleFavorito(receta.id)}
                  style={styles.favorito}
                  accessibilityRole="button"
                  accessibilityLabel={`${esFavorita(receta.id) ? 'Quitar' : 'Agregar'} ${receta.nombre} de favoritas`}
                  accessibilityState={{ selected: esFavorita(receta.id) }}
                >
                  <Text style={styles.favoritoTexto}>{esFavorita(receta.id) ? '★' : '☆'}</Text>
                </Pressable>
              </View>
            ))}
            {recetasFiltradas.length === 0 && <Text style={styles.vacio}>No encontramos recetas con esa búsqueda.</Text>}
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
  acciones: { flexDirection: 'row', gap: 9, marginTop: 14 }, botonBuscar: { alignItems: 'center', backgroundColor: '#A7442C', borderRadius: 8, flex: 1, paddingVertical: 11 }, botonBuscarTexto: { color: '#FFF9EF', fontWeight: '800' }, botonAgregar: { alignItems: 'center', borderColor: '#A7442C', borderRadius: 8, borderWidth: 1, flex: 1, paddingVertical: 10 }, botonAgregarTexto: { color: '#8C351F', fontWeight: '800' }, enlaceFavoritos: { alignSelf: 'flex-start', marginTop: 12, paddingVertical: 6 }, enlaceFavoritosTexto: { color: '#8C351F', fontWeight: '800' }, resultados: { color: '#765B4E', fontSize: 12, fontWeight: '700', marginBottom: 9, marginTop: 12 },
  tarjeta: { alignItems: 'center', backgroundColor: '#FFFDF8', borderColor: '#E7CDBD', borderRadius: 10, borderWidth: 1, flexDirection: 'row', marginBottom: 9, padding: 4 }, tarjetaPrincipal: { alignItems: 'center', flex: 1, flexDirection: 'row', padding: 8 }, icono: { fontSize: 27, marginRight: 12 }, tarjetaInfo: { flex: 1 }, tarjetaTitulo: { color: '#482017', fontSize: 16, fontWeight: '800' }, tarjetaDetalle: { color: '#80675B', fontSize: 12, marginTop: 3 }, flecha: { color: '#A7442C', fontSize: 28, fontWeight: '400' }, favorito: { minHeight: 44, minWidth: 44, alignItems: 'center', justifyContent: 'center' }, favoritoTexto: { color: '#A7442C', fontSize: 28 }, vacio: { color: '#765B4E', marginTop: 22, textAlign: 'center' },
});
