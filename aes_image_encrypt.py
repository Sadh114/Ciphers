from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Random import get_random_bytes
from PIL import Image
import numpy as np
import os

AES_BLOCK = AES.block_size  # 16 bytes

# 1. Load image and convert to RGB bytes
def load_image_rgb_bytes(path):
    img = Image.open(path).convert('RGB')
    width, height = img.size
    return img.tobytes(), (width, height)

# 2. Convert bytes back to image
def save_bytes_as_image(byte_data, size, out_path):
    width, height = size
    arr = np.frombuffer(byte_data, dtype=np.uint8)
    arr = arr.reshape((height, width, 3))
    Image.fromarray(arr).save(out_path)

# 3. AES Encryption
def aes_encrypt(data_bytes, key, mode):
    if mode == AES.MODE_CBC:
        iv = get_random_bytes(AES_BLOCK)
        cipher = AES.new(key, AES.MODE_CBC, iv)
        ct = cipher.encrypt(pad(data_bytes, AES_BLOCK))
        return ct, iv
    elif mode == AES.MODE_ECB:
        cipher = AES.new(key, AES.MODE_ECB)
        ct = cipher.encrypt(pad(data_bytes, AES_BLOCK))
        return ct, None
    else:
        raise ValueError("Unsupported mode")

# 4. AES Decryption
def aes_decrypt(ct_bytes, key, mode, iv=None):
    if mode == AES.MODE_CBC:
        cipher = AES.new(key, AES.MODE_CBC, iv)
    else:
        cipher = AES.new(key, AES.MODE_ECB)
    pt_padded = cipher.decrypt(ct_bytes)
    pt = unpad(pt_padded, AES_BLOCK)
    return pt

# 5. Main program
def main():
    input_path = "input.png"
    if not os.path.exists(input_path):
        print(f"Place your input image as {input_path} and re-run.")
        return

    # Load image
    orig_bytes, size = load_image_rgb_bytes(input_path)
    print(f"Loaded {input_path} — size {size[0]}x{size[1]}")

    # Generate AES key (128-bit)
    key = get_random_bytes(16)
    print("Random AES key generated.")

    # ECB Mode
    ecb_ct, _ = aes_encrypt(orig_bytes, key, AES.MODE_ECB)
    save_bytes_as_image(ecb_ct[:len(orig_bytes)], size, "encrypted_ecb.png")
    ecb_decrypted = aes_decrypt(ecb_ct, key, AES.MODE_ECB)
    save_bytes_as_image(ecb_decrypted, size, "decrypted_ecb.png")
    print("ECB encryption/decryption done.")

    # CBC Mode
    cbc_ct, iv = aes_encrypt(orig_bytes, key, AES.MODE_CBC)
    save_bytes_as_image(cbc_ct[:len(orig_bytes)], size, "encrypted_cbc.png")
    cbc_decrypted = aes_decrypt(cbc_ct, key, AES.MODE_CBC, iv)
    save_bytes_as_image(cbc_decrypted, size, "decrypted_cbc.png")
    print("CBC encryption/decryption done.")

    print("\nAll files created:")
    print(" - encrypted_ecb.png")
    print(" - decrypted_ecb.png")
    print(" - encrypted_cbc.png")
    print(" - decrypted_cbc.png")
    print("Open encrypted images to see difference: ECB shows patterns, CBC looks random.")

if __name__ == "__main__":
    main()
