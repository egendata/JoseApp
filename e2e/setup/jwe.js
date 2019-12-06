const {generateKeyPairSync} = require('crypto');
const {JWE, JWK} = require('jose');

const generateKey = () => {
  return generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });
};
const asJwk = (privateKey, jwks) => {
  const jwk = JWK.asKey(privateKey, {use: 'enc'}).toJWK(true);
  return JWK.asKey({
    ...jwk,
    kid: `${jwks}/${jwk.kid}`,
  });
};

const ownerKey = generateKey();
const cvKey = generateKey();
const cvSearchKey = generateKey();

export const keys = {
  owner: {
    jwk: asJwk(ownerKey.privateKey, 'egendata://jwks'),
    ...ownerKey,
  },
  cv: {
    jwk: asJwk(cvKey.privateKey, 'https://cvservice.com/jwks'),
    ...cvKey,
  },
  cvSearch: {
    jwk: asJwk(cvSearchKey.privateKey, 'https://cvsearchservice.org/jwks'),
    ...cvSearchKey,
  },
};
export const message = 'This is really secret';
const encryptor = new JWE.Encrypt(message);
encryptor.recipient(keys.owner.jwk, {kid: keys.owner.jwk.kid});
encryptor.recipient(keys.cv.jwk, {kid: keys.cv.jwk.kid});

export const jwe = encryptor.encrypt('general');
