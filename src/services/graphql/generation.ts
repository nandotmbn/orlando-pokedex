import { graphQL } from '../index';

export const getAllGenerationsApi = async (): Promise<any[]> => {
  try {
    const query = `
    query {
      generations: pokemon_v2_generation(offset: 0) {
        id
        name
        names: pokemon_v2_generationnames(limit: 1, where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
          name
        }
      }
    }
    `;
    const response = await graphQL(query);

    const data = (response.data?.data?.generations || []).map(
      ({ id, name, names }: any) => ({ id, name: names[0]?.name || name })
    );

    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};
