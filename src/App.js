import React, { Component } from "react";
import StartPage from "./components/StartPage";
import GameLobby from "./components/GameLobby";
import AdminPanel from "./components/AdminPanel";
import ShowRole from "./components/ShowRole";
import NightMode from "./components/NightMode";
import NormalMafia from "./components/NormalMafia";
import MafiaBoss from "./components/MafiaBoss";
import MafiaKilled from "./components/MafiaKilled";

import "./App.css";

class App extends Component {
  state = {
    page: "StartPage",
    playerList: ["Matt", "Mark", "Luke", "John"],
    mafiaChose: "Micke"
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

      case "NightMode":
        return <NightMode />;

      case "NormalMafia":
        return <NormalMafia mafiaBoss="Marvin" />;

      case "MafiaBoss":
        return <MafiaBoss players={this.state.playerList} />;

      case "MafiaKilled":
        return <MafiaKilled mafiaChose={this.state.mafiaChose} />;
    }
  }
}

export default App;
