import { Icon } from "../Reusable/Icon";
import { Paragraph } from "../Reusable/Paragraph";
import { heroData } from "../../data/HeroData";
import { clsx } from "clsx";

export function Hero() {
  return (
    <>
        <section className="relative md:h-screen p-6 w-full">
            <div className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="69.375%" cy="27.56%" r="5" fill="white"/>
                <line x1="69.375%" y1="0" x2="69.375%" y2="100%" stroke="white" strokeOpacity="0.14"/>
                <line x1="0" y1="27.56%" x2="100%" y2="27.56%" stroke="white" strokeOpacity="0.14"/>
                </svg>
            </div>
            <div className="w-full h-full relative">
                <h1 className="z-10 relative md:absolute md:bottom-8 md:left-0 text-[clamp(3rem,1.5rem+12.5vw,9rem)] leading-[clamp(3rem,1.5rem+12.5vw,9rem)] flex flex-col">
                    <span className="flex items-center w-full justify-between"><span>{heroData.heading.copyright}</span><span>{heroData.heading.year}</span></span>
                    <span>{heroData.heading.specialty}</span>
                    <span className="pl-[clamp(1rem,calc(-1rem+15vw),15rem)]">{heroData.heading.role}</span>
                    <span className="pl-[clamp(2rem,calc(-2rem+30vw),30rem)]">{heroData.heading.location}</span>
                </h1>

                <LeftText />

                <Image />
                
                <div className="absolute top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4 text-[500px] md:text-[1000px] font-medium text-primary blur-xs">{heroData.backgroundNumber}</div>
            </div>
        </section>
    </>
  )
}

function Image() {
    return (
         <div className="max-md:mt-10 z-10 relative max-md:flex max-md:justify-end max-md:w-full md:absolute md:bottom-8 md:right-0">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-4 pl-4">
                    <div className="flex flex-col items-center gap-1">
                        <Icon name={heroData.experience.icon} size={27} testid="globe-icon" />
                        <Paragraph>{heroData.experience.duration}</Paragraph>
                    </div>

                    <hr className="border-white border-r-2 h-12"></hr>

                    <Paragraph className="max-w-52.5">{heroData.experience.summary}</Paragraph>
                </div>
                <div className="aspect-66/79 w-full max-w-82.5">
                    <img src={heroData.image.src} alt={heroData.image.alt} className="w-full h-full object-cover"/>
                </div>
            </div>
        </div>
    )
}

export function LeftText({ notAbsolute = false }: { notAbsolute?: boolean }) {
    return(
        <div className={`z-10 relative ${!notAbsolute ? "md:absolute md:bottom-8 md:left-0" : ""} max-w-[clamp(20rem,50%,21rem)] flex flex-col gap-4 md:gap-6`}>
            <Icon name={heroData.introduction.icon} size={24} testid="hero-icon" />
            <Paragraph>{heroData.introduction.text}</Paragraph>
        </div>
    )
}

export function YearsExperience({verticalAlignment} : { verticalAlignment?: string}) {
    return (
        <div 
            className={clsx(
                "absolute left-2/4 -translate-x-2/4 text-[500px] md:text-[1000px] md:leading-[100%] font-medium text-primary blur-xs z-0",
                // size === 16 ? "font-normal" : "font-light", // size 16 font weight is not working as normal from before
                verticalAlignment ? `${verticalAlignment}` : "top-2/4 -translate-y-2/4",
            )}
        >
            {heroData.backgroundNumber}
        </div>
    )
}