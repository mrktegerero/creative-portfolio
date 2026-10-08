import { useLayoutEffect } from "react";
import { Icon } from "../../Components/Reusable/Icon";
import { Paragraph } from "../../Components/Reusable/Paragraph";
import { projectsData } from "../../data/ProjectsData";
import { Contact } from "../../Components/Footer/Contact";
import { Nav } from "../../Components/Nav/Nav";

export function ProjectIndex() {
	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, []);

  const projects = [...projectsData].reverse();

	return (
		<>
			<Nav />
			<main className="min-h-screen bg-black px-6 pb-12 pt-6 text-white">
				<div>
					<header className="flex items-start justify-between pb-10 pt-24 md:pt-36">
						<div>
							<Paragraph className="text-primary">
								Selected work / 2020-{new Date().getFullYear()}
							</Paragraph>
							<h1 className="mt-3 text-[clamp(3rem,2rem+6vw,7rem)] leading-none">
								All Projects
							</h1>
						</div>
					</header>

					<section aria-label="All projects" className="mt-12">
						<div className="hidden grid-cols-[5rem_minmax(14rem,1.7fr)_minmax(9rem,1fr)_minmax(13rem,1.35fr)_2rem] gap-6 border-b border-white/25 pb-4 text-2xs uppercase text-neutral-100 md:grid font-medium">
							<span>Year</span>
							<span>Project</span>
							<span>Made at</span>
							<span>Built with</span>
							<span className="sr-only">Link</span>
						</div>

						<div>
							{projects.map((project: typeof projectsData[number], index: number) => {
								const destination = project.link ?? project.github;
								const rowClassName = "group grid gap-x-6 gap-y-2 border-b border-white/15 py-5 transition-colors hover:border-primary-light hover:bg-primary-light hover:px-3 md:grid-cols-[5rem_minmax(14rem,1.7fr)_minmax(9rem,1fr)_minmax(13rem,1.35fr)_2rem] md:items-center";
								const rowContent = (
									<>
									<span className="text-xs font-medium text-primary group-hover:text-black transition-transform">
										{project.year}
									</span>
									<span className="text-xl font-medium group-hover:text-black md:text-2xl transition-transform">
										{project.title}
									</span>
									<span className="text-xs font-medium group-hover:text-black">
										{project.madeAt}
									</span>
									<span className="text-xs font-medium group-hover:text-black">
										{project.builtWith.join(" · ")}
									</span>
									{destination && (
										<Icon
											name="link"
											size={16}
											className="hidden justify-self-end pr-4 transition-transform group-hover:text-black md:inline-flex md:group-hover:translate-x-3"
										/>
									)}
									</>
								);

								return destination ? (
									<a
										key={`${project.title}-${project.year}-${index}`}
										href={destination}
										target="_blank"
										rel="noreferrer"
										className={rowClassName}
									>
										{rowContent}
									</a>
								) : (
									<p
										key={`${project.title}-${project.year}-${index}`}
										className={rowClassName}
									>
										{rowContent}
									</p>
								);
							})}
						</div>
					</section>
				</div>
			</main>
			<Contact />
		</>
	);
}
