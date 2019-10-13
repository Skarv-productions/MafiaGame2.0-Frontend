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
import DayVote from "./components/DayVote";
import RandomString from "random-string";
import WaitPage from "./components/WaitPage";
import GameOver from "./components/GameOver";
import axios from "axios";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./App.css";

/* ------- DOCUMENTATION -------
Game statuses:
open - Game is created and waiting for players
started - Game has started and you can't join, role should be assigned
assigned - Roles have been assigned
night - It's time to go to sleep
mafia - Time for mafia to kill
mafiaDone - Mafia have picked a person, display who they picked
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
    player: {
      name: "",
      role: "",
      alive: true,
      admin: false,
      seenInfo: false,
      wantsToKill: "",
      killVotes: 0
    },
    playerList: [
      {
        name: "MATT",
        role: "farmer",
        alive: true,
        admin: false,
        seenInfo: true,
        wantsToKill: "",
        killVotes: 0
      },
      {
        name: "BAJS",
        role: "farmer",
        alive: true,
        admin: false,
        seenInfo: true,
        wantsToKill: "",
        killVotes: 0
      },
      {
        name: "KEBAB",
        role: "farmer",
        alive: true,
        admin: false,
        seenInfo: true,
        wantsToKill: "",
        killVotes: 0
      },
      {
        name: "Lol",
        role: "farmer",
        alive: true,
        admin: false,
        seenInfo: true,
        wantsToKill: "",
        killVotes: 0
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

  componentDidMount() {
    axios({
      method: "get",
      url:
        "https://3x2af729ag.execute-api.us-east-2.amazonaws.com/test/gamelist"
    })
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }

  changePage = page => {
    this.setState({ page: page });
  };

  changeGameStatus = status => {
    // We don't need to update gameList, only our game
    this.setState({ game: Object.assign(this.state.game, { status: status }) });
  };

  isAlive = player => {
    return player.alive;
  };

  wantsToKill = player => {
    // Check if we already wants to kill someone
    if (this.state.player.wantsToKill !== "") {
      // Remove the killVote
      this.setState({
        playerList: this.state.playerList.map(p => {
          return p.name === this.state.player.wantsToKill
            ? Object.assign(p, { killVotes: p.killVotes - 1 })
            : p;
        })
      });
    }

    // If the player we pressed is already pressed, then toggle off.
    if (this.state.player.wantsToKill === player) {
      this.setState({
        playerList: this.state.playerList.map(p => {
          return p.name === this.state.player.name
            ? Object.assign(p, { wantsToKill: "" })
            : p;
        })
        // Update our player here
      });
    }
    // Update current player
    let me = {};
    Object.assign(me, this.state.player);
    Object.assign(me, { wantsToKill: player.name });
    this.setState({ player: me });

    // Update playerList
    let newPlayerList = this.state.playerList.map(p => {
      return p.name === this.state.player.name
        ? Object.assign(p, { wantsToKill: player.name })
        : p;
    });
    newPlayerList = newPlayerList.map(p => {
      return p.name === player.name
        ? Object.assign(p, { killVotes: p.killVotes + 1 })
        : p;
    });
    this.setState({ playerList: newPlayerList });

    // Check if all living mafias has voted
    const numMafia = this.numMafia();

    console.log("There are", numMafia, "alive.");

    const hasVoted = this.state.playerList.filter(p => {
      return p.wantsToKill !== "";
    }).length;

    console.log(hasVoted, "of them has voted.");

    if (numMafia === hasVoted) {
      console.log("All mafias has voted");

      // Get max value
      const maxVote = Math.max(
        ...this.state.playerList.map(p => {
          return p.killVotes;
        })
      );
      // Save player with most killVotes
      const toBeKilled = this.state.playerList.find(p => {
        return p.killVotes === maxVote;
      });

      // See if that max value exists more than once
      if (
        this.state.playerList.filter(p => {
          return p.killVotes === maxVote;
        }).length === 1
      ) {
        this.mafiaMark(toBeKilled);
        this.changeGameStatus("mafiaDone");
      } else {
        console.log("The mafia needs to agree on one person");
      }
    } else {
      console.log("Waiting for", numMafia - hasVoted, "more mafia to vote.");
    }
  };

  resetKillVotes = () => {
    let newPlayerList = this.state.playerList.map(p => {
      return Object.assign(p, { killVotes: 0, wantsToKill: "" });
    });
  };

  resetChoices = () => {
    this.setState({ mafiaChose: "", doctorChose: "", sheriffChose: "" });
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

  // When player press ok after they've seen specific info
  seenInfo = callback => {
    console.log("Seen info called!");

    let newPlayerList = this.state.playerList.map(player => {
      return player.name === this.state.player.name
        ? Object.assign(player, { seenInfo: true })
        : player;
    });
    this.setState(
      {
        playerList: newPlayerList,
        player: Object.assign(this.state.player, { seenInfo: true })
      },
      () => {
        // If callback, then execute
        if (callback) {
          console.log("Callback found!");
          callback();
          console.log("Callback done!");
        }
      }
    );
  };

  resetSeenInfo = () => {
    let newPlayerList = this.state.playerList.map(p => {
      return Object.assign(p, { seenInfo: false });
    });

    this.setState({ playerList: newPlayerList });
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
          alive: true,
          admin: admin,
          seenInfo: false,
          wantsToKill: "",
          killVotes: 0
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
    console.log("You voted to kill", name);

    if (name !== "none") {
      this.setState(prevState => ({
        playerList: prevState.playerList.map(player =>
          player.name === name
            ? Object.assign(player, { alive: false })
            : player
        )
      }));
    }
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

  numMafia = () => {
    return this.state.playerList.filter(p => {
      return p.role === "mafia" && p.alive;
    }).length;
  };

  numGood = () => {
    return this.state.playerList.filter(p => {
      return p.role !== "mafia" && p.alive;
    }).length;
  };

  didIDie = () => {
    let alive = true;

    this.state.playerList.map(p => {
      if (p.name === this.state.player.name && !p.alive) {
        alive = false;
      }
    });

    return alive;
  };

  didSomeoneWin = () => {
    let whoWon = false;
    let numMafia = this.numMafia();
    let numGood = this.numGood();

    // If all mafias are dead
    if (!numMafia) {
      whoWon = "city";
    }

    // If there are same number of mafias as good players
    else if (numMafia === numGood) {
      whoWon = "mafia";
    }

    return whoWon;
  };

  nightKill = () => {
    // If someone should be killed during night, then kill them
    if (this.state.mafiaChose !== this.state.doctorChose) {
      this.kill(this.state.mafiaChose);
    }

    // Since this is a mafia kill, we can now reset kill votes
    this.resetKillVotes();
  };

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
        return (
          <ShowRole
            player={this.state.player}
            next={this.seenInfo}
            wait={this.wait}
          />
        );

      case "NightMode":
        return (
          <NightMode
            admin={this.state.player.admin}
            changeStatus={this.changeGameStatus}
            game={this.state.game}
            changePage={this.changePage}
            player={this.state.player}
            players={this.state.playerList.filter(this.isAlive)}
            nightKill={this.nightKill}
          />
        );

      case "NormalMafia":
        return <NormalMafia mafiaBoss="Marvin" />;

      case "MafiaNight":
        return (
          <MafiaNight
            players={this.state.playerList.filter(this.isAlive)}
            wantsToKill={this.wantsToKill}
            player={this.state.player}
            game={this.state.game}
            changePage={this.changePage}
          />
        );

      case "MafiaKilled":
        return (
          <MafiaKilled
            mafiaChose={this.state.mafiaChose}
            players={this.state.playerList}
            isAlive={this.isAlive}
            seenInfo={this.seenInfo}
            changeGameStatus={this.changeGameStatus}
            changePage={this.changePage}
            player={this.state.player}
          />
        );

      case "DoctorNight":
        return (
          <DoctorNight
            players={this.state.playerList.filter(this.isAlive)}
            doctorMark={this.doctorMark}
          />
        );

      case "DoctorSaved":
        return (
          <DoctorSaved
            doctorChose={this.state.doctorChose}
            changePage={this.changePage}
            changeStatus={this.changeGameStatus}
          />
        );

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
            nightKill={this.nightKill}
          />
        );

      case "NightReport":
        return (
          <NightReport
            mafiaChose={this.state.mafiaChose}
            doctorChose={this.state.doctorChose}
            admin={this.state.player.admin}
            changePage={this.changePage}
            didIDie={this.didIDie}
            didSomeoneWin={this.didSomeoneWin}
          />
        );

      case "DayVote":
        return (
          <DayVote
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
            resetSeenInfo={this.resetSeenInfo}
          />
        );

      case "GameOver":
        return <GameOver whoWon={this.didSomeoneWin()} />;

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
