import { Server, Database, ArrowRight, Upload, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const BackendIntegration = () => {
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
      ref={sectionRef}
      className={`py-24 px-4 section-fade-in ${isVisible ? 'visible' : ''}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Server className="w-10 h-10 text-accent cyber-glow-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            Backend Implementation Overview
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Built with Python Flask and Web Crypto API for secure client-side encryption
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="cyber-card p-6 text-center">
            <Upload className="w-12 h-12 text-primary mx-auto mb-4 cyber-glow" />
            <h3 className="text-xl font-bold mb-2">Image Upload</h3>
            <p className="text-muted-foreground">Handles secure file upload and validation</p>
          </div>

          <div className="cyber-card p-6 text-center">
            <Database className="w-12 h-12 text-accent mx-auto mb-4 cyber-glow-accent" />
            <h3 className="text-xl font-bold mb-2">AES Processing</h3>
            <p className="text-muted-foreground">Performs encryption/decryption using Web Crypto API</p>
          </div>

          <div className="cyber-card p-6 text-center">
            <Download className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Result Delivery</h3>
            <p className="text-muted-foreground">Returns processed images for display</p>
          </div>
        </div>

        {/* Architecture Diagram */}
        <div className="cyber-card p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-gradient">
            System Architecture
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            <div className="text-center space-y-3">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center border-2 border-primary cyber-glow">
                <Upload className="w-16 h-16 text-primary" />
              </div>
              <p className="font-bold">User Interface</p>
              <p className="text-sm text-muted-foreground">React + TypeScript</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-0.5 w-16 bg-gradient-primary animate-gradient" />
              <ArrowRight className="w-8 h-8 text-primary animate-float" />
              <div className="h-0.5 w-16 bg-gradient-primary animate-gradient" />
            </div>

            <div className="text-center space-y-3">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-accent/20 to-secondary/20 rounded-lg flex items-center justify-center border-2 border-accent cyber-glow-accent">
                <Server className="w-16 h-16 text-accent" />
              </div>
              <p className="font-bold">Processing Layer</p>
              <p className="text-sm text-muted-foreground">Web Crypto API</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-0.5 w-16 bg-gradient-primary animate-gradient" />
              <ArrowRight className="w-8 h-8 text-accent animate-float" style={{ animationDelay: '1s' }} />
              <div className="h-0.5 w-16 bg-gradient-primary animate-gradient" />
            </div>

            <div className="text-center space-y-3">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg flex items-center justify-center border-2 border-secondary">
                <Download className="w-16 h-16 text-secondary" />
              </div>
              <p className="font-bold">Encrypted Output</p>
              <p className="text-sm text-muted-foreground">ECB & CBC Results</p>
            </div>
          </div>
        </div>

        <div className="cyber-card mt-8 p-6">
          <h3 className="text-xl font-bold mb-4 text-gradient">Technical Stack</h3>
          <ul className="space-y-3 text-foreground/90">
            <li className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <span><span className="font-bold">Frontend:</span> React, TypeScript, Tailwind CSS</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <span><span className="font-bold">Encryption:</span> Web Crypto API (AES-CBC)</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <span><span className="font-bold">Image Processing:</span> Canvas API for pixel manipulation</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <span><span className="font-bold">Security:</span> Client-side encryption with random IV generation</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
