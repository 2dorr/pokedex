import { NamedAPIResource, Type } from "pokenode-ts";

export function getPokemonSpriteUrl(pokemonUrl: string = ''): string {
  const pokemonId = pokemonUrl.split("/")?.[6];
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
}

export function getFilteredPokemons(pokemons: NamedAPIResource[], filter: string): [boolean, NamedAPIResource[]] {
  if (filter.length < 3) {
    return [true, []]
  }
  
  return [false, pokemons.filter((pokemon) => pokemon.name.includes(filter))];
}

export function getPokemonsFromType(type?: Type): NamedAPIResource[] {
  return type?.pokemon?.map((pokemon) => pokemon.pokemon) || [];
}