import { graphQL } from '../index';

export const getAllTypesApi = async (): Promise<any[]> => {
  try {
    const query = `
    query {
      types: pokemon_v2_type(offset: 0) {
        name
        id
      }
    }
    `;

    const response = await graphQL(query);
    const data = (response.data?.data?.types || []).map(
      ({ id, name }: any) => ({ id, name })
    );
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};
