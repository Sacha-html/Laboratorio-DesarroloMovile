import React, { createContext, useContext, useState } from 'react';
import { RECETAS as RECETAS_INICIALES, Receta } from '../constants/recetas';

interface RecetasContextType {
  recetas: Receta[];
  agregarReceta: (nueva: Omit<Receta, 'id'>) => void;
}

const RecetasContext = createContext<RecetasContextType | undefined>(undefined);

export function RecetasProvider({ children }: { children: React.ReactNode }) {
  const [recetas, setRecetas] = useState<Receta[]>(RECETAS_INICIALES);

  const agregarReceta = (nueva: Omit<Receta, 'id'>) => {
    const recetaCompleta: Receta = {
      ...nueva,
      id: Date.now().toString(),
    };
    // Se añade la nueva receta al principio de la lista
    setRecetas((prev) => [recetaCompleta, ...prev]);
  };

  return (
    <RecetasContext.Provider value={{ recetas, agregarReceta }}>
      {children}
    </RecetasContext.Provider>
  );
}

export function useRecetas() {
  const context = useContext(RecetasContext);
  if (!context) {
    throw new Error('useRecetas debe utilizarse dentro de un RecetasProvider');
  }
  return context;
}
