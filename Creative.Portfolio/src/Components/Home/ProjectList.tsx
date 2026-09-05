import { useRef, useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "../../data/ProjectsData";

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

const COMPACT_LAYOUT_MAX_WIDTH = 639;
const MEDIUM_LAYOUT_MIN_WIDTH = 768;
const LINE_POSITIONS = {
  compact: [32, 62, 92],
  wide: [42, 91],
} as const;
const LOOP_SECONDS_PER_TILE = 2.4;
const TILE_HORIZONTAL_STEP = 0.68;
const TILE_MIN_WIDTH = 144;
const TILE_MAX_WIDTH = 320;
const TILE_SHAPE_VARIANTS = [
  "[clip-path:polygon(0_0,100%_18%,100%_100%,0_82%)]",
  "[clip-path:polygon(0_0,100%_15%,100%_100%,0_85%)]",
  "[clip-path:polygon(0_0,100%_20%,100%_100%,0_80%)]",
  "[clip-path:polygon(0_0,100%_16%,100%_100%,0_84%)]",
  "[clip-path:polygon(0_0,100%_19%,100%_100%,0_81%)]",
  "[clip-path:polygon(0_0,100%_14%,100%_100%,0_86%)]",
  "[clip-path:polygon(0_0,100%_18%,100%_100%,0_82%)]",
] as const;

function subscribeToViewportWidth(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange);

  return () => window.removeEventListener("resize", onStoreChange);
}

function getViewportWidthSnapshot() {
  return window.innerWidth;
}

function getTileWidth(viewportWidth: number) {
  const widthRatio =
    viewportWidth <= COMPACT_LAYOUT_MAX_WIDTH
      ? 0.42
      : viewportWidth < MEDIUM_LAYOUT_MIN_WIDTH
        ? 0.32
        : 0.21;

  return Math.min(
    TILE_MAX_WIDTH,
    Math.max(TILE_MIN_WIDTH, viewportWidth * widthRatio),
  );
}

function getMinimumTilesPerLine(viewportWidth: number) {
  const tileWidth = getTileWidth(viewportWidth);
  const tileStep = tileWidth * TILE_HORIZONTAL_STEP;
  const lineStart = viewportWidth * -0.08;

  return (
    Math.ceil((viewportWidth + tileStep - lineStart - tileWidth) / tileStep) + 1
  );
}

function createLoopItems<T>(items: readonly T[], minimumItemCount: number) {
  if (items.length === 0) return [];

  const cycleCount = Math.max(1, Math.ceil(minimumItemCount / items.length));

  return Array.from({ length: items.length * cycleCount }, (_, itemIndex) => ({
    item: items[itemIndex % items.length],
    isDuplicate: itemIndex >= items.length,
    loopIndex: itemIndex,
  }));
}

export function ProjectList() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportWidth = useSyncExternalStore(
    subscribeToViewportWidth,
    getViewportWidthSnapshot,
    () => 1024,
  );
  const isCompactLayout = viewportWidth <= COMPACT_LAYOUT_MAX_WIDTH;
  const linePositions = isCompactLayout
    ? LINE_POSITIONS.compact
    : LINE_POSITIONS.wide;
  const minimumTilesPerLine = getMinimumTilesPerLine(viewportWidth);
  const projectLines = linePositions.map((_, lineIndex) =>
    createLoopItems(
      projectsData.filter(
        (_, projectIndex) => projectIndex % linePositions.length === lineIndex,
      ),
      minimumTilesPerLine,
    ),
  );

  useGSAP(
    () => {
      const dragTargets = gsap.utils.toArray<HTMLElement>(
        "[data-project-drag]",
      );
      let activeZIndex = 40;
      const draggableTiles = dragTargets.flatMap((dragTarget) => {
        const tile = dragTarget.closest<HTMLElement>("[data-project-tile]");

        return Draggable.create(dragTarget, {
          type: "x,y",
          bounds: sectionRef.current,
          dragClickables: true,
          dragResistance: 0.06,
          edgeResistance: 0.82,
          minimumMovement: 6,
          zIndexBoost: false,
          onPress: () => {
            activeZIndex += 1;
            gsap.set(tile, { zIndex: activeZIndex });
            gsap.to(dragTarget, {
              scale: 1.025,
              duration: 0.2,
              ease: "power2.out",
            });
          },
          onRelease: () => {
            gsap.to(dragTarget, {
              scale: 1,
              duration: 0.35,
              ease: "power3.out",
            });
          },
        });
      });

      const lines = gsap.utils
        .toArray<HTMLElement>("[data-project-line]")
        .map((line, lineIndex) => {
          const tiles = gsap.utils.toArray<HTMLElement>(
            "[data-project-tile]",
            line,
          );
          const tileCount = tiles.length;
          const wrapSlot = gsap.utils.wrap(0, tileCount);
          const initialPhase = lineIndex * 0.5;
          const loopState = { phase: initialPhase };
          const positionTiles = () => {
            tiles.forEach((tile, tileIndex) => {
              const slot = wrapSlot(tileIndex - loopState.phase);

              gsap.set(tile, {
                xPercent: slot * 68,
                yPercent: slot * -32,
              });
            });
          };

          positionTiles();

          return { initialPhase, line, loopState, positionTiles, tileCount };
        });

      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        lines.forEach(
          ({ initialPhase, line, loopState, positionTiles, tileCount }) => {
            loopState.phase = initialPhase;
            positionTiles();

            gsap.to(loopState, {
              phase: initialPhase + tileCount,
              duration: tileCount * LOOP_SECONDS_PER_TILE,
              ease: "none",
              onUpdate: positionTiles,
              repeat: -1,
              scrollTrigger: {
                trigger: line,
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play pause resume pause",
              },
            });
          },
        );

        gsap.fromTo(
          "[data-project-heading]",
          { autoAlpha: 0, scale: 0.78 },
          {
            autoAlpha: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 15%",
              scrub: 1,
            },
          },
        );

        gsap.from("[data-gallery-note]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });

      return () => {
        draggableTiles.forEach((draggable) => draggable.kill());
        motion.revert();
      };
    },
    {
      scope: sectionRef,
      dependencies: [isCompactLayout, minimumTilesPerLine],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      ref={sectionRef}
      id="project-gallery"
      aria-labelledby="project-gallery-heading"
      className="relative min-h-[200svh] overflow-x-clip bg-black perspective-distant sm:min-h-[260svh] pb-20"
    >
      <div className="pointer-events-none sticky top-0 z-20 flex h-svh items-center justify-center px-4">
        <h2
          id="project-gallery-heading"
          data-project-heading
          className="whitespace-nowrap text-5xl leading-none font-medium sm:text-7xl lg:text-[7rem]"
        >
          <span className="text-primary-light">{projectsData.length}+</span>{" "}
          Projects
        </h2>
      </div>

      {projectLines.map((lineProjects, lineIndex) => (
        <div
          key={`project-line-${lineIndex}`}
          data-project-line
          className="absolute inset-x-0 z-10"
          style={{ top: `${linePositions[lineIndex]}%` }}
        >
          {lineProjects.map(
            ({ item: project, isDuplicate, loopIndex }, itemIndex) => {
              const shape =
                TILE_SHAPE_VARIANTS[
                  (itemIndex + lineIndex * 2) % TILE_SHAPE_VARIANTS.length
                ];
              const draggableClassName =
                "group block h-full w-full touch-none cursor-grab select-none active:cursor-grabbing";

              return (
                <div
                  key={`${lineIndex}-${loopIndex}-${project.title}`}
                  data-project-tile
                  data-project-duplicate={isDuplicate || undefined}
                  aria-hidden={isDuplicate || undefined}
                  className="absolute left-[-8vw] z-10 aspect-2/3 w-[42vw] min-w-36 max-w-80 sm:w-[32vw] md:w-[21vw]"
                >
                  <a
                    data-project-drag
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title}`}
                    tabIndex={isDuplicate ? -1 : undefined}
                    className={`${draggableClassName} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light`}
                  >
                    <figure
                      className={`relative h-full w-full overflow-hidden bg-neutral-900 ${shape}`}
                    >
                      <img
                        src={project.image.src}
                        alt={project.image.alt}
                        loading="lazy"
                        draggable={false}
                        className="relative z-0 h-full w-full scale-100 object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
                      />

                      <figcaption className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/65 p-5 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <span className="text-base font-medium text-white sm:text-lg">
                          {project.title}
                        </span>
                      </figcaption>
                    </figure>
                  </a>
                </div>
              );
            },
          )}
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-8 p-6 md:grid-cols-3">
        <p className="text-2xs font-medium uppercase">Selected projects</p>
        <p className="max-w-72 text-2xs leading-3 font-medium uppercase md:col-start-3">
          Responsive websites, web applications, and client work across
          different industries.
        </p>
      </div>
    </section>
  );
}
