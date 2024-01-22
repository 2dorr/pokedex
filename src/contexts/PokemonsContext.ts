
import { NamedAPIResource } from 'pokenode-ts';
import { createContext, useContext } from 'react';
import { BaseAction } from '../types/action';

const DEFAULT_TYPE = 'normal'

export const SET_POKEMONS = 'SET_POKEMONS';
export const SET_POKEMON_FILTER = 'SET_POKEMON_FILTER';
export const SET_POKEMON_TYPES = 'SET_POKEMON_TYPES';
export const SET_POKEMON_SELECTED_TYPE = 'SET_POKEMON_SELECTED_TYPE';

interface PokemonState {
  items: NamedAPIResource[]
  types: string[]
  filter: string
  selectedType: string
}

export interface SetPokemonsAction extends BaseAction<typeof SET_POKEMONS> {
  payload: NamedAPIResource[];
}

export interface SetPokemonFilterAction extends BaseAction<typeof SET_POKEMON_FILTER> {
  payload: string;
}

export interface SetPokemonTypesAction extends BaseAction<typeof SET_POKEMON_TYPES> {
  payload: string[];
}

export interface SetPokemonSelectedTypeAction extends BaseAction<typeof SET_POKEMON_SELECTED_TYPE> {
  payload: string;
}

export type PokemonActions = SetPokemonsAction | SetPokemonFilterAction | SetPokemonTypesAction | SetPokemonSelectedTypeAction;

export const PokemonsContext = createContext<{state: PokemonState, dispatch: React.Dispatch<PokemonActions>} | null>(null);

export const initialState = {
  items: [],
  selectedType: DEFAULT_TYPE,
  filter: '',
  types: [],
};

export const pokemonsReducer = (state: PokemonState = initialState, action: PokemonActions) => {
  switch (action.type) {
    case SET_POKEMONS:
      return { ...state, items: action.payload };
    case SET_POKEMON_FILTER:
      return { ...state, filter: action.payload };
    case SET_POKEMON_TYPES:
      return { ...state, types: action.payload }
    case SET_POKEMON_SELECTED_TYPE:
      return { ...state, selectedType: action.payload }
    default:
      return state;
  }
};

export const usePokemonsContext = () => {
  const context = useContext(PokemonsContext);
  if (!context) {
    throw new Error('usePokedotsContext must be used within an PokedotsProvider');
  }
  return context;
};

