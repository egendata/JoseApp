import {addRecipient} from '@egendata/react-native-jose';

export const addCvSearchRecipient = async ({ jwe, keys }) => {
  const newJwe = await addRecipient(jwe, {...keys.owner}, {...keys.cvSearch});
  return newJwe;
};
