import { useState } from "react";
import {
  Activity,
  ArrowRight,
  Bookmark,
  ChevronDown,
  Grid2X2,
  Layers3,
  LayoutDashboard,
  Presentation,
  Sparkles,
} from "lucide-react";
import type { Category } from "../data";
import { DemoMenu } from "./DemoMenu";
import { ProfileMenu } from "./ProfileMenu";

type Props = {
  open: boolean;
  category: Category;
  showFavorites: boolean;
  favoriteCount: number;
  onShowLibrary: () => void;
  onShowFavorites: () => void;
  onShowCategory: (category: Category) => void;
  onRequest: () => void;
  onMockAction: (message: string) => void;
};

const navLink =
  "relative flex w-full items-center rounded-lg text-left text-[#61756c] dark:text-text-subtle hover:bg-[#edf3ee] dark:hover:bg-surface-soft hover:text-[#244a3a] dark:hover:text-text-strong";
const activeNavLink =
  "bg-[#e5efe7] dark:bg-surface-soft font-bold text-[#214c3d] dark:text-text-strong [&_svg]:text-[#2f7651]";

export function LibrarySidebar({
  open,
  category,
  showFavorites,
  favoriteCount,
  onShowLibrary,
  onShowFavorites,
  onShowCategory,
  onRequest,
  onMockAction,
}: Props) {
  const [categoriesOpen, setCategoriesOpen] = useState(true);

  return (
    <aside
      className={`sticky top-0 z-30 flex h-screen min-h-screen w-sidebar basis-sidebar grow-0 shrink-0 flex-col border-r border-[#e8eee9] dark:border-stroke bg-[#f8faf8] dark:bg-surface-muted px-4 pt-6.5 pb-4 max-tablet:w-sidebar-narrow max-tablet:basis-sidebar-narrow max-mobile:fixed max-mobile:bottom-0 max-mobile:left-0 max-mobile:w-sidebar max-mobile:shadow-[20px_0_35px_rgba(25,55,33,0.12)] max-mobile:transition-transform max-mobile:duration-200 ${open ? "max-mobile:translate-x-0" : "max-mobile:-translate-x-full"}`}
    >
      <div className="flex items-center gap-2.75 px-2.75 pt-px pb-6.25 text-xl font-extrabold tracking-tighter text-[#183c33] dark:text-text-strong">
        <div className="grid h-8.5 w-8.5 rotate-[-8deg] place-items-center rounded-xl bg-[#173f34] text-[#d8f1b9] dark:text-text-subtle">
          <Layers3 size={22} strokeWidth={2.2} className="rotate-[8deg]" />
        </div>
        <span>
          northstar
          <span className="text-[#8ac97f] dark:text-text-subtle">.</span>
        </span>
      </div>
      <DemoMenu
        label="Choose workspace"
        title="WORKSPACES"
        triggerClassName="flex h-15.5 w-full items-center gap-2.25 rounded-xl border border-[#e4eae5] dark:border-stroke bg-surface px-2.5 py-2.25 text-left text-inherit shadow-[0_3px_12px_rgba(24,52,36,0.025)] hover:bg-[#f0f6ef] dark:hover:bg-surface-muted"
        wrapperClassName="mb-7.5"
        items={[
          {
            label: "Northstar workspace",
            detail: "Current workspace",
            onSelect: () =>
              onMockAction("You're already in Northstar workspace."),
          },
          {
            label: "Demo workspace",
            detail: "Sample option",
            onSelect: () =>
              onMockAction("Workspace switching is mocked in this demo."),
          },
        ]}
      >
        <span className="grid h-8.5 w-8.5 shrink-0 place-items-center rounded-lg bg-[#d9e9d8] dark:bg-surface-soft text-base font-extrabold text-[#244d3a] dark:text-text-strong">
          N
        </span>
        <span className="min-w-0 flex-1">
          <strong className="block truncate text-caption font-bold">
            Northstar workspace
          </strong>
          <small className="mt-0.75 block text-2xs text-[#9baaa0] dark:text-text-subtle">
            Enterprise plan
          </small>
        </span>
        <ChevronDown
          size={15}
          className="text-[#85988b] dark:text-text-subtle"
        />
      </DemoMenu>
      <div className="mx-3.25 mb-2.75 text-3xs font-extrabold tracking-widest text-[#9caea3] dark:text-text-subtle">
        WORKSPACE
      </div>
      <nav aria-label="Main navigation" className="grid gap-0.75">
        <div className="nav-library-group">
          <div className="relative">
            <button
              className={`${navLink} h-9.75 gap-3.25 pr-10.75 pl-3.25 text-xs font-semibold ${!showFavorites ? activeNavLink : ""}`}
              type="button"
              onClick={() => {
                setCategoriesOpen(true);
                onShowLibrary();
              }}
            >
              <Grid2X2 size={19} /> Library
              {!showFavorites && (
                <span className="absolute right-0 h-5 w-0.75 rounded-l-sm bg-[#398660]" />
              )}
            </button>
            <button
              className="absolute top-1.25 right-1.75 grid h-7.25 w-7.25 place-items-center rounded-md text-[#688476] dark:text-text-subtle hover:bg-[#d8e7dc] dark:hover:bg-surface-soft hover:text-[#244a3a] dark:hover:text-text-strong"
              type="button"
              aria-label={`${categoriesOpen ? "Collapse" : "Expand"} Library categories`}
              aria-expanded={categoriesOpen}
              aria-controls="library-categories"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${categoriesOpen ? "rotate-0" : "-rotate-90"}`}
              />
            </button>
          </div>
          <div
            className={
              categoriesOpen
                ? "mt-1.25 mb-2 ml-7 grid gap-0.5 border-l border-[#dce8de] dark:border-stroke pl-2.5"
                : "hidden"
            }
            id="library-categories"
          >
            {(
              [
                { value: "Featured", label: "Featured", icon: Sparkles },
                { value: "KPI", label: "Metrics & visuals", icon: Activity },
                { value: "Layouts", label: "Layouts", icon: LayoutDashboard },
                {
                  value: "Storyboards",
                  label: "Storyboards",
                  icon: Presentation,
                },
              ] as const
            ).map(({ value, label, icon: Icon }) => (
              <button
                className={`${navLink} h-8.25 gap-2.5 px-2.25 text-caption font-semibold ${!showFavorites && category === value ? "bg-[#e9f2ea] dark:bg-surface-soft font-bold text-[#255b3e] dark:text-text-strong [&_svg]:text-[#2f7651]" : ""}`}
                type="button"
                key={value}
                aria-current={
                  !showFavorites && category === value ? "page" : undefined
                }
                onClick={() => onShowCategory(value)}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>
        </div>
        <button
          className={`${navLink} h-9.75 gap-3.25 px-3.25 text-xs font-semibold ${showFavorites ? activeNavLink : ""}`}
          type="button"
          aria-current={showFavorites ? "page" : undefined}
          onClick={onShowFavorites}
        >
          <Bookmark size={19} /> Favorites{" "}
          <span className="ml-auto rounded-md bg-[#e9eee9] dark:bg-surface-soft px-1.75 py-0.75 text-2xs text-[#688276] dark:text-text-subtle">
            {favoriteCount}
          </span>
        </button>
      </nav>
      <div className="flex-1" />
      <div className="mt-5 mb-4 rounded-xl border border-[#dceadd] dark:border-stroke bg-[#eaf3e8] dark:bg-surface-soft p-3.75">
        <div className="mb-3.25 grid h-7.75 w-7.75 place-items-center rounded-lg bg-[#d2e8ca] dark:bg-surface-soft text-[#39744c] dark:text-text-strong">
          <Sparkles size={18} />
        </div>
        <strong className="block text-xs text-[#244d3e] dark:text-text-strong">
          Build something brilliant
        </strong>
        <p className="mt-1.5 mb-3 text-caption leading-normal text-[#738d7b] dark:text-text-subtle">
          Find the right assets to turn data into decisions.
        </p>
        <button
          className="flex items-center gap-1.5 text-caption font-extrabold text-[#286a45] dark:text-text-strong"
          type="button"
          onClick={onRequest}
        >
          Request an asset <ArrowRight size={14} />
        </button>
      </div>
      <div className="border-t border-[#e7ece7] dark:border-stroke pt-3">
        <ProfileMenu variant="sidebar" onMockAction={onMockAction} />
      </div>
    </aside>
  );
}
