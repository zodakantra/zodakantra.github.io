export const PROFILE = {
  name: "Augusto Tejerina",
  handle: "cide-hamete",
  email: "damiantgrina@gmail.com",
  github: "https://github.com/cide-hamete",
  location: "Buenos Aires, Argentina",
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "Nativo" },
    { name: "Ruso", level: "Nativo" },
  ],
};

export const SERVICES = [
  {
    id: "apps-software",
    tag: "01 · Core Empresarial",
    title: "Desarrollo de Apps & Software a Medida",
    description:
      "Diseño y construcción de sistemas internos de gestión, aplicaciones multiplataforma (móvil y escritorio) y plataformas operativas pensadas para resolver cuellos de botella reales en tu empresa.",
    highlights: ["Apps multiplataforma con Flutter", "Sistemas de inventario, precios y operación", "Arquitectura escalable y mantenible"],
  },
  {
    id: "web-platforms",
    tag: "02 · Presencia & Producto",
    title: "Desarrollo Web de Alto Rendimiento",
    description:
      "Sitios corporativos, landing pages orientadas a conversión y paneles web modernos. Carga instantánea, diseño responsivo impecable y accesibilidad real en cualquier dispositivo.",
    highlights: ["Interfaces modernas y veloces", "Paneles de control y catálogos web", "Optimización SEO y experiencia móvil"],
  },
  {
    id: "data-science",
    tag: "03 · UBA Ciencia de Datos",
    title: "Ciencia de Datos, NLP & Modelos Predictivos",
    description:
      "Transformo datos dispersos de negocio en modelos útiles: procesamiento de lenguaje natural, sistemas de ranking, predicción de demanda y análisis estadístico riguroso.",
    highlights: ["Modelos predictivos y de ranking", "Procesamiento de texto (NLP)", "Evaluación frente a baselines reales"],
  },
  {
    id: "automation-backend",
    tag: "04 · Eficiencia Operativa",
    title: "Backend, APIs & Automatización de Procesos",
    description:
      "Elimino tareas manuales repetitivas mediante APIs robustas, extracción estructurada de datos (scraping de precios y catálogos), reportes automáticos y servidores Linux.",
    highlights: ["APIs con Python & FastAPI", "Auditoría y monitoreo de datos externos", "Pipelines automáticos y bots"],
  },
];

export const PROJECTS = [
  {
    id: "rocinantes",
    featured: true,
    category: "Software Empresarial · Full-Stack",
    title: "Rocinantes — Gestión de Inventario y Auditoría de Precios",
    summary:
      "Sistema integral multi-sucursal para pet shops y retail: centraliza precios frente a la inflación, controla stock por ubicación física y audita catálogos contra grandes supermercados.",
    stack: ["Python", "FastAPI", "SQLModel", "SQLite", "Flutter", "Dart"],
    status: "Proyecto privado en producción / desarrollo activo",
    githubUrl: null,
    problem:
      "Gestionar inventario multi-sucursal y seguir variaciones de precios en contextos inflacionarios usando planillas aisladas genera inconsistencias, errores de carga y pérdida de margen.",
    architecture: [
      "Backend modular en FastAPI + SQLModel con modelo relacional normalizado: Supermercado, Sucursal, Producto, PrecioSupermercado centralizado, HistorialPrecio para auditoría temporal e Inventario por góndola/depósito.",
      "Scripts de ingesta inteligente de CSV y auditoría automatizada de catálogos y precios frente a cadenas de retail.",
      "Cliente multiplataforma en Flutter (Dart) con modelos null-safe espejados al esquema de base de datos y consumo asíncrono vía API REST.",
    ],
    impact:
      "Unifica operación física de stock con trazabilidad histórica de precios en una sola arquitectura desacoplada lista para escritorio y móvil.",
    visual: "architecture",
  },
  {
    id: "yhat-licitaciones",
    featured: false,
    category: "Ciencia de Datos · NLP & Ranking",
    title: "Y-Hat — Ranking Predictivo de Licitaciones Públicas",
    summary:
      "Proyecto de Ciencia de Datos y NLP (UBA) para rankear empresas candidatas por probabilidad de adjudicación a partir del texto de pliegos públicos.",
    stack: ["Python", "NLP", "Machine Learning", "Ranking", "uv"],
    status: "Proyecto académico privado · UBA",
    githubUrl: null,
    problem:
      "Gran parte de las adjudicaciones se explica por historial previo (baseline B0 por organismo y rubro). El desafío real es medir cuánto valor predictivo aporta leer el texto de la licitación.",
    architecture: [
      "Pipeline reproducible en Python para ingesta de documentos de licitaciones sin data leakage temporal (usando solo información disponible al momento de publicación).",
      "Extracción de señales textuales con técnicas de NLP y modelos de reranking clásico comparados estrictamente contra el baseline B0.",
      "Módulo de evaluación cuantitativa para aislar la mejora atribuible al análisis semántico.",
    ],
    impact:
      "Demuestra rigor metodológico en validación temporal y medición de ganancia real sobre baselines fuertes de negocio.",
    visual: "ranking",
  },
  {
    id: "scraper-kobo",
    featured: false,
    category: "Automatización · Data Pipeline",
    title: "Scraper de Noticias → Edición EPUB para Kobo",
    summary:
      "Pipeline CLI automatizado en Python que recolecta artículos de múltiples medios argentinos, compila un libro EPUB diario con portada generada y lo sincroniza vía Dropbox.",
    stack: ["Python", "Web Scraping", "EPUB", "Dropbox Sync", "CLI"],
    status: "Uso personal / automatización",
    githubUrl: null,
    problem:
      "Leer prensa diaria sin distracciones ni algoritmos requiere consolidar múltiples fuentes en un formato cómodo para tinta electrónica.",
    architecture: [
      "Scrapers modulares por medio (La Nación, Infobae, entre otros) con filtros configurables de ventana temporal (24h, semana) y descarga opcional de imágenes.",
      "Generador automático de portada y compilador EPUB estructurado por medio y artículo.",
      "Integración directa con carpeta sincronizada de Dropbox para envío automático a lectores Rakuten Kobo.",
    ],
    impact:
      "Automatiza de punta a punta la recolección, limpieza HTML, empaquetado editorial y entrega en la nube con un solo comando.",
    visual: "pipeline",
  },
  {
    id: "ondas",
    featured: false,
    category: "Web App · Síntesis de Audio",
    title: "Ondas — Sintetizador Acústico & Binaural Offline",
    summary:
      "Aplicación web interactiva construida íntegramente sobre la Web Audio API nativa. Funciona 100% offline, sin dependencias externas ni archivos de audio pregrabados.",
    stack: ["JavaScript", "Web Audio API", "HTML5", "CSS3"],
    status: "Aplicación Web Offline",
    githubUrl: null,
    problem:
      "Muchos generadores de ruido para concentración dependen de streaming pesado, trackers o loops cortos audibles.",
    architecture: [
      "Síntesis matemática en tiempo real de 6 espectros acústicos (blanco, rosa 1/f, marrón 1/f², azul, violeta y negro subsónico).",
      "Capas ambientales procedurales (lluvia, fogata con micro-explosiones y viento modulado a 0.07 Hz) mezclables en vivo.",
      "Motor de síntesis binaural estéreo calibrado para estados de foco (Alpha 10 Hz), descanso (Delta) y meditación (Theta).",
    ],
    impact:
      "Audio continuo sin cortes ni consumo de red, ejecutado directamente en el motor nativo de audio del navegador.",
    visual: "wave",
  },
  {
    id: "math-wallpapers",
    featured: false,
    category: "Gráficos Matemáticos · Sistemas",
    title: "Loss Landscape & Árboles Abstractos (KDE Plasma 6)",
    summary:
      "Visualizaciones matemáticas interactivas de consumo casi nulo (~0% GPU en reposo): paisaje de optimización no convexa (Adam) y árboles procedurales L-System en QML.",
    stack: ["HTML5 Canvas", "QML", "JavaScript", "Optimización", "Linux"],
    status: "Plugins KDE Plasma 6",
    githubUrl: null,
    problem:
      "Unir estética matemática minimalista con ejecución continua en escritorio Linux sin drenar batería ni ciclos de GPU.",
    architecture: [
      "Loss Landscape: modela el cañón de Rosenbrock con perturbaciones armónicas en 74 curvas con eliminación de líneas ocultas, retícula de descenso Adam y telemetría térmica/CPU.",
      "Árboles Abstractos: motor QML + KConfig que expande gramáticas de Sistemas-L con prevención de corrupción de pila, culling fuera de pantalla y dibujo por lotes a 30 FPS.",
      "Hibernación automática cuando el escritorio no es visible y sincronización dinámica con tema claro/oscuro del sistema.",
    ],
    impact:
      "Combina teoría de optimización, gramáticas formales y programación gráfica eficiente integrada al entorno nativo de Linux.",
    visual: "landscape",
  },
];

export const STACK_GROUPS = [
  {
    title: "Ciencia de Datos & IA",
    items: ["Python", "Pandas & NumPy", "NLP & Reranking", "Modelado Predictivo", "Optimización Matemática", "Estadística Aplicada"],
  },
  {
    title: "Web, Apps & Backend",
    items: ["FastAPI", "SQLModel & SQLite/SQL", "Flutter & Dart", "HTML5 & CSS3 Moderno", "JavaScript (ES Modules)", "APIs REST"],
  },
  {
    title: "Sistemas, Scraping & Tooling",
    items: ["Linux (KDE / Servidores)", "Web Scraping & Pipelines", "Git & GitHub", "QML / Canvas", "Programación Competitiva", "CLI & Automatización"],
  },
];
