interface ISectionEyebrowProps {
  label: string;
}

export const SectionEyebrow = ({ label }: ISectionEyebrowProps) => {
  return (
    <p className="text-text-muted font-mono text-xs tracking-wide">
      {'// '}
      {label}
    </p>
  );
};
