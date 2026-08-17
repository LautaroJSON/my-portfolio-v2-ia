import type { ReactNode } from 'react';
import { LineNumberGutter } from '@/components/ui/LineNumberGutter';

interface IEditorPanelProps {
  children: ReactNode;
  lineCount?: number;
}

export const EditorPanel = ({
  children,
  lineCount = 40,
}: IEditorPanelProps) => {
  return (
    <div className="border-border-subtle bg-panel-bg flex-1 overflow-hidden rounded-3xl border backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)]">
      <div className="flex h-full">
        <LineNumberGutter lineCount={lineCount} />
        <div className="border-border-subtle text-text-primary flex-1 overflow-y-auto border-l p-6 text-lg leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};
