import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Folder, Rocket, Activity, Settings, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '#', icon: Folder },
    { name: 'Deployments', path: '#', icon: Rocket },
    { name: 'Usage', path: '#', icon: Activity },
    { name: 'Logs', path: '#', icon: BookOpen },
    { name: 'Settings', path: '#', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/40 bg-card hidden md:flex flex-col h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-border/40">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            PROJECT
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border/40">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
              C
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Chetas</span>
              <span className="text-xs text-muted-foreground">Personal Plan</span>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 flex items-center justify-between px-8 border-b border-border/40 md:hidden bg-card sticky top-0 z-10">
           <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </Link>
        </header>
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
