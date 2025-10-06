import { Info, Key, Lock, Layers, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const AboutAES = () => {
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
      id="about" 
      ref={sectionRef}
      className={`py-24 px-4 section-fade-in ${isVisible ? 'visible' : ''}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Info className="w-8 h-8 text-primary cyber-glow" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            What is AES?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="cyber-card space-y-4">
            <p className="text-lg text-foreground/90 leading-relaxed">
              <span className="font-bold text-primary">AES (Advanced Encryption Standard)</span> is a symmetric block cipher algorithm used globally for securing data.
              It works by dividing data into fixed-size blocks and encrypting them using a secret key.
            </p>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Different modes like <span className="font-semibold text-accent">ECB (Electronic Codebook)</span> and{" "}
              <span className="font-semibold text-primary">CBC (Cipher Block Chaining)</span> define how each block is encrypted.
            </p>
          </div>

          <div className="cyber-card space-y-6">
            <div className="flex items-start gap-4">
              <Key className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Symmetric Encryption</h3>
                <p className="text-muted-foreground">Uses the same key for encryption and decryption</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Layers className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Block Cipher</h3>
                <p className="text-muted-foreground">Divides data into 128-bit blocks for processing</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Lock className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Multiple Modes</h3>
                <p className="text-muted-foreground">ECB, CBC, CTR, GCM - each with different security properties</p>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Diagram */}
        <div className="cyber-card p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-gradient">
            AES Encryption Process
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            <div className="text-center space-y-3">
              <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-lg flex items-center justify-center cyber-glow animate-pulse-slow">
                <span className="text-2xl font-bold text-background">Plain</span>
              </div>
              <p className="text-sm text-muted-foreground">Plaintext Block</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:block h-0.5 w-16 bg-gradient-primary animate-gradient" />
              <Key className="w-8 h-8 text-accent animate-float" />
              <div className="hidden md:block h-0.5 w-16 bg-gradient-primary animate-gradient" />
            </div>

            <div className="text-center space-y-3">
              <div className="w-24 h-24 mx-auto bg-card border-2 border-primary rounded-lg flex items-center justify-center cyber-glow">
                <Lock className="w-12 h-12 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">AES Algorithm</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:block h-0.5 w-16 bg-gradient-primary animate-gradient" />
              <Shield className="w-8 h-8 text-primary animate-float" style={{ animationDelay: '1s' }} />
              <div className="hidden md:block h-0.5 w-16 bg-gradient-primary animate-gradient" />
            </div>

            <div className="text-center space-y-3">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-accent/20 to-secondary/20 rounded-lg flex items-center justify-center border-2 border-accent cyber-glow-accent animate-pulse-slow" style={{ animationDelay: '1s' }}>
                <span className="text-2xl font-bold text-accent">####</span>
              </div>
              <p className="text-sm text-muted-foreground">Ciphertext Block</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
