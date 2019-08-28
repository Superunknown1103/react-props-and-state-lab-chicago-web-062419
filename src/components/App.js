import React from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
      
    }
  }

  onChangeFilter = (type) => {
    this.setState({ filters: { type } });
    console.log(this.state.filters.type)
  };

  fetchPets = () => {
    let queryParam = this.state.filters.type !== 'all' ?  '?type=' + this.state.filters.type : '';
    let fetchURL = `/api/pets${queryParam}`;
    fetch(fetchURL)
    .then(res => res.json())
    .then(pets => this.setState({ pets }));
  }

  adoptOne = (id) => {
   let newPetState = this.state.pets.map(p => p.id == id ? p.isAdopted = true : p)
    this.setState({
      pets: newPetState
    });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.fetchPets} onChangeType={this.onChangeFilter}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptOne} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
