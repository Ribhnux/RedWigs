import { createTypeDefsFromDatabase } from './schema-builder';

export const schemaInitialization = async () => {
  try {
    global['graphqlSchema'] = await createTypeDefsFromDatabase();
  } catch (err) {
    console.error(err);
  }
};
