import React, { Component } from "react";
import StartPage from "./components/StartPage";
import GameLobby from "./components/GameLobby";
import "./App.css";

class App extends Component {
  state = {
    page: "StartPage"
  };

  changePage = page => {
    this.setState({ page: page });
  };

  render() {
    switch (this.state.page) {
      case "StartPage":
        return <StartPage changePage={this.changePage} />;

      case "GameLobby":
        return <GameLobby changePage={this.changePage} />;
    }
  }
}

export default App;
