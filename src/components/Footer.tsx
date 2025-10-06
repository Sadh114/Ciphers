import { Lock, Mail, Github, GraduationCap } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="contact" className="relative py-16 px-4 border-t border-border overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-primary animate-gradient" style={{ backgroundSize: '200% 100%' }} />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="w-8 h-8 text-primary cyber-glow" />
              <span className="text-2xl font-bold text-gradient">AES Encryption</span>
            </div>
            <p className="text-muted-foreground">
              A visual demonstration of block cipher modes in image encryption
            </p>
          </div>

          {/* Project Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Project Info</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>Computer Science Project</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>AES Encryption Demo</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Contact</h3>
            <div className="space-y-3">
              <a 
                href="mailto:your.email@example.com" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>sadhyoj.hanwate23@pccoepune.org</span>
              </a>
              <a 
                href="https://github.com/Sadh114" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            
             </p>
          <p className="text-muted-foreground text-xs mt-2">
            Educational purposes only. Always use secure encryption in production environments.
          </p>
        </div>
      </div>
    </footer>
  );
};
