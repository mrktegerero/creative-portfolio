import { Paragraph } from "../Reusable/Paragraph";
import { experienceData } from "../../data/ExperienceData";

export function Experience() {
  return (
    <section id="experience" className="w-full px-6 py-20 md:px-12 md:py-32">
      <div className="grid gap-12 md:grid-cols-2 md:gap-0">
        <div className="flex flex-col gap-5">
          <Paragraph>Experience</Paragraph>

          <Paragraph className="max-w-md text-neutral-100">
            {experienceData.intro}
          </Paragraph>
        </div>

        <div className="flex flex-col gap-12 md:gap-16">
          <div className="">
            {experienceData.roles.map((role) => (
              <article
                key={`${role.company}-${role.period}`}
                className="grid gap-5 border-b last:border-b-0 border-white/25 py-8 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-8"
              >
                <Paragraph className="text-neutral-100">
                  {role.period}
                </Paragraph>

                <div className="flex flex-col gap-5">
                  <h3 className="text-base font-medium md:text-lg">
                    {role.title}{" "}
                    <span className="text-primary-light">
                      <a
                        href={role.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100"
                      >
                        @{role.company}
                      </a>
                    </span>
                  </h3>
                  <p className="max-w-2xl text-sm leading-5 text-neutral-100 md:text-base">
                    {role.summary}
                  </p>
                  <p className="text-xs leading-5 text-white md:text-sm">
                    {role.technologies}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
