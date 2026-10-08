import { navData } from "../../data/NavData";
import { Link } from "react-router-dom";
import { Paragraph } from "../Reusable/Paragraph";

export function Nav() {
    return (
        <nav className="md:absolute md:top-0 p-6 w-full grid sm:grid-cols-2 z-30 max-sm:gap-10">
            <div className="text-xl font-bold">
                <Link to="/" className="group">
                    <Paragraph className="group-hover:text-primary-light transition-colors">
                        {navData.leftContent.name}
                    </Paragraph>
                </Link>
                <Paragraph>{navData.leftContent.position}</Paragraph>
            </div>
            <div className="flex justify-between">
                {navData.links.map((linkGroup, index) => (
                    <div key={index} className="flex flex-col gap-4">
                        {linkGroup.items.map((item) => {
                            const sectionId = ["about", "projects", "experience"].includes(item.href)
                                ? item.href
                                : null;

                            return sectionId ? (
                                <Link key={item.href} to="/" state={{ sectionId }} className="group">
                                    <Paragraph className="group-hover:text-primary-light transition-colors">
                                        {item.label}
                                    </Paragraph>
                                </Link>
                            ) : item.href.startsWith("/") ? (
                                <Link key={item.href} to={item.href} className="group">
                                    <Paragraph className="group-hover:text-primary-light transition-colors">
                                        {item.label}
                                    </Paragraph>
                                </Link>
                            ) : (
                                <a key={item.href} target={item.target} href={item.href} className="group">
                                    <Paragraph className="group-hover:text-primary-light transition-colors">
                                        {item.label}
                                    </Paragraph>
                                </a>
                            );
                        })}
                    </div>
                ))}

                {navData.contact && (
                    <Link to="/" state={{ sectionId: navData.contact.href }} className="text-xs text-neutral-100 hover:text-primary-light underline uppercase font-medium h-fit transition-colors">
                        {navData.contact.label}
                    </Link>
                )}
            </div>
        </nav>
    );
}