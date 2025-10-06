import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { ComparisonDisplay } from "@/components/ComparisonDisplay";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutAES } from "@/components/AboutAES";
import { ECBvsCBC } from "@/components/ECBvsCBC";
import { StepByStep } from "@/components/StepByStep";
import { ResultsTable } from "@/components/ResultsTable";
import { Conclusion } from "@/components/Conclusion";
import { BackendIntegration } from "@/components/BackendIntegration";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [ecbImage, setEcbImage] = useState<string | null>(null);
  const [cbcImage, setCbcImage] = useState<string | null>(null);
  const [ecbDecrypted, setEcbDecrypted] = useState<string | null>(null);
  const [cbcDecrypted, setCbcDecrypted] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setEcbImage(null);
      setCbcImage(null);
      setEcbDecrypted(null);
      setCbcDecrypted(null);
      toast.success("Image loaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  const handleProcessImage = async () => {
    if (!selectedFile) {
      toast.error("Please upload an image first");
      return;
    }

    setIsProcessing(true);
    toast.info("Processing image...");

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('/api/process', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Processing failed');
      }

      const result = await response.json();

      // Set the image URLs
      setOriginalImage('/api' + result.original);
      setEcbImage('/api' + result.ecb_encrypted);
      setCbcImage('/api' + result.cbc_encrypted);
      setEcbDecrypted('/api' + result.ecb_decrypted);
      setCbcDecrypted('/api' + result.cbc_decrypted);

      toast.success("Image processed successfully! Notice the difference between ECB and CBC modes.");
    } catch (error) {
      console.error("Processing failed:", error);
      toast.error("Processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <HeroSection />
      
      <AboutAES />
      
      <ECBvsCBC />
      
      <StepByStep />
      
      {/* Live Demo Section */}
      <section id="demo" className="py-24 px-4 bg-gradient-to-b from-card/20 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient">
              Try It Yourself 🔧
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Upload an image and see the difference between ECB and CBC encryption in real-time
            </p>
          </div>

          {/* Upload and Controls */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <ImageUpload onImageSelect={handleImageSelect} disabled={isProcessing} />
            <div className="cyber-card flex items-center justify-center">
              <Button
                onClick={handleProcessImage}
                disabled={isProcessing || !originalImage}
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity cyber-glow"
                size="lg"
              >
                <Lock className="w-4 h-4 mr-2" />
                Process Image (Auto-Generated Keys)
              </Button>
            </div>
          </div>

          {/* Comparison Display */}
          <ComparisonDisplay
            originalImage={originalImage}
            ecbImage={ecbImage}
            cbcImage={cbcImage}
            isEncrypted={ecbImage !== null}
          />
        </div>
      </section>
      
      <ResultsTable />
      
      <Conclusion />
      
      <BackendIntegration />
      
      <Footer />
    </div>
  );
};

export default Index;
