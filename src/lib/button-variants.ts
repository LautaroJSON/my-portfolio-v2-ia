export type ButtonVariant = 'primary' | 'secondary';

export const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'border-accent bg-accent-dim text-accent hover:border-accent-hover hover:text-accent-hover',
  secondary:
    'border-border-subtle text-text-secondary hover:bg-accent-dim hover:text-text-primary',
};
