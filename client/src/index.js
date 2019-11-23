import React from 'react'
import ReactDOM from 'react-dom'
import PokemonList from '../src/pokemonList.jsx'
const axios = require('axios')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pokemon: [
        { name: 'oddish', description: 'smelly' },
        { name: 'charmander', description: 'hot' },
        { name: 'hitmonchan', description: 'punch' }
      ],
      examine: { name: 'hitmonchan', description: 'punch' },
      nameForm: '',
      descriptionForm: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDescChange = this.handleDescChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDestroy = this.handleDestroy.bind(this)
  }

  //axios calls

  //this won't work until i start storing ids for all pokemon in state.
  //add this next
  deletePokemon(id) {
    console.log(id)
    return axios({
      method: 'post',
      url: '/gluefactory',
      data: { id: id }
    })
  }

  getPokemon() {
    return axios({
      method: 'get',
      url: '/pokemon'
    })
  }

  sendPokemon(pokemon) {
    axios({
      method: 'post',
      url: '/pokemon',
      data: pokemon
    })
      .then(function(response) {
        console.log('post /pokemon success')
        console.log(response)
      })
      .catch(function(error) {
        console.log('post /pokemon error')
        console.log(error)
      })
  }

  //handlers

  handleClick(mon) {
    this.setState({ examine: { name: mon.name, description: mon.description } })
    this.render()
  }

  handleNameChange(e) {
    this.setState({ nameForm: e.target.value })
  }

  handleDescChange(e) {
    this.setState({ descriptionForm: e.target.value })
  }

  //this needs more. I still have to have the server send back
  //the id that the db assigns to the new pokemon
  handleSubmit(event) {
    event.preventDefault()
    let newList = this.state.pokemon
    newList.push({
      name: this.state.nameForm,
      description: this.state.descriptionForm
    })
    this.setState({ pokemon: newList })
    this.sendPokemon({
      name: this.state.nameForm,
      description: this.state.descriptionForm
    })
  }

  handleDestroy(event) {
    event.preventDefault()
    // this.setState({ examine: 'X' })
    this.deletePokemon(this.state.examine).then(() => {
      this.setState({ examine: '' })
      this.render()
    })
  }

  //lifecycle

  componentDidMount() {
    this.getPokemon()
      .then((payload) => {
        console.log(payload.data)
        this.setState({ pokemon: payload.data })
        this.render()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <h1>pokemon farm</h1>
        <h3>Buy more pokemon</h3>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={this.state.nameForm}
              onChange={this.handleNameChange}
            />
            Description:
            <input
              type="text"
              name="description"
              value={this.state.descriptionForm}
              onChange={this.handleDescChange}
            />
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </form>
        <div>
          <h1>
            {`examine: ` +
              this.state.examine.name +
              ' = ' +
              this.state.examine.description}
          </h1>
          <input
            type="submit"
            value={'Destroy ' + this.state.examine.name + '?'}
            onClick={this.handleDestroy}
          />
        </div>
        <h1>List of Pokemon:</h1>
        <PokemonList
          pokemon={this.state.pokemon}
          handleClick={this.handleClick}
        />
      </div>
    )
  }
}

var mountNode = document.getElementById('app')
ReactDOM.render(<App />, mountNode)

export default App
