import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Route, Routes, useLocation } from "react-router-dom";
import { LoadingScreen } from "./Components/Loader/LoadingScreen";
import { HomePage } from "./Pages/Home/Index";
import { ProjectIndex } from "./Pages/Projects/Index";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const pageRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useGSAP(
    () => {
      const page = pageRef.current;

      if (!page) return;

      gsap.set(page, { autoAlpha: 0, y: 12 });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      let animationFrame: number | undefined;
      const revealTimeout = window.setTimeout(() => {
        animationFrame = requestAnimationFrame(() => {
          gsap.to(page, {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          });
        });
      }, 150);

      return () => {
        window.clearTimeout(revealTimeout);

        if (animationFrame !== undefined) {
          cancelAnimationFrame(animationFrame);
        }
      };
    },
    { dependencies: [location.pathname], revertOnUpdate: true },
  );

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div ref={pageRef}>
        <Routes>
          <Route path="/" element={<HomePage isReady={!isLoading} />} />
          <Route path="/projects" element={<ProjectIndex />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
