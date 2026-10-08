import { Paragraph } from "../Reusable/Paragraph";
import { Works } from "../Home/About";
import { contactData } from "../../data/ContactData";
import { projectsData } from "../../data/ProjectsData";
// import { YearsExperience } from "../Home/Hero";
import { Icon } from "../Reusable/Icon";
import { Link } from "react-router-dom";

export function Contact() {
  return (
    <section
      id="contact"
      className="p-6 md:p-12 w-full flex flex-col gap-20 md:gap-30 relative z-10"
    >
      <div className="grid grid-cols-2 z-10">
        <Paragraph>Contact</Paragraph>
        <Works />
      </div>

      <div className="grid lg:grid-cols-2 z-10 max-lg:gap-16">
        <p
          className="text-[clamp(3rem,1.5rem+12.5vw,9rem)] leading-[clamp(3rem,1.5rem+12.5vw,9rem)] flex flex-col justify-end items-start gap-1"
          dangerouslySetInnerHTML={{ __html: contactData.heading.paragraph }}
        ></p>

        <div className="flex flex-col justify-end">
          <div className="flex flex-col gap-2">
            {contactData.links.map((link, index) => (
              <Link
                key={index}
                to="/"
                state={{ sectionId: link.url }}
                className="text-xl md:text-[54px] font-medium flex gap-4 hover:text-primary-light w-fit transition-colors"
              >
                {link.label}
                {/* for Projects section */}
                {link.label == "Projects" && (
                  <span className="block text-xl font-medium">
                    ({projectsData.length})
                  </span>
                )}
              </Link>
            ))}
          </div>
          <div className="border-t border-white grid grid-cols-2 mt-4">
            <div className="flex flex-col gap-2 pt-6 pr-1 md:pr-4 border-r border-white">
              <p className="text-xs font-normal uppercase">Contact</p>
              <a
                className="text-sm md:text-xl font-medium hover:text-primary-light transition-colors group w-fit flex items-center"
                href={`mailto:${contactData.email}`}
              >
                {contactData.email}{" "}
                <Icon
                  className="text-white transition-colors group-hover:text-primary-light pl-2"
                  name="link"
                  size={12}
                  testid="hero-icon"
                />
              </a>
            </div>

            <div className="flex flex-col gap-2 pt-6 pl-4">
              <p className="text-xs font-normal uppercase">Follow Me</p>
              <div className="grid grid-cols-2">
                <a
                  className="text-sm md:text-xl font-medium hover:text-primary-light w-fit transition-colors"
                  target="_blank"
                  href={contactData.linkedIn}
                >
                  linkedIn
                </a>
                <a
                  className="text-sm md:text-xl font-medium hover:text-primary-light w-fit transition-colors"
                  target="_blank"
                  href={contactData.instagram}
                >
                  instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <YearsExperience verticalAlignment="bottom-28" /> */}
    </section>
  );
}
