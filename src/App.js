import React, { Component } from "react";
import StartPage from "./components/StartPage";
import GameLobby from "./components/GameLobby";
import AdminPanel from "./components/AdminPanel";
import ShowRole from "./components/ShowRole";
import NightMode from "./components/NightMode";
import NormalMafia from "./components/NormalMafia";
import MafiaNight from "./components/MafiaNight";
import MafiaKilled from "./components/MafiaKilled";
import DoctorNight from "./components/DoctorNight";
import DoctorSaved from "./components/DoctorSaved";
import SheriffNight from "./components/SheriffNight";
import SheriffChecked from "./components/SheriffChecked";
import NightReport from "./components/NightReport";
import AdminVote from "./components/AdminVote";
import RandomString from "random-string";
import WaitPage from "./components/WaitPage";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./App.css";

/* ------- DOCUMENTATION -------
Game statuses:
open - Game is created and waiting for players
started - Game has started and you can't join, role should be assigned
assigned - Roles have been assigned
night - It's time to go to sleep
mafia - Time for mafia to kill
doctor - Time for doctor to heal
sheriff - Sheriff is investigating
day - Daytime! Report and vote
closed - Game over!

Test
test2 

*/

class App extends Component {
  state = {
    page: "StartPage",
    player: { name: "", role: "", status: "", admin: false, seenRole: false },
    playerList: [
      {
        name: "MATT",
        role: "farmer",
        status: "alive",
        admin: false,
        seenRole: true
      },
      {
        name: "BAJS",
        role: "farmer",
        status: "alive",
        admin: false,
        seenRole: true
      },
      {
        name: "KEBAB",
        role: "farmer",
        status: "alive",
        admin: false,
        seenRole: true
      },
      {
        name: "Lol",
        role: "farmer",
        status: "alive",
        admin: false,
        seenRole: true
      }
    ],
    game: {
      id: 0,
      code: "",
      status: ""
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

  changeGameStatus = status => {
    // We don't need to update gameList, only our game
    this.setState({ game: Object.assign(this.state.game, { status: status }) });
  };

  isAlive = player => {
    return player.status === "alive";
  };

  mafiaMark = player => {
    this.setState({ mafiaChose: player.name });
  };

  doctorMark = player => {
    this.setState({ doctorChose: player.name });
    this.changePage("DoctorSaved");
  };

  sheriffCheck = player => {
    this.setState({ sheriffChose: player.name });
    this.changePage("SheriffChecked");
  };

  // When player press ok after they've seen their role
  seenRole = () => {
    let newPlayerList = this.state.playerList.map(player => {
      return player === this.state.player
        ? Object.assign(player, { seenRole: true })
        : player;
    });
    this.setState({
      playerList: newPlayerList,
      player: Object.assign(this.state.player, { seenRole: true })
    });

    // Move on to wait
    this.wait();
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
          admin: admin,
          seenRole: false
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
      this.changeGameStatus("started");
      this.assignRoles(roles);
    } else {
      // If normal player, wait for roles to be assigned
      this.wait();
    }
  };

  showRole = () => {
    this.updateMyPlayer();
    this.changePage("ShowRole");
  };

  assignRoles = roles => {
    let farmers = this.state.playerList.slice();
    let chosen = [];
    let mafias = [];

    // Assign Maffia
    for (let i = 0; i < roles.mafia; i++) {
      chosen = Math.floor(Math.random() * farmers.length);

      mafias.push(farmers[chosen]);
      farmers.splice(chosen, 1);
    }

    // Update state playerList with mafia roles
    let newPlayerList = this.state.playerList.slice();

    mafias.map(mafia => {
      const mafiaIndex = newPlayerList.indexOf(mafia);

      Object.assign(newPlayerList[mafiaIndex], { role: "mafia" });
    });

    this.setState({ playerList: newPlayerList });

    // Assign Doctor
    if (roles.doctor) {
      chosen = Math.floor(Math.random() * farmers.length);
      let doctor = farmers[chosen];
      farmers.splice(chosen, 1);

      // Update state playerList with doctor role
      this.setState(prevState => ({
        playerList: prevState.playerList.map(player => {
          return player === doctor
            ? Object.assign(player, { role: "doctor" })
            : player;
        })
      }));
    }

    // Assign Sheriff
    if (roles.sheriff) {
      chosen = Math.floor(Math.random() * farmers.length);

      let sheriff = farmers[chosen];

      farmers.splice(chosen, 1);

      // Update state playerList with doctor role
      this.setState(prevState => ({
        playerList: prevState.playerList.map(player => {
          return player === sheriff
            ? Object.assign(player, { role: "sheriff" })
            : player;
        })
      }));
    }

    // Update game status
    this.changeGameStatus("assigned");

    // Move on to see role
    this.showRole();
  };

  // Updates the current player with data from playerList
  updateMyPlayer = () => {
    const me = this.state.playerList.find(player => {
      return player.name === this.state.player.name;
    });
    this.setState({ player: me });
  };

  // Load/Wait screen
  wait = () => {
    this.changePage("WaitPage");
  };

  night = () => {
    this.changePage("NightMode");
  };

  wakeMafia = () => {};

  render() {
    switch (this.state.page) {
      case "StartPage":
        return (
          <StartPage
            createGame={this.createGame}
            nameError={this.state.nameError}
            codeError={this.state.codeError}
            joinGame={this.joinGame}
            player={this.state.player}
          />
        );

      case "GameLobby":
        return (
          <GameLobby
            changePage={this.changePage}
            players={this.state.playerList.filter(this.isAlive)}
            game={Object.assign({}, this.state.game)}
            startGame={this.startGame}
          />
        );

      case "AdminPanel":
        return (
          <React.Fragment>
            <AdminPanel
              startGame={this.startGame}
              players={this.state.playerList}
            />
          </React.Fragment>
        );

      case "ShowRole":
        return <ShowRole player={this.state.player} next={this.seenRole} />;

      case "NightMode":
        return (
          <NightMode
            admin={this.state.player.admin}
            changeStatus={this.changeGameStatus}
            game={this.state.game}
            changePage={this.changePage}
            player={this.state.player}
            players={this.state.playerList.filter(this.isAlive)}
          />
        );

      case "NormalMafia":
        return <NormalMafia mafiaBoss="Marvin" />;

      case "MafiaNight":
        return (
          <MafiaNight
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
            changePage={this.changePage}
            changeStatus={this.changeGameStatus}
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

      case "WaitPage":
        return (
          <WaitPage
            status={this.state.game.status}
            players={this.state.playerList}
            player={this.state.player}
            showRole={this.showRole}
            changeStatus={this.changeGameStatus}
            night={this.night}
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
