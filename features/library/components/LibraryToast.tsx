import { Check, X } from "lucide-react";

export function LibraryToast({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  if (!message) return null;
  return (
    <div
      className="fixed right-6 bottom-6 z-110 flex items-center gap-2.25 rounded-lg bg-[#254c3b] px-3.25 py-3 text-caption font-bold text-white shadow-[0_12px_35px_rgba(24,54,33,0.2)] animate-[slideIn_0.2s_ease-out]"
      role="status"
    >
      <Check size={17} className="text-[#b7e2a7] dark:text-text-subtle" />
      {message}
      <button
        className="ml-3.25 grid place-items-center text-[#c4dac7] dark:text-text-subtle"
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
