import { Code2 } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

export type Skill = {
  name: string;
  icon: string | null;
  fallbackIcon?: ReactNode;
};

export const categorizedSkills: Record<string, Skill[]> = {
  Frontend: [
    {
      name: "TailwindCSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    },
    {
      name: "React JS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    },
    {
      name: "Redux",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg",
    },
    {
      name: "NextJS 16",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Reflex",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    }, // Fallback to python
  ],
  Backend: [
    {
      name: "Node JS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Express JS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    },
    {
      name: "NestJS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
    },
    {
      name: "Django",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
    },
    {
      name: "Django Rest Framework",
      icon: "https://www.django-rest-framework.org/theme/img/logo.png",
    },
    {
      name: "Django Ninja",
      icon: "https://django-ninja.dev/img/docs-logo.png",
    },
    {
      name: "FastAPI",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
    },
  ],
  DevOps: [
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    },
    {
      name: "AWS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    },
  ],
  Database: [
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    },
  ],
  "Mobile & Cross Platform": [
    {
      name: "React Native",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    },
    {
      name: "Flet",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    },
  ],
  Others: [
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    },
    {
      name: "GitHub",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    },
    {
      name: "CI/CD",
      icon: "https://www.mabl.com/hs-fs/hubfs/CICDBlog.png?width=804&name=CICDBlog.png",
    },
  ],
};

export function SkillsSection() {
  return (
    <section className="w-full max-w-7xl mx-auto py-24 px-4 sm:px-6 relative">
      <div className="flex flex-col relative pb-32">
        {Object.entries(categorizedSkills).map(([category, skills], index) => (
          <div
            key={category}
            className="sticky flex flex-col gap-6 bg-background pt-10 pb-16 border-t border-primary/20 shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.5)] "
            style={{
              top: `calc(10vh + ${index * 1.5}rem)`,
              zIndex: 10 + index,
            }}
          >
            <div className="flex items-center gap-4 w-full px-2 sm:px-8">
              <div className="w-2 h-8 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"></div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-widest uppercase text-foreground">
                {category}
              </h3>
            </div>

            <div className="w-full px-2 sm:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                {skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex flex-col items-center justify-center p-6 bg-card border border-border/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 shadow-lg shadow-black/5 group hover:-translate-y-1"
                    style={{ aspectRatio: "1/1" }}
                  >
                    <div className="w-14 h-14 mb-4 bg-muted/30 flex items-center justify-center p-2">
                      {skill.icon ? (
                        <Image
                          src={skill.icon}
                          alt={`${skill.name} logo`}
                          width={56}
                          height={56}
                          className={`w-full h-full object-contain ${
                            ["NextJS 16", "Express JS", "GitHub"].includes(
                              skill.name,
                            )
                              ? "dark:invert opacity-70 group-hover:opacity-100 transition-opacity"
                              : ""
                          }`}
                        />
                      ) : (
                        skill.fallbackIcon || (
                          <Code2 className="w-8 h-8 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                        )
                      )}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-center uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
