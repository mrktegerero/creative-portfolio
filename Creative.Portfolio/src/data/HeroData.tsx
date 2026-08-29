import heroImage from "../assets/kt-image.png";

// get current year dynamically
const currentYear = new Date().getFullYear();
const startWorking = 2021;
const experienceDuration = String(currentYear - startWorking).padStart(2, "0"); 

export const heroData = {
	heading: {
		copyright: "©",
		year: currentYear,
		specialty: "Front-end",
		role: "Engineer",
		location: "Angeles",
	},
	introduction: {
		icon: "starlight",
		text: "Outside of coding, I enjoy exploring emerging web technologies, refining development workflows, and continuously learning new tools that improve both developer experience and product quality.",
	},
	works: {
		text: "Over the years, I've worked on responsive websites, web applications, and client projects across different industries."
	},
	approach: {
		text: "My approach combines strong attention to detail with a focus on maintainable architecture, accessibility, and performance."
	},
	experience: {
		icon: "globe",
		duration: `${experienceDuration} Years`,
		summary: "transforming complex ideas into intuitive digital products through clean code, thoughtful interactions, and user-focused design",
	},
	image: {
		src: heroImage,
		alt: "Hero Image",
	},
	backgroundNumber: `${currentYear - startWorking}`,
} as const;
