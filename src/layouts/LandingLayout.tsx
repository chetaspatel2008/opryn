import { Link } from 'react-router-dom';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-border/40 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              PROJECT
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
              <Link to="#product" className="hover:text-foreground transition-colors">Product</Link>
              <Link to="#how-it-works" className="hover:text-foreground transition-colors">How it works</Link>
              <Link to="#developers" className="hover:text-foreground transition-colors">Developers</Link>
              <Link to="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
              <Link to="#docs" className="hover:text-foreground transition-colors">Docs</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Log in</Link>
            <Link to="/dashboard" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t border-border/40 py-12 bg-card">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-primary-foreground">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              PROJECT
            </Link>
            <p className="text-muted-foreground">From code to software, automatically.</p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold">Product</h4>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">Changelog</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold">Developers</h4>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">Status</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold">Company</h4>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold">Legal</h4>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
