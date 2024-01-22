import { useCallback, useEffect, useState } from "react"
import { getPokemonByName } from "../service/pokenode"
import { Link, useParams } from "react-router-dom"
import { Pokemon } from "pokenode-ts"
import backArrow from '../assets/backArrow.svg'

export const PokemonItem = (): JSX.Element => {
  const { itemName } = useParams()
  const [notFound, setNotFound] = useState<boolean>(false)
  const [pokemon, setPokemon] = useState<Pokemon | undefined>()

  const getPokemon = useCallback(async (): Promise<void> => {
      const pokemon = await getPokemonByName(itemName || '')
      if (!pokemon) {
        setNotFound(true)
      } else {
        setPokemon(pokemon)
      }
  }, [itemName])

  useEffect(() => {
    getPokemon()
  }, [getPokemon])

  if (notFound) {
    return <h1 className="text-3xl font-extrabold text-center p-4">POKEMON NOT FOUND!</h1>
  }

  if (!pokemon) {
    return <h1 className="text-3xl font-extrabold text-center p-4">LOADING...</h1>
  }

  return (
    <section className="w-[100%] h-max bg-white text-slate-700 p-4">
      <Link to="/" className="flex items-center gap-x-2 text-slate-700 hover:text-slate-500">
        <img src={backArrow} className="w-8" alt="" />
        <span>Back</span>
      </Link>
      <h1 className="text-3xl text-center font-extrabold py-2 capitalize">{pokemon.name}</h1>
      <div className="flex p-4">
        <div className="ring-1 ring-gray-300">
          <img className="w-96" src={pokemon.sprites?.back_default || ""} alt="" />
        </div>
        <div className="ring-1 flex-1 ring-gray-300 p-2">
          <div className="p-2">Base Experience: <span className="font-bold">{pokemon.base_experience}</span></div>
          <div className="p-2">Height: <span className="font-bold">{pokemon.height}</span></div>
          <div className="p-2">Weight: <span className="font-bold">{pokemon.weight}</span></div>
          <div className="p-2">Abilities: <span className="font-bold">{pokemon.abilities.map(ability => ability.ability?.name || '').join(', ')}</span></div>
        </div>
      </div>
    </section>
  )


}