import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./SegaFont.css";

// This allows "App" to be use in typical React fashion
class App extends Component {
  // constructor allows you to use super()
  constructor() {
    // super() allows you to use "this"
    super();
    // "this.state" allows you to update
    // the version below sets robots to an empty array
    // and searchfield to an empty string
    this.state = {
      robots: [],
      searchfield: ""
    };
  }
  // "componentDidMount()" is part of React and excutes after "render()"
  componentDidMount() {
    // here we are telling it after "render()" compiled successfully fetch this API data
    fetch("https://jsonplaceholder.typicode.com/users")
      // then take the data and put into readable json
      .then(response => response.json())
      // then from the json file set it up that the state of "robots" is change from empty array to the readable json file we just got
      .then(users => this.setState({ robots: users }));
  }

  // this is a function meant to look at the searchbox for activity
  // and if an event occurs
  onSearchChange = event => {
    // it updates "searchfield" with whatever was typed in the searchbox
    this.setState({ searchfield: event.target.value });
  };
  render() {
    const { robots, searchfield } = this.state;
    // filterRobots is function that checks the "searchfield" against the robots name in the API file we converted into readable json
    const filteredRobots = robots.filter(robot => {
      // updates this.state.robots with a filter that has the names from the API
      return (
        robot.name
          // makes it lowercase
          .toLocaleLowerCase()
          // and checks it against what is in "this.state.searchfield" which is set to update with whatever alpahnumeric sympol is typed in a row
          .includes(searchfield.toLocaleLowerCase())
      );
    });

    // makes a simple text reading "loading" if "robots" array is empty
    // should only occur if there is a problem reaching API
    return !robots.length ? (
      <h1 className="tc">Loading</h1>
    ) : (
      // otherwise it will render the div as is
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}
export default App;
