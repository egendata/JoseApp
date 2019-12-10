const {generateKeyPairSync} = require('crypto')
const {JWK} = require('jose')

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
  const jwk = JWK.asKey(privateKey, {use: 'sig'}).toJWK(true)
  const jwkKey = JWK.asKey({
    ...jwk,
    kid: `${jwks}/${jwk.kid}`,
  })

  return {
    privateJwk: jwkKey.toJWK(true),
    publicJwk: jwkKey
  }
}

const ownerKey = generateKey()

export const keys = {
  ...asJwk(ownerKey.privateKey, 'egendata://jwks'),
  ...ownerKey,
}
