import { Info } from "lucide-react";

export const InfoSection = () => {
  return (
    <div className="cyber-card space-y-4">
      <div className="flex items-center gap-2">
        <Info className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold">Understanding ECB vs CBC</h2>
      </div>

      <div className="space-y-3 text-sm text-muted-foreground">
        <div>
          <h3 className="font-semibold text-foreground mb-1">
            ECB (Electronic Codebook) Mode
          </h3>
          <p>
            Each block is encrypted independently with the same key. Identical plaintext
            blocks produce identical ciphertext blocks, revealing patterns in the
            encrypted data. This is a <span className="text-destructive font-semibold">security vulnerability</span>.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-1">
            CBC (Cipher Block Chaining) Mode
          </h3>
          <p>
            Each block is XORed with the previous ciphertext block before encryption,
            using an initialization vector (IV) for the first block. This ensures
            identical plaintext blocks produce different ciphertext blocks, making it{" "}
            <span className="text-primary font-semibold">much more secure</span>.
          </p>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-xs italic">
            Try encrypting an image with patterns or repeated elements to see the
            difference clearly. The ECB mode will preserve these patterns, while CBC
            will produce completely random-looking output.
          </p>
        </div>
      </div>
    </div>
  );
};
