import classNames from "classnames"
import { useCallback, useEffect, useState } from "react"
import dropdownArrow from '../assets/dropdownArrow.svg'
import { getPokemonTypes, getTypeByName } from "../service/pokenode"
import { SET_POKEMONS, SET_POKEMON_FILTER, SET_POKEMON_SELECTED_TYPE, SET_POKEMON_TYPES, usePokemonsContext } from "../contexts/PokemonsContext"
import { getFilteredPokemons, getPokemonSpriteUrl, getPokemonsFromType } from "../businessLogic/pokemon"
import { Link } from "react-router-dom"

export const PokemonsSearch = (): JSX.Element => {
  const [shouldDisplayDropdown, setShouldDisplayDropdown] = useState<boolean>(false)
  const { state, dispatch } = usePokemonsContext()

  const setPokemons = useCallback(async (): Promise<void> => {
    const apiType = await getTypeByName(state.selectedType)
    const types = await getPokemonTypes()
    dispatch({ type: SET_POKEMON_TYPES, payload: types })

    // reload the results if user comes back to the page and previousle filtered it's dataset
    const pokemonsFromType = getPokemonsFromType(apiType)
    const [isFilterError, filteredPokemons] = getFilteredPokemons(pokemonsFromType, state.filter)
    if (isFilterError) {
      dispatch({ type: SET_POKEMONS, payload: pokemonsFromType })
    } else {
      dispatch({ type: SET_POKEMONS, payload: filteredPokemons })
    }
      
  }, [state.selectedType, state.filter, dispatch])
 
  useEffect(() => {
    setPokemons()
  }, [setPokemons])

  const toggleDropdown = (): void => {
    setShouldDisplayDropdown(!shouldDisplayDropdown)
  }

  const onChangeInputValue = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const value = e.target.value
    dispatch({ type: SET_POKEMON_FILTER, payload: value })

    // reload all the results if the user clears the input or if the filter length is invalid
    const [isFilterError, filteredPokemons] = getFilteredPokemons(state.items, value)
    if (isFilterError) {
      const type = await getTypeByName(state.selectedType)
      const pokemons = await getPokemonsFromType(type)
      dispatch({ type: SET_POKEMONS, payload: pokemons })
    } else {
      dispatch({ type: SET_POKEMONS, payload: filteredPokemons })
    }
  }

  const onClickType = async (type: string): Promise<void> => {
    dispatch({ type: SET_POKEMON_SELECTED_TYPE, payload: type })
    setShouldDisplayDropdown(false)
    const apiType = await getTypeByName(type)
    const pokemonsFromType = getPokemonsFromType(apiType)
    dispatch({ type: SET_POKEMONS, payload: pokemonsFromType })
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold py-2">Pokedex search</h1>
      <div className="flex">
        <input
          type="text"
          value={state.filter}
          onChange={onChangeInputValue}
          className="w-100 border border-gray-300 rounded p-2"
          placeholder="Search"
        />
        <div className="w-[30%] relative inline-block text-left">
          <div className="pl-8">
            <button type="button" onClick={toggleDropdown} className="flex w-full items-center justify-between rounded  px-3 py-4 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 " id="menu-button" aria-expanded="true" aria-haspopup="true">
              {state.selectedType || "See Options"}
              <img src={dropdownArrow} alt="" />
            </button>
          </div>
          <div className={classNames("absolute z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black bg-white ring-opacity-5 focus:outline-none", { invisible: !shouldDisplayDropdown })} role="menu">
            <div className="py-2 cursor-pointer" role="none">
              {state.types.map((type) => (
                <div key={type} onClick={(): void => { onClickType(type) }} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-50">{type}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="py-4">
          <div className="flex bg-gray-400 rounded shadow-md p-4">
            <div className="w-[33%] text-left font-bold">Avatar</div>
            <div className="w-[33%] text-left font-bold">Pokemon Name</div>
            <div className="w-[33%] text-left font-bold">Pokemon URL</div>
          </div>
        </div>
        {state.items.map((pokemon) => (
          <Link key={pokemon.name} to={pokemon.name}>
            <div className="py-4">
                <div className="flex items-center bg-white rounded shadow-md p-4 cursor-pointer hover:bg-gray-400">
                  <div className="w-[33%]">
                    <img src={getPokemonSpriteUrl(pokemon.url)} alt="" className="w-12" loading="lazy" />
                  </div>
                  <div className="w-[33%] text-left font-bold">{pokemon.name}</div>
                  <div className="w-[33%] text-left">{pokemon.url}</div>
                </div>
              </div>
          </Link>
        ))}
      </div>
    </div>
  )
}