'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { LineNumberGutter } from '@/components/ui/LineNumberGutter';
import { Sidebar } from '@/components/layout/Sidebar';
import { TabStrip } from '@/components/layout/TabStrip';
import { StatusBar } from '@/components/layout/StatusBar';
import { calculateLineCount } from '@/lib/line-count';
import type { SectionId } from '@/interfaces/navigation.interface';

interface IEditorPanelProps {
  children: ReactNode;
  activeSection: SectionId;
}

export const EditorPanel = ({ children, activeSection }: IEditorPanelProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // `null` until the content is measured on the client: the server-rendered
  // HTML must not claim a line count it cannot know.
  const [lineCount, setLineCount] = useState<number | null>(null);

  // Next.js only resets the window scroll on navigation; the editor content
  // scrolls inside its own container, so it has to be reset by hand.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [activeSection]);

  useEffect(() => {
    const node = contentRef.current;
    if (!node) {
      return;
    }

    const updateLineCount = () => {
      setLineCount(calculateLineCount(node));
    };

    updateLineCount();

    const observer = new ResizeObserver(updateLineCount);
    observer.observe(node);
    return () => observer.disconnect();
  }, [activeSection, children]);

  return (
    <div className="border-border-subtle bg-panel-bg flex h-[95vh] w-full flex-col gap-3 rounded-2xl border p-3 backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)]">
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-[auto_1fr]">
        <Sidebar activeSection={activeSection} className="self-start" />

        <div className="border-border-subtle flex min-h-0 flex-col overflow-hidden rounded-lg border">
          <TabStrip activeSection={activeSection} />
          <div ref={scrollRef} className="flex min-h-0 flex-1 overflow-y-auto">
            <LineNumberGutter lineCount={lineCount ?? 0} />
            <main
              ref={contentRef}
              className="border-border-subtle text-text-primary flex-1 border-l p-6 text-lg leading-relaxed"
            >
              {children}
            </main>
          </div>
        </div>
      </div>

      <StatusBar
        activeSection={activeSection}
        lineCount={lineCount}
        className="phosphor-glow shrink-0"
      />
    </div>
  );
};
