// import { Icon } from "../../Reusable/Icon";
import { LeftText } from "./Hero";
import { Paragraph } from "../Reusable/Paragraph";

import { aboutData } from "../../data/AboutData";
import { heroData } from "../../data/HeroData";


export function About() {
  return (
    <section id="about" className="p-6 w-full bg-black">
        <div className="w-full h-full relative flex flex-col gap-40">

          <div className="flex flex-col gap-40">
            <div className="relative">
              <Paragraph className="absolute left-0 top-2">About</Paragraph>
              <p className="text-4xl md:text-[clamp(3rem,1.5rem+8vw,3.375rem)] md:leading-[clamp(3rem,1.5rem+8vw,3.5rem)] font-medium indent-28.75" dangerouslySetInnerHTML={{ __html: aboutData.heading.paragraph }}>

              </p>
            </div>

            <Skills />
          </div>


          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <LeftText notAbsolute={true} />

            <div className="flex max-md:flex-col max-md:gap-8 md:justify-between md:w-full md:items-end">
              <Works />
              <Approach />
            </div>
          </div>
        </div>
    </section>
  )
}

function Skills() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {aboutData.skills.map((skill, index) => (
        <div key={index} className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <Paragraph>{skill.title}</Paragraph>
            <ul className="divide-y divide-white flex flex-col">
              {skill.items.map((lang, i) => (
                <li className="hover:bg-white hover:text-black group" key={i}><Paragraph className="py-3 group-hover:translate-x-2 transition-transform">{lang}</Paragraph></li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Works() {
  return (
    <div className="max-w-52.5">
        <Paragraph>{heroData.works.text}</Paragraph>
    </div>
  )
}

export function Approach() {
  return (
    <div className="max-w-52.5">
        <Paragraph>{heroData.approach.text}</Paragraph>
    </div>
  )
}