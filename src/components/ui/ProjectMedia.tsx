'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { DemoVideoDialog } from '@/components/ui/DemoVideoDialog';
import type { PointerEvent } from 'react';

interface IProjectMediaProps {
  name: string;
  image: string;
  video?: string;
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

// Project screenshot with an optional demo clip.
// - Mouse: hovering plays the clip muted inside the card (decorative, same
//   content as the screenshot), with a progress line along the bottom edge.
// - Click/tap/keyboard: the whole media is a button that opens the clip large
//   in a dialog. A "Watch demo" chip makes that discoverable: on hover/focus
//   with a mouse, always visible on touch screens (they have no hover).
// Without a clip, the screenshot just zooms in on hover. With
// prefers-reduced-motion there is no inline playback nor zoom.
export const ProjectMedia = ({ name, image, video }: IProjectMediaProps) => {
  const t = useTranslations('projects');
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // The progress line is driven by requestAnimationFrame instead of
  // `timeupdate` (only ~4 times per second, it would move in jumps), writing
  // the transform directly so playback never re-renders the component.
  const stopProgress = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  };

  const startProgress = () => {
    stopProgress();
    const tick = () => {
      const clip = videoRef.current;
      const bar = progressRef.current;
      if (clip && bar && clip.duration) {
        bar.style.transform = `scaleX(${clip.currentTime / clip.duration})`;
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => stopProgress, []);

  const stopInlinePlayback = () => {
    videoRef.current?.pause();
    stopProgress();
    if (progressRef.current) progressRef.current.style.transform = 'scaleX(0)';
    setIsPlaying(false);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    const clip = videoRef.current;
    if (!clip || event.pointerType !== 'mouse' || isDialogOpen) return;
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;
    clip.currentTime = 0;
    // play() rejects if the hover ends before the clip can start; nothing to do.
    clip.play().catch(() => {});
  };

  const handlePlaying = () => {
    setIsPlaying(true);
    startProgress();
  };

  const openDialog = () => {
    stopInlinePlayback();
    setIsDialogOpen(true);
  };

  return (
    <div
      onPointerEnter={video ? handlePointerEnter : undefined}
      onPointerLeave={video ? stopInlinePlayback : undefined}
      className="group/media bg-sidebar-bg border-border-subtle relative aspect-video overflow-hidden border-b landscape:aspect-auto landscape:w-64 landscape:shrink-0 landscape:border-e landscape:border-b-0"
    >
      <Image
        src={image}
        alt=""
        fill
        // Landscape crops a 16:9 image into a 256px-wide column as tall as
        // the card, so the rendered width follows the card height
        // (~16/9 of it), not 256px.
        sizes="(orientation: landscape) 1024px, 100vw"
        className={
          video
            ? 'object-cover'
            : 'object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover/media:scale-110'
        }
      />
      {video && (
        <>
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onPlaying={handlePlaying}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <button
            type="button"
            onClick={openDialog}
            aria-label={t('watchDemoAria', { name })}
            aria-haspopup="dialog"
            className="group/play focus-visible:outline-accent absolute inset-0 flex cursor-pointer items-start justify-end p-2 focus-visible:outline-2 focus-visible:-outline-offset-2"
          >
            <span className="bg-sidebar-bg/90 border-border-subtle text-text-primary group-hover/play:text-accent group-focus-visible/play:text-accent inline-flex items-center gap-1.5 rounded border px-2 py-1 font-mono text-xs transition-opacity pointer-fine:opacity-0 pointer-fine:group-hover/media:opacity-100 pointer-fine:group-focus-visible/play:opacity-100">
              <Play size={12} strokeWidth={1.5} aria-hidden="true" />
              {t('watchDemo')}
            </span>
          </button>

          {/* Playback progress, like a player's scrubber: a dim track with an
              amber fill along the bottom edge. Decorative, like the clip. */}
          <span
            aria-hidden="true"
            className={`bg-void/60 pointer-events-none absolute inset-x-0 bottom-0 h-0.5 transition-opacity duration-300 ${
              isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span
              ref={progressRef}
              className="bg-accent block h-full origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </span>

          <DemoVideoDialog
            name={name}
            video={video}
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />
        </>
      )}
    </div>
  );
};
