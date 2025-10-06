import { Lock, Shield, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

export const HeroSection = () => {
  const scrollToDemo = () => {
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow" />
        
        {/* Floating Lock Icons */}
        {[...Array(5)].map((_, i) => (
          <Lock
            key={i}
            className="absolute text-primary/10 animate-float"
            size={24}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8 animate-fadeIn">
        <div className="flex items-center justify-center gap-4 mb-8">
          <Shield className="w-16 h-16 text-primary cyber-glow animate-pulse-slow" />
          <Lock className="w-20 h-20 text-accent cyber-glow-accent animate-float" />
          <Shield className="w-16 h-16 text-primary cyber-glow animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-gradient leading-tight">
          🔐 AES Image Encryption
        </h1>
        
        <p className="text-xl md:text-3xl font-semibold text-foreground/90">
          Visualizing Block Cipher Modes (ECB vs CBC)
        </p>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          A mini-project demonstrating secure image encryption using the Advanced Encryption Standard (AES).
          Explore the difference between ECB and CBC modes through interactive visualization.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button 
            onClick={scrollToDemo}
            size="lg" 
            className="glow-button bg-gradient-primary text-primary-foreground font-semibold px-8 py-6 text-lg"
          >
            Encrypt Now
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-6 text-lg"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            Learn More
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      </div>
    </section>
  );
};
