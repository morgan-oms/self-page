import { getCollection, type CollectionEntry } from "astro:content";
import { DEFAULT_LOCALE, LOCALES, isLocale, localizePath, type Locale } from "@/i18n/config";

// Posts live in one folder per language:
//   src/content/blog/en/my-post.mdx
//   src/content/blog/pt-br/my-post.mdx
//   src/content/blog/es/my-post.mdx
// The file name is the slug and must be the same in every language, so the
// translations of a post are linked together.

export type BlogEntry = CollectionEntry<"blog">;

export interface LocalizedPost {
  entry: BlogEntry;
  slug: string;
  /** Language the post is actually written in. */
  contentLocale: Locale;
  /** True when there is no translation for the requested language. */
  isFallback: boolean;
  /** URL of this post in the requested language. */
  url: string;
}

function parseId(id: string): { locale: Locale; slug: string } {
  const [first, ...rest] = id.split("/");
  if (isLocale(first) && rest.length > 0) return { locale: first, slug: rest.join("/") };
  return { locale: DEFAULT_LOCALE, slug: id };
}

const byDateDesc = (a: LocalizedPost, b: LocalizedPost) =>
  new Date(b.entry.data.publishedAt).getTime() - new Date(a.entry.data.publishedAt).getTime();

/**
 * Every post, in the requested language when a translation exists. Posts
 * without a translation fall back to English, then to whichever language
 * they were written in.
 */
export async function getPostsForLocale(locale: Locale): Promise<LocalizedPost[]> {
  const entries = await getCollection("blog");
  const bySlug = new Map<string, Map<Locale, BlogEntry>>();
  for (const entry of entries) {
    const { locale: entryLocale, slug } = parseId(entry.id);
    if (!bySlug.has(slug)) bySlug.set(slug, new Map());
    bySlug.get(slug)!.set(entryLocale, entry);
  }

  const posts: LocalizedPost[] = [];
  for (const [slug, versions] of bySlug) {
    const preference = [locale, DEFAULT_LOCALE, ...LOCALES];
    const contentLocale = preference.find((candidate) => versions.has(candidate))!;
    posts.push({
      entry: versions.get(contentLocale)!,
      slug,
      contentLocale,
      isFallback: contentLocale !== locale,
      url: localizePath(`/blog/${slug}`, locale),
    });
  }
  return posts.sort(byDateDesc);
}

/** Static paths for one language's post pages, with previous/next links. */
export async function getPostPaths(locale: Locale) {
  const posts = await getPostsForLocale(locale);
  return posts.map((post, index) => ({
    params: { slug: post.slug },
    props: {
      post,
      previousPost: index > 0 ? posts[index - 1] : null,
      nextPost: index < posts.length - 1 ? posts[index + 1] : null,
    },
  }));
}
