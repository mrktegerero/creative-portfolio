import { navData } from "../../data/NavData";
import { Paragraph } from "../Reusable/Paragraph";

export function Nav() {
    return (
        <nav className="md:absolute md:top-0 p-6 w-full grid sm:grid-cols-2 z-30 max-sm:gap-10">
            <div className="text-xl font-bold">
                <Paragraph>{navData.leftContent.name}</Paragraph>
                <Paragraph>{navData.leftContent.position}</Paragraph>
            </div>
            <div className="flex justify-between">
                {navData.links.map((linkGroup, index) => (
                    <div key={index} className="flex flex-col gap-4">
                        {linkGroup.items.map((item) => (
                            <a key={item.href} target={item.target} href={item.href} className="group">
                                <Paragraph className="group-hover:text-primary-light">
                                    {item.label}
                                </Paragraph>
                            </a>
                        ))}
                    </div>
                ))}

                {navData.contact && (
                    <a href={navData.contact.href} className="text-xs text-neutral-100 hover:text-primary-light underline uppercase font-medium h-fit">{navData.contact.label}
                    </a>
                )}
            </div>
        </nav>
    );
}