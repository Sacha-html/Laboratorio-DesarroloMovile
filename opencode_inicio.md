# Referencia de inicio para OpenCode

## Proposito y stack

`Laboratorio2` es una app movil de la materia Laboratorio de Computacion / Aplicaciones Moviles. El README la define como un recetario argentino ABP: lista recetas, busca por nombre, filtra categorias y muestra un detalle.

- Expo SDK 57, React Native 0.86.3, React 19.2.3 y TypeScript estricto.
- `expo-router` es el entry point (`main: "expo-router/entry"`) y usa rutas basadas en archivos bajo `src/app`.
- El proyecto incluye soporte Android, iOS y web; la configuracion web produce salida estatica.

## Mapa del repositorio

- `src/app/_layout.tsx`: layout raiz; monta un `Stack` sin header y define el fondo de navegacion.
- `src/app/index.tsx`: pantalla funcional principal del recetario. Contiene datos, estado, filtrado y las vistas de catalogo/detalle en el mismo componente.
- `src/app/explore.tsx`: pantalla de ejemplo de la plantilla Expo. Usa componentes tematicos de `src/components`, hooks y constantes; no participa del flujo que implementa el recetario en `index.tsx`.
- `src/components/`, `src/hooks/`, `src/constants/`: infraestructura y ejemplos visuales heredados de la plantilla.
- `assets/Imagenes/`: imagenes propias usadas por el recetario (`Sacha2.jpeg` y `fondo3.jpeg`). `assets/images/` y `assets/expo.icon/` contienen iconos, splash y assets de Expo.
- `app.json`: identidad, plataformas, plugins y experimentos de Expo.
- `scripts/reset-project.js`: script de reseteo provisto por la plantilla.
- `README.md`: alcance funcional, integrantes y guia basica del trabajo.
- `AGENTS.md`: exige consultar la documentacion exacta de Expo v57 antes de escribir codigo Expo. `CLAUDE.md` remite a ese archivo.

## Como ejecutar y validar

Los scripts realmente declarados en `package.json` son:

```bash
npm install
npm run start
npm run android
npm run ios
npm run web
npm run lint
npm run reset-project
```

`start`, `android`, `ios` y `web` llaman a `expo start`; `lint` llama a `expo lint`. No hay scripts `test`, `build` ni `typecheck`, por lo que no hay que afirmarlos ni ejecutarlos como si existieran. El lockfile es `package-lock.json`, asi que usar npm preserva el gestor ya adoptado.

## Arquitectura y flujo actual

Expo Router resuelve las rutas desde `src/app`. El layout raiz presenta un `Stack`; la ruta inicial corresponde a `src/app/index.tsx`.

En esa pantalla:

1. `RECETAS` es un arreglo local con cuatro recetas; no hay API, persistencia ni configuracion de entorno propia para sus datos. El componente de plantilla `src/components/external-link.tsx` consulta `process.env.EXPO_OS` para distinguir web de otras plataformas.
2. `busqueda` y `categoria` se actualizan desde un `TextInput` y chips; `recetasFiltradas` combina ambas condiciones en memoria.
3. Pulsar una tarjeta guarda el objeto en `recetaSeleccionada` y cambia condicionalmente a la vista de detalle.
4. `volverAlListado` limpia esa seleccion y vuelve al catalogo. No se navega a un detalle mediante una ruta separada.

La app usa imports relativos para las fotos del recetario y alias TypeScript `@/* -> src/*` y `@/assets/* -> assets/*`. `strict` esta habilitado en `tsconfig.json`.

## Configuracion relevante

- Nombre/slug: `Laboratorio2`; esquema de deep link: `laboratorio2`.
- Orientacion fija vertical e interfaz automatica segun el sistema.
- Plugin `expo-router` y plugin `expo-splash-screen` con splash configurado en `assets/images/splash-icon.png`.
- Android usa icono adaptativo y desactiva predictive back; iOS usa `assets/expo.icon`; web usa favicon y output estatico.
- Los experimentos `typedRoutes` y `reactCompiler` estan habilitados.

No se detectaron archivos `.env`, configuracion de credenciales ni servicios remotos. Si se agregan, no hardcodear secretos: documentar sus nombres y proveer un ejemplo sin valores reales.

## Convenciones y limites seguros

- Mantener TypeScript estricto y los aliases existentes cuando corresponda.
- Antes de modificar integraciones Expo, consultar la documentacion versionada v57 indicada en `AGENTS.md`; no asumir APIs de otra version.
- No borrar ni reutilizar sin verificar los componentes y pantallas de plantilla: `explore.tsx` y `src/components` pueden seguir siendo rutas/soporte disponible aunque el recetario no los use en su flujo principal.
- Preservar los assets con mayusculas en `assets/Imagenes`; las rutas son sensibles a mayusculas en entornos no Windows.
- Revisar `git status --short` antes de editar. Durante este relevamiento no habia cambios locales; `opencode_inicio.md` es el unico archivo creado por esta tarea.

## Proximos pasos seguros

1. Ejecutar `npm run start` y comprobar catalogo, busqueda, filtros y retorno desde detalle en el destino elegido.
2. Ejecutar `npm run lint` antes de entregar cambios; resolver advertencias sin modificar archivos de plantilla por accidente.
3. Si se quiere crecer el recetario, extraer el tipo y datos de receta desde `src/app/index.tsx` antes de introducir persistencia o navegacion por detalle.
4. Al reemplazar el contenido de plantilla, decidir explicitamente si se elimina o adapta `src/app/explore.tsx` y sus dependencias, para que no quede una ruta de ejemplo incoherente.

## Evidencia revisada

- `package.json`: entry point, versiones, dependencias y scripts.
- `app.json`: configuracion Expo, plugins, plataformas y experimentos.
- `tsconfig.json`: strict mode y aliases.
- `src/app/_layout.tsx`, `src/app/index.tsx`, `src/app/explore.tsx`: navegacion, flujo y separacion entre recetario y plantilla.
- `README.md`, `AGENTS.md`, `CLAUDE.md`, estructura de `assets/` y `git status --short`: alcance, restriccion de Expo, assets y estado inicial.
