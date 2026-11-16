import type { ITextFragment } from '@/interfaces/text-fragment.interface';

export const aboutContentEn: ITextFragment[] = [
  { text: 'I graduated as a ' },
  {
    text: 'Higher Technician in Programming (Técnico Superior en Programación)',
    accent: true,
  },
  {
    text: ' from Universidad Tecnológica Nacional (UTN), 2018–2020. I started with ',
  },
  { text: 'C', accent: true },
  { text: ' and ' },
  { text: 'C#', accent: true },
  { text: ', which gave me a solid base in ' },
  { text: 'OOP', accent: true },
  {
    text: ' and software fundamentals. My first role was as a frontend developer with ',
  },
  { text: 'React', accent: true },
  { text: ' in a large team working under ' },
  { text: 'Scrum', accent: true },
  {
    text: '. Over time I took ownership of complete products and made their frontend architecture decisions. Today I work with AI agents (',
  },
  { text: 'Claude Code', accent: true },
  { text: ', ' },
  { text: 'MCP', accent: true },
  { text: ') under ' },
  { text: 'Spec-Driven Development', accent: true },
  {
    text: ': I design the architecture and write the specs, the agent implements under my direction, and I review and test every change. It lets me deliver faster without giving up technical judgment.',
  },
];
