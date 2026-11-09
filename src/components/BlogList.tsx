import BlurFade from "@/components/magicui/blur-fade";
import { ChevronRight } from "lucide-react";
import { localizePath, type Locale } from "@/i18n/config";
import { useTranslations } from "@/i18n/ui";

const BLUR_FADE_DELAY = 0.04;

interface Post {
  id: string;
  href: string;
  title: string;
  /** Already formatted for the page language. */
  publishedAt: string;
  /** Short language code (e.g. "EN") when the post isn't translated yet. */
  contentLanguage?: string;
  contentLang: string;
}

interface Pagination {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface BlogListProps {
  locale: Locale;
  posts: Post[];
  allPostsCount: number;
  pagination: Pagination;
  pageSize: number;
}

export default function BlogList({ locale, posts, allPostsCount, pagination, pageSize }: BlogListProps) {
  const t = useTranslations(locale);
  const blogPath = localizePath("/blog", locale);
  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-4">
          {t("blog.title")}{" "}
          <span className="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">
            {t("blog.count", { count: allPostsCount })}
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          {t("blog.description")}
        </p>
      </BlurFade>

      {posts.length > 0 ? (
        <>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="flex flex-col gap-5">
              {posts.map((post, id) => {
                const indexNumber = (pagination.page - 1) * pageSize + id + 1;
                return (
                  <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={post.id}>
                    <a
                      className="flex items-start gap-x-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      href={post.href}
                    >
                      <span className="text-xs font-mono tabular-nums font-medium mt-[5px]">
                        {String(indexNumber).padStart(2, "0")}.
                      </span>
                      <div className="flex flex-col gap-y-2 flex-1">
                        <p className="tracking-tight text-lg font-medium">
                          <span className="group-hover:text-foreground transition-colors">
                            <span lang={post.contentLang}>{post.title}</span>
                            {post.contentLanguage && (
                              <span className="ml-2 align-middle rounded border border-border px-1 py-0.5 font-mono text-[10px] text-muted-foreground">
                                {post.contentLanguage}
                              </span>
                            )}
                            <ChevronRight
                              className="ml-1 inline-block size-4 stroke-3 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                              aria-hidden
                            />
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {post.publishedAt}
                        </p>
                      </div>
                    </a>
                  </BlurFade>
                );
              })}
            </div>
          </BlurFade>

          {pagination.totalPages > 1 && (
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="flex gap-3 flex-row items-center justify-between mt-8">
                <div className="text-sm text-muted-foreground">
                  {t("blog.page", { page: pagination.page, total: pagination.totalPages })}
                </div>
                <div className="flex gap-2 sm:justify-end">
                  {pagination.hasPreviousPage ? (
                    <a
                      href={`${blogPath}?page=${pagination.page - 1}`}
                      className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {t("blog.previous")}
                    </a>
                  ) : (
                    <span className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg opacity-50 cursor-not-allowed">
                      {t("blog.previous")}
                    </span>
                  )}
                  {pagination.hasNextPage ? (
                    <a
                      href={`${blogPath}?page=${pagination.page + 1}`}
                      className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {t("blog.next")}
                    </a>
                  ) : (
                    <span className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg opacity-50 cursor-not-allowed">
                      {t("blog.next")}
                    </span>
                  )}
                </div>
              </div>
            </BlurFade>
          )}
        </>
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl">
            <p className="text-muted-foreground text-center">
              {t("blog.empty")}
            </p>
          </div>
        </BlurFade>
      )}
    </section>
  );
}
