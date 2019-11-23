import React from 'react'
import Mon from '../src/pokemonItem.jsx'

function PokemonList(props) {
  let pokemon = props.pokemon
  //console.log(pokemon)

  const list = pokemon.map((mon) => (
    <Mon mon={mon} handleClick={props.handleClick} />
  ))

  return <div>{list}</div>
}

export default PokemonList
