export interface IProject {
  id: string;
  name: string;
  description: string;
  image?: string;
  repoUrl: string;
  deployUrl?: string;
  technologies?: string[];
}
