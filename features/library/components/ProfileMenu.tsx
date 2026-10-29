import { MoreHorizontal } from "lucide-react";
import { DemoMenu } from "./DemoMenu";

export function ProfileMenu({
  variant,
  onMockAction,
}: {
  variant: "sidebar" | "header";
  onMockAction: (message: string) => void;
}) {
  const isHeader = variant === "header";
  return (
    <DemoMenu
      label="Open profile menu"
      title="ACCOUNT"
      triggerClassName={
        isHeader
          ? "grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#d1e0c9] dark:border-stroke bg-[#dcead6] dark:bg-surface-soft text-2xs font-extrabold text-[#426342] dark:text-text-strong"
          : "mt-2.25 flex w-full items-center gap-2.25 border-t border-[#e7ece7] dark:border-stroke bg-transparent px-1.75 pt-3.5 text-left text-inherit hover:bg-[#f0f6ef] dark:hover:bg-surface-muted"
      }
      panelClassName={
        isHeader ? "right-0 left-auto w-51.25" : "top-auto bottom-full mb-1.75"
      }
      items={[
        {
          label: "View profile",
          detail: "Jordan Davis · Analyst",
          onSelect: () => onMockAction("Demo profile: Jordan Davis, Analyst."),
        },
        {
          label: "Preferences",
          detail: "Appearance and account",
          onSelect: () => onMockAction("Preferences are mocked in this demo."),
        },
      ]}
    >
      {isHeader ? (
        "JD"
      ) : (
        <>
          <span className="grid h-7.75 w-7.75 shrink-0 place-items-center rounded-full border border-[#d1e0c9] dark:border-stroke bg-[#dcead6] dark:bg-surface-soft text-2xs font-extrabold text-[#426342] dark:text-text-strong">
            JD
          </span>
          <span className="min-w-0 flex-1">
            <strong className="block truncate text-caption font-bold">
              Jordan Davis
            </strong>
            <small className="mt-0.75 block text-2xs text-[#9baaa0] dark:text-text-subtle">
              Analyst
            </small>
          </span>
          <MoreHorizontal
            size={18}
            className="text-[#96a79a] dark:text-text-subtle"
          />
        </>
      )}
    </DemoMenu>
  );
}
