'use client';

import { useEffect, useRef } from 'react';
import { Maximize, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { MouseEvent } from 'react';

interface IDemoVideoDialogProps {
  name: string;
  video: string;
  isOpen: boolean;
  onClose: () => void;
}

// iOS Safari has no Fullscreen API on elements, only its own video player.
interface IWebkitVideoElement extends HTMLVideoElement {
  webkitEnterFullscreen?: () => void;
}

// `lock()` is missing from TypeScript's DOM types and only works in some
// browsers (Android Chrome, while in fullscreen).
interface ILockableScreenOrientation {
  lock?: (orientation: 'landscape') => Promise<void>;
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

// Large view of a project's demo clip. Native <dialog> with showModal(): it
// traps focus, closes on Escape and draws the backdrop on its own. Clicking
// the backdrop also closes it. The <video> only mounts while open, so the clip
// isn't downloaded until someone asks for it. On phones it spans the full
// width, and a touch-only "Fullscreen" button makes the 16:9 clip use the
// whole screen, rotating to landscape where the browser allows it.
export const DemoVideoDialog = ({
  name,
  video,
  isOpen,
  onClose,
}: IDemoVideoDialogProps) => {
  const t = useTranslations('projects');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<IWebkitVideoElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // A click whose target is the <dialog> itself landed on the backdrop: the
  // content fills the dialog box, so clicks inside hit a child instead.
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const enterFullscreen = async () => {
    const clip = videoRef.current;
    if (!clip) return;
    if (clip.requestFullscreen) {
      try {
        await clip.requestFullscreen();
        const orientation = screen.orientation as ILockableScreenOrientation;
        // Not supported everywhere (desktop, iOS); fullscreen alone is fine.
        await orientation.lock?.('landscape').catch(() => {});
      } catch {
        // The browser refused fullscreen; the dialog view still works.
      }
      return;
    }
    clip.webkitEnterFullscreen?.();
  };

  const autoPlay =
    typeof window !== 'undefined' &&
    !window.matchMedia(REDUCED_MOTION_QUERY).matches;

  return (
    <dialog
      ref={dialogRef}
      aria-label={t('demoDialogAria', { name })}
      onClose={onClose}
      onClick={handleClick}
      className="bg-sidebar-bg border-border-subtle text-text-primary backdrop:bg-void/80 m-auto w-[calc(100vw-2rem)] max-w-5xl overflow-hidden rounded-lg border p-0 backdrop:backdrop-blur-sm"
    >
      <div className="border-border-subtle flex items-center justify-between gap-4 border-b px-4 py-2">
        <p className="text-text-secondary min-w-0 truncate font-mono text-xs">
          {t('demoDialogTitle', { name })}
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={enterFullscreen}
            className="text-text-secondary hover:text-accent focus-visible:outline-accent hidden items-center gap-1.5 rounded px-2 py-1 font-mono text-xs whitespace-nowrap transition-colors focus-visible:outline-2 pointer-coarse:inline-flex"
          >
            <Maximize size={14} strokeWidth={1.5} aria-hidden="true" />
            {t('fullscreenDemo')}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('closeDemo')}
            className="text-text-secondary hover:text-accent focus-visible:outline-accent rounded p-1 transition-colors focus-visible:outline-2"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      {isOpen && (
        <video
          ref={videoRef}
          src={video}
          controls
          muted
          loop
          playsInline
          autoPlay={autoPlay}
          className="bg-void block aspect-video w-full"
        />
      )}
    </dialog>
  );
};
