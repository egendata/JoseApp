const {generateKeyPairSync} = require('crypto')
const {JWE, JWK} = require('jose')

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
  })
}
const asJwk = (privateKey, jwks) => {
  const jwk = JWK.asKey(privateKey, {use: 'enc'}).toJWK(true)
  const jwkKey = JWK.asKey({
    ...jwk,
    kid: `${jwks}/${jwk.kid}`,
  })

  return {
    privateJwk: jwkKey.toJWK(true),
    publicJwk: jwkKey,
  }
}

const ownerKey = generateKey()
const cvKey = generateKey()
const cvSearchKey = generateKey()

export const keys = {
  owner: {
    ...asJwk(ownerKey.privateKey, 'egendata://jwks'),
    ...ownerKey,
  },
  cv: {
    ...asJwk(cvKey.privateKey, 'https://cvservice.com/jwks'),
    ...cvKey,
  },
  cvSearch: {
    ...asJwk(cvSearchKey.privateKey, 'https://cvsearchservice.org/jwks'),
    ...cvSearchKey,
  },
}

export const message = 'This is really secret'
const encryptor = new JWE.Encrypt(message)
encryptor.recipient(keys.owner.publicJwk, {kid: keys.owner.publicJwk.kid})
encryptor.recipient(keys.cv.publicJwk, {kid: keys.cv.publicJwk.kid})

export const jwe = encryptor.encrypt('general')
