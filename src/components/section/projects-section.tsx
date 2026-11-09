import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { useLocale, useResume } from "@/i18n/react";
import { localizePath } from "@/i18n/config";
import { Icons } from "@/components/icons";
import { ArrowUpRight } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
  const DATA = useResume();
  const locale = useLocale();
    return (
        <section id="projects">
            <div className="flex min-h-0 flex-col gap-y-8">
                <div className="flex flex-col gap-y-4 items-center justify-center">
                    <div className="flex items-center w-full">
                        <div
                            className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent"

                        />
                        <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                            <span className="text-background text-sm font-medium">{DATA.sections.projects.label}</span>
                        </div>
                        <div
                            className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent"

                        />
                    </div>
                    <div className="flex flex-col gap-y-3 items-center justify-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{DATA.sections.projects.heading}</h2>
                        <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                            {DATA.sections.projects.text}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-[800px] mx-auto">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 auto-rows-fr">
                    {DATA.projects.map((project, id) => (
                        <BlurFade
                            key={project.title}
                            delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                            className="h-full"
                        >
                            <ProjectCard
                                href={project.href.startsWith("/") ? localizePath(project.href, locale) : project.href}
                                key={project.title}
                                title={project.title}
                                description={project.description}
                                dates={project.dates}
                                tags={project.technologies}
                                image={project.image}
                                video={project.video}
                                links={project.links}
                            />
                        </BlurFade>
                    ))}
                </div>
                <BlurFade delay={BLUR_FADE_DELAY * 12 + DATA.projects.length * 0.05}>
                    <a
                        href={DATA.sections.projects.moreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted hover:ring-2 hover:ring-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <Icons.github className="size-4" />
                        {DATA.sections.projects.moreLabel}
                        <ArrowUpRight
                            className="size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden
                        />
                    </a>
                </BlurFade>
                </div>
            </div>
        </section>
    );
}

