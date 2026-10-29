import type { ReactNode } from "react";
import { Check } from "lucide-react";

export function DetailStack({ children }: { children: ReactNode }) {
  return <div className="mt-7.5 grid gap-6.25">{children}</div>;
}

export function ChipRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-1.75">{children}</div>;
}

export function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h3 className="mb-3 text-body-sm font-extrabold text-[#2b4436] dark:text-text-strong">
        {title}
      </h3>
      {children}
    </section>
  );
}

export function ChipList({
  values,
  variant = "soft",
  checked = false,
}: {
  values: string[];
  variant?: "soft" | "code";
  checked?: boolean;
}) {
  return (
    <ChipRow>
      {values.map((value) => (
        <span
          className={`inline-flex items-center gap-1.25 rounded-md px-2.25 py-1.75 font-bold ${variant === "code" ? "bg-[#eaf5e9] dark:bg-surface-soft font-mono text-caption text-[#32744b] dark:text-text-strong" : "bg-[#f4f7f3] dark:bg-surface-muted text-2xs text-[#617e69] dark:text-text-subtle"}`}
          key={value}
        >
          {checked && <Check size={13} />}
          {value}
        </span>
      ))}
    </ChipRow>
  );
}

export function QuestionList({ questions }: { questions: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.25 max-mobile:grid-cols-1">
      {questions.map((question, index) => (
        <div
          className="flex min-h-17 gap-2.5 rounded-lg border border-[#edf1ec] dark:border-stroke bg-[#f8faf8] dark:bg-surface-muted p-3"
          key={question}
        >
          <span className="text-2xs font-extrabold text-[#69a477] dark:text-link">
            0{index + 1}
          </span>
          <p className="text-caption leading-normal text-[#5e7868] dark:text-text-subtle">
            {question}
          </p>
        </div>
      ))}
    </div>
  );
}
