import { Upload } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  disabled?: boolean;
}

export const ImageUpload = ({ onImageSelect, disabled }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onImageSelect(file);
    }
  };

  return (
    <div className="cyber-card">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        variant="outline"
        size="lg"
        className="w-full h-40 border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
      >
        <div className="flex flex-col items-center gap-3">
          <Upload className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">Upload Image</p>
            <p className="text-sm text-muted-foreground">Click to select an image file</p>
          </div>
        </div>
      </Button>
    </div>
  );
};
