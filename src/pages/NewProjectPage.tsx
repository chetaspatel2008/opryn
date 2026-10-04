import DashboardLayout from '../layouts/DashboardLayout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitBranch, Upload, Terminal, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import { createProject } from '../lib/api';
import { cn } from '../lib/utils';

export default function NewProjectPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [analysisStep, setAnalysisStep] = useState(0);

  useEffect(() => {
    if (step === 2) {
      const timer = setInterval(() => {
        setAnalysisStep(prev => {
          if (prev >= 4) {
            clearInterval(timer);
            setTimeout(() => setStep(3), 800);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const handleDeploy = async () => {
    setStep(4);
    const newProject = await createProject({ name: 'Expense Tracker' });
    navigate(`/project/${newProject.id}`);
  };

  const steps = [
    { num: 1, title: 'Import' },
    { num: 2, title: 'Analyze' },
    { num: 3, title: 'Configure' },
    { num: 4, title: 'Deploy' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Deploy new project</h1>
          <p className="text-muted-foreground">Select a repository or upload your code.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center mb-12">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-colors",
                step === s.num ? "bg-primary text-primary-foreground border-primary" : 
                step > s.num ? "bg-primary/20 text-primary border-primary" : "bg-card border-border text-muted-foreground"
              )}>
                {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
              </div>
              <span className={cn(
                "ml-3 text-sm font-medium",
                step >= s.num ? "text-foreground" : "text-muted-foreground"
              )}>
                {s.title}
              </span>
              {i < steps.length - 1 && (
                <div className="w-12 sm:w-24 h-px bg-border mx-4"></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-card border border-border/50 rounded-xl p-8 min-h-[400px]">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-semibold mb-6">Import project</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <button onClick={() => setStep(2)} className="flex flex-col items-center justify-center gap-4 p-8 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all text-left">
                  <GitBranch className="w-8 h-8 mb-2" />
                  <span className="font-medium">Connect GitHub</span>
                  <span className="text-xs text-muted-foreground text-center">Import from a repository</span>
                </button>
                <button onClick={() => setStep(2)} className="flex flex-col items-center justify-center gap-4 p-8 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all text-left">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="font-medium">Upload ZIP</span>
                  <span className="text-xs text-muted-foreground text-center">Upload local source code</span>
                </button>
                <button onClick={() => setStep(2)} className="flex flex-col items-center justify-center gap-4 p-8 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all text-left">
                  <Terminal className="w-8 h-8 mb-2" />
                  <span className="font-medium">Deploy from CLI</span>
                  <span className="text-xs text-muted-foreground text-center">Use the project CLI tool</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center justify-center py-12 animate-in fade-in">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-8" />
              <div className="space-y-4 w-full max-w-sm">
                {[
                  'Detecting runtime...',
                  'Detecting dependencies...',
                  'Detecting entry point...',
                  'Generating deployment plan...',
                ].map((text, i) => (
                  <div key={i} className={cn(
                    "flex items-center gap-3 transition-opacity duration-500",
                    analysisStep >= i ? "opacity-100" : "opacity-0"
                  )}>
                    {analysisStep > i ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : analysisStep === i ? (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <div className="w-5 h-5"></div>
                    )}
                    <span className={analysisStep === i ? "text-primary font-medium" : "text-muted-foreground"}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-semibold mb-6">Deployment configuration</h2>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-primary">Analysis complete</h4>
                  <p className="text-sm text-muted-foreground">We've automatically detected the settings for your Python FastAPI application.</p>
                </div>
              </div>

              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Name</label>
                  <input type="text" defaultValue="Expense Tracker" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Runtime</label>
                  <input type="text" defaultValue="Python 3.12" disabled className="w-full bg-muted border border-border rounded-md px-3 py-2 text-sm text-muted-foreground" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Build Command</label>
                  <input type="text" defaultValue="pip install -r requirements.txt" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">Start Command</label>
                    <input type="text" defaultValue="uvicorn main:app --host 0.0.0.0 --port 8000" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Port</label>
                    <input type="text" defaultValue="8000" className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <button onClick={handleDeploy} className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                    Deploy Project
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <h2 className="text-xl font-semibold">Initializing deployment...</h2>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
