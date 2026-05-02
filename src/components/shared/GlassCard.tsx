import type { ElementType, ComponentPropsWithoutRef } from "react";

type GlassCardProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

export function GlassCard<T extends ElementType = "div">({
  as,
  className = "",
  children,
  ...props
}: GlassCardProps<T>) {
  const Component = as || "div";

  return (
    <Component
      className={`glass glass-hover ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
