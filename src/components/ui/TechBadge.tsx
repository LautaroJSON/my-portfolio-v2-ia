interface ITechBadgeProps {
  name: string;
}

export const TechBadge = ({ name }: ITechBadgeProps) => {
  return (
    <span className="text-accent font-mono text-sm font-medium">{name} </span>
  );
};
