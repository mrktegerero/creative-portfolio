import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "../Reusable/Icon";
import { Paragraph } from "../Reusable/Paragraph";
import { heroData } from "../../data/HeroData";
import { clsx } from "clsx";

gsap.registerPlugin(useGSAP);

export function Hero({ isReady }: { isReady: boolean }) {
  const backgroundNumberRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const backgroundNumber = backgroundNumberRef.current;

    if (!backgroundNumber) return;

    const motion = gsap.matchMedia();

    motion.add("(prefers-reduced-motion: no-preference)", () =>
      gsap.to(backgroundNumber, {
        scale: 1.04,
        duration: 2.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center",
      }),
    );

    return () => motion.revert();
  }, []);

  return (
    <>
      <section className="relative lg:h-screen p-6 w-full">
        <div className="w-full h-full relative">
          <h1 className="z-10 relative lg:absolute lg:bottom-8 lg:left-0 text-[clamp(3rem,1.5rem+12.5vw,9rem)] leading-[clamp(3rem,1.5rem+12.5vw,9rem)] flex flex-col">
            <span className="flex items-center w-full justify-between">
              <span>{heroData.heading.copyright}</span>
              <span>{heroData.heading.year}</span>
            </span>
            <span>{heroData.heading.specialty}</span>
            <span className="pl-[clamp(1rem,calc(-1rem+15vw),15rem)]">
              {heroData.heading.role}
            </span>
            <span className="pl-[clamp(2rem,calc(-2rem+30vw),30rem)]">
              {heroData.heading.location}
            </span>
          </h1>

          <LeftText />

          <Image isReady={isReady} />

          <div className="absolute max-lg:top-2/7 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
            <div
              ref={backgroundNumberRef}
              className="text-[500px] md:text-[1000px] font-medium text-primary blur-xs"
            >
              {heroData.backgroundNumber}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Image({ isReady }: { isReady: boolean }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  console.log(isReady);

  useGSAP(
    () => {
      if (!isReady) return;

      const image = imageRef.current;
      const blocks = revealRef.current?.querySelectorAll("[data-image-block]");

      if (!image || !blocks?.length) return;

      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(blocks, {
          autoAlpha: 1,
          scale: 1,
          transformOrigin: "center",
        });
        gsap.set(image, { scale: 1.06 });

        return gsap
          .timeline({
            scrollTrigger: {
              trigger: revealRef.current,
              start: "top 80%",
              end: "top 10%",
              scrub: 0.35,
            },
          })
          .to(blocks, {
            autoAlpha: 0,
            scale: 0.15,
            stagger: {
              each: 0.02,
              from: "random",
            },
            ease: "none",
          })
          .to(
            image,
            {
              scale: 1,
              ease: "none",
            },
            0,
          );
      });

      motion.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(blocks, { autoAlpha: 0 });
        gsap.set(image, { scale: 1 });
      });

      return () => motion.revert();
    },
    { dependencies: [isReady], revertOnUpdate: true },
  );

  return (
    <div className="max-lg:mt-30 z-10 relative max-lg:flex max-lg:justify-end max-lg:w-full lg:absolute lg:bottom-8 lg:right-0">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-4 pl-4">
          <div className="flex flex-col items-center gap-1">
            <Icon
              name={heroData.experience.icon}
              size={27}
              testid="globe-icon"
            />
            <Paragraph>{heroData.experience.duration}</Paragraph>
          </div>

          <hr className="border-white border-r-2 h-12"></hr>

          <Paragraph className="max-w-52.5">
            {heroData.experience.summary}
          </Paragraph>
        </div>
        <div className="relative aspect-66/79 w-full max-w-82.5 overflow-hidden">
          <img
            ref={imageRef}
            src={heroData.image.src}
            alt={heroData.image.alt}
            className="h-full w-full object-cover will-change-transform"
          />
          <div
            ref={revealRef}
            className="pointer-events-none absolute inset-0 grid grid-cols-8 grid-rows-10"
          >
            {Array.from({ length: 80 }, (_, index) => (
              <span key={index} data-image-block className="bg-black" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LeftText({ notAbsolute = false }: { notAbsolute?: boolean }) {
  return (
    <div
      className={`z-10 relative ${!notAbsolute ? "lg:absolute lg:bottom-8 lg:left-0" : ""} max-w-[clamp(20rem,50%,21rem)] flex flex-col gap-4 md:gap-6`}
    >
      <Icon name={heroData.introduction.icon} size={24} testid="hero-icon" />
      <Paragraph>{heroData.introduction.text}</Paragraph>
    </div>
  );
}

export function YearsExperience({
  verticalAlignment,
}: {
  verticalAlignment?: string;
}) {
  return (
    <div
      className={clsx(
        "absolute left-2/4 -translate-x-2/4 text-[500px] lg:text-[1000px] lg:leading-[100%] font-medium text-primary blur-xs z-0",
        // size === 16 ? "font-normal" : "font-light", // size 16 font weight is not working as normal from before
        verticalAlignment ? `${verticalAlignment}` : "top-2/4 -translate-y-2/4",
      )}
    >
      {heroData.backgroundNumber}
    </div>
  );
}
