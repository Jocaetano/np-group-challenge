import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "icon" | "text";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: ButtonVariant;
};

const base =
  "inline-flex min-h-9.5 items-center justify-center gap-2.25 whitespace-nowrap rounded-lg border px-3.75 text-xs font-bold transition-[transform,background,box-shadow] duration-200";

const variants: Record<ButtonVariant, string> = {
  primary: `${base} border-transparent bg-brand text-white shadow-button enabled:hover:-translate-y-px enabled:hover:bg-brand-hover enabled:hover:shadow-button-hover`,
  secondary: `${base} border-[#dae5dc] dark:border-stroke bg-surface text-button-text hover:bg-[#f4f8f4] dark:hover:bg-surface-muted`,
  icon: "grid place-items-center rounded-lg p-1 text-icon-muted hover:bg-[#f0f5f0] dark:hover:bg-surface-muted hover:text-icon-hover",
  text: "flex items-center gap-1.25 text-caption font-extrabold text-link hover:text-link-hover",
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant, className = "", type = "button", ...props },
  ref,
) {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={`${variants[variant]} ${className}`.trim()}
    />
  );
});
