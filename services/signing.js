import {sign, verify} from '@egendata/react-native-jose';

export const createSign = async (claimsSet, keys, header) => {
  return sign(claimsSet, {
    jwk: keys.privateJwk,
    pem: keys.privateKey
  }, header)
}

export const verifySign = async (token, jwk) => {
  return verify(token, jwk)
}