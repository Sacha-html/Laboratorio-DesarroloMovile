import type { Recipe } from '@/types/receta';

// Datos iniciales inmutables: se restauran al reiniciar porque no hay persistencia todavía.
export const RECETAS_SEMILLA: readonly Recipe[] = [
  { id: '1', nombre: 'Asado Criollo', categoria: 'Parrilla', tiempo: '2 h 30 min', dificultad: 'Media', icono: '🥩', ingredientes: ['2 kg de carne (asado y vacío)', 'Sal gruesa a gusto', 'Chimichurri casero'], pasos: ['Hacer fuego con carbón y leña.', 'Colocar la carne a fuego medio.', 'Cocinar 1 hora y media del lado del hueso.', 'Dar vuelta y dorar 45 min más.'] },
  { id: '2', nombre: 'Empanadas Mendocinas', categoria: 'Tradicional', tiempo: '1 hora', dificultad: 'Media', icono: '🥟', ingredientes: ['12 tapas de empanadas', '500 g de carne cortada a cuchillo', '500 g de cebolla', '2 huevos duros', 'Pimentón y comino'], pasos: ['Rehogar la cebolla y cocinar la carne.', 'Condimentar y dejar enfriar.', 'Agregar huevo duro y rellenar.', 'Hornear a 200 °C por 15 minutos.'] },
  { id: '3', nombre: 'Milanesa Napolitana', categoria: 'Minutas', tiempo: '35 min', dificultad: 'Fácil', icono: '🍖', ingredientes: ['4 bifes de nalga', 'Huevos y pan rallado', 'Salsa de tomate', 'Jamón y muzzarella'], pasos: ['Pasar la carne por huevo y pan rallado.', 'Freír en aceite caliente.', 'Poner salsa, jamón y queso arriba.', 'Gratinar al horno 10 minutos.'] },
  { id: '4', nombre: 'Alfajores de Maicena', categoria: 'Dulces', tiempo: '40 min', dificultad: 'Fácil', icono: '🍪', ingredientes: ['200 g de maicena y 150 g de harina', '100 g de manteca y 75 g de azúcar', '2 yemas', 'Dulce de leche y coco rallado'], pasos: ['Mezclar manteca, azúcar, yemas y harinas.', 'Cortar discos y hornear 10 min a 180 °C.', 'Rellenar con dulce de leche y pasar por coco.'] },
];
