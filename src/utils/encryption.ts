// Convert string key to proper format for Web Crypto API
const prepareKey = async (keyString: string): Promise<CryptoKey> => {
  // Ensure key is exactly 16, 24, or 32 bytes
  const validLengths = [16, 24, 32];
  let keyLength = validLengths.find(len => len >= keyString.length) || 32;
  
  const keyData = new TextEncoder().encode(keyString.padEnd(keyLength, '0'));
  
  return await crypto.subtle.importKey(
    'raw',
    keyData.slice(0, keyLength),
    { name: 'AES-CBC' },
    false,
    ['encrypt', 'decrypt']
  );
};

// Simulate ECB mode (Web Crypto doesn't support ECB, so we simulate it)
export const encryptImageECB = async (
  imageData: ImageData,
  keyString: string
): Promise<ImageData> => {
  const blockSize = 16; // AES block size
  const data = new Uint8Array(imageData.data);
  const key = await prepareKey(keyString);
  
  // Process each block independently (simulating ECB)
  const encryptedData = new Uint8Array(data.length);
  
  for (let i = 0; i < data.length; i += blockSize) {
    const block = data.slice(i, Math.min(i + blockSize, data.length));
    
    // Pad the last block if necessary
    const paddedBlock = new Uint8Array(blockSize);
    paddedBlock.set(block);
    
    try {
      // Each block encrypted independently with same IV (simulating ECB behavior)
      const iv = new Uint8Array(16); // Zero IV for ECB simulation
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-CBC', iv },
        key,
        paddedBlock
      );
      
      const encryptedArray = new Uint8Array(encrypted);
      encryptedData.set(encryptedArray.slice(0, block.length), i);
    } catch (error) {
      console.error('Encryption error:', error);
    }
  }
  
  const result = new ImageData(
    new Uint8ClampedArray(encryptedData),
    imageData.width,
    imageData.height
  );
  
  return result;
};

// Encrypt image using CBC mode
export const encryptImageCBC = async (
  imageData: ImageData,
  keyString: string
): Promise<{ encryptedData: ImageData; iv: Uint8Array }> => {
  const data = new Uint8Array(imageData.data);
  const key = await prepareKey(keyString);
  
  // Generate random IV for CBC mode
  const iv = crypto.getRandomValues(new Uint8Array(16));
  
  try {
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-CBC', iv },
      key,
      data
    );
    
    const encryptedArray = new Uint8Array(encrypted);
    const result = new ImageData(
      new Uint8ClampedArray(encryptedArray.slice(0, data.length)),
      imageData.width,
      imageData.height
    );
    
    return { encryptedData: result, iv };
  } catch (error) {
    console.error('CBC Encryption error:', error);
    throw error;
  }
};

// Decrypt CBC encrypted image
export const decryptImageCBC = async (
  encryptedData: ImageData,
  keyString: string,
  iv: Uint8Array
): Promise<ImageData> => {
  const data = new Uint8Array(encryptedData.data);
  const key = await prepareKey(keyString);
  
  try {
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv },
      key,
      data
    );
    
    const decryptedArray = new Uint8Array(decrypted);
    const result = new ImageData(
      new Uint8ClampedArray(decryptedArray.slice(0, data.length)),
      encryptedData.width,
      encryptedData.height
    );
    
    return result;
  } catch (error) {
    console.error('Decryption error:', error);
    throw error;
  }
};

// Decrypt ECB encrypted image
export const decryptImageECB = async (
  encryptedData: ImageData,
  keyString: string
): Promise<ImageData> => {
  const blockSize = 16;
  const data = new Uint8Array(encryptedData.data);
  const key = await prepareKey(keyString);
  
  const decryptedData = new Uint8Array(data.length);
  
  for (let i = 0; i < data.length; i += blockSize) {
    const block = data.slice(i, Math.min(i + blockSize, data.length));
    const paddedBlock = new Uint8Array(blockSize);
    paddedBlock.set(block);
    
    try {
      const iv = new Uint8Array(16); // Zero IV for ECB simulation
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-CBC', iv },
        key,
        paddedBlock
      );
      
      const decryptedArray = new Uint8Array(decrypted);
      decryptedData.set(decryptedArray.slice(0, block.length), i);
    } catch (error) {
      console.error('Decryption error:', error);
    }
  }
  
  const result = new ImageData(
    new Uint8ClampedArray(decryptedData),
    encryptedData.width,
    encryptedData.height
  );
  
  return result;
};
