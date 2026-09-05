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
- **Grupo de cuatro integrantes:** completar con los nombres del equipo.
- **Materia:** Laboratorio de Computación / Aplicaciones Móviles

---

## 🚀 Funcionalidades del Producto

Para el grupo de cuatro integrantes, la actividad requiere estas **seis funcionalidades de producto**. Las pantallas y la navegación son el medio para acceder a ellas; no cuentan como funcionalidades independientes.

| # | Feature | Descripción Funcional | Estado |
|---|---|---|:---:|
| **1** | **Catálogo/listado de recetas** | Muestra tarjetas con ícono, nombre, categoría y tiempo de preparación. | ✅ Implementada |
| **2** | **Búsqueda por nombre** | Busca recetas por nombre al confirmar el texto ingresado. | ✅ Implementada |
| **3** | **Filtro por categoría** | Filtra el catálogo por *Parrilla*, *Tradicional*, *Minutas*, *Dulces* o *Todas*. | ✅ Implementada |
| **4** | **Detalle de receta** | Presenta ingredientes, preparación, tiempo y dificultad de la receta elegida. | ✅ Implementada |
| **5** | **Crear receta** | Valida los datos obligatorios y agrega la receta al catálogo de la sesión. | ✅ Implementada |
| **6** | **Gestionar favoritos** | Permite marcar o desmarcar recetas y ver sólo las favoritas. | ✅ Implementada |

> **Limitación actual:** las recetas creadas y los favoritos existen sólo mientras la app está en ejecución. Al reiniciarla se restauran las cuatro recetas iniciales y se vacían los favoritos. La persistencia en una base de datos se incorporará en una etapa futura.

---

## 📱 Uso y Estructura

- **Catálogo principal (`src/app/recetas.tsx`)**
  - **Portada:** Imagen de cabecera (`assets/Imagenes/Sacha2.jpeg`).
  - **Fondo:** Imagen de fondo (`assets/Imagenes/fondo3.jpeg`).
  - **Buscador de texto.**
  - **Filtros por categoría.**
  - **Lista de recetas.**

- **Detalle de receta (`src/app/receta/[id].tsx`)**
  - Botón para volver al listado.
  - **Datos:** Nombre, categoría, tiempo y dificultad.
  - **Lista de ingredientes.**
  - **Preparación paso a paso.**

- **Nueva receta (`src/app/receta/nueva.tsx`)**
  - Formulario con campos obligatorios y mensajes de validación.

- **Favoritos (`src/app/favoritos.tsx`)**
  - Lista de recetas marcadas o mensaje cuando todavía no hay ninguna.

- **Estado compartido (`src/context/recetas-context.tsx`)**
  - Mantiene las recetas creadas y los favoritos sólo en memoria durante la sesión.

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
