interface ILineNumberGutterProps {
  lineCount: number;
}

export const LineNumberGutter = ({ lineCount }: ILineNumberGutterProps) => {
  const lines = Array.from({ length: lineCount }, (_, index) => index + 1);

  return (
    <div className="text-text-muted flex w-10 flex-col items-end px-3 pt-2 pb-2 font-mono text-sm [font-variant-numeric:tabular-nums] select-none">
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </div>
  );
};
