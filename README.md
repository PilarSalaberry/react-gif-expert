# GIF Explorer

Una aplicación responsive para buscar GIFs con la API de GIPHY, creada con React y Vite.

## Requisitos

- Node.js 20 o superior
- Yarn 1.x o npm
- Una API key de [GIPHY Developers](https://developers.giphy.com/)

## Configuración

1. Instalá las dependencias:

   ```bash
   yarn install
   ```

2. Copiá `.env.example` como `.env.local` y agregá tu API key:

   ```env
   VITE_GIPHY_API_KEY=tu_api_key_de_giphy
   ```

3. Iniciá el entorno de desarrollo:

   ```bash
   yarn dev
   ```

## Comandos

- `yarn dev`: inicia Vite con recarga rápida.
- `yarn build`: genera el bundle de producción en `dist/`.
- `yarn preview`: sirve localmente el bundle de producción.

## Decisiones técnicas

- Los requests se cancelan al desmontar el componente para evitar actualizaciones obsoletas.
- La interfaz contempla carga, error, reintento y búsquedas sin resultados.
- La API key vive en variables de entorno y no se incluye en el código fuente.
- Las imágenes usan carga diferida y el layout se adapta a móvil y escritorio.
