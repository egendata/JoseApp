import {addRecipient} from '@egendata/react-native-jose';

export const addCvSearchRecipient = async ({ jwe, keys }) => {
  const newJwe = await addRecipient(jwe, {
    jwk: keys.owner.privateJwk,
    pem: keys.owner.privateKey
  }, {
    jwk: keys.cvSearch.publicJwk,
    pem: keys.cvSearch.publicKey
  });
  return newJwe;
};