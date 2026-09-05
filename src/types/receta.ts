export const RECIPE_CATEGORIES = ['Parrilla', 'Tradicional', 'Minutas', 'Dulces'] as const;

export type RecipeCategory = (typeof RECIPE_CATEGORIES)[number];

export type Recipe = {
  id: string;
  nombre: string;
  categoria: RecipeCategory;
  tiempo: string;
  dificultad: string;
  icono: string;
  ingredientes: string[];
  pasos: string[];
};

// El borrador conserva ingredientes y pasos como texto hasta validar y separar sus líneas.
export type RecipeDraft = {
  nombre: string;
  categoria: RecipeCategory | '';
  tiempo: string;
  dificultad: string;
  icono: string;
  ingredientes: string;
  pasos: string;
};

export type FormErrors = Partial<Record<keyof RecipeDraft, string>>;

// Contrato que usan las pantallas; permite reemplazar el almacenamiento más adelante sin cambiar las rutas.
export type RecipeStore = {
  recetas: Recipe[];
  favoritos: Recipe[];
  crearReceta: (draft: RecipeDraft) => string;
  obtenerPorId: (id: string) => Recipe | undefined;
  esFavorita: (id: string) => boolean;
  toggleFavorito: (id: string) => void;
};
