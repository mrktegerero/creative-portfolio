import type { ComponentPropsWithoutRef } from "react";

export type IconSize = 12 | 16 | 24 | 27 | 32 | 33;

export type ValidTags<T = keyof React.ElementType> = Extract<
  React.ElementType,
  T | React.JSXElementConstructor<unknown>
>;

export type AsProps<
  T extends React.ElementType = React.ElementType,
  K extends ValidTags<T> = ValidTags<T>,
> = K extends React.ElementType
  ? { as?: K } & ComponentPropsWithoutRef<K>
  : never;