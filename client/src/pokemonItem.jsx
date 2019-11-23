import React from 'react'

function Mon(props) {
  //   console.log('Mon function:')
  //   console.log(props)
  let pokemon = props.mon

  return <ul onClick={(e) => props.handleClick(pokemon)}>{pokemon.name}</ul>
}

export default Mon
