import { Upload, Key, Lock, Save, Check, ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const StepByStep = () => {
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

  const steps = [
    {
      icon: Upload,
      title: "Upload Image",
      description: "Upload an image and convert it into RGB byte data",
      color: "text-primary",
    },
    {
      icon: Key,
      title: "Generate AES Key",
      description: "Generate a random AES encryption key (128, 192, or 256-bit)",
      color: "text-accent",
    },
    {
      icon: Lock,
      title: "Encrypt Data",
      description: "Encrypt image data using chosen mode (ECB or CBC)",
      color: "text-secondary",
    },
    {
      icon: Save,
      title: "Save Encrypted",
      description: "Save encrypted bytes as an image file",
      color: "text-primary",
    },
    {
      icon: Check,
      title: "Decrypt & Verify",
      description: "Decrypt and verify to reconstruct the original image",
      color: "text-accent",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className={`py-24 px-4 bg-gradient-to-b from-background to-card/20 section-fade-in ${isVisible ? 'visible' : ''}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            How Does AES Image Encryption Work?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Follow the step-by-step process of encrypting and decrypting images
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index}>
              <div 
                className="cyber-card flex items-start gap-6 p-6"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: isVisible ? 'fadeIn 0.6s ease-out forwards' : 'none'
                }}
              >
                <div className={`${step.color} cyber-glow p-4 bg-card rounded-lg flex-shrink-0`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-muted-foreground">STEP {index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-lg">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex justify-center my-4">
                  <ArrowDown className="w-6 h-6 text-primary/50 animate-bounce" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Code Example */}
        <div className="cyber-card p-6 mt-12">
          <h3 className="text-xl font-bold mb-4 text-gradient">Code Example</h3>
          <div className="bg-background/80 p-6 rounded-lg border border-border overflow-x-auto">
            <pre className="text-sm text-muted-foreground">
              <code className="language-python">{`# AES CBC Encryption Example
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Random import get_random_bytes

# Generate random key and IV
key = get_random_bytes(32)  # 256-bit key
iv = get_random_bytes(16)   # 128-bit IV

# Create cipher object
cipher = AES.new(key, AES.MODE_CBC, iv)

# Encrypt image bytes
image_bytes = open('image.png', 'rb').read()
ct_bytes = cipher.encrypt(pad(image_bytes, AES.block_size))

# Save encrypted image
with open('encrypted.bin', 'wb') as f:
    f.write(ct_bytes)`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
