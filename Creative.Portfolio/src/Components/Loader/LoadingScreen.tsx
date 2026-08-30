import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type LoadingScreenProps = {
    onComplete: () => void;
};

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const rootRef = useRef<HTMLElement>(null);
    const percentageRef = useRef<HTMLSpanElement>(null);
    const percentSymbolRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const previousOverflow = document.body.style.overflow;
            const progress = { value: 0 };

            document.body.style.overflow = "hidden";

            const timeline = gsap.timeline({
                onComplete,
            });

            timeline
                .set(percentageRef.current, {
                    opacity: 0,
                })
                .set(percentSymbolRef.current, {
                    opacity: 0,
                })
                .to(
                    percentageRef.current,
                    {
                        opacity: 1,
                        duration: 0.25,
                        ease: "power2.out",
                    },
                    0.5
                )
                .to(
                    percentSymbolRef.current,
                    {
                        opacity: 1,
                        duration: 0.25,
                        ease: "power2.out",
                    },
                    0.75
                )
                .to(
                    progress,
                    {
                        value: 100,
                        duration: 2.4,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            if (percentageRef.current) {
                                percentageRef.current.textContent = `${Math.round(
                                    progress.value
                                )}`;
                            }
                        },
                    },
                    1
                )
                .to(
                    percentSymbolRef.current,
                    {
                        opacity: 0,
                        duration: 0.25,
                        ease: "power2.out",
                    },
                    ">+0.5"
                )
                .to(
                    percentageRef.current,
                    {
                        yPercent: -120,
                        duration: 0.65,
                        ease: "power4.in",
                    },
                    "<"
                )
                .to(
                    rootRef.current,
                    {
                        clipPath: "inset(0 0 100% 0)",
                        duration: 0.9,
                        ease: "power4.inOut",
                    },
                    "<"
                );

            return () => {
                document.body.style.overflow = previousOverflow;
                timeline.kill();
            };
        },
        {
            scope: rootRef,
            dependencies: [onComplete],
        }
    );

    return (
        <section
            ref={rootRef}
            className="fixed inset-0 z-100 flex items-center justify-end overflow-hidden bg-black text-white"
            role="status"
            aria-label="Loading portfolio"
        >
            <div className="overflow-hidden">
                <span
                    className="flex items-baseline justify-end text-right leading-none font-medium tabular-nums text-[6rem] sm:text-[9rem] md:text-[14rem] lg:text-[18rem]"
                    aria-hidden="true"
                >
                    <span ref={percentageRef}>0</span>

                    <span
                        ref={percentSymbolRef}
                        className="inline-block text-neutral-700"
                    >
                        %
                    </span>
                </span>
            </div>
        </section>
    );
}