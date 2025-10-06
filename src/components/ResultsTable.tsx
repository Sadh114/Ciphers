import { CheckCircle, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const ResultsTable = () => {
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
      id="results" 
      ref={sectionRef}
      className={`py-24 px-4 section-fade-in ${isVisible ? 'visible' : ''}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            Results & Observations
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comparative analysis of ECB and CBC encryption modes
          </p>
        </div>

        <div className="cyber-card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-lg font-bold text-primary">Mode</th>
                <th className="text-left p-4 text-lg font-bold text-primary">Pattern Visibility</th>
                <th className="text-left p-4 text-lg font-bold text-primary">Security Level</th>
                <th className="text-left p-4 text-lg font-bold text-primary">Visual Result</th>
                <th className="text-left p-4 text-lg font-bold text-primary">Recommended</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50 hover:bg-destructive/5 transition-colors">
                <td className="p-4">
                  <span className="font-bold text-destructive text-lg">ECB</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-destructive" />
                    <span className="text-foreground/90">Visible Patterns</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-destructive/20 text-destructive rounded-full text-sm font-semibold">
                    Low
                  </span>
                </td>
                <td className="p-4 text-foreground/80">
                  Recognizable shapes and outlines
                </td>
                <td className="p-4">
                  <XCircle className="w-6 h-6 text-destructive" />
                </td>
              </tr>
              <tr className="hover:bg-primary/5 transition-colors">
                <td className="p-4">
                  <span className="font-bold text-primary text-lg">CBC</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-foreground/90">Hidden Patterns</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                    High
                  </span>
                </td>
                <td className="p-4 text-foreground/80">
                  Complete random noise
                </td>
                <td className="p-4">
                  <CheckCircle className="w-6 h-6 text-primary cyber-glow" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="cyber-card mt-8 p-6">
          <h3 className="text-2xl font-bold mb-4 text-gradient">Key Observations</h3>
          <div className="space-y-4 text-foreground/90">
            <p className="text-lg leading-relaxed">
              <span className="font-bold text-destructive">AES in ECB mode</span> reveals image structure due to independent block encryption.
              Identical plaintext blocks (like solid color regions) produce identical ciphertext blocks, making patterns visible.
            </p>
            <p className="text-lg leading-relaxed">
              <span className="font-bold text-primary">AES in CBC mode</span> hides patterns by chaining blocks together.
              The Initialization Vector (IV) ensures that even identical blocks produce different ciphertext, offering{" "}
              <span className="font-bold text-primary">stronger security</span>.
            </p>
            <div className="mt-6 p-4 bg-primary/10 border-l-4 border-primary rounded">
              <p className="text-sm text-primary font-semibold">
                💡 Recommendation: Always use CBC mode (or better yet, GCM mode) for encrypting images and sensitive data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
