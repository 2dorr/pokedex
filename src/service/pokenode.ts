import { Pokemon, PokemonClient, Type } from 'pokenode-ts';


// Went a bit off trail, initialy loading the list of pokemons using the list endpoint
// but then found the type endpoint which seems more appropriate for the task at hand
// so i went on to initially load the list of types with a default value and started filtering on it


// export async function getPokemons(filter: string = ''): Promise<NamedAPIResource[]> {
//   const api = new PokemonClient();

//   try {
//     const pokemons = await api.listPokemons(undefined, 100);
//     const result = pokemons?.results || [];
//     const [isFilterError, filteredPokemons] = getFilteredPokemons(pokemons?.results || [], filter);
//     if (isFilterError) {
//       return result;
//     } 
//     return filteredPokemons
//   } catch (e) {
//     console.error(e);
//   }

//   return []
// }

export async function getPokemonByName(name: string): Promise<Pokemon | undefined> {
  const api = new PokemonClient();

  try {
    const pokemon = await api.getPokemonByName(name);
    return pokemon;
  } catch (e) {
    console.error(e);
  }
}

export async function getPokemonTypes(): Promise<string[]> {
  const api = new PokemonClient();

  try {
    const types = await api.listTypes();
    return (types?.results || []).map((type) => type.name);
  } catch (e) {
    console.error(e);
  }

  return []
}

export async function getTypeByName(name: string): Promise<Type | undefined> {
  const api = new PokemonClient();

  try {
    const type = await api.getTypeByName(name);
    return type;
  } catch (e) {
    console.error(e);
  }
}