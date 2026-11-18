export interface IProject {
  id: string;
  name: string;
  description: string;
  image?: string;
  video?: string; // short muted WebM played on hover over the image
  repoUrl: string;
  backendRepoUrl?: string; // when the backend lives in its own repository
  deployUrl?: string;
  technologies?: string[];
}
