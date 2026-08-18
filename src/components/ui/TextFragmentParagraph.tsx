import type { ITextFragment } from '@/interfaces/text-fragment.interface';

interface ITextFragmentParagraphProps {
  fragments: ITextFragment[];
  className?: string;
}

export const TextFragmentParagraph = ({
  fragments,
  className,
}: ITextFragmentParagraphProps) => {
  return (
    <p className={className}>
      {fragments.map((fragment, index) => (
        <span
          key={index}
          className={fragment.accent ? 'text-accent font-semibold' : undefined}
        >
          {fragment.text}
        </span>
      ))}
    </p>
  );
};
