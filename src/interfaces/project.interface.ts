export interface IProject {
  id: string;
  name: string;
  description: string;
  image?: string;
  repoUrl: string;
  backendRepoUrl?: string; // when the backend lives in its own repository
  deployUrl?: string;
  technologies?: string[];
}
