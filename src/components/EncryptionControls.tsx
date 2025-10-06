import { Lock, Unlock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface EncryptionControlsProps {
  encryptionKey: string;
  onKeyChange: (key: string) => void;
  onEncrypt: () => void;
  onDecrypt: () => void;
  disabled?: boolean;
  hasEncrypted?: boolean;
}

export const EncryptionControls = ({
  encryptionKey,
  onKeyChange,
  onEncrypt,
  onDecrypt,
  disabled,
  hasEncrypted,
}: EncryptionControlsProps) => {
  return (
    <div className="cyber-card space-y-4">
      <div className="space-y-2">
        <Label htmlFor="key" className="text-sm font-medium">
          Encryption Key (16, 24, or 32 characters)
        </Label>
        <Input
          id="key"
          type="text"
          value={encryptionKey}
          onChange={(e) => onKeyChange(e.target.value)}
          placeholder="Enter encryption key..."
          className="bg-input border-border focus:border-primary transition-colors"
          maxLength={32}
        />
        <p className="text-xs text-muted-foreground">
          Key length: {encryptionKey.length} characters
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onEncrypt}
          disabled={disabled || encryptionKey.length < 16}
          className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity cyber-glow"
          size="lg"
        >
          <Lock className="w-4 h-4 mr-2" />
          Encrypt
        </Button>

        {hasEncrypted && (
          <Button
            onClick={onDecrypt}
            disabled={disabled || encryptionKey.length < 16}
            variant="outline"
            className="flex-1 border-accent text-accent hover:bg-accent/10"
            size="lg"
          >
            <Unlock className="w-4 h-4 mr-2" />
            Decrypt
          </Button>
        )}
      </div>
    </div>
  );
};
