import { graphQL } from '../index';

type TFetchPokemonApi = {
  limit: number;
  offset: number;
  filter: {
    typeIds: number[];
    generationIds: number[];
  };
};
export const fetchPokemonsApi = async (
  props: TFetchPokemonApi
): Promise<any> => {
  try {
    const { limit, offset, filter } = props;

    const query = `
    query {
      species: pokemon_v2_pokemonspecies(
        limit: ${limit},
        offset: ${offset},
        order_by: {id: asc},
        where: {
          pokemon_v2_pokemons: {
            pokemon_v2_pokemontypes: {
              pokemon_v2_type: {
                id: {
                  ${
                    filter.typeIds.length > 0
                      ? `_in: [${filter.typeIds.join(',')}]`
                      : ''
                  }
                }
              }
            }
          },
          pokemon_v2_generation: {
            id: {
              ${
                filter.generationIds.length > 0
                  ? `_in: [${filter.generationIds.join(',')}]`
                  : ''
              }
            }
          }
        }
      ) {
        name
        id
        pokemons: pokemon_v2_pokemons {
          types: pokemon_v2_pokemontypes {
            type: pokemon_v2_type {
              id
              name
            }
          }
        }
      }
    }
    `;

    const response = await graphQL(query);

    const data: any = (response.data?.data?.species || []).map(
      (item: any) => {
        const pokemon = item.pokemons[0];
        return {
          id: item.id,
          name: item.name,
          types: pokemon.types.map(({ type }: any) => ({
            id: type.id,
            name: type.name,
          })),
        };
      }
    );

    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getPokemonDetailApi = async (
  name: string
): Promise<any | null> => {
  try {
    const query = `
    query {
      species: pokemon_v2_pokemonspecies(limit: 1, where: {name: {_eq: "${name}"}}) {
        name
        id
        flavorText: pokemon_v2_pokemonspeciesflavortexts(where: {pokemon_v2_language: {name: {_eq: "en"}}}, limit: 1) {
          flavorText: flavor_text
        }
        pokemons: pokemon_v2_pokemons {
          name
          id
          weight
          height
          abilities: pokemon_v2_pokemonabilities {
            ability: pokemon_v2_ability {
              id
              name
              abilityText: pokemon_v2_abilityeffecttexts(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
                id
                shortEffect: short_effect
              }
            }
          }
          stats: pokemon_v2_pokemonstats {
            baseStat: base_stat
            stat: pokemon_v2_stat {
              name
              statName: pokemon_v2_statnames(where: {pokemon_v2_language: {name: {_eq: "en"}}}, limit: 1) {
                name
              }
            }
          }
          types:pokemon_v2_pokemontypes {
            type: pokemon_v2_type {
              id
              name
            }
          }
        }
        evolutions: pokemon_v2_evolutionchain {
          species: pokemon_v2_pokemonspecies {
            evolvesFromSpeciesId: evolves_from_species_id
            name
            id
            pokemons: pokemon_v2_pokemons {
              name
              id
              types:pokemon_v2_pokemontypes {
                type: pokemon_v2_type {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
    `;

    const response = await graphQL(query);
    const species = response.data?.data?.species[0] || null;

    if (species) {
      return Promise.resolve(species);
    } else {
      throw new Error('no pokemon');
    }
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const getPokemonsDetailApi = async (
  names: string[]
): Promise<any[]> => {
  try {
    const query = `
    query {
      species: pokemon_v2_pokemonspecies(where: {name: {_in: [${names.join(
        ','
      )}]}}) {
        name
        id
        flavorText: pokemon_v2_pokemonspeciesflavortexts(where: {pokemon_v2_language: {name: {_eq: "en"}}}, limit: 1) {
          flavorText: flavor_text
        }
        pokemons: pokemon_v2_pokemons {
          name
          id
          weight
          height
          abilities: pokemon_v2_pokemonabilities {
            ability: pokemon_v2_ability {
              id
              name
              abilityText: pokemon_v2_abilityeffecttexts(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
                id
                shortEffect: short_effect
              }
            }
          }
          stats: pokemon_v2_pokemonstats {
            baseStat: base_stat
            stat: pokemon_v2_stat {
              name
              statName: pokemon_v2_statnames(where: {pokemon_v2_language: {name: {_eq: "en"}}}, limit: 1) {
                name
              }
            }
          }
          types:pokemon_v2_pokemontypes {
            type: pokemon_v2_type {
              id
              name
            }
          }
        }
        evolutions: pokemon_v2_evolutionchain {
          species: pokemon_v2_pokemonspecies {
            evolvesFromSpeciesId: evolves_from_species_id
            name
            id
            pokemons: pokemon_v2_pokemons {
              name
              id
              types:pokemon_v2_pokemontypes {
                type: pokemon_v2_type {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
    `;

    const response = await graphQL(query);
    const speciesData = response.data?.data?.species || [];

    const data = speciesData.map((species: any) => species);
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};
