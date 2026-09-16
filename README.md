# Proyecto ABP - Aplicacion Movil: Recetario Argentino

Aplicacion movil desarrollada bajo la metodologia de **Aprendizaje Basado en Proyectos (ABP)** para la materia de desarrollo de aplicaciones moviles.

## Nombre del Proyecto
**Recetario Argentino - Comidas Tipicas y Tradicionales**

## Descripcion del Proyecto y Problemática
La aplicacion centraliza recetas tradicionales argentinas y permite buscar, filtrar y consultar sus ingredientes y pasos de preparacion desde una interfaz simple y visual.

## Integrantes del Grupo
- Aparicio Fernando
- Cochis German
- Decalli Mariano
- Del Barrio Sacha
- **Materia:** Laboratorio de Computacion / Aplicaciones Moviles

## Funcionalidades del Producto

Para el grupo de cuatro integrantes, la actividad requiere estas **seis funcionalidades de producto**. Las pantallas y la navegacion son el medio para acceder a ellas; no cuentan como funcionalidades independientes.

| # | Feature | Descripcion Funcional | Estado |
|---|---|---|:---:|
| **1** | **Catalogo/listado de recetas** | Muestra tarjetas con icono, nombre, categoria y tiempo de preparacion. | Implementada |
| **2** | **Busqueda por nombre** | Busca recetas por nombre al confirmar el texto ingresado. | Implementada |
| **3** | **Filtro por categoria** | Filtra el catalogo por *Parrilla*, *Tradicional*, *Minutas*, *Dulces* o *Todas*. | Implementada |
| **4** | **Detalle de receta** | Presenta ingredientes, preparacion, tiempo y dificultad de la receta elegida. | Implementada |
| **5** | **Crear receta** | Valida los datos obligatorios y agrega la receta al catalogo de la sesion. | Implementada |
| **6** | **Gestionar favoritos** | Permite marcar o desmarcar recetas y ver solo las favoritas. | Implementada |

> **Limitacion actual:** las recetas creadas y los favoritos existen solo mientras la app esta en ejecucion. Al reiniciarla se restauran las cuatro recetas iniciales y se vacian los favoritos.

## Uso y Estructura

- **Bienvenida (`src/app/index.tsx`)**: acceso al recetario.
- **Catalogo (`src/app/recetas.tsx`)**: buscador, filtros y listado de recetas.
- **Detalle (`src/app/receta/[id].tsx`)**: ingredientes, pasos y accion de favoritos.
- **Nueva receta (`src/app/receta/nueva.tsx`)**: formulario con validacion de campos obligatorios.
- **Favoritos (`src/app/favoritos.tsx`)**: lista de recetas marcadas o mensaje vacio.
- **Estado compartido (`src/context/recetas-context.tsx`)**: conserva las recetas creadas y los favoritos en memoria durante la sesion.

## Tecnologias
- **Expo & React Native** (v57)
- **Expo Router**
- **React Native Safe Area Context**
- **TypeScript**

## Instrucciones para Ejecutar

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar la aplicacion
npx expo start
```

- Presiona `w` en la consola para probarla en el navegador.
- O escanea el codigo QR con la app Expo Go en tu celular.

### Ejecutar en Android Studio

1. Abrir **Android Studio** y encender un emulador desde **Device Manager**.
2. Esperar a que el emulador termine de iniciar y muestre la pantalla principal.
3. En otra terminal, ubicarse en la carpeta del proyecto:

   ```powershell
   cd D:\REPOSITORIOS\Laboratorio-DesarroloMovile
   ```

4. Iniciar Expo:

   ```bash
   npx expo start
   ```

5. Cuando aparezca el menu de Expo en la terminal, presionar `a` para abrir la aplicacion en el emulador Android.

> **Importante:** para este flujo no es necesario presionar el boton de ejecucion `▶` de Android Studio. Ese boton inicia una compilacion nativa y requiere configurar Java (`JAVA_HOME`).
