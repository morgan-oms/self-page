import { isValidElement, type ReactElement, type ReactNode } from "react";
import { Icons } from "@/components/icons";
import { House, Library } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Java } from "@/components/ui/svgs/java";
import { Flutter } from "@/components/ui/svgs/flutter";
import { Kotlin } from "@/components/ui/svgs/kotlin";
import { Dart } from "@/components/ui/svgs/dart";
import { Swift } from "@/components/ui/svgs/swift";
import { SpringBoot } from "@/components/ui/svgs/springboot";
import { Mongodb } from "@/components/ui/svgs/mongodb";
import { CONFIG } from "@/data/config";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/config";

// -----------------------------------------------------------------------------
// How translations work in this file
//
// Anything that changes with the language is written as an object with one
// key per locale:  { en: "...", "pt-br": "...", es: "..." }
// Everything else (links, dates, icons, technologies) is written once.
// Components never read RESUME directly: they call getResume(locale), which
// returns the same structure with every translated field already resolved.
//
// Dates use "YYYY-MM" so they can be written out in each language.
// -----------------------------------------------------------------------------

const RESUME = {
  name: {
    en: "Morgan Oliveira - Mobile Software Engineer",
    "pt-br": "Morgan Oliveira - Engenheiro de Software Mobile",
    es: "Morgan Oliveira - Ingeniero de Software Móvil",
  },
  initials: "MO",
  url: CONFIG.site.url,
  location: {
    en: "Garanhuns, Pernambuco, Brazil",
    "pt-br": "Garanhuns, Pernambuco, Brasil",
    es: "Garanhuns, Pernambuco, Brasil",
  },
  locationLink: "https://www.google.com/maps/place/Garanhuns,+PE",
  description: {
    en: "Mobile Software Engineer building credit products with Flutter, Kotlin and Swift. Here I share my research and studies.",
    "pt-br":
      "Engenheiro de Software Mobile criando produtos de crédito com Flutter, Kotlin e Swift. Aqui compartilho minhas pesquisas e estudos.",
    es: "Ingeniero de Software Móvil que desarrolla productos de crédito con Flutter, Kotlin y Swift. Aquí comparto mis investigaciones y estudios.",
  },
  summary: {
    en: "I am a Mobile Software Engineer specializing in credit product development with Flutter/Dart, Kotlin and Swift, creating applications that improve people's financial experiences. I hold a [B.Sc. in Computer Science](#education) and I'm pursuing a [master's in Computer Engineering at the University of Pernambuco](#education), researching NoSQL schema design. I care about quality, usability and clean architecture — leveraging APIs and SOLID principles to deliver solutions that positively impact people's lives.",
    "pt-br":
      "Sou Engenheiro de Software Mobile especializado no desenvolvimento de produtos de crédito com Flutter/Dart, Kotlin e Swift, criando aplicações que melhoram a experiência financeira das pessoas. Sou [bacharel em Ciência da Computação](#education) e estou cursando o [mestrado em Engenharia da Computação na Universidade de Pernambuco](#education), pesquisando modelagem de esquemas NoSQL. Tenho foco em qualidade, usabilidade e arquitetura limpa — usando APIs e princípios SOLID para entregar soluções que impactam positivamente a vida das pessoas.",
    es: "Soy Ingeniero de Software Móvil especializado en el desarrollo de productos de crédito con Flutter/Dart, Kotlin y Swift, creando aplicaciones que mejoran la experiencia financiera de las personas. Soy [licenciado en Ciencias de la Computación](#education) y estoy cursando una [maestría en Ingeniería de la Computación en la Universidad de Pernambuco](#education), donde investigo el diseño de esquemas NoSQL. Me enfoco en la calidad, la usabilidad y la arquitectura limpia, aprovechando APIs y los principios SOLID para entregar soluciones que impacten positivamente en la vida de las personas.",
  },
  avatarUrl: "/avatar.jpg",
  ogImage: "/og_image.png",
  sections: {
    about: {
      order: 1,
      enabled: true,
      heading: { en: "About", "pt-br": "Sobre", es: "Sobre mí" },
    },
    skills: {
      order: 2,
      enabled: true,
      heading: { en: "Skills", "pt-br": "Habilidades", es: "Habilidades" },
    },
    work: {
      order: 3,
      enabled: true,
      heading: { en: "Work Experience", "pt-br": "Experiência Profissional", es: "Experiencia Laboral" },
      presentLabel: { en: "Present", "pt-br": "Atual", es: "Actualidad" },
    },
    education: {
      order: 4,
      enabled: true,
      heading: { en: "Education", "pt-br": "Formação", es: "Formación" },
    },
    projects: {
      order: 5,
      enabled: true,
      label: { en: "My Projects", "pt-br": "Meus Projetos", es: "Mis Proyectos" },
      heading: {
        en: "Research & side projects",
        "pt-br": "Pesquisa e projetos pessoais",
        es: "Investigación y proyectos personales",
      },
      moreUrl: "https://github.com/morgan-oms?tab=repositories",
      moreLabel: { en: "See more projects", "pt-br": "Ver mais projetos", es: "Ver más proyectos" },
      text: {
        en: "Projects from my master's research and things I build to learn. Each one tells the problem, the decisions and the stack behind it.",
        "pt-br":
          "Projetos da minha pesquisa de mestrado e coisas que construo para aprender. Cada um conta o problema, as decisões e a stack por trás dele.",
        es: "Proyectos de mi investigación de maestría y cosas que construyo para aprender. Cada uno cuenta el problema, las decisiones y el stack detrás de él.",
      },
    },
    photos: {
      order: 6,
      enabled: false,
      heading: { en: "My Recent Travels", "pt-br": "Minhas Viagens Recentes", es: "Mis Viajes Recientes" },
    },
    hackathons: {
      order: 7,
      enabled: false,
      label: "Hackathons",
      heading: "",
      text: "",
    },
    contact: {
      order: 8,
      enabled: true,
      label: { en: "Contact", "pt-br": "Contato", es: "Contacto" },
      heading: { en: "Get in Touch", "pt-br": "Vamos conversar", es: "Hablemos" },
      text: {
        en: "Want to chat about mobile, research or a project? Send me a message on LinkedIn or an email and I'll get back to you.",
        "pt-br":
          "Quer conversar sobre mobile, pesquisa ou algum projeto? Me mande uma mensagem no LinkedIn ou um e-mail e eu respondo assim que puder.",
        es: "¿Quieres hablar sobre desarrollo móvil, investigación o algún proyecto? Envíame un mensaje por LinkedIn o un correo y te responderé lo antes posible.",
      },
    },
  },
  photos: [
    {
      src: "/photos/rio-de-janeiro.jpg",
      alt: {
        en: "Morgan at Corcovado, overlooking Rio de Janeiro",
        "pt-br": "Morgan no Corcovado, com vista para o Rio de Janeiro",
        es: "Morgan en el Corcovado, con vista a Río de Janeiro",
      },
    },
  ],
  skills: [
    { name: "Flutter", icon: Flutter },
    { name: "Dart", icon: Dart },
    { name: "Kotlin", icon: Kotlin },
    { name: "Swift", icon: Swift },
    { name: "Java", icon: Java },
    { name: "Spring Boot", icon: SpringBoot },
    { name: "Python", icon: Python },
    { name: "React", icon: ReactLight },
    { name: "Node.js", icon: Nodejs },
    { name: "MongoDB", icon: Mongodb },
  ],
  // `href` is the path without language prefix; the navbar adds it.
  navbar: [
    { href: "/", icon: House, labelKey: "nav.home" },
    { href: "/blog", icon: Library, labelKey: "nav.blog" },
  ],
  contact: {
    email: "morgansiqueir@gmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/morgan-oms",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/morgan-oliveira/",
        icon: Icons.linkedin,
        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/morganoms.dev/",
        icon: Icons.instagram,
        navbar: true,
      },
      email: {
        name: "Gmail",
        url: "mailto:morgansiqueir@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "will bank",
      href: "https://www.willbank.com.br",
      badges: [],
      location: "Espírito Santo, Brazil",
      title: { en: "Software Engineer", "pt-br": "Engenheiro de Software", es: "Ingeniero de Software" },
      logoUrl: "https://www.google.com/s2/favicons?domain=willbank.com.br&sz=128",
      start: "2022-06",
      end: undefined,
      description: {
        en: "Building credit products — personal loans and FGTS birthday withdrawal (Saque-Aniversário). Mobile development with Dart, Kotlin and Swift, plus microservices with Java Spring Boot and Kotlin.",
        "pt-br":
          "Desenvolvimento de produtos de crédito — empréstimos e Saque-Aniversário do FGTS. Desenvolvimento mobile com Dart, Kotlin e Swift, além de microsserviços com Java Spring Boot e Kotlin.",
        es: "Desarrollo de productos de crédito: préstamos personales y retiro anual del FGTS (Saque-Aniversário). Desarrollo móvil con Dart, Kotlin y Swift, además de microservicios con Java Spring Boot y Kotlin.",
      },
    },
    {
      company: "Raro Labs",
      href: "https://rarolabs.com.br",
      badges: [],
      location: "Belo Horizonte, Brazil",
      title: {
        en: "Flutter Mobile Developer",
        "pt-br": "Desenvolvedor Mobile Flutter",
        es: "Desarrollador Móvil Flutter",
      },
      logoUrl: "/logos/raro-labs.png",
      start: "2021-06",
      end: "2022-06",
      description: {
        en: "Worked on Banco BMG's mobile app with Flutter/Dart: REST API integration, SOLID and Clean Architecture, Git Flow, Scrum, automated tests and code review.",
        "pt-br":
          "Atuei no app do Banco BMG com Flutter/Dart: integração com APIs REST, SOLID e Clean Architecture, Git Flow, Scrum, testes automatizados e code review.",
        es: "Trabajé en la app de Banco BMG con Flutter/Dart: integración con APIs REST, SOLID y Clean Architecture, Git Flow, Scrum, pruebas automatizadas y code review.",
      },
    },
    {
      company: "Pluri Educacional",
      href: undefined,
      badges: [],
      location: "Recife, Brazil",
      title: { en: "Software Engineer", "pt-br": "Engenheiro de Software", es: "Ingeniero de Software" },
      logoUrl: "/logos/pluri.png",
      start: "2019-06",
      end: "2021-06",
      description: {
        en: "Front-end web development with Angular and back-end APIs with Lumen (PHP).",
        "pt-br": "Desenvolvimento web front-end com Angular e APIs back-end com Lumen (PHP).",
        es: "Desarrollo web front-end con Angular y APIs back-end con Lumen (PHP).",
      },
    },
    {
      company: "Bravil Sistemas e Informática",
      href: undefined,
      badges: [],
      location: "Garanhuns, Brazil",
      title: { en: "Software Engineer", "pt-br": "Engenheiro de Software", es: "Ingeniero de Software" },
      logoUrl: "/logos/bravil.png",
      start: "2017-05",
      end: "2020-11",
      description: {
        en: "Mobile applications with Flutter/Dart and web development with React and Node.js.",
        "pt-br": "Aplicações mobile com Flutter/Dart e desenvolvimento web com React e Node.js.",
        es: "Aplicaciones móviles con Flutter/Dart y desarrollo web con React y Node.js.",
      },
    },
  ],
  education: [
    {
      school: {
        en: "University of Pernambuco (UPE)",
        "pt-br": "Universidade de Pernambuco (UPE)",
        es: "Universidad de Pernambuco (UPE)",
      },
      href: "https://www.upe.br",
      degree: {
        en: "Master's in Computer Engineering — Databases",
        "pt-br": "Mestrado em Engenharia da Computação — Banco de Dados",
        es: "Maestría en Ingeniería de la Computación — Bases de Datos",
      },
      logoUrl: "https://www.google.com/s2/favicons?domain=upe.br&sz=128",
      start: "2024",
      end: "2026",
    },
    {
      school: {
        en: "Federal Rural University of Pernambuco (UFRPE)",
        "pt-br": "Universidade Federal Rural de Pernambuco (UFRPE)",
        es: "Universidad Federal Rural de Pernambuco (UFRPE)",
      },
      href: "https://www.ufrpe.br",
      degree: {
        en: "B.Sc. in Computer Science",
        "pt-br": "Bacharelado em Ciência da Computação",
        es: "Licenciatura en Ciencias de la Computación",
      },
      logoUrl: "https://www.google.com/s2/favicons?domain=ufrpe.br&sz=128",
      start: "2016",
      end: "2021",
    },
  ],
  projects: [
    {
      title: "EASE-Doc",
      href: "https://github.com/morgan-oms/ease-doc",
      dates: "2025 - 2026",
      active: true,
      description: {
        en: "Master's research framework to extract, evaluate and select schemas for document-oriented NoSQL databases. It reads the artifacts of the U-Schema code analysis, estimates the I/O cost of each schema alternative (including data duplication plans) and uses Tabu search to explore the candidate space.",
        "pt-br":
          "Framework da minha pesquisa de mestrado para extrair, avaliar e selecionar esquemas de bancos NoSQL orientados a documentos. Ele lê os artefatos da análise de código do U-Schema, estima o custo de I/O de cada alternativa de esquema (incluindo planos de duplicação de dados) e usa busca Tabu para explorar o espaço de candidatos.",
        es: "Framework de mi investigación de maestría para extraer, evaluar y seleccionar esquemas de bases de datos NoSQL orientadas a documentos. Lee los artefactos del análisis de código de U-Schema, estima el costo de E/S de cada alternativa de esquema (incluidos los planes de duplicación de datos) y usa búsqueda tabú para explorar el espacio de candidatos.",
      },
      technologies: ["Python", "MongoDB", "NoSQL", "Tabu Search", "U-Schema"],
      links: [
        {
          type: { en: "Source", "pt-br": "Código", es: "Código" },
          href: "https://github.com/morgan-oms/ease-doc",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/ease-doc-architecture.png",
      video: "",
    },
    {
      title: "Marketplace EaseDoc",
      href: "https://github.com/morgan-oms/marketplace-easedoc",
      dates: "2025 - 2026",
      active: true,
      description: {
        en: "Case-study application used to reproduce the EASE-Doc experiments: a MongoDB marketplace server layer with 14 read queries and 7 write commands, used as input for schema extraction and benchmarked with YCSB.",
        "pt-br":
          "Aplicação de estudo de caso usada para reproduzir os experimentos do EASE-Doc: uma camada servidor MongoDB de marketplace com 14 consultas de leitura e 7 comandos de escrita, usada como entrada da extração de esquemas e avaliada com YCSB.",
        es: "Aplicación de caso de estudio usada para reproducir los experimentos de EASE-Doc: una capa de servidor MongoDB para un marketplace con 14 consultas de lectura y 7 comandos de escritura, usada como entrada para la extracción de esquemas y evaluada con YCSB.",
      },
      technologies: ["Node.js", "JavaScript", "MongoDB", "YCSB"],
      links: [
        {
          type: { en: "Source", "pt-br": "Código", es: "Código" },
          href: "https://github.com/morgan-oms/marketplace-easedoc",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/marketplace-easedoc.svg",
      video: "",
    },
    {
      title: "Catalog API",
      href: "https://github.com/morgan-oms/catalog-api",
      dates: "2025",
      active: false,
      description: {
        en: "REST API to manage a personal comic book collection: sign-up and login with JWT, and authenticated CRUD of comics per user. Layered architecture (routes, controllers, services and repositories), request validation with Zod and security headers with Helmet.",
        "pt-br":
          "API REST para gerenciar uma coleção pessoal de quadrinhos: cadastro e login com JWT e CRUD autenticado de quadrinhos por usuário. Arquitetura em camadas (rotas, controllers, services e repositories), validação das requisições com Zod e cabeçalhos de segurança com Helmet.",
        es: "API REST para gestionar una colección personal de cómics: registro e inicio de sesión con JWT y CRUD autenticado de cómics por usuario. Arquitectura en capas (rutas, controladores, servicios y repositorios), validación de solicitudes con Zod y cabeceras de seguridad con Helmet.",
      },
      technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "Zod"],
      links: [
        {
          type: { en: "Source", "pt-br": "Código", es: "Código" },
          href: "https://github.com/morgan-oms/catalog-api",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/catalog-api.svg",
      video: "",
    },
    {
      title: "Energy Project",
      href: "https://github.com/morgan-oms/energy_project",
      dates: "2024",
      active: false,
      description: {
        en: "Forecasting of wind power generation in Brazil using hourly data from the national grid operator (ONS). Built with Pedro during our master's at UPE, following CRISP-DM: data preparation and SARIMA time-series models, with and without a Box-Cox transformation.",
        "pt-br":
          "Previsão da geração de energia eólica no Brasil a partir dos dados horários do Operador Nacional do Sistema (ONS). Desenvolvido com o Pedro durante o mestrado na UPE, seguindo o CRISP-DM: preparação dos dados e modelos de séries temporais SARIMA, com e sem transformação de Box-Cox.",
        es: "Pronóstico de la generación de energía eólica en Brasil con datos horarios del operador nacional del sistema eléctrico (ONS). Desarrollado con Pedro durante la maestría en la UPE, siguiendo CRISP-DM: preparación de datos y modelos de series temporales SARIMA, con y sin transformación de Box-Cox.",
      },
      technologies: ["Python", "pandas", "statsmodels", "SARIMA", "Jupyter", "CRISP-DM"],
      links: [
        {
          type: { en: "Source", "pt-br": "Código", es: "Código" },
          href: "https://github.com/morgan-oms/energy_project",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/energy-project.svg",
      video: "",
    },
  ],
  hackathons: [] as {
    title: string;
    dates: string;
    location: string;
    description: string;
    image?: string;
    links: { title: string; href: string; icon: ReactNode }[];
  }[],
} as const;

// -----------------------------------------------------------------------------
// Locale resolution
// -----------------------------------------------------------------------------

type Translated<T> = { readonly en: T; readonly "pt-br": T; readonly es: T };

/** Replaces every { en, "pt-br", es } object in T with its string type. */
type Resolve<T> = [ReactNode] extends [T]
  ? T // React content is kept as-is
  : T extends Translated<infer U>
  ? U
  : T extends ReactElement
    ? T
  : T extends (...args: never[]) => unknown
    ? T
    : T extends readonly unknown[]
      ? { readonly [K in keyof T]: Resolve<T[K]> }
      : T extends object
        ? { readonly [K in keyof T]: Resolve<T[K]> }
        : T;

export type Resume = Resolve<typeof RESUME>;

function isTranslated(value: object): value is Translated<unknown> {
  const keys = Object.keys(value);
  return keys.length === LOCALES.length && LOCALES.every((locale) => locale in value);
}

function resolve(value: unknown, locale: Locale): unknown {
  if (value === null || typeof value !== "object") return value;
  if (isValidElement(value)) return value;
  if (Array.isArray(value)) return value.map((item) => resolve(item, locale));
  if (isTranslated(value)) return value[locale] ?? value[DEFAULT_LOCALE];
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, resolve(item, locale)]),
  );
}

const cache = new Map<Locale, Resume>();

/** The resume with every text in the requested language. */
export function getResume(locale: Locale): Resume {
  let resume = cache.get(locale);
  if (!resume) {
    resume = resolve(RESUME, locale) as Resume;
    cache.set(locale, resume);
  }
  return resume;
}

/** English version, for code that doesn't depend on the language. */
export const DATA = getResume(DEFAULT_LOCALE);
