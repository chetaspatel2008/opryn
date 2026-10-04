import DashboardLayout from '../layouts/DashboardLayout';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject, getDeploymentTimeline, type Project, type DeploymentTimelineStep } from '../lib/api';
import { CheckCircle, ExternalLink, Activity, Terminal, ArrowLeft } from 'lucide-react';

export default function DeploymentPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [timeline, setTimeline] = useState<DeploymentTimelineStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      getProject(id),
      getDeploymentTimeline(id)
    ]).then(([proj, time]) => {
      if (proj) setProject(proj);
      setTimeline(time);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-8 max-w-5xl mx-auto">
          <div className="h-20 bg-muted/50 rounded-lg"></div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="h-96 bg-muted/50 rounded-lg"></div>
            <div className="md:col-span-2 h-96 bg-muted/50 rounded-lg"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!project) return <DashboardLayout><div>Project not found</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <Link to="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        
        <div className="bg-card border border-border/50 rounded-xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">{project.name}</h1>
              <span className={`text-[10px] px-2 py-1 rounded-full font-bold tracking-wider ${
                project.status === 'LIVE' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
              }`}>
                ● {project.status}
              </span>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Terminal className="w-4 h-4" /> {project.runtime}
            </div>
          </div>
          {project.url && (
            <div className="flex items-center gap-4">
              <a href={project.url} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1 font-medium">
                {project.url} <ExternalLink className="w-4 h-4" />
              </a>
              <button className="bg-secondary text-secondary-foreground border border-border px-4 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors">
                Redeploy
              </button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">Deployment Timeline</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {timeline.map((step, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border border-border bg-card text-muted-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    {step.status === 'DONE' ? (
                      <CheckCircle className="w-4 h-4 text-primary" />
                    ) : (
                      <div className="w-2 h-2 bg-muted rounded-full"></div>
                    )}
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-lg border border-border/50 shadow-sm bg-background">
                    <span className={`text-sm font-medium ${step.status === 'DONE' ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logs & Metrics */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm flex flex-col h-[400px]">
              <div className="border-b border-border/50 px-4 py-3 flex gap-4 bg-muted/20">
                <button className="text-sm font-medium border-b-2 border-primary pb-3 -mb-3 text-foreground">Build Logs</button>
                <button className="text-sm font-medium border-b-2 border-transparent pb-3 -mb-3 text-muted-foreground hover:text-foreground transition-colors">Application Logs</button>
              </div>
              <div className="flex-1 p-4 bg-[#0d1117] font-mono text-xs overflow-auto text-muted-foreground space-y-1">
                <div className="text-blue-400"># Starting build process...</div>
                <div>Fetching source code from repository...</div>
                <div>Analyzing project structure...</div>
                <div className="text-green-400">✓ Detected Python 3.12</div>
                <div>Installing dependencies...</div>
                <div>Collecting fastapi==0.104.1</div>
                <div>Collecting uvicorn==0.23.2</div>
                <div>Successfully installed fastapi-0.104.1 uvicorn-0.23.2</div>
                <div className="text-green-400">✓ Dependencies installed</div>
                <div>Building container image...</div>
                <div className="text-green-400">✓ Build successful</div>
                <div className="text-blue-400"># Starting application sandbox...</div>
                <div>Running `uvicorn main:app --host 0.0.0.0 --port 8000`</div>
                <div>INFO:     Started server process [1]</div>
                <div>INFO:     Waiting for application startup.</div>
                <div>INFO:     Application startup complete.</div>
                <div className="text-green-400">✓ Health check passed</div>
              </div>
            </div>

            <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Resource Usage
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-border/50 rounded-lg p-4 bg-background">
                  <div className="text-sm text-muted-foreground mb-1">CPU</div>
                  <div className="text-2xl font-bold">12<span className="text-sm font-normal text-muted-foreground">%</span></div>
                  <div className="w-full bg-muted h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-primary w-[12%] h-full rounded-full"></div>
                  </div>
                </div>
                <div className="border border-border/50 rounded-lg p-4 bg-background">
                  <div className="text-sm text-muted-foreground mb-1">Memory</div>
                  <div className="text-2xl font-bold">256<span className="text-sm font-normal text-muted-foreground">MB</span></div>
                  <div className="w-full bg-muted h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-primary w-[25%] h-full rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
