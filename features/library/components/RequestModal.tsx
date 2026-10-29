import { useEffect, useRef, useState } from "react";
import { LockKeyhole, Send, X } from "lucide-react";
import type { Asset } from "../data";
import { Button } from "./Button";
import { ModalBackdrop } from "./ModalBackdrop";

export function RequestModal({
  asset,
  onClose,
  onSubmit,
}: {
  asset: Asset | null;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");
  const reasonRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => reasonRef.current?.focus(), []);
  return (
    <ModalBackdrop onClose={onClose}>
      <form
        className="m-auto w-[min(460px,calc(100vw-28px))] rounded-2xl bg-surface p-6.5 shadow-[0_25px_70px_rgba(5,29,16,0.2)] animate-[scaleIn_0.2s_ease-out] max-compact:p-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-title"
        onSubmit={(event) => {
          event.preventDefault();
          if (reason.trim()) onSubmit(reason.trim());
        }}
      >
        <div className="mb-5.75 flex items-start justify-between">
          <span className="grid h-11.5 w-11.5 place-items-center rounded-xl bg-[#e7f3e7] dark:bg-surface-soft text-[#3c8051] dark:text-text-strong">
            <LockKeyhole size={23} />
          </span>
          <Button variant="icon" onClick={onClose} aria-label="Close request">
            <X size={20} />
          </Button>
        </div>
        <span className="eyebrow">ACCESS REQUEST</span>
        <h2
          id="request-title"
          className="my-2.25 text-2xl leading-tight tracking-tight"
        >
          Request access{asset ? ` to ${asset.title}` : ""}
        </h2>
        <p className="mb-6.25 text-xs leading-relaxed text-[#7c8f7e] dark:text-text-subtle">
          Tell the asset owner why you need access. Your request will be saved
          in this demo.
        </p>
        <label
          htmlFor="reason"
          className="mb-2.25 block text-caption font-extrabold text-[#3a5541] dark:text-text-strong"
        >
          Reason for access{" "}
          <span className="text-[#d27d65] dark:text-text-subtle">*</span>
        </label>
        <textarea
          className="block min-h-31.25 w-full resize-y rounded-lg border border-[#dce8dc] dark:border-stroke p-3 text-xs text-[#314b38] dark:text-text-strong outline-none placeholder:text-[#a7b5a8] dark:placeholder:text-text-subtle focus:border-[#84bd89] dark:focus:border-stroke focus:shadow-[0_0_0_3px_#e7f4e7]"
          ref={reasonRef}
          id="reason"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          placeholder="I need this asset to build a layout for..."
          rows={5}
          required
        />
        <div className="mt-5.5 flex justify-end gap-2.25">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={!reason.trim()}>
            <Send size={16} /> Submit request
          </Button>
        </div>
      </form>
    </ModalBackdrop>
  );
}
