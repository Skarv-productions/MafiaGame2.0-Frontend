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
    player: { name: "", role: "", status: "", admin: false },
    playerList: [
      { name: "MATT", role: "farmer", status: "alive", admin: false },
      { name: "BAJS", role: "farmer", status: "alive", admin: false },
      { name: "KEBAB", role: "farmer", status: "alive", admin: false },
      { name: "Lol", role: "farmer", status: "alive", admin: false }
    ],
    game: {
      id: 0,
      code: ""
    },
    gameList: [
      { id: 1, code: "ABCD", status: "open" },
      { id: 2, code: "QWER", status: "open" },
      { id: 3, code: "ASDF", status: "open" },
      { id: 4, code: "ZXCV", status: "open" },
      { id: 5, code: "TYUI", status: "open" },
      { id: 6, code: "GHJK", status: "open" },
      { id: 7, code: "BNMM", status: "open" },
      { id: 8, code: "JJJJ", status: "closed" }
    ],
    roles: { mafia: 0, doctor: 0, sheriff: 0 },
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
    if (this.addPlayer(name, true)) {
      // Find the highest gameId in gameList
      const latestId = Math.max(
        ...this.state.gameList.map(game => {
          return game.id;
        })
      );

      // Generating a random 4 length uppercase string, making sure it's unique
      let code = RandomString({ length: 4, numeric: false }).toUpperCase();
      while (this.state.gameList.find(game => game.code === code)) {
        code = RandomString({ length: 4, numeric: false }).toUpperCase();
      }

      // Add game to gameList
      const game = { id: latestId + 1, code: code, status: "open" };
      this.setState(prevState => {
        let newList = prevState.gameList;
        newList.push(game);
        return { gameList: newList };
      });

      // Save our game in state and move on
      this.setState({ game: game, page: "AdminPanel" });
    }
  };

  addPlayer = (name, admin) => {
    if (name !== "") {
      // Make sure name is not already taken
      if (
        !this.state.playerList.find(player => {
          return player.name === name;
        })
      ) {
        // Insert new player in playerList
        const newPlayer = {
          name: name,
          role: "farmer",
          status: "alive",
          admin: admin
        };

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
        this.setState({
          nameError: { active: true, text: "Name is already taken" }
        });
        return false;
      }
    } else {
      this.setState({ nameError: { active: true, text: "Please enter name" } });
      return false;
    }
  };

  joinGame = (code, name) => {
    // Make sure code is not empty
    if (code !== "") {
      // Look for game with code
      const ourGame = this.state.gameList.find(game => {
        return game.code === code && game.status === "open";
      });

      // If code was found
      if (ourGame) {
        // Try to save player
        if (this.addPlayer(name, false)) {
          // Save our game and move on
          this.setState({ game: ourGame, page: "GameLobby" });
        }

        // If name is not ok
        else {
          this.setState({
            codeError: { active: false, text: "" }
          });
        }
      }

      // If code wasn't correct
      else {
        this.setState({
          codeError: { active: true, text: "Code is wrong" },
          nameError: { active: false, text: "" }
        });
      }
    }

    // If code is empty
    else {
      this.setState({
        codeError: { active: true, text: "Please enter code to join game" },
        nameError: { active: false, text: "" }
      });
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

  // Both admin and normal players will call this
  startGame = roles => {
    // If admin, then assign role
    if (this.state.player.admin) {
      this.assignRoles(roles);
    }
    // If normal player, wait/get role
  };

  assignRoles = roles => {
    console.log("Assigning roles...");

    let farmers = this.state.playerList.slice();
    let chosen = [];
    let mafias = [];

    console.log("Amount of Mafias this game: " + roles.mafia);
    console.log("Doctor: " + roles.doctor);
    console.log("Sheriff: " + roles.sheriff);

    // Assign Maffia
    console.log("Time to assign Mafias ");

    for (let i = 0; i < roles.mafia; i++) {
      chosen = Math.floor(Math.random() * farmers.length);

      console.log("I just chose " + farmers[chosen].name);
      console.log(farmers[chosen].name + " was assigned to be a Mafia");

      mafias.push(farmers[chosen]);
      farmers.splice(chosen, 1);
    }

    console.log("These are the Mafias");
    console.log(mafias);

    // Update state playerList with mafia roles
    let newPlayerList = this.state.playerList.slice();
    console.log(newPlayerList);

    mafias.map(mafia => {
      console.log(mafia);
      const mafiaIndex = newPlayerList.indexOf(mafia);

      console.log(mafia.name, "was found at index", mafiaIndex);

      Object.assign(newPlayerList[mafiaIndex], { role: "mafia" });
    });

    this.setState({ playerList: newPlayerList });

    // Assign Doctor
    if (roles.doctor) {
      console.log("Time to assign Doctor");

      chosen = Math.floor(Math.random() * farmers.length);
      let doctor = farmers[chosen];
      farmers.splice(chosen, 1);

      console.log("Doctor: " + doctor.name);

      // Update state playerList with doctor role
      this.setState(prevState => ({
        playerList: prevState.playerList.map(player => {
          return player === doctor
            ? Object.assign(player, { role: "doctor" })
            : player;
        })
      }));
    } else {
      console.log("Not assigning Doctor this game.");
    }

    // Assign Sheriff
    if (roles.sheriff) {
      chosen = Math.floor(Math.random() * farmers.length);

      console.log("Time to assign Sheriff");

      let sheriff = farmers[chosen];

      console.log("Just assigned " + farmers[chosen].name + " as the Sheriff.");

      farmers.splice(chosen, 1);

      console.log("Sheriff: " + sheriff.name);

      // Update state playerList with doctor role
      this.setState(prevState => ({
        playerList: prevState.playerList.map(player => {
          return player === sheriff
            ? Object.assign(player, { role: "sheriff" })
            : player;
        })
      }));
    } else {
      console.log("Not assigning Sheriff this game.");
    }
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
            <AdminPanel
              startGame={this.startGame}
              players={this.state.playerList}
            />
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

      default:
        return (
          <StartPage
            createGame={this.createGame}
            nameError={this.state.nameError}
            codeError={this.state.codeError}
            joinGame={this.joinGame}
          />
        );
    }
  }
}

export default App;
