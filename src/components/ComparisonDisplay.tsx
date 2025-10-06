import { Shield, AlertTriangle } from "lucide-react";

interface ComparisonDisplayProps {
  originalImage: string | null;
  ecbImage: string | null;
  cbcImage: string | null;
  isEncrypted: boolean;
}

export const ComparisonDisplay = ({
  originalImage,
  ecbImage,
  cbcImage,
  isEncrypted,
}: ComparisonDisplayProps) => {
  if (!originalImage) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Original Image */}
        <div className="cyber-card space-y-3">
          <h3 className="text-lg font-semibold text-center">Original Image</h3>
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={originalImage}
              alt="Original"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* ECB Mode */}
        <div className="cyber-card space-y-3">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <h3 className="text-lg font-semibold">AES-ECB Mode</h3>
          </div>
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            {ecbImage ? (
              <img
                src={ecbImage}
                alt="ECB Encrypted"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No encryption yet
              </div>
            )}
          </div>
          {isEncrypted && (
            <p className="text-xs text-destructive text-center">
              ⚠️ Patterns are visible - NOT secure!
            </p>
          )}
        </div>

        {/* CBC Mode */}
        <div className="cyber-card space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">AES-CBC Mode</h3>
          </div>
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            {cbcImage ? (
              <img
                src={cbcImage}
                alt="CBC Encrypted"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No encryption yet
              </div>
            )}
          </div>
          {isEncrypted && (
            <p className="text-xs text-primary text-center">
              ✓ Patterns are hidden - Secure!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
