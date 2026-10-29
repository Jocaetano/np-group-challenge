import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type MenuItem = { label: string; detail?: string; onSelect: () => void };

type Props = {
  label: string;
  title: string;
  items: MenuItem[];
  triggerClassName: string;
  wrapperClassName?: string;
  panelClassName?: string;
  children: ReactNode;
};

export function DemoMenu({
  label,
  title,
  items,
  triggerClassName,
  wrapperClassName = "",
  panelClassName = "",
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={`relative ${wrapperClassName}`} ref={wrapperRef}>
      <button
        type="button"
        className={triggerClassName}
        aria-label={label}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        {children}
      </button>
      {open && (
        <div
          className={`absolute top-full mt-1.75 right-0 left-0 z-40 rounded-xl border border-[#e1eae1] dark:border-stroke bg-surface p-1.75 shadow-[0_14px_30px_rgba(22,53,32,0.14)] ${panelClassName}`}
          id={panelId}
        >
          <span className="block px-2.25 py-1.75 text-3xs font-extrabold tracking-widest text-[#93a795] dark:text-text-subtle">
            {title}
          </span>
          {items.map((item) => (
            <button
              className="block w-full rounded-md bg-transparent p-2.25 text-left text-[#355641] dark:text-text-strong hover:bg-[#f0f6ef] dark:hover:bg-surface-muted"
              type="button"
              key={item.label}
              onClick={() => {
                item.onSelect();
                setOpen(false);
              }}
            >
              <strong className="block text-caption">{item.label}</strong>
              {item.detail && (
                <small className="mt-0.75 block text-2xs text-[#91a593] dark:text-text-subtle">
                  {item.detail}
                </small>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
