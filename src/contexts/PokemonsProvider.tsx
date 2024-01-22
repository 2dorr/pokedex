import { PropsWithChildren, useReducer } from "react";
import { PokemonsContext, initialState, pokemonsReducer } from "./PokemonsContext";

export const PokemonsProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [state, dispatch] = useReducer(pokemonsReducer, initialState);

  return (
    <PokemonsContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonsContext.Provider>
  );
};