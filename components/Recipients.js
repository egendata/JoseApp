import React from 'react';
import {
  Text,
  StyleSheet,
  Button,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {addCvSearchRecipient} from '../services/recipients';
let keys = {};
let jwe = {recipients: []};
export default () => {
  const [value, setValue] = React.useState({keys, jwe});

  function Item({item}) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>KID: {item.kid}</Text>
      </View>
    );
  }

  return (
    <View testID="recipientsView">
      <Text style={styles.sectionDescription}>Keys:</Text>
      <FlatList
        data={Object.values(value.keys)}
        renderItem={({item}) => <Item item={item.jwk} />}
        keyExtractor={item => item.jwk.kid}
      />
      <TextInput
        testID="servicesInput"
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        value={JSON.stringify(value.keys)}
        onChangeText={text => {
          try {
            const newKeys = JSON.parse(text);
            keys = newKeys;
            setValue({keys, jwe});
          } catch (ex) {
            console.log('bad JSON');
          }
        }}
      />
      <Text style={styles.sectionDescription}>JWE:</Text>
      <FlatList
        testID="recipientsList"
        data={Object.values(value.jwe.recipients)}
        renderItem={({item}) => <Item item={item.header} />}
        keyExtractor={item => item.header.kid}
      />
      <TextInput
        testID="recipientsInput"
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        value={JSON.stringify(value.jwe)}
        onChangeText={text => {
          try {
            const newJwe = JSON.parse(text);
            jwe = newJwe;
            setValue({keys, jwe});
          } catch (ex) {
            console.log('bad JSON');
          }
        }}
      />
      <Button
        title="Add CV Search to recipients"
        testID="addCvSearchRecipientBtn"
        onPress={async () => {
          setValue({keys, jwe: await addCvSearchRecipient({ keys, jwe })});
        }}
      />
    </View>
  );
};

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
});
