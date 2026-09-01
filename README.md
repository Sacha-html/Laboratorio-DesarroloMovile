# 🇦🇷 Proyecto ABP – Aplicación Móvil: Recetario Argentino

Aplicación móvil desarrollada bajo la metodología de **Aprendizaje Basado en Proyectos (ABP)** para la materia de desarrollo de aplicaciones móviles.

---

## 📌 Nombre del Proyecto
**Recetario Argentino — Comidas Típicas y Tradicionales**

---

## 📖 Descripción del Proyecto y Problemática
La aplicación busca centralizar y facilitar el acceso a recetas tradicionales argentinas (*Asado Criollo*, *Empanadas Mendocinas*, *Milanesa Napolitana*, *Alfajores de Maicena*). Resuelve la dispersión de información mediante una interfaz simple, visual y rápida que permite buscar platos, filtrar por categorías criollas y consultar los ingredientes y pasos de preparación.

---

## 👥 Integrantes del Grupo
- **Estudiantes:** Aparicio - Del Barrio
- **Materia:** Laboratorio de Computación / Aplicaciones Móviles

---

## 🚀 Listado de Features del Proyecto

Cumpliendo con la consigna de ABP (para grupos de 1 a 3 integrantes: **4 Features mínimas**):

| # | Feature | Descripción Funcional | Estado |
|---|---|---|:---:|
| **1** | **Consultar Listado de Recetas** | Permite visualizar las tarjetas de las recetas con ícono, nombre, categoría y tiempo de preparación. | ✅ **Implementada** |
| **2** | **Buscar Receta por Nombre** | Permite buscar y encontrar platos en tiempo real mediante un campo de texto. | ✅ **Implementada** |
| **3** | **Filtrar Recetas por Categoría** | Permite filtrar el catálogo según el tipo de plato (*Parrilla*, *Tradicional*, *Minutas*, *Dulces* o *Todas*). | ✅ **Implementada** |
| **4** | **Consultar Detalle de la Receta (Segunda Vista)** | Permite abrir la pantalla de detalle para leer los ingredientes, la preparación paso a paso y regresar al catálogo con el botón *Volver al listado*. | ✅ **Implementada** |

---

## 📱 Estructura de Vistas y Assets

- **Vista 1: Catálogo Principal**
  - **Portada:** Imagen de cabecera (`assets/Imagenes/Sacha2.jpeg`).
  - **Fondo:** Imagen de fondo (`assets/Imagenes/fondo3.jpeg`).
  - **Buscador de texto.**
  - **Filtros por categoría.**
  - **Lista de recetas.**

- **Vista 2: Detalle de la Receta**
  - **Botón `⬅ Volver al listado`** (evento `volverAlListado`).
  - **Datos:** Nombre, categoría, tiempo y dificultad.
  - **Lista de ingredientes.**
  - **Preparación paso a paso.**

---

## 🛠️ Tecnologías
- **Expo & React Native** (v57)
- **React Native Safe Area Context**
- **TypeScript**

---

## 💻 Instrucciones para Ejecutar

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar la aplicación
npx expo start
```

- Presiona `w` en la consola para probarla en el navegador web.
- O escanea el código QR con la app **Expo Go** en tu celular.
