import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css'


//primero en cargar
class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  //tercero en cargar
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (response.status === 404) {
          throw new Error("Could not loading!");
        }
        return response.json();
      })
      .then((users) => {
        this.setState({ robots: users });
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  //segundo en cargar
  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name
        .toLocaleLowerCase()
        .includes(searchfield.toLocaleLowerCase());
    });
    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f2">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
				<ErrorBoundry>

          <CardList robots={filteredRobots} />
				</ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
