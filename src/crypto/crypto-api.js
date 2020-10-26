import Vue from 'vue'
import CryptoJS from 'crypto-js'

//第一个参数word是待加密或者解密的字符串，第二个参数keyStr是aes加密需要用到的16位字符串的key。
export default {//加密
    encrypt(word, keyStr){
        keyStr = keyStr ? keyStr : 'abcdeASDcdefg123';
        var key  = CryptoJS.enc.Utf8.parse(keyStr);//
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return encrypted.toString();
    },
    //解密
    decrypt(word, keyStr){
        keyStr = keyStr ? keyStr : 'abcdeASDcdefg123';
        var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
        var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }

    // var a = Crypto.encrypt(this.user_name,"faFSDFfjoiajefp2");  //加密
    // var b = Crypto.decrypt(a,"faFSDFfjoiajefp2");  //解密

}
