from flask import Flask, request, jsonify, send_from_directory
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Random import get_random_bytes
from PIL import Image
import numpy as np
import os
import uuid

app = Flask(__name__)
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'backend', 'uploads')
PROCESSED_FOLDER = os.path.join(os.getcwd(), 'backend', 'processed')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

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

@app.route('/process', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    image = request.files['image']
    unique_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_FOLDER, f"{unique_id}_input.png")
    image.save(input_path)
    
    # Load image
    orig_bytes, size = load_image_rgb_bytes(input_path)
    
    # Generate AES key (128-bit)
    key = get_random_bytes(16)
    
    # ECB Mode
    ecb_ct, _ = aes_encrypt(orig_bytes, key, AES.MODE_ECB)
    ecb_encrypted_path = os.path.join(PROCESSED_FOLDER, f"{unique_id}_encrypted_ecb.png")
    save_bytes_as_image(ecb_ct[:len(orig_bytes)], size, ecb_encrypted_path)
    
    ecb_decrypted = aes_decrypt(ecb_ct, key, AES.MODE_ECB)
    ecb_decrypted_path = os.path.join(PROCESSED_FOLDER, f"{unique_id}_decrypted_ecb.png")
    save_bytes_as_image(ecb_decrypted, size, ecb_decrypted_path)
    
    # CBC Mode
    cbc_ct, iv = aes_encrypt(orig_bytes, key, AES.MODE_CBC)
    cbc_encrypted_path = os.path.join(PROCESSED_FOLDER, f"{unique_id}_encrypted_cbc.png")
    save_bytes_as_image(cbc_ct[:len(orig_bytes)], size, cbc_encrypted_path)
    
    cbc_decrypted = aes_decrypt(cbc_ct, key, AES.MODE_CBC, iv)
    cbc_decrypted_path = os.path.join(PROCESSED_FOLDER, f"{unique_id}_decrypted_cbc.png")
    save_bytes_as_image(cbc_decrypted, size, cbc_decrypted_path)
    
    return jsonify({
        'id': unique_id,
        'original': f'/uploads/{unique_id}_input.png',
        'ecb_encrypted': f'/processed/{unique_id}_encrypted_ecb.png',
        'ecb_decrypted': f'/processed/{unique_id}_decrypted_ecb.png',
        'cbc_encrypted': f'/processed/{unique_id}_encrypted_cbc.png',
        'cbc_decrypted': f'/processed/{unique_id}_decrypted_cbc.png'
    })

@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/processed/<path:filename>')
def processed_file(filename):
    return send_from_directory(PROCESSED_FOLDER, filename)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
