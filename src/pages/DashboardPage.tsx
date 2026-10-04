import DashboardLayout from '../layouts/DashboardLayout';
import { Link } from 'react-router-dom';
import { Plus, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProjects, type Project } from '../lib/api';

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Good morning</h1>
          <p className="text-muted-foreground">Deploy and manage your software.</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent projects</h2>
          <Link 
            to="/new" 
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-40 bg-muted/50 rounded-lg border border-border/50"></div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <Link key={project.id} to={`/project/${project.id}`} className="block group">
                <div className="h-full border border-border/50 rounded-lg p-5 bg-card hover:border-primary/50 transition-colors relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex justify-between items-start mb-4 relative">
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold tracking-wider ${
                      project.status === 'LIVE' ? 'bg-green-500/10 text-green-500' : 
                      project.status === 'BUILDING' ? 'bg-blue-500/10 text-blue-500 animate-pulse' :
                      'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 relative">
                    <Terminal className="w-4 h-4" />
                    {project.runtime}
                  </div>
                  <div className="text-xs text-muted-foreground flex justify-between items-center relative border-t border-border/50 pt-4">
                    <span>{project.lastDeployment}</span>
                    {project.url && (
                      <span className="text-foreground truncate max-w-[150px]">{project.url.replace('https://', '')}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
