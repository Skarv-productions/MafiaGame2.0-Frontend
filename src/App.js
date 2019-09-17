import React, { Component } from "react";
import StartPage from "./components/StartPage";
import GameLobby from "./components/GameLobby";
import AdminPanel from "./components/AdminPanel";
import ShowRole from "./components/ShowRole";
import "./App.css";

class App extends Component {
  state = {
    page: "StartPage",
    playerList: ["Matt", "Mark", "Luke", "John"]
  };

  changePage = page => {
    this.setState({ page: page });
  };

  render() {
    switch (this.state.page) {
      case "StartPage":
        return <StartPage changePage={this.changePage} />;

      case "GameLobby":
        return (
          <GameLobby
            changePage={this.changePage}
            players={this.state.playerList}
          />
        );

      case "AdminPanel":
        return (
          <React.Fragment>
            <GameLobby
              changePage={this.changePage}
              players={this.state.playerList}
            />
            <AdminPanel />
          </React.Fragment>
        );

      case "ShowRole":
        return <ShowRole role="mafia" />;
    }
  }
}

export default App;
