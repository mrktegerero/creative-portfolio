import { useEffect, useState } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { About } from "./Components/Home/About";
import { Hero } from "./Components/Home/Hero";
// import { Projects } from "./Components/Home/Projects";
// import { ProjectList } from "./Components/Home/ProjectList";
import { Contact } from "./Components/Footer/Contact";
import { Nav } from "./Components/Nav/Nav";
import { LoadingScreen } from "./Components/Loader/LoadingScreen";
import { ScrollCrosshair } from "./Components/Reusable/ScrollCrosshair";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      smoothWheel: true,
    });

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
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <ScrollCrosshair />

      <main className="bg-black flex flex-1 flex-col">
        <Nav />
        <Hero />
        <About />
        {/* <ProjectList />
        <Projects /> */}
        <Contact />
      </main>
    </>
  );
}

export default App;
