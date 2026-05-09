import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY || "dryxo-secret-key-2024";

const useLocalStorage = () => {
  
  const encrypt = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  };

  const decrypt = (encryptedData) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("Decryption error:", error);
      return null;
    }
  };

  const setItem = (key, value) => {
    const encryptedValue = encrypt(value);
    localStorage.setItem(key, encryptedValue);
  };

  const getItem = (key) => {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) return null;
    return decrypt(encryptedValue);
  };

  const removeItem = (key) => {
    localStorage.removeItem(key);
  };

  const clear = () => {
    localStorage.clear();
  };

  return { setItem, getItem, removeItem, clear };
};

export default useLocalStorage;
