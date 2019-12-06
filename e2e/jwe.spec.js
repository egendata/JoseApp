const {JWE} = require('jose')
const {getProps} = require('detox-getprops')
const {jwe, keys, message} = require('./setup/jwe')
const assert = require('assert')

describe('JWE', () => {
  describe('Add Recipients', () => {
    beforeEach(async () => {
      await device.reloadReactNative()
      await expect(element(by.id('recipientsView'))).toBeVisible()
      await element(by.id('servicesInput')).replaceText(JSON.stringify(keys))
      await element(by.id('recipientsInput')).replaceText(JSON.stringify(jwe))
    })

    it('should not allow CV Search service to decrypt the JWE initially', async () => {
      const props = await getProps(element(by.id('recipientsInput')))
      const inputValue = props['AX.value']
      const newJwe = JSON.parse(inputValue)

      assert.equal(
        JWE.decrypt(newJwe, keys.owner.jwk).toString('utf8'),
        message,
      )
      assert.equal(JWE.decrypt(newJwe, keys.cv.jwk).toString('utf8'), message)
      assert.throws(JWE.decrypt.bind(JWE, newJwe, keys.cvSearch.jwk), {
        name: 'JWEDecryptionFailed',
        message: 'decryption operation failed',
      })
    })

    it('should allow CV Search service to decrypt the JWE when we add it to recipients', async () => {
      await element(by.id('addCvSearchRecipientBtn')).tap()

      const props = await getProps(element(by.id('recipientsInput')))
      const inputValue = props['AX.value']
      const newJwe = JSON.parse(inputValue)

      assert.equal(
        JWE.decrypt(newJwe, keys.owner.jwk).toString('utf8'),
        message,
      )
      assert.equal(JWE.decrypt(newJwe, keys.cv.jwk).toString('utf8'), message)
      assert.equal(
        JWE.decrypt(newJwe, keys.cvSearch.jwk).toString('utf8'),
        message,
      )
    })
  })
})
