import type { ReactNode } from "react";

export function ModalBackdrop({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-90 flex justify-end bg-[rgba(13,34,27,0.44)] backdrop-blur-xs animate-[fadeIn_0.17s_ease-out]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {children}
    </div>
  );
}
