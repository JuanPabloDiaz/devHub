# Arquitectura del Proyecto de DevHub

## Diagrama de Arquitectura

```mermaid
graph TD
    %% Definición de estilos
    classDef frontend fill:#f9d6d2,stroke:#d04a35,stroke-width:2px
    classDef backend fill:#d2f9d6,stroke:#35d04a,stroke-width:2px
    classDef data fill:#d2d6f9,stroke:#4a35d0,stroke-width:2px
    classDef deployment fill:#f9f9d2,stroke:#d0d04a,stroke-width:2px

    %% Frontend
    Client[Cliente Web] --> NextJS[Next.js App]
    NextJS --> Pages[Páginas]
    NextJS --> Components[Componentes]
    
    %% Páginas
    Pages --> HomePage[Home Page<br>/app/page.jsx]
    Pages --> CountryPage[Country Detail<br>/app/countries/[slug]/page.jsx]
    Pages --> QuizPage[Quiz Page<br>/app/quiz/page.jsx]
    
    %% Componentes
    Components --> UI[UI Components<br>/components]
    
    %% Backend
    NextJS --> APIRoutes[API Routes]
    APIRoutes --> CountriesAPI[Countries API<br>/app/api/countries/route.js]
    APIRoutes --> CountryAPI[Country Detail API<br>/app/api/countries/[slug]/route.js]
    APIRoutes --> QuizAPI[Quiz API<br>/app/api/quiz/route.js]
    
    %% Datos
    CountriesAPI --> CountriesData[Countries Data<br>/data/countries.json]
    CountryAPI --> CountriesData
    QuizAPI --> CountriesData
    
    %% Utilidades
    CountriesAPI --> Utils[Utilidades<br>/utils]
    CountryAPI --> Utils
    QuizAPI --> Utils
    
    %% Estilos
    NextJS --> Styling[Estilos]
    Styling --> Tailwind[TailwindCSS]
    Styling --> CSS[CSS Global<br>/app/globals.css]
    
    %% Despliegue
    NextJS --> Build[Build Process]
    Build --> StaticSite[Static Site<br>Netlify/Vercel]
    
    %% Aplicar clases
    Client:::frontend
    NextJS:::frontend
    Pages:::frontend
    Components:::frontend
    HomePage:::frontend
    CountryPage:::frontend
    QuizPage:::frontend
    UI:::frontend
    Styling:::frontend
    Tailwind:::frontend
    CSS:::frontend
    
    APIRoutes:::backend
    CountriesAPI:::backend
    CountryAPI:::backend
    QuizAPI:::backend
    Utils:::backend
    
    CountriesData:::data
    
    Build:::deployment
    StaticSite:::deployment
```

## Explicación del Diagrama

### Frontend
- **Cliente Web**: El navegador del usuario que accede a la aplicación
- **Next.js App**: El framework principal que maneja tanto frontend como backend
- **Páginas**: Componentes de React que representan rutas completas
  - **Home Page**: Lista todos los países (`/app/page.jsx`)
  - **Country Detail**: Muestra detalles de un país específico (`/app/countries/[slug]/page.jsx`)
  - **Quiz Page**: Página de cuestionario sobre países (`/app/quiz/page.jsx`)
- **Componentes**: Elementos UI reutilizables
- **Estilos**: Sistema de estilizado
  - **TailwindCSS**: Framework de utilidades CSS
  - **CSS Global**: Estilos globales de la aplicación

### Backend (API Routes de Next.js)
- **API Routes**: Sistema de endpoints API de Next.js
  - **Countries API**: Devuelve lista de países (`/app/api/countries/route.js`)
  - **Country Detail API**: Devuelve detalles de un país específico (`/app/api/countries/[slug]/route.js`)
  - **Quiz API**: Maneja la lógica del cuestionario (`/app/api/quiz/route.js`)
- **Utilidades**: Funciones auxiliares para procesar datos

### Datos
- **Countries Data**: Archivo JSON con todos los datos de países (`/data/countries.json`)

### Despliegue
- **Build Process**: Proceso de construcción de Next.js
- **Static Site**: Sitio estático desplegado en Netlify o Vercel

## Flujo de Datos

1. El cliente solicita una página (por ejemplo, la lista de países)
2. Next.js maneja la solicitud a través de su sistema de rutas
3. El componente de página hace una solicitud a la API interna
4. La API Route procesa la solicitud, accede a los datos JSON
5. Los datos se transforman según sea necesario usando utilidades
6. La respuesta se devuelve al componente de página
7. El componente renderiza los datos y se muestra al usuario

Este flujo aprovecha la arquitectura full-stack de Next.js, donde tanto el frontend como el backend están integrados en un solo framework.
