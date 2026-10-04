export type ProjectStatus = 'QUEUED' | 'ANALYZING' | 'BUILDING' | 'TESTING' | 'LIVE' | 'FAILED';

export type Project = {
  id: string;
  name: string;
  runtime: string;
  status: ProjectStatus;
  url?: string;
  lastDeployment: string;
};

export type DeploymentTimelineStep = {
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'FAILED';
  label: string;
};

const mockProjects: Project[] = [
  {
    id: 'prj_1',
    name: 'Expense Tracker',
    runtime: 'Python 3.12',
    status: 'LIVE',
    url: 'https://expense-app.project.dev',
    lastDeployment: '2m ago'
  },
  {
    id: 'prj_2',
    name: 'AI Resume Builder',
    runtime: 'Node.js 20',
    status: 'LIVE',
    url: 'https://resume.project.dev',
    lastDeployment: '1h ago'
  },
  {
    id: 'prj_3',
    name: 'Image Compressor',
    runtime: 'Python 3.12',
    status: 'BUILDING',
    lastDeployment: 'Just now'
  }
];

export async function getProjects(): Promise<Project[]> {
  return new Promise((resolve) => setTimeout(() => resolve(mockProjects), 500));
}

export async function getProject(id: string): Promise<Project | undefined> {
  return new Promise((resolve) => setTimeout(() => resolve(mockProjects.find(p => p.id === id)), 300));
}

export async function createProject(data: { name: string }): Promise<Project> {
  const newProject: Project = {
    id: `prj_${Math.random().toString(36).substring(7)}`,
    name: data.name,
    runtime: 'Python 3.12',
    status: 'QUEUED',
    lastDeployment: 'Just now'
  };
  mockProjects.unshift(newProject);
  return new Promise((resolve) => setTimeout(() => resolve(newProject), 800));
}

export async function deployProject(id: string): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 500));
}

export async function getDeploymentTimeline(id: string): Promise<DeploymentTimelineStep[]> {
  return new Promise((resolve) => setTimeout(() => resolve([
    { label: 'Queued', status: 'DONE' },
    { label: 'Analyzed', status: 'DONE' },
    { label: 'Building', status: 'DONE' },
    { label: 'Starting', status: 'DONE' },
    { label: 'Health check', status: 'DONE' },
    { label: 'Tests', status: 'DONE' },
    { label: 'Deployed', status: 'DONE' }
  ]), 300));
}
