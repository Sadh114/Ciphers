import { Lock } from "lucide-react";

export const Navigation = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Lock className="w-6 h-6 text-primary cyber-glow" />
            <span className="text-xl font-bold text-gradient">AES Encryption</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('home')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('about')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              About AES
            </button>
            <button onClick={() => scrollToSection('comparison')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ECB vs CBC
            </button>
            <button onClick={() => scrollToSection('demo')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Demo
            </button>
            <button onClick={() => scrollToSection('results')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Results
            </button>
            <button onClick={() => scrollToSection('conclusion')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Conclusion
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
