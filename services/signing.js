import {sign, verify} from '@egendata/react-native-jose';

// TODO: When we update the sign method in @egendata/react-native-jose we can send the pem and delete this function
function pem2der(key) {
  return key
    .replace(/(?:\r\n|\r|\n)/g, '')
    .replace('-----BEGIN RSA PRIVATE KEY-----', '')
    .replace('-----END RSA PRIVATE KEY-----', '')
    .replace('-----BEGIN RSA PUBLIC KEY-----', '')
    .replace('-----END RSA PUBLIC KEY-----', '')
}

export const createSign = async (claimsSet, keys, header) => {
  return sign(claimsSet, {
    jwk: keys.privateJwk,
    der: pem2der(keys.privateKey)
  }, header)
}

export const verifySign = async (token, jwk) => {
  return verify(token, jwk)
}