import { DEFAULT_LOCALE, type Locale } from "./config";

// Fixed interface texts. Every key must exist in all languages —
// TypeScript enforces it through the `satisfies` below.
const en = {
  "hero.greeting": "Hi, I'm {name}",
  "nav.home": "Home",
  "nav.blog": "Blog",
  "nav.theme": "Theme",
  "nav.language": "Language",
  "photos.label": "Photos",
  "blog.title": "Blog",
  "blog.description":
    "Research notes and studies on mobile engineering, databases and software architecture.",
  "blog.count": "{count} posts",
  "blog.page": "Page {page} of {total}",
  "blog.previous": "Previous",
  "blog.next": "Next",
  "blog.empty": "No blog posts yet. Check back soon!",
  "blog.back": "Back to Blog",
  "blog.fallback": "This post isn't available in English yet — showing the original in {language}.",
  "notFound.title": "Page Not Found",
  "notFound.text": "The page you're looking for doesn't exist or may have been moved.",
  "notFound.home": "Go to Home",
  "language.en": "English",
  "language.pt-br": "Portuguese",
  "language.es": "Spanish",
};

type Dictionary = typeof en;

const ptBr = {
  "hero.greeting": "Olá, eu sou o {name}",
  "nav.home": "Início",
  "nav.blog": "Blog",
  "nav.theme": "Tema",
  "nav.language": "Idioma",
  "photos.label": "Fotos",
  "blog.title": "Blog",
  "blog.description":
    "Notas de pesquisa e estudos sobre engenharia mobile, bancos de dados e arquitetura de software.",
  "blog.count": "{count} posts",
  "blog.page": "Página {page} de {total}",
  "blog.previous": "Anterior",
  "blog.next": "Próximo",
  "blog.empty": "Ainda não há posts. Volte em breve!",
  "blog.back": "Voltar ao blog",
  "blog.fallback":
    "Este post ainda não está disponível em português — exibindo o original em {language}.",
  "notFound.title": "Página não encontrada",
  "notFound.text": "A página que você procura não existe ou foi movida.",
  "notFound.home": "Ir para o início",
  "language.en": "inglês",
  "language.pt-br": "português",
  "language.es": "espanhol",
} satisfies Dictionary;

const es = {
  "hero.greeting": "Hola, soy {name}",
  "nav.home": "Inicio",
  "nav.blog": "Blog",
  "nav.theme": "Tema",
  "nav.language": "Idioma",
  "photos.label": "Fotos",
  "blog.title": "Blog",
  "blog.description":
    "Notas de investigación y estudios sobre ingeniería móvil, bases de datos y arquitectura de software.",
  "blog.count": "{count} artículos",
  "blog.page": "Página {page} de {total}",
  "blog.previous": "Anterior",
  "blog.next": "Siguiente",
  "blog.empty": "Todavía no hay artículos. ¡Vuelve pronto!",
  "blog.back": "Volver al blog",
  "blog.fallback":
    "Este artículo aún no está disponible en español; se muestra el original en {language}.",
  "notFound.title": "Página no encontrada",
  "notFound.text": "La página que buscas no existe o fue movida.",
  "notFound.home": "Ir al inicio",
  "language.en": "inglés",
  "language.pt-br": "portugués",
  "language.es": "español",
} satisfies Dictionary;

export const UI: Record<Locale, Dictionary> = { en, "pt-br": ptBr, es };
export type UIKey = keyof Dictionary;

/**
 * Returns a translate function for a locale.
 *   const t = useTranslations("es");
 *   t("blog.page", { page: 1, total: 3 }) // "Página 1 de 3"
 */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey, vars: Record<string, string | number> = {}): string {
    const template = UI[locale]?.[key] ?? UI[DEFAULT_LOCALE][key];
    return template.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? `{${name}}`));
  };
}

/** "2022-06" -> "June 2022" / "Junho de 2022" / "Junio de 2022". */
export function formatMonthYear(value: string, locale: Locale): string {
  const [year, month] = value.split("-").map(Number);
  if (!month) return String(year);
  const text = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** "2026-11-08" -> "November 8, 2026" / "8 de novembro de 2026" / "8 de noviembre de 2026". */
export function formatLongDate(value: string, locale: Locale): string {
  const date = new Date(value.includes("T") ? value : `${value}T00:00:00Z`);
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
