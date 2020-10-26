import CryptoJS from 'crypto-js';
export default {
  AES_KEY: 'rongdakeji__0826', // 秘钥
  encode(data){ // 加密

  var key = CryptoJS.enc.Utf8.parse(this.AES_KEY);
  let str = typeof data === 'string' ? data : JSON.stringify(data) 
  var encryptedData = CryptoJS.AES.encrypt(str, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encryptedData.toString();



  },
  decode(code){ //解密  
    var key = CryptoJS.enc.Utf8.parse(this.AES_KEY);
    var encryptedHexStr  = CryptoJS.enc.Base64.parse(code);
    var encryptedBase64Str  = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decryptedData  = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decryptedData.toString(CryptoJS.enc.Utf8);
  }
}