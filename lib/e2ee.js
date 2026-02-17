// Create AES-256 key from password
async function getKey(password, salt) {
  const enc = new TextEncoder();

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}
// Encrypt TEXT message
export async function encryptText(text, password) {
  const enc = new TextEncoder();
  const data = enc.encode(text);

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const key = await getKey(password, salt);

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  return { encrypted, iv, salt };
}

// Decrypt TEXT message
export async function decryptText(obj, password) {
  const key = await getKey(password, obj.salt);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: obj.iv },
    key,
    obj.encrypted
  );

  const dec = new TextDecoder();
  return dec.decode(decrypted);
}
