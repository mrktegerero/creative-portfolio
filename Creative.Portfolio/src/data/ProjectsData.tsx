import caritas from "../assets/caritas.jpg";
import trophies from "../assets/trophies.png";
import hemmingwayDigital from "../assets/hemmingway.png";
import medicalJobs from "../assets/medical-jobs.png";
import packsend from "../assets/packsend.jpg";
import pointrs from "../assets/pointrs.png";

type Project = {
  title: string;
  year: string;
  madeAt: string;
  builtWith: string[];
  link?: string;
  github?: string;
  image?: { src: string; alt: string };
  notInProjectHome?: boolean;
};

export const projectsData: Project[] = [
  {
    title: "Hemmingway Digital",
    link: "https://dev-hemmingway.soda.dev/",
    year: "2026",
    madeAt: "Soda Digital",
    builtWith: ["Custom Elements", "Tailwind", "Umbraco", "ASP.NET", "C#"],
    image: { src: hemmingwayDigital, alt: "Hemmingway Digital" },
    notInProjectHome: true,
  },
  {
    title: "buymate - Store",
    link: "https://buymate.com.au/Auth/Login?ReturnUrl=%2Fplace-an-order",
    year: "2026",
    madeAt: "Soda Digital",
    builtWith: ["C#", "TypeScript", "Tailwind", "HTML"],
    notInProjectHome: true,
  },
  {
    title: "DMSi Agility Commerce Cloud",
    // link: "https://www.medicaljobsinternational.com/",
    year: "2026",
    madeAt: "Soda Digital",
    builtWith: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Umbraco",
      "Storybook",
      "C#",
    ],
    notInProjectHome: true,
  },
  {
    title: "Medical Jobs",
    link: "https://www.medicaljobsinternational.com/",
    year: "2026",
    madeAt: "Soda Digital",
    builtWith: ["Custom Elements", "Tailwind", "Umbraco", "ASP.NET", "C#"],
    image: { src: medicalJobs, alt: "Medical Jobs" },
  },
  {
    title: "Trophies - Australia",
    link: "https://www.trophies.com.au/",
    year: "2025",
    madeAt: "Soda Digital",
    builtWith: ["Custom Elements", "Tailwind", "Umbraco", "ASP.NET", "C#"],
    image: { src: trophies, alt: "Trophies - Australia" },
  },
  {
    title: "Caritas Australia",
    link: "https://www.caritas.org.au/",
    year: "2024",
    madeAt: "Soda Digital",
    builtWith: ["Custom Elements", "Tailwind", "Umbraco", "ASP.NET", "C#"],
    image: { src: caritas, alt: "Caritas Australia" },
  },
  {
    title: "Pointrs",
    link: "https://www.pointrs.com/",
    year: "2023",
    madeAt: "Soda Digital",
    builtWith: ["ASP.NET", "C#", "Lit", "Tailwind", "Umbraco"],
    image: { src: pointrs, alt: "Pointrs" },
  },
  {
    title: "Pack & Send Australia",
    link: "https://www.packsend.com.au/",
    year: "2023",
    madeAt: "Soda Digital",
    builtWith: ["ASP.NET", "C#", "Lit", "Tailwind", "Umbraco"],
    image: { src: packsend, alt: "Pack & Send Australia" },
  },
  {
    title: "Caritas Australia - Supporter Hub",
    link: "https://www.caritas.org.au/supporter-hub/dashboard/",
    year: "2023",
    madeAt: "Soda Digital",
    builtWith: ["ASP.NET", "C#", "Lit", "Tailwind", "Umbraco"],
    image: { src: caritas, alt: "Caritas Australia - Supporter Hub" },
  },
  {
    title: "Aged Care 101",
    link: "https://www.agedcare101.com.au/",
    year: "2023",
    madeAt: "Soda Digital",
    builtWith: ["ASP.NET", "C#", "Bootstrap", "Umbraco"],
  },
  {
    title: "Royal Life Saving Society - Australia MVP",
    link: "https://app-web-ka63eko4wrpea.azurewebsites.net/",
    year: "2022",
    madeAt: "Soda Digital",
    builtWith: [".NET", "C#", "Bootstrap"],
  },
  {
    title: "Sterland - Warehouse PWA",
    link: "https://sterland-warehouse-pwa.soda.dev/#/login",
    year: "2022",
    madeAt: "Soda Digital",
    builtWith: ["React", "Tailwind", "TypeScript", "Postman"],
  },
  {
    title: "Villages Mercer",
    link: "https://mercer-web.azurewebsites.net/",
    year: "2022",
    madeAt: "Soda Digital",
    builtWith: ["ASP.NET", "C#", "Bootstrap", "Umbraco"],
  },
  {
    title: "Porter's Paints Original - Shop",
    link: "https://shop.porterspaints.com/",
    year: "2022",
    madeAt: "Soda Digital",
    builtWith: [
      "SvelteKit",
      "Tailwind",
      "TypeScript",
      "Shopify API",
      "Cloudflare",
    ],
  },
  {
    title: "Sterland - Trade Portal",
    link: "https://sterland.soda.dev/#/login",
    year: "2022",
    madeAt: "Soda Digital",
    builtWith: ["React", "Tailwind", "TypeScript", "Postman"],
  },
  {
    title: "Plotly Marketing",
    link: "https://plotly.com/",
    year: "2021",
    madeAt: "Fullstack HQ",
    builtWith: ["Next.js", "Chakra UI", "TypeScript", "Prismic", "Vercel"],
  },
  {
    title: "Anduin Transaction",
    link: "https://www.anduintransact.com/",
    year: "2021",
    madeAt: "Fullstack HQ",
    builtWith: ["Gatsby", "Sass", "Prismic", "Netlify"],
  },
  {
    title: "Mansion 88",
    link: "https://mansion88test.netlify.app/",
    github: "https://github.com/mrktegerero/M88-TEST",
    year: "2021",
    madeAt: "—",
    builtWith: ["HTML", "Sass", "JavaScript", "Netlify"],
  },
  {
    title: "Personal Website V1",
    link: "https://ktegerero.netlify.app/",
    github: "https://github.com/mrktegerero/portfolio-first-project",
    year: "2021",
    madeAt: "—",
    builtWith: ["HTML", "CSS", "JavaScript", "Netlify"],
  },
  {
    title: "Tier One Entertainment",
    link: "https://tier-one.netlify.app/",
    github: "https://github.com/mrktegerero/tierone",
    year: "2021",
    madeAt: "—",
    builtWith: ["HTML", "Sass", "JavaScript", "jQuery", "Netlify"],
  },
  {
    title: "YRE Travel",
    link: "https://yre.netlify.app/",
    github: "https://github.com/mrktegerero/yre-travel",
    year: "2021",
    madeAt: "—",
    builtWith: ["Gatsby", "GraphQL", "Styled Components", "Netlify"],
  },
  {
    title: "Chime Consulting HR System",
    github: "https://github.com/chimesconsultingph/chimes_system",
    year: "2021",
    madeAt: "Chimes Consulting",
    builtWith: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  },
  {
    title: "Non Contact Apprehension - User / Admin",
    github: "https://github.com/mrktegerero/noncontactmakati",
    year: "2021",
    madeAt: "AMA Makati",
    builtWith: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  },
].reverse();
