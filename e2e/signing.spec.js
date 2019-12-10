const {JWS} = require('jose')
const {getProps} = require('detox-getprops')
const {keys} = require('./setup/signing')
const assert = require('assert')

describe('Signing and Verifying', () => {
  let claimsSet
  beforeEach(async () => {
    claimsSet = {herp: 'derp'}
    await device.reloadReactNative()
    await expect(element(by.id('navigate-signing-btn'))).toBeVisible()
    await element(by.id('navigate-signing-btn')).tap()
    await expect(element(by.id('signingView'))).toBeVisible()
    await element(by.id('keysInput')).replaceText(JSON.stringify(keys))
    await element(by.id('claimsSetInput')).replaceText(
      JSON.stringify(claimsSet),
    )
  })

  it('gets a JWS when it signs', async () => {
    await element(by.id('signBtn')).tap()
    const props = await getProps(element(by.id('jwsInput')))
    const jws = props['AX.value'] || props['text']
    assert.deepStrictEqual(JWS.verify(jws, keys.publicJwk), claimsSet)
  })

  it('verifies a signature', async () => {
    claimSet = { foo: 'bar' }
    const jws = JWS.sign(claimsSet, keys.privateJwk)
    await element(by.id('jwsInput')).replaceText(jws)
    await element(by.id('verifyBtn')).tap()

    const props = await getProps(element(by.id('verifiedPayloadInput')))
    const verifiedPayloadInput = props['AX.value'] || props['text']
    const verifiedPayload = JSON.parse(verifiedPayloadInput.replace(/\\/g, ''))
    assert.deepStrictEqual(claimsSet, verifiedPayload)
  })

  it('signs and verifies the newly created signature', async () => {
    claimSet = { foo: 'bar', herp: 'derp' }
    await element(by.id('signBtn')).tap()
    await element(by.id('verifyBtn')).tap()
    const props = await getProps(element(by.id('verifiedPayloadInput')))
    const verifiedPayloadInput = props['AX.value'] || props['text']
    const verifiedPayload = JSON.parse(verifiedPayloadInput.replace(/\\/g, ''))
    assert.deepStrictEqual(claimsSet, verifiedPayload)
  })
})
