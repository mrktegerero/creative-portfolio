import { useRef, useState, type MouseEvent } from "react";
import { Paragraph } from "../Reusable/Paragraph";
import { projectsData } from "../../data/ProjectsData";
import { Icon } from "../Reusable/Icon";

// import { Works } from "./About";

export function Projects() {
    const projects = [...projectsData].reverse();
    const previewRef = useRef<HTMLImageElement>(null);
    const pointerPositionRef = useRef({ x: 0, y: 0 });
    const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

    const positionPreview = (x: number, y: number) => {
        const preview = previewRef.current;

        if (!preview) return;

        const margin = 16;
        const left = Math.min(
            Math.max(x - preview.offsetWidth / 2, margin),
            Math.max(margin, window.innerWidth - preview.offsetWidth - margin)
        );
        const top = Math.min(
            Math.max(y - preview.offsetHeight / 2, margin),
            Math.max(margin, window.innerHeight - preview.offsetHeight - margin)
        );

        preview.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    };

    const handleMouseEnter = (index: number, event: MouseEvent<HTMLAnchorElement>) => {
        pointerPositionRef.current = { x: event.clientX, y: event.clientY };
        setActiveProjectIndex(index);
    };

    const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
        pointerPositionRef.current = { x: event.clientX, y: event.clientY };
        positionPreview(event.clientX, event.clientY);
    };

    const setPreviewElement = (element: HTMLImageElement | null) => {
        previewRef.current = element;

        if (element) {
            positionPreview(pointerPositionRef.current.x, pointerPositionRef.current.y);
        }
    };

    return (
        <section id="projects" className="p-6 w-full flex flex-col gap-20 pb-20 z-30 relative">
            <div className="grid grid-cols-2">
                <Paragraph>Projects</Paragraph>
                {/* <Works /> */}
            </div>

            <div className="">
                {projects.map((project, index) => (
                    <a
                        key={project.title}
                        href={project.link}
                        target="_blank"
                        className="flex items-center justify-between gap-4 group hover:bg-primary-light py-4 border-b border-white hover:border-primary-light has-[+a:hover]:border-primary-light cursor-none"
                        onMouseEnter={(event) => handleMouseEnter(index, event)}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setActiveProjectIndex(null)}
                    >
                        <p className="flex items-center gap-8 md:gap-16 group-hover:text-black group-hover:translate-x-6 transition-transform">
                            <span className="text-xl font-medium">({String(index + 1).padStart(2, "0")})</span>
                            <span className="text-2xl md:text-[54px]">{project.title}</span>
                        </p>

                        <Icon className="max-md:hidden text-white transition-colors group-hover:text-black pr-4 md:pr-8" name="link" size={33} testid="hero-icon" />
                        <Icon className="md:hidden text-white transition-colors group-hover:text-black pr-4 md:pr-8" name="link" size={16} testid="hero-icon" />
                    </a>
                ))}
            </div>

            {activeProjectIndex !== null && (
                <img
                    ref={setPreviewElement}
                    src={projects[activeProjectIndex].image.src}
                    alt=""
                    aria-hidden="true"
                    className="fixed top-0 left-0 z-20 pointer-events-none aspect-66/79 w-[clamp(14rem,32vw,26rem)] object-cover select-none will-change-transform"
                />
            )}
        </section>
    )
}