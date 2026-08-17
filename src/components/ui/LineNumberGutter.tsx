interface ILineNumberGutterProps {
  lineCount: number;
}

export const LineNumberGutter = ({ lineCount }: ILineNumberGutterProps) => {
  const lines = Array.from({ length: lineCount }, (_, index) => index + 1);

  return (
    <div className="text-text-muted hidden w-8 flex-none flex-col items-end pr-2 text-sm [font-variant-numeric:tabular-nums] select-none md:flex">
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </div>
  );
};
