import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "../Reusable/Icon";
import { Paragraph } from "../Reusable/Paragraph";
import { heroData } from "../../data/HeroData";
import { clsx } from "clsx";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
              className="relative text-[500px] md:text-[1000px] font-medium text-primary"
            >
              {heroData.backgroundNumber}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 blur-md [clip-path:polygon(0_-1000%,200%_100%,0_100%)]"
              >
                {heroData.backgroundNumber}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Image({ isReady }: { isReady: boolean }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useGSAP(
    () => {
      if (!isReady || !isImageLoaded) return;

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
        gsap.set(image, { autoAlpha: 0, scale: 1.06 });

        const loadingPixels = Array.from(blocks).filter((_, index) =>
          [
            1, 4, 9, 12, 17, 20, 25, 28, 33, 36, 41, 44, 49, 52, 57, 60, 65, 68,
            73, 76,
          ].includes(index),
        );
        const followUpPixels = Array.from(blocks).filter((_, index) =>
          [6, 14, 19, 23, 31, 38, 42, 47, 54, 59, 63, 71, 78].includes(index),
        );

        const loadTimeline = gsap
          .timeline({ delay: 0 })
          .to(image, {
            autoAlpha: 1,
            duration: 0.45,
            ease: "power2.out",
          })
          .to(
            loadingPixels,
            {
              autoAlpha: 0,
              scale: 0.15,
              duration: 0.35,
              stagger: {
                each: 0.035,
                from: "random",
              },
              ease: "power2.out",
            },
            "<",
          )
          .to(
            followUpPixels,
            {
              autoAlpha: 0,
              scale: 0.15,
              duration: 0.3,
              stagger: {
                each: 0.03,
                from: "random",
              },
              ease: "power2.out",
            },
            "-=0.15",
          );

        const imageFrame = imageFrameRef.current;
        let activePixelIndex = -1;
        let activeCursorPixels: Element[] = [];

        const showCursorPixels = () => {
          if (!activeCursorPixels.length) return;

          gsap.killTweensOf(activeCursorPixels);
          gsap.to(activeCursorPixels, {
            autoAlpha: 0.75,
            scale: 1,
            duration: 0.15,
            stagger: { each: 0.015, from: "center" },
            ease: "power2.out",
          });
        };

        const scrollTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: revealRef.current,
              start: "top 80%",
              end: "top 10%",
              scrub: 0.35,
              onUpdate: showCursorPixels,
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

        const animateCursorPixels = (event: PointerEvent) => {
          if (!imageFrame) return;

          const bounds = imageFrame.getBoundingClientRect();
          const column = Math.min(
            7,
            Math.floor(((event.clientX - bounds.left) / bounds.width) * 8),
          );
          const row = Math.min(
            9,
            Math.floor(((event.clientY - bounds.top) / bounds.height) * 10),
          );
          const pixelIndex = row * 8 + column;

          if (pixelIndex === activePixelIndex) return;

          activePixelIndex = pixelIndex;
          const cursorPixels = [
            pixelIndex,
            pixelIndex - 1,
            pixelIndex + 1,
            pixelIndex - 8,
            pixelIndex + 8,
          ]
            .filter((index) => index >= 0 && index < blocks.length)
            .map((index) => blocks[index]);

          activeCursorPixels = cursorPixels;

          gsap.killTweensOf(cursorPixels);
          gsap
            .timeline()
            .to(cursorPixels, {
              autoAlpha: 0.75,
              scale: 1,
              duration: 0.15,
              stagger: { each: 0.015, from: "center" },
              ease: "power2.out",
            })
            .to(cursorPixels, {
              autoAlpha: 0,
              scale: 0.15,
              duration: 0.3,
              stagger: { each: 0.025, from: "center" },
              ease: "power2.out",
            });
        };

        imageFrame?.addEventListener("pointermove", animateCursorPixels);

        return () => {
          loadTimeline.kill();
          scrollTimeline.kill();
          imageFrame?.removeEventListener("pointermove", animateCursorPixels);
        };
      });

      motion.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(blocks, { autoAlpha: 0 });
        gsap.set(image, { scale: 1 });
      });

      return () => motion.revert();
    },
    { dependencies: [isReady, isImageLoaded], revertOnUpdate: true },
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
        <div
          ref={imageFrameRef}
          className="relative aspect-66/79 w-full max-w-82.5 overflow-hidden"
        >
          <img
            ref={imageRef}
            src={heroData.image.src}
            alt={heroData.image.alt}
            className="h-full w-full object-cover will-change-transform"
            onLoad={() => setIsImageLoaded(true)}
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
