export interface Receta {
  id: string;
  nombre: string;
  categoria: string;
  tiempo: string;
  dificultad: string;
  icono: string;
  ingredientes: string[];
  pasos: string[];
}

export const CATEGORIAS = ['Todas', 'Parrilla', 'Tradicional', 'Minutas', 'Dulces'];

export const RECETAS: Receta[] = [
  {
    id: '1',
    nombre: 'Asado Criollo',
    categoria: 'Parrilla',
    tiempo: '2 h 30 min',
    dificultad: 'Media',
    icono: '🥩',
    ingredientes: [
      '2 kg de carne (asado y vacío)',
      'Sal gruesa a gusto',
      'Chimichurri casero'
    ],
    pasos: [
      '1. Hacer fuego con carbón y leña.',
      '2. Colocar la carne a fuego medio.',
      '3. Cocinar 1 hora y media del lado del hueso.',
      '4. Dar vuelta y dorar 45 min más.'
    ]
  },
  {
    id: '2',
    nombre: 'Empanadas Mendocinas',
    categoria: 'Tradicional',
    tiempo: '1 hora',
    dificultad: 'Media',
    icono: '🥟',
    ingredientes: [
      '12 tapas de empanadas',
      '500g carne cortada a cuchillo',
      '500g cebolla',
      '2 huevos duros',
      'Pimentón y comino'
    ],
    pasos: [
      '1. Rehogar la cebolla y cocinar la carne.',
      '2. Condimentar y dejar enfriar.',
      '3. Agregar huevo duro y rellenar.',
      '4. Hornear a 200°C por 15 minutos.'
    ]
  },
  {
    id: '3',
    nombre: 'Milanesa Napolitana',
    categoria: 'Minutas',
    tiempo: '35 min',
    dificultad: 'Fácil',
    icono: '🍖',
    ingredientes: [
      '4 bifes de nalga',
      'Huevos y pan rallado',
      'Salsa de tomate',
      'Jamón y muzzarella'
    ],
    pasos: [
      '1. Pasar carne por huevo y pan rallado.',
      '2. Freír en aceite caliente.',
      '3. Poner salsa, jamón y queso arriba.',
      '4. Gratinar al horno 10 minutos.'
    ]
  },
  {
    id: '4',
    nombre: 'Alfajores de Maicena',
    categoria: 'Dulces',
    tiempo: '40 min',
    dificultad: 'Fácil',
    icono: '🍪',
    ingredientes: [
      '200g maicena y 150g harina',
      '100g manteca y 75g azúcar',
      '2 yemas',
      'Dulce de leche y coco rallado'
    ],
    pasos: [
      '1. Mezclar manteca, azúcar, yemas y harinas.',
      '2. Cortar discos y hornear 10 min a 180°C.',
      '3. Rellenar con dulce de leche y pasar por coco.'
    ]
  }
];
