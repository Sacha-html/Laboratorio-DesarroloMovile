import { createContext, useContext, useRef, useState, type PropsWithChildren } from 'react';

import { RECETAS_SEMILLA } from '@/data/recetas-semilla';
import { RECIPE_CATEGORIES, type Recipe, type RecipeDraft, type RecipeStore } from '@/types/receta';

const RecetasContext = createContext<RecipeStore | null>(null);

function normalizarLineas(texto: string) {
  // El formulario recibe texto; el modelo guarda sólo líneas útiles y ya recortadas.
  return texto.split('\n').map((linea) => linea.trim()).filter(Boolean);
}

export function RecetasProvider({ children }: PropsWithChildren) {
  const [creadas, setCreadas] = useState<Recipe[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set());
  const sequenceRef = useRef(0);

  // El catálogo se deriva en cada render: cuatro semillas más las altas de la sesión actual.
  const recetas = [...RECETAS_SEMILLA, ...creadas];

  function crearReceta(draft: RecipeDraft) {
    // Fecha y contador evitan repetir IDs cuando se crean recetas en el mismo milisegundo.
    const id = `created-${Date.now()}-${sequenceRef.current++}`;
    const receta: Recipe = {
      id,
      nombre: draft.nombre.trim(),
      categoria: draft.categoria as Recipe['categoria'],
      tiempo: draft.tiempo.trim(),
      dificultad: draft.dificultad.trim(),
      icono: draft.icono.trim(),
      ingredientes: normalizarLineas(draft.ingredientes),
      pasos: normalizarLineas(draft.pasos),
    };

    setCreadas((actuales) => [...actuales, receta]);
    return id;
  }

  function obtenerPorId(id: string) {
    return recetas.find((receta) => receta.id === id);
  }

  function esFavorita(id: string) {
    return favoriteIds.has(id);
  }

  function toggleFavorito(id: string) {
    setFavoriteIds((actuales) => {
      // Set se copia antes de cambiarlo para que React reciba un estado nuevo.
      const siguiente = new Set(actuales);
      if (siguiente.has(id)) siguiente.delete(id);
      else siguiente.add(id);
      return siguiente;
    });
  }

  // La pantalla de favoritos muestra recetas completas a partir de sus IDs guardados.
  const favoritos = recetas.filter((receta) => favoriteIds.has(receta.id));
  const store: RecipeStore = { recetas, favoritos, crearReceta, obtenerPorId, esFavorita, toggleFavorito };

  return <RecetasContext.Provider value={store}>{children}</RecetasContext.Provider>;
}

export function useRecetas() {
  const contexto = useContext(RecetasContext);
  if (!contexto) throw new Error('useRecetas debe usarse dentro de RecetasProvider');
  return contexto;
}

export function esCategoriaValida(categoria: RecipeDraft['categoria']): categoria is Recipe['categoria'] {
  return RECIPE_CATEGORIES.some((item) => item === categoria);
}
