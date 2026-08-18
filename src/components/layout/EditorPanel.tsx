'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { LineNumberGutter } from '@/components/ui/LineNumberGutter';
import { Sidebar } from '@/components/layout/Sidebar';
import { TabStrip } from '@/components/layout/TabStrip';
import { StatusBar } from '@/components/layout/StatusBar';
import { calculateLineCount } from '@/lib/line-count';
import type { ISidebarItem } from '@/interfaces/navigation.interface';

interface IEditorPanelProps {
  children: ReactNode;
  activeSection: ISidebarItem['id'];
  onSelect: (id: ISidebarItem['id']) => void;
}

export const EditorPanel = ({
  children,
  activeSection,
  onSelect,
}: IEditorPanelProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(0);

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
  }, [children]);

  return (
    <div className="border-border-subtle bg-panel-bg flex h-[95vh] w-full flex-col gap-3 rounded-2xl border p-3 backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)]">
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-[auto_1fr]">
        <Sidebar
          activeSection={activeSection}
          onSelect={onSelect}
          className="self-start"
        />

        <div className="border-border-subtle flex min-h-0 flex-col overflow-hidden rounded-lg border">
          <TabStrip activeSection={activeSection} onSelect={onSelect} />
          <div className="flex min-h-0 flex-1 overflow-y-auto">
            <LineNumberGutter lineCount={lineCount} />
            <div
              ref={contentRef}
              className="border-border-subtle text-text-primary flex-1 border-l p-6 text-lg leading-relaxed"
            >
              {children}
            </div>
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
