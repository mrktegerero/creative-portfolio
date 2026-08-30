import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ScrollCrosshair() {
    const rootRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<SVGCircleElement>(null);
    const horizontalLineRef = useRef<SVGLineElement>(null);

    useGSAP(
        () => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    start: 0,
                    end: "max",
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                },
            });

            timeline.to(
                [circleRef.current, horizontalLineRef.current],
                {
                    y: () => window.innerHeight * (0.82 - 0.2756),
                    ease: "none",
                }
            );

            return () => timeline.kill();
        },
        { scope: rootRef }
    );

    return (
        <div
            ref={rootRef}
            className="pointer-events-none fixed inset-0 z-50 h-screen w-screen"
            aria-hidden="true"
        >
            <svg
                className="block h-full w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle ref={circleRef} cx="69.375%" cy="27.56%" r="5" fill="white" />
                <line
                    x1="69.375%"
                    y1="0"
                    x2="69.375%"
                    y2="100%"
                    stroke="white"
                    strokeOpacity="0.14"
                />
                <line
                    ref={horizontalLineRef}
                    x1="0"
                    y1="27.56%"
                    x2="100%"
                    y2="27.56%"
                    stroke="white"
                    strokeOpacity="0.14"
                />
            </svg>
        </div>
    );
}