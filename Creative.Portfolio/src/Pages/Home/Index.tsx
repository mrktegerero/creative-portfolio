import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";
import { About } from "../../Components/Home/About";
import { Experience } from "../../Components/Home/Experience";
import { Hero } from "../../Components/Home/Hero";
import { Projects } from "../../Components/Home/Projects";
import { Contact } from "../../Components/Footer/Contact";
import { Nav } from "../../Components/Nav/Nav";

export function HomePage({ isReady }: { isReady: boolean }) {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const handleAnchorClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );

      if (!link) return;

      const targetId = link.hash.slice(1);
      const target = document.getElementById(targetId);

      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target);
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const sectionId = (location.state as { sectionId?: string } | null)
      ?.sectionId;

    if (!sectionId) return;

    const target = document.getElementById(sectionId);

    if (target) {
      lenisRef.current?.scrollTo(target);
    }
  }, [location.key, location.state]);

  return (
    <>
      <main className="bg-black flex flex-1 flex-col">
        <Nav />
        <Hero isReady={isReady} />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
