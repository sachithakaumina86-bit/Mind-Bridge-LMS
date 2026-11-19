import React from 'react';

interface StageNoticeToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const StageNoticeToast: React.FC<StageNoticeToastProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:max-w-md z-[60] flex items-start gap-3 rounded-xl bg-[#101b34] dark:bg-[#191f2f] text-[#eef0ff] dark:text-[#f1f5f9] border border-[#26334d] px-4 py-3 shadow-2xl"
    >
      <span className="material-symbols-outlined text-[#3898ff] text-[20px] shrink-0 mt-0.5">
        info
      </span>
      <div className="flex-1 text-[13px] leading-[19px]">
        <p className="font-semibold text-white">Stage 01 — Public Marketing Website</p>
        <p className="text-[#c0c7d5] mt-0.5">{message}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notice"
        className="text-[#94a3b8] hover:text-white transition-colors p-0.5 shrink-0"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
};
