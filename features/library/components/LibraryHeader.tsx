import { Bell, ChevronRight, Menu, Plus } from "lucide-react";
import { ProfileMenu } from "./ProfileMenu";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";

type TopbarProps = {
  mobileNavOpen: boolean;
  onToggleNav: () => void;
  onNotification: () => void;
  onMockAction: (message: string) => void;
};

export function LibraryTopbar({
  mobileNavOpen,
  onToggleNav,
  onNotification,
  onMockAction,
}: TopbarProps) {
  return (
    <header className="flex h-18 items-center justify-between border-b border-[#edf0ec] dark:border-stroke bg-surface px-11.5 max-wide:px-8.5 max-mobile:h-14.5 max-mobile:px-5">
      <div className="flex items-center gap-3.25 text-xs text-[#9aa99e] dark:text-text-subtle">
        <button
          className="mr-0 hidden place-items-center rounded-lg p-1 text-[#81948a] dark:text-text-subtle hover:bg-[#f0f5f0] dark:hover:bg-surface-muted hover:text-[#204a38] dark:hover:text-text-strong max-mobile:mr-0.5 max-mobile:grid"
          type="button"
          onClick={onToggleNav}
          aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
        >
          <Menu size={21} />
        </button>
        <span>Workspace</span>
        <ChevronRight size={14} />
        <strong className="font-bold text-[#456257] dark:text-text-strong">
          Library
        </strong>
      </div>
      <div className="flex items-center gap-4.75 max-mobile:gap-3">
        <span className="flex items-center gap-1 rounded-md border border-[#e6ebe6] dark:border-stroke px-1.5 py-0.75 text-2xs text-[#a1ada3] dark:text-text-subtle max-mobile:hidden">
          Ctrl K
        </span>
        <ThemeToggle />
        <Button
          variant="icon"
          onClick={onNotification}
          aria-label="Notifications"
        >
          <Bell size={18} />
        </Button>
        <span className="h-5.75 w-px bg-[#e8eee8] dark:bg-surface-soft" />
        <ProfileMenu variant="header" onMockAction={onMockAction} />
      </div>
    </header>
  );
}

export function LibraryHeading({ onRequest }: { onRequest: () => void }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-5 max-mobile:mb-7 max-mobile:items-start">
      <div>
        <span className="eyebrow inline-flex items-center gap-2">
          <span className="h-1.75 w-1.75 rounded-full bg-[#8ac87a] shadow-[0_0_0_4px_#ecf7e8]" />{" "}
          ASSET LIBRARY
        </span>
        <h1 className="mt-4.5 mb-3 text-display leading-tight font-bold tracking-tighter text-[#1d352e] dark:text-text-strong max-tablet:text-4xl max-mobile:mt-3.75 max-mobile:text-3xl">
          Find your next insight
          <span className="text-[#a1cc8f] dark:text-text-subtle">.</span>
        </h1>
        <p className="m-0 text-sm leading-relaxed text-copy-muted max-mobile:text-xs">
          Browse the assets you need to report, explore, and present with
          clarity.
        </p>
      </div>
      <Button
        variant="primary"
        className="h-10 max-mobile:w-10 max-mobile:min-w-10 max-mobile:shrink-0 max-mobile:justify-center max-mobile:gap-0 max-mobile:p-0 max-mobile:[&_svg]:w-4.75"
        onClick={onRequest}
        aria-label="Request an asset"
      >
        <Plus size={18} />{" "}
        <span className="max-mobile:hidden">Request an asset</span>
      </Button>
    </div>
  );
}
