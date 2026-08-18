import type { ITechnology } from '@/interfaces/technology.interface';

export interface IProjectHighlight {
  name: string;
  description: string;
}

export interface IExperience {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  projects: IProjectHighlight[];
  technologies: ITechnology[];
}
