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
import RandomString from "random-string";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./App.css";

class App extends Component {
  state = {
    page: "StartPage",
    player: { name: "", role: "", status: "" },
    playerList: [
      { name: "Matt", role: "farmer", status: "alive" },
      { name: "Mark", role: "farmer", status: "alive" },
      { name: "Luke", role: "farmer", status: "alive" },
      { name: "John", role: "farmer", status: "dead" },
      { name: "Micke", role: "mafia", status: "alive" }
    ],
    game: {
      id: 0,
      code: ""
    },
    gameList: [
      { id: 1, code: "ABCD" },
      { id: 2, code: "QWER" },
      { id: 3, code: "ASDF" },
      { id: 4, code: "ZXCV" },
      { id: 5, code: "TYUI" },
      { id: 6, code: "GHJK" },
      { id: 7, code: "BNMM" },
      { id: 8, code: "JJJJ" }
    ],
    mafiaChose: "",
    doctorChose: "",
    sheriffChose: "",
    nameError: { active: false, text: "" },
    codeError: { active: false, text: "" }
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

  // When Create Game button is pressed
  createGame = name => {
    // Make sure name is ok
    if (this.addPlayer(name)) {
      // Find the highest gameId in gameList
      const latestId = Math.max.apply(
        Math,
        this.state.gameList.map(game => {
          return game.id;
        })
      );

      // Generating a random 4 length uppercase string, making sure it's unique
      let code = RandomString({ length: 4, numeric: false }).toUpperCase();
      while (this.state.gameList.find(game => game.code === code)) {
        code = RandomString({ length: 4, numeric: false }).toUpperCase();
      }

      // Add game to gameList
      const game = { id: latestId + 1, code: code };
      this.setState(prevState => {
        let newList = prevState.gameList;
        newList.push(game);
        return { gameList: newList };
      });

      // Save our game in state and move on
      this.setState({ game: game, page: "AdminPanel" });
    }
    // If name is not ok
    else {
      this.setState({ nameError: { active: true, text: "Please enter name" } });
    }
  };

  addPlayer = name => {
    if (name !== "") {
      // Insert new player in playerList
      const newPlayer = { name: name, role: "", status: "alive" };

      this.setState(prevState => {
        let newPlayerList = prevState.playerList;
        newPlayerList.push(newPlayer);

        return { playerList: newPlayerList };
      });

      // Save our player
      this.setState({ player: newPlayer });

      // Remove nameError
      this.setState({ nameError: { active: false, text: "" } });

      return true;
    } else {
      return false;
    }
  };

  joinGame = (code, name) => {
    // Make sure name is ok
    if (this.addPlayer(name)) {
      // Make sure code is not empty
      if (code !== "") {
        // Look for game with code
        const ourGame = this.state.gameList.find(game => {
          return game.code === code;
        });
        if (ourGame) {
          // Save our game and move on
          this.setState({ game: ourGame, page: "GameLobby" });
        }
        // If code wasn't correct
        else {
          this.setState({ codeError: { active: true, text: "Code is wrong" } });
        }
      }
      // If code is empty
      else {
        this.setState({
          codeError: { active: true, text: "Please enter code to join game" }
        });
      }
    }
    // If name is not ok
    else {
      this.setState({ nameError: { active: true, text: "Please enter name" } });
    }
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

  THEME = createMuiTheme({
    typography: {
      fontFamily: '"Mansalva", "Helvetica", "Arial", sans-serif',
      fontSize: 20,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500
    }
  });

  render() {
    switch (this.state.page) {
      case "StartPage":
        return (
          <StartPage
            createGame={this.createGame}
            nameError={this.state.nameError}
            codeError={this.state.codeError}
            joinGame={this.joinGame}
          />
        );

      case "GameLobby":
        return (
          <GameLobby
            changePage={this.changePage}
            players={this.state.playerList.filter(this.isAlive)}
            game={this.state.game}
          />
        );

      case "AdminPanel":
        return (
          <React.Fragment>
            <GameLobby
              changePage={this.changePage}
              players={this.state.playerList.filter(this.isAlive)}
              game={this.state.game}
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
