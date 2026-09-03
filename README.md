# 🇦🇷 Proyecto ABP – Aplicación Móvil: Recetario Argentino

Aplicación móvil desarrollada bajo la metodología de **Aprendizaje Basado en Proyectos (ABP)** para la materia de desarrollo de aplicaciones móviles.

---

## 📌 Nombre del Proyecto
**Recetario Argentino — Comidas Típicas y Tradicionales**

---

## 📖 Descripción del Proyecto y Problemática
La aplicación busca centralizar y facilitar el acceso a recetas tradicionales argentinas (*Asado Criollo*, *Empanadas Mendocinas*, *Milanesa Napolitana*, *Alfajores de Maicena*). Resuelve la dispersión de información mediante una interfaz moderna, visual y fluida que permite buscar platos en tiempo real, filtrar por categorías criollas y navegar al detalle de cada plato para consultar sus ingredientes y pasos de preparación con soporte de navegación nativa.

---

## 👥 Integrantes del Grupo
- Aparicio Fernando
- Cochis German
- Decalli Mariano
- Del Barrio Sacha
- **Materia:** Laboratorio de Computación / Aplicaciones Móviles

---

## 🚀 Listado de Features del Proyecto

Cumpliendo con las consignas del ABP (**4 Features mínimas** requeridas):

| # | Feature | Descripción Funcional | Estado |
|---|---|---|:---:|
| **1** | **Consultar Catálogo de Recetas** | Visualización interactiva de tarjetas con ícono, nombre, categoría y tiempo de cocción. | ✅ **Implementada** |
| **2** | **Buscador en Tiempo Real** | Filtrado instantáneo por nombre de receta mediante campo de texto reactivo. | ✅ **Implementada** |
| **3** | **Filtros por Categoría** | Barra horizontal de chips (*Todas*, *Parrilla*, *Tradicional*, *Minutas*, *Dulces*). | ✅ **Implementada** |
| **4** | **Detalle Dinámico de Receta** | Pantalla dedicada con navegación nativa (Expo Router `Stack`), ingredientes, preparación y botón de retorno. | ✅ **Implementada** |

---

## 🏗️ Arquitectura del Proyecto

El código está estructurado siguiendo los principios de **separación de responsabilidades** y las convenciones de **Expo Router**:

```text
movile/
├── assets/
│   └── Imagenes/              # Recursos gráficos (fondo3.jpeg, Sacha2.jpeg)
├── src/
│   ├── constants/
│   │   └── recetas.ts         # Modelo de datos (interface Receta), catálogo y categorías
│   └── app/
│       ├── _layout.tsx        # Configuración del Stack de navegación global
│       ├── index.tsx          # Pantalla principal (Catálogo, buscador y filtros)
│       └── receta/
│           └── [id].tsx       # Pantalla de detalle con ruta dinámica (/receta/:id)
├── app.json                   # Configuración del proyecto Expo
├── package.json               # Dependencias del proyecto
└── tsconfig.json              # Configuración de TypeScript
```

### Flujo de la Información (Data Flow):
1. **`src/constants/recetas.ts`**: Es la única fuente de la verdad para los datos (`RECETAS`) y su tipado (`Receta`).
2. **`src/app/index.tsx`**: Consume los datos, aplica los filtros de búsqueda/categoría y al seleccionar una receta navega mediante `router.push('/receta/[id]')`.
3. **`src/app/receta/[id].tsx`**: Captura el parámetro dinámico `id` mediante `useLocalSearchParams()`, localiza la receta correspondiente y despliega sus ingredientes y preparación con soporte del botón "Atrás" nativo de Android e iOS.

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** [Expo SDK 57](https://expo.dev/) & [React Native](https://reactnative.dev/) (0.86)
- **Navegación:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing nativo con `Stack`)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Safe Area:** `react-native-safe-area-context` para visualización adecuada en cualquier dispositivo móvil.

---

## 💻 Instalación y Ejecución

### 1. Clonar el repositorio y ubicarse en el proyecto
```bash
git clone https://github.com/Sacha-html/Laboratorio-DesarroloMovile.git
cd movile
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npx expo start -c
```

### 4. Probar la aplicación:
- **En Android (Emulador o Dispositivo Físico):** Presiona `a` en la terminal o escanea el código QR con la app **Expo Go**.
- **En la Web:** Presiona `w` en la consola para abrirla en el navegador.
- **En iOS:** Presiona `i` en macOS o escanea el código QR desde la cámara de iOS para abrir en **Expo Go**.
