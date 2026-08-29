import clsx from "clsx";
import type { ComponentProps } from "react";
import type { IconSize } from "../../types";

const svgIconModules = import.meta.glob<string>("../../icons/*.svg", {
  eager: true,
  import: "default",
  query: "?raw",
});

const svgIcons = Object.fromEntries(
  Object.entries(svgIconModules).map(([path, source]) => {
    const name = path.slice(path.lastIndexOf("/") + 1, -".svg".length);
    return [name, source] as const;
  }),
);

type IconProps = {
  name: string;
  size?: IconSize;
  variant?: "outline" | "filled";
  testid?: string;
} & Omit<ComponentProps<"span">, "name">;

export function Icon({
  name,
  size = 24,
  variant = "outline",
  testid,
  ...props
}: IconProps) {
  const svgIcon = svgIcons[name];

  if (svgIcon) {
    return (
      <span
        {...props}
        data-testid={testid}
        className={clsx(
          "inline-flex shrink-0 [&>svg]:block [&>svg]:h-full [&>svg]:w-auto [&>svg]:max-w-none",
          props.className,
        )}
        style={{
          height: size,
          ...props.style,
        }}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: svgIcon }}
      />
    );
  }

  const variantStyle = variant === "filled" ? '"FILL" 1' : '"FILL" 0';
  const weightStyle = size === 16 ? '"wght" 400' : '"wght" 300';
  return (
    <span
      {...props}
      data-testid={testid}
      className={clsx(
        "icon",
        `icon-${size}`,
        // size === 16 ? "font-normal" : "font-light", // size 16 font weight is not working as normal from before
        props.className,
      )}
      style={{
        fontVariationSettings: variantStyle + `, ${weightStyle}`,
        ...props.style,
      }}
    >
      {name}
    </span>
  );
}
