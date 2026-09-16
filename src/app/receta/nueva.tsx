import { ImageBackground, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import { esCategoriaValida, useRecetas } from '@/context/recetas-context';
import { RECIPE_CATEGORIES, type FormErrors, type RecipeDraft } from '@/types/receta';

const IMAGEN_FONDO = require('../../../assets/Imagenes/fondo3.jpeg');
const EMPTY_DRAFT: RecipeDraft = {
  nombre: '',
  categoria: '',
  tiempo: '',
  dificultad: '',
  icono: '',
  ingredientes: '',
  pasos: '',
};

export default function NuevaReceta() {
  const router = useRouter();
  const { crearReceta } = useRecetas();
  const [draft, setDraft] = useState<RecipeDraft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<FormErrors>({});

  function actualizar(campo: keyof RecipeDraft, valor: string) {
    setDraft((actual) => ({ ...actual, [campo]: valor }));
    // Al corregir un campo, se oculta sólo su error sin descartar los demás.
    setErrors((actual) => ({ ...actual, [campo]: undefined }));
  }

  function guardar() {
    const siguientes: FormErrors = {};
    const camposObligatorios = ['nombre', 'tiempo', 'dificultad', 'icono'] as const;

    camposObligatorios.forEach((campo) => {
      if (!draft[campo].trim()) siguientes[campo] = 'Este campo es obligatorio.';
    });

    if (!esCategoriaValida(draft.categoria)) siguientes.categoria = 'Seleccioná una categoría.';
    if (!draft.ingredientes.split('\n').some((linea) => linea.trim())) siguientes.ingredientes = 'Ingresá al menos un ingrediente.';
    if (!draft.pasos.split('\n').some((linea) => linea.trim())) siguientes.pasos = 'Ingresá al menos un paso.';

    // Si hay errores, se conservan los valores válidos para que la persona complete el formulario.
    if (Object.keys(siguientes).length) {
      setErrors(siguientes);
      return;
    }

    const id = crearReceta(draft);
    // replace evita volver a un formulario ya enviado al regresar desde el detalle.
    router.replace({ pathname: '/receta/[id]', params: { id } });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={IMAGEN_FONDO} style={styles.fondo}>
        <View style={styles.velo}>
          <ScrollView contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
            <Pressable onPress={() => router.back()} style={styles.volver} accessibilityRole="button" accessibilityLabel="Cancelar y volver al listado">
              <Text style={styles.volverTexto}>‹ Volver al listado</Text>
            </Pressable>
            <Text style={styles.marca}>RECETARIO</Text>
            <Text style={styles.titulo}>Nueva receta</Text>

            <Campo etiqueta="Nombre" campo="nombre" draft={draft} error={errors.nombre} actualizar={actualizar} />

            <Text style={styles.etiqueta}>Categoría *</Text>
            <View style={styles.categorias}>
              {RECIPE_CATEGORIES.map((categoria) => (
                <Pressable
                  key={categoria}
                  onPress={() => actualizar('categoria', categoria)}
                  style={[styles.chip, draft.categoria === categoria && styles.chipActivo]}
                  accessibilityRole="button"
                  accessibilityLabel={`Categoría ${categoria}`}
                  accessibilityState={{ selected: draft.categoria === categoria }}
                >
                  <Text style={[styles.chipTexto, draft.categoria === categoria && styles.chipTextoActivo]}>{categoria}</Text>
                </Pressable>
              ))}
            </View>
            {errors.categoria && <Text accessibilityRole="alert" style={styles.error}>{errors.categoria}</Text>}

            <Campo etiqueta="Tiempo" campo="tiempo" draft={draft} error={errors.tiempo} actualizar={actualizar} />
            <Campo etiqueta="Dificultad" campo="dificultad" draft={draft} error={errors.dificultad} actualizar={actualizar} />
            <Campo etiqueta="Ícono" campo="icono" draft={draft} error={errors.icono} actualizar={actualizar} />
            <Campo etiqueta="Ingredientes (uno por línea)" campo="ingredientes" draft={draft} error={errors.ingredientes} actualizar={actualizar} multiline />
            <Campo etiqueta="Pasos (uno por línea)" campo="pasos" draft={draft} error={errors.pasos} actualizar={actualizar} multiline />

            <Pressable onPress={guardar} style={styles.guardar} accessibilityRole="button" accessibilityLabel="Guardar receta">
              <Text style={styles.guardarTexto}>Guardar receta</Text>
            </Pressable>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

type CampoProps = {
  etiqueta: string;
  campo: Exclude<keyof RecipeDraft, 'categoria'>;
  draft: RecipeDraft;
  error?: string;
  actualizar: (campo: keyof RecipeDraft, valor: string) => void;
  multiline?: boolean;
};

// Reutiliza la misma presentación y accesibilidad para los campos de texto del formulario.
function Campo({ etiqueta, campo, draft, error, actualizar, multiline = false }: CampoProps) {
  return (
    <View>
      <Text style={styles.etiqueta}>{etiqueta} *</Text>
      <TextInput
        value={draft[campo]}
        onChangeText={(valor) => actualizar(campo, valor)}
        style={[styles.input, multiline && styles.area, error && styles.inputError]}
        multiline={multiline}
        placeholderTextColor="#8C786C"
        accessibilityLabel={`${etiqueta}, obligatorio${error ? `. Error: ${error}` : ''}`}
      />
      {error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
    </View>
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
  etiqueta: { color: '#765B4E', fontSize: 13, fontWeight: '700', marginBottom: 6, marginTop: 14 },
  input: { backgroundColor: '#FFFDF8', borderColor: '#D9B6A2', borderRadius: 9, borderWidth: 1, color: '#402018', fontSize: 15, paddingHorizontal: 13, paddingVertical: 11 },
  inputError: { borderColor: '#A7442C', borderWidth: 2 },
  area: { minHeight: 92, textAlignVertical: 'top' },
  categorias: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  chip: { borderColor: '#CFA18B', borderRadius: 18, borderWidth: 1, paddingHorizontal: 13, paddingVertical: 9 },
  chipActivo: { backgroundColor: '#8C351F', borderColor: '#8C351F' },
  chipTexto: { color: '#704535', fontSize: 12, fontWeight: '700' },
  chipTextoActivo: { color: '#FFF9EF' },
  error: { color: '#A7442C', fontSize: 12, fontWeight: '700', marginTop: 5 },
  guardar: { alignItems: 'center', backgroundColor: '#A7442C', borderRadius: 8, marginTop: 24, minHeight: 46, justifyContent: 'center' },
  guardarTexto: { color: '#FFF9EF', fontWeight: '800' },
});
