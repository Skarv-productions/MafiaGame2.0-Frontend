import React, { Component } from "react";
import StartPage from "./components/StartPage";
import GameLobby from "./components/GameLobby";
import AdminPanel from "./components/AdminPanel";
import ShowRole from "./components/ShowRole";
import NightMode from "./components/NightMode";
import NormalMafia from "./components/NormalMafia";
import MafiaBoss from "./components/MafiaBoss";
import MafiaKilled from "./components/MafiaKilled";
import DoctorNight from "./components/DoctorNight";
import DoctorSaved from "./components/DoctorSaved";
import SheriffNight from "./components/SheriffNight";
import SheriffChecked from "./components/SheriffChecked";
import NightReport from "./components/NightReport";
import AdminVote from "./components/AdminVote";

import "./App.css";

class App extends Component {
  state = {
    page: "StartPage",
    playerList: [
      { name: "Matt", role: "farmer", status: "alive" },
      { name: "Mark", role: "farmer", status: "alive" },
      { name: "Luke", role: "farmer", status: "alive" },
      { name: "John", role: "farmer", status: "dead" },
      { name: "Micke", role: "mafia", status: "alive" }
    ],
    game: {
      id: 1,
      code: "ABCD"
    },
    mafiaChose: "",
    doctorChose: "",
    sheriffChose: ""
  };

  changePage = page => {
    this.setState({ page: page });
  };

  isAlive = player => {
    return player.status === "alive";
  };

  mafiaMark = player => {
    this.setState({ mafiaChose: player.name });
  };

  doctorMark = player => {
    this.setState({ doctorChose: player.name });
  };

  sheriffCheck = player => {
    this.setState({ sheriffChose: player.name });
  };

  createGame = name => {
    const newPlayer = { name: name, role: "", status: "alive" };

    this.setState(prevState => {
      let newList = prevState.playerList;
      newList.push(newPlayer);
      return { playerList: newList };
    });
  };

  kill = name => {
    this.setState(prevState => ({
      playerList: prevState.playerList.map(player =>
        player.name === name
          ? Object.assign(player, { status: "dead" })
          : player
      )
    }));
    console.log("You voted to kill", name);
  };

  render() {
    switch (this.state.page) {
      case "StartPage":
        return <StartPage createGame={this.createGame} />;

      case "GameLobby":
        return (
          <GameLobby
            changePage={this.changePage}
            players={this.state.playerList
              .filter(this.isAlive)
              .filter(this.isAlive)}
          />
        );

      case "AdminPanel":
        return (
          <React.Fragment>
            <GameLobby
              changePage={this.changePage}
              players={this.state.playerList.filter(this.isAlive)}
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
        return (
          <MafiaBoss
            players={this.state.playerList.filter(this.isAlive)}
            mafiaMark={this.mafiaMark}
          />
        );

      case "MafiaKilled":
        return <MafiaKilled mafiaChose={this.state.mafiaChose} />;

      case "DoctorNight":
        return (
          <DoctorNight
            players={this.state.playerList.filter(this.isAlive)}
            doctorMark={this.doctorMark}
          />
        );

      case "DoctorSaved":
        return <DoctorSaved doctorChose={this.state.doctorChose} />;

      case "SheriffNight":
        return (
          <SheriffNight
            players={this.state.playerList.filter(this.isAlive)}
            sheriffCheck={this.sheriffCheck}
          />
        );

      case "SheriffChecked":
        return (
          <SheriffChecked
            sheriffChose={this.state.sheriffChose}
            players={this.state.playerList.filter(this.isAlive)}
          />
        );

      case "NightReport":
        return (
          <NightReport
            mafiaChose={this.state.mafiaChose}
            doctorChose={this.state.doctorChose}
          />
        );

      case "AdminVote":
        return (
          <AdminVote
            players={this.state.playerList.filter(this.isAlive)}
            onKill={this.kill}
          />
        );
    }
  }
}

export default App;
