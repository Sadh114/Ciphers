import { AlertTriangle, Shield, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const ECBvsCBC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="comparison" 
      ref={sectionRef}
      className={`py-24 px-4 section-fade-in ${isVisible ? 'visible' : ''}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            ECB vs CBC – A Visual Comparison
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Understanding the critical security differences between block cipher modes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* ECB Mode Card */}
          <div className="cyber-card border-2 border-destructive/30 hover:border-destructive/60 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-destructive animate-pulse-slow" />
              <h3 className="text-2xl font-bold text-destructive">ECB Mode</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                <p className="text-foreground/90">Encrypts each block <span className="font-bold">independently</span></p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                <p className="text-foreground/90">Same plaintext blocks produce <span className="font-bold">identical</span> ciphertext</p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                <p className="text-foreground/90">Easy to implement but <span className="font-bold text-destructive">insecure for images</span></p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                <p className="text-foreground/90">Patterns remain <span className="font-bold text-destructive">visible</span> after encryption</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
              <p className="text-sm text-destructive font-semibold text-center">
                ⚠️ NOT RECOMMENDED FOR REAL-WORLD USE
              </p>
            </div>
          </div>

          {/* CBC Mode Card */}
          <div className="cyber-card border-2 border-primary/30 hover:border-primary/60 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-primary cyber-glow animate-pulse-slow" />
              <h3 className="text-2xl font-bold text-primary">CBC Mode</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-foreground/90">Each block depends on the <span className="font-bold">previous ciphertext</span></p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-foreground/90">Uses an <span className="font-bold">Initialization Vector (IV)</span> for randomness</p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-foreground/90">Identical blocks produce <span className="font-bold text-primary">different</span> ciphertext</p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-foreground/90">Produces <span className="font-bold text-primary">random-looking</span> encrypted output</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-sm text-primary font-semibold text-center">
                ✓ SECURE AND RECOMMENDED
              </p>
            </div>
          </div>
        </div>

        {/* Diagram Comparison */}
        <div className="cyber-card p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-gradient">
            How They Work
          </h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* ECB Diagram */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-destructive text-center">ECB Mode</h4>
              <div className="space-y-4">
                {[1, 2, 3].map((block) => (
                  <div key={block} className="flex items-center justify-center gap-4">
                    <div className="w-20 h-12 bg-muted/50 border border-muted-foreground/30 rounded flex items-center justify-center text-sm">
                      Block {block}
                    </div>
                    <ArrowRight className="w-6 h-6 text-destructive" />
                    <div className="w-20 h-12 bg-card border border-destructive rounded flex items-center justify-center">
                      <span className="text-xs">AES</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-destructive" />
                    <div className="w-20 h-12 bg-destructive/20 border border-destructive rounded flex items-center justify-center text-xs">
                      Cipher {block}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CBC Diagram */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-primary text-center">CBC Mode</h4>
              <div className="space-y-4">
                {[1, 2, 3].map((block) => (
                  <div key={block} className="flex items-center justify-center gap-4">
                    <div className="w-20 h-12 bg-muted/50 border border-muted-foreground/30 rounded flex items-center justify-center text-sm">
                      Block {block}
                    </div>
                    <div className="text-primary text-xs">⊕</div>
                    <ArrowRight className="w-6 h-6 text-primary" />
                    <div className="w-20 h-12 bg-card border border-primary rounded flex items-center justify-center">
                      <span className="text-xs">AES</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-primary" />
                    <div className="w-20 h-12 bg-primary/20 border border-primary rounded flex items-center justify-center text-xs">
                      Cipher {block}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center text-muted-foreground italic">
                Each block is XORed with previous ciphertext before encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
