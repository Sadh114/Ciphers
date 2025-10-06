import { Lightbulb, Rocket, Code, Smartphone, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Conclusion = () => {
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
      id="conclusion" 
      ref={sectionRef}
      className={`py-24 px-4 bg-gradient-to-b from-card/20 to-background section-fade-in ${isVisible ? 'visible' : ''}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lightbulb className="w-10 h-10 text-accent cyber-glow-accent animate-pulse-slow" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            Conclusion
          </h2>
        </div>

        <div className="cyber-card p-8 mb-12">
          <div className="space-y-6 text-lg text-foreground/90 leading-relaxed">
            <p>
              This project demonstrates how <span className="font-bold text-primary">block cipher modes</span> significantly affect encryption strength and security.
              Through visual comparison, we've seen that ECB mode's independent block encryption creates security vulnerabilities by preserving patterns.
            </p>
            <p>
              <span className="font-bold text-primary">AES-CBC mode</span> is recommended for secure image storage and transmission due to its block chaining mechanism,
              which ensures identical plaintext blocks produce different ciphertext outputs, effectively hiding patterns.
            </p>
            <p>
              This visual project helps understand <span className="font-bold text-accent">real-world cryptography concepts</span> and the importance
              of choosing the right encryption mode for different use cases.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8 text-gradient">
            Future Enhancements 🚀
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="cyber-card p-6 hover:scale-105 transition-transform">
              <div className="flex items-start gap-4">
                <Code className="w-8 h-8 text-primary flex-shrink-0 cyber-glow" />
                <div>
                  <h4 className="text-xl font-bold mb-2">Real-time Encryption</h4>
                  <p className="text-muted-foreground">Add GUI upload option for real AES encryption with file download</p>
                </div>
              </div>
            </div>

            <div className="cyber-card p-6 hover:scale-105 transition-transform">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-accent flex-shrink-0 cyber-glow-accent" />
                <div>
                  <h4 className="text-xl font-bold mb-2">AES-256 Mode</h4>
                  <p className="text-muted-foreground">Integrate stronger 256-bit key encryption for enhanced security</p>
                </div>
              </div>
            </div>

            <div className="cyber-card p-6 hover:scale-105 transition-transform">
              <div className="flex items-start gap-4">
                <Smartphone className="w-8 h-8 text-secondary flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-bold mb-2">Mobile App</h4>
                  <p className="text-muted-foreground">Build an Android/iOS app or Progressive Web App</p>
                </div>
              </div>
            </div>

            <div className="cyber-card p-6 hover:scale-105 transition-transform">
              <div className="flex items-start gap-4">
                <Rocket className="w-8 h-8 text-primary flex-shrink-0 cyber-glow" />
                <div>
                  <h4 className="text-xl font-bold mb-2">GCM Mode</h4>
                  <p className="text-muted-foreground">Implement authenticated encryption with AES-GCM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
