# DevHub Project Architecture

## Architecture Diagram

```mermaid
graph TD
    %% Styles definition
    classDef frontend fill:#f9d6d2,stroke:#d04a35,stroke-width:2px
    classDef backend fill:#d2f9d6,stroke:#35d04a,stroke-width:2px
    classDef data fill:#d2d6f9,stroke:#4a35d0,stroke-width:2px
    classDef deployment fill:#f9f9d2,stroke:#d0d04a,stroke-width:2px

    %% Frontend
    Client[Web Client] --> NextJS[Next.js App]
    NextJS --> Pages[Pages]
    NextJS --> Components[Components]
    
    %% Pages
    Pages --> HomePage[Home Page<br>/app/page.jsx]
    Pages --> ResourcePage[Resource Detail<br>/app/resources/[slug]/page.jsx]
    Pages --> QuizPage[Quiz Page<br>/app/quiz/page.jsx]
    
    %% Components
    Components --> UI[UI Components<br>/components]
    
    %% Backend
    NextJS --> APIRoutes[API Routes]
    APIRoutes --> ResourcesAPI[Resources API<br>/app/api/resources/route.js]
    APIRoutes --> ResourceAPI[Resource Detail API<br>/app/api/resources/[slug]/route.js]
    APIRoutes --> CategoriesAPI[Categories API<br>/app/api/categories/route.js]
    APIRoutes --> QuizAPI[Quiz API<br>/app/api/quiz/route.js]
    
    %% Data
    ResourcesAPI --> ResourcesData[Resources Data<br>/data/db/resources.json]
    ResourceAPI --> ResourcesData
    CategoriesAPI --> CategoriesData[Categories Data<br>/data/db/categories.json]
    
    %% Utilities
    ResourcesAPI --> Utils[Utilities<br>/utils]
    ResourceAPI --> Utils
    CategoriesAPI --> Utils
    QuizAPI --> Utils
    
    %% Styling
    NextJS --> Styling[Styling]
    Styling --> Tailwind[TailwindCSS]
    Styling --> CSS[Global CSS<br>/app/globals.css]
    
    %% Deployment
    NextJS --> Build[Build Process]
    Build --> StaticSite[Static Site<br>Netlify/Vercel]
    
    %% Apply classes
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
    ResourcesAPI:::backend
    ResourceAPI:::backend
    CategoriesAPI:::backend
    CountryAPI:::backend
    QuizAPI:::backend
    Utils:::backend
    
    ResourcesData:::data
    CategoriesData:::data
    
    Build:::deployment
    StaticSite:::deployment
```

## Diagram Explanation

### Frontend
- **Web Client**: The user's browser accessing the application
- **Next.js App**: The main framework handling both frontend and backend
- **Pages**: React components representing complete routes
  - **Home Page**: Lists all developer resources (`/app/page.jsx`)
  - **Resource Detail**: Shows details of a specific developer resource (`/app/resources/[slug]/page.jsx`)
  - **Quiz Page**: Country quiz page (`/app/quiz/page.jsx`)
- **Components**: Reusable UI elements
- **Styling**: Styling system
  - **TailwindCSS**: CSS utility framework
  - **Global CSS**: Application global styles

### Backend (Next.js API Routes)
- **API Routes**: Next.js API endpoints system
  - **Resources API**: Returns list of developer resources (`/app/api/resources/route.js`)
  - **Resource Detail API**: Returns details of a specific resource (`/app/api/resources/[slug]/route.js`)
  - **Categories API**: Returns list of resource categories (`/app/api/categories/route.js`)
  - **Quiz API**: Handles quiz logic (`/app/api/quiz/route.js`)
- **Utilities**: Helper functions for data processing

### Data
- **Resources Data**: JSON file with all developer resources (`/data/db/resources.json`)
- **Categories Data**: JSON file with all resource categories (`/data/db/categories.json`)

### Deployment
- **Build Process**: Next.js build process
- **Static Site**: Static site deployed on Netlify or Vercel

## Data Flow

1. The client requests a page (e.g., the list of developer resources)
2. Next.js handles the request through its routing system
3. The page component makes a request to the internal API
4. The API Route processes the request, accessing the JSON data
5. The data is transformed as needed using utilities
6. The response is returned to the page component
7. The component renders the data and is displayed to the user

This flow leverages Next.js's full-stack architecture, where both frontend and backend are integrated into a single framework.
