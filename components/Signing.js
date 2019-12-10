import React from 'react'
import {Text, StyleSheet, Button, View, TextInput, FlatList} from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import {createSign, verifySign} from '../services/signing'
const state = {
  keys: {publicJwk: {}},
  jws: null,
  claimsSet: {},
  verifiedPayload: {},
}
export default () => {
  const [value, setValue] = React.useState(state)

  return (
    <View testID="signingView">
      <Text style={styles.sectionDescription}>Keys:</Text>
      {/* <Text style={styles.title}>KID: {value.keys.publicJwk.kid}</Text> */}
      <TextInput
        testID="keysInput"
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => {
          try {
            state.keys = JSON.parse(text)
            setValue(state)
          } catch (ex) {
            console.log('bad JSON', ex)
          }
        }}
      />

      <Text style={styles.sectionDescription}>JWS</Text>
      <TextInput
        testID="jwsInput"
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        value={value.jws}
        onChangeText={text => {
          state.jws = text
          setValue(Object.assign({}, {...state}))
        }}
      />

      <Text style={styles.sectionDescription}>Claims Set:</Text>

      <TextInput
        testID="claimsSetInput"
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        value={JSON.stringify(value.claimsSet)}
        onChangeText={text => {
          try {
            state.claimsSet = JSON.parse(text)
            setValue(Object.assign({}, {...state}))
          } catch (ex) {
            console.log('bad JSON', ex)
          }
        }}
      />

      <Text style={styles.sectionDescription}>Verified payload:</Text>
      <FlatList
        data={Object.keys(value.verifiedPayload)}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.title}>
              {item} : {value.verifiedPayload[item]}
            </Text>
          </View>
        )}
      />

      <TextInput
        testID="verifiedPayloadInput"
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        value={JSON.stringify(value.verifiedPayload)}
      />

      <Button
        title="Sign"
        testID="signBtn"
        onPress={async () => {
          state.jws = await createSign(value.claimsSet, value.keys, {
            jwk: value.keys.publicJwk,
            alg: 'PS256',
          })
          setValue(Object.assign({}, {...state}))
        }}
      />

      <Button
        title="Verify"
        testID="verifyBtn"
        onPress={async () => {
          const payload = await verifySign(value.jws, value.keys.publicJwk)
          if (payload) {
            state.verifiedPayload = payload
            setValue(Object.assign({}, {...state}))
          }
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 12,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})
