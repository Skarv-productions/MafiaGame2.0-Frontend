import React, { Component } from "react";
import FirstPage from "./components/FirstPage";
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
import DayReport from "./components/DayReport";
import DayVote from "./components/DayVote";
import RandomString from "random-string";
import WaitPage from "./components/WaitPage";
import GameOver from "./components/GameOver";
import Grid from "@material-ui/core/Grid";
import Zoom from "@material-ui/core/Zoom";

import axios from "axios";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
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
    page: "FirstPage",
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
        name: "LOL",
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
        name: "KEBAB",
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
        name: "KEBAB",
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
    cityChose: "",
    votesToKillNone: 0,
    nameError: { active: false, text: "" },
    codeError: { active: false, text: "" },
    transition: { in: true, timeout: 500 }
  };

  componentDidMount() {
    axios({
      method: "post",
      url:
        "https://52pkbycrgl.execute-api.eu-west-1.amazonaws.com/prod/postnewgame",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        code: "xxxx",
        status: "Open",
        playerList: [
          {
            name: "xxxx",
            admin: true
          }
        ]
      }
    })
      .then(response => console.log(response.status))
      .catch(err => console.log(err));

    axios({
      method: "post",
      url:
        "https://52pkbycrgl.execute-api.eu-west-1.amazonaws.com/prod/postjoingame",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        code: "qwer",
        name: "Douglas"
      }
    })
      .then(response => console.log(response.status))
      .catch(err => console.log(err));
  }

  changePage = page => {
    this.setState({ transition: { in: false, timeout: 500 } });

    // Error here because componentUpdate loop
    setTimeout(() => {
      this.setState({ page: page, transition: { in: true, timeout: 500 } });
    }, this.state.transition.timeout);
  };

  changeGameStatus = status => {
    // We don't need to update gameList, only our game
    this.setState({ game: Object.assign(this.state.game, { status: status }) });
  };

  isAlive = player => {
    return player.alive;
  };

  wantsToKill = (player, callback) => {
    // Check if we already wants to kill someone
    if (this.state.player.wantsToKill !== "") {
      // Was that "none"?
      if (this.state.player.wantsToKill === "none") {
        // Remove one from votesToKillNone
        this.setState({ votesToKillNone: this.state.votesToKillNone - 1 });
      }
      // Was it a normal player?
      else {
        // Remove the killVote
        this.setState({
          playerList: this.state.playerList.map(p => {
            return p.name === this.state.player.wantsToKill
              ? Object.assign(p, { killVotes: p.killVotes - 1 })
              : p;
          })
        });
      }
    }

    // If the player we pressed is already pressed, then toggle off.
    if (this.state.player.wantsToKill === player.name) {
      console.log("We pressed on the same player as before.");

      let newMe = Object.assign({}, this.state.player);
      Object.assign(newMe, { wantsToKill: "" });

      this.setState({
        playerList: this.state.playerList.map(p => {
          return p.name === this.state.player.name
            ? Object.assign(p, { wantsToKill: "" })
            : p;
        }),
        player: newMe
      });

      console.log("Toggle should be off.");
    }
    // If we pressed on a new player
    else {
      // Update current player
      let me = Object.assign({}, this.state.player);
      Object.assign(me, { wantsToKill: player.name });

      // Update playerList
      let newPlayerList = this.state.playerList.map(p => {
        return p.name === this.state.player.name
          ? Object.assign(p, { wantsToKill: player.name })
          : p;
      });
      if (player.name === "none") {
        this.setState({ votesToKillNone: this.state.votesToKillNone + 1 });
      } else {
        newPlayerList = newPlayerList.map(p => {
          return p.name === player.name
            ? Object.assign(p, { killVotes: p.killVotes + 1 })
            : p;
        });
      }

      this.setState({ playerList: newPlayerList, player: me }, () => {
        if (callback) {
          callback();
        }
      });
    }
  };

  hasVoted = p => {
    return p.wantsToKill !== "";
  };

  doesMafiaAgree = () => {
    // Check if all living mafias has voted
    const numMafia = this.numMafia();

    const hasVoted = this.state.playerList
      .filter(this.isAlive)
      .filter(this.hasVoted).length;

    if (numMafia === hasVoted) {
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

  doesPlayersAgree = () => {
    // Is there majority on one player? (meaning >50%, roundDown(numPlayers/2)+1 )
    // If so then kill player, reset some values?, start new night

    // Declare some variables
    const alivePlayers = this.state.playerList.filter(this.isAlive);
    console.log("There are", alivePlayers.length, "players alive.");

    // Majority is >50% of players
    const numMajority = Math.floor(alivePlayers.length / 2) + 1;
    console.log("We need", numMajority, "votes on the same thing to move on.");

    const hasVoted = alivePlayers.filter(this.hasVoted).length;
    console.log(hasVoted, "players has voted.");

    // Se if there is a majority vote
    let majorityAgree = false;
    let majorityVote = "";
    alivePlayers.map(p => {
      if (p.killVotes >= numMajority) {
        majorityAgree = true;
        majorityVote = p.name;
      }
    });
    console.log("votesToKillNone:", this.state.votesToKillNone);
    if (this.state.votesToKillNone >= numMajority) {
      majorityAgree = true;
      majorityVote = "none";
    }

    if (majorityAgree) {
      // Update cityChose, so we can display in DayReport
      this.setState({ cityChose: majorityVote });

      // Reset seen info values
      this.resetSeenInfo();

      // If a player was chosen then kill them
      if (majorityVote !== "none") {
        this.kill(majorityVote);
      }

      // Move on to DayReport
      this.changePage("DayReport");
    }
  };

  voteNone = () => {
    // Ch
    if (this.state.player.wantsToKill === "none") {
    }
  };

  resetKillVotes = () => {
    let newMe = Object.assign({}, this.state.player);
    Object.assign(newMe, { killVotes: 0, wantsToKill: "" });

    let newPlayerList = this.state.playerList.map(p => {
      return Object.assign(p, { killVotes: 0, wantsToKill: "" });
    });

    this.setState({
      playerList: newPlayerList,
      votesToKillNone: 0,
      player: newMe
    });
  };

  resetChoices = () => {
    this.setState({
      mafiaChose: "",
      doctorChose: "",
      sheriffChose: "",
      cityChose: ""
    });
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
    // Update current player
    let newMe = Object.assign({}, this.state.player);
    Object.assign(newMe, { seenInfo: false });

    // Update playerList
    let newPlayerList = this.state.playerList.map(p => {
      return Object.assign(p, { seenInfo: false });
    });

    // Update state
    this.setState({ playerList: newPlayerList, player: newMe });
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
      this.setState({ game: game });
      this.changePage("AdminPanel");
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
    let newPlayerList = [];

    // Assign Maffia
    for (let i = 0; i < roles.mafia; i++) {
      chosen = Math.floor(Math.random() * farmers.length);

      mafias.push(farmers[chosen]);

      farmers.splice(chosen, 1);
    }

    // Update state playerList with mafia roles
    newPlayerList = this.state.playerList.slice();

    mafias.map(mafia => {
      const mafiaIndex = newPlayerList.indexOf(mafia);

      Object.assign(newPlayerList[mafiaIndex], { role: "mafia" });
    });

    // Assign Doctor
    if (roles.doctor) {
      chosen = Math.floor(Math.random() * farmers.length);
      let doctor = farmers[chosen];

      farmers.splice(chosen, 1);

      newPlayerList = newPlayerList.map(player => {
        return player === doctor
          ? Object.assign(player, { role: "doctor" })
          : player;
      });
    }

    // Assign Sheriff
    if (roles.sheriff) {
      chosen = Math.floor(Math.random() * farmers.length);

      let sheriff = farmers[chosen];

      farmers.splice(chosen, 1);

      newPlayerList = newPlayerList.map(player => {
        return player === sheriff
          ? Object.assign(player, { role: "sheriff" })
          : player;
      });
    }

    // Update state playerList
    this.setState({ playerList: newPlayerList });

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
    // Reset daily values before starting a night
    this.resetChoices();
    this.resetSeenInfo();

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
    let dead = false;

    this.state.playerList.map(p => {
      if (p.name === this.state.player.name && !p.alive) {
        dead = true;
      }
    });

    return dead;
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

  // This function is being called at the end of every night, either by sheriff or admin
  nightKill = () => {
    // If someone should be killed during night, then kill them
    if (this.state.mafiaChose !== this.state.doctorChose) {
      this.kill(this.state.mafiaChose);
    }

    // Since this is a mafia kill, we can now reset kill votes
    this.resetKillVotes();
  };

  //----------------
  // STYLING
  //----------------

  theme = createMuiTheme({
    overrides: {
      root: {},
      MuiGrid: {
        "spacing-xs-4": {
          width: "100%",
          margin: "auto"
        }
      },
      MuiButton: {
        contained: {
          borderRadius: "25px"
        }
      },
      MuiTypography: {
        root: {
          color: "#DFD9E2"
        }
      },
      MuiTooltip: {
        tooltip: {
          animation:
            "1000ms ease-in-out 0ms infinite normal none running testAnimate",
          borderRadius: "20px",
          margin: "0px",
          backgroundColor: "#FFFD82",
          color: "#191716",
          padding: "4px 9px"
        },
        touch: {
          maxWidth: "25px",
          padding: "3px 8px",
          fontSize: "15px",
          fontWeight: "500"
        },
        tooltipPlacementTop: {
          margin: "7px"
        }
      }
    },
    palette: {
      primary: {
        main: "#26547C"
      },
      secondary: {
        main: "#D04E46"
      },
      default: {
        main: "#FFFD82"
      },
      type: "dark"
    }
  });

  gameComponents = () => {
    switch (this.state.page) {
      case "FirstPage":
        return (
          <FirstPage
            changePage={this.changePage}
            transition={this.state.transition}
          />
        );

      case "StartPage":
        return (
          <StartPage
            createGame={this.createGame}
            nameError={this.state.nameError}
            codeError={this.state.codeError}
            joinGame={this.joinGame}
            player={this.state.player}
            transition={this.state.transition}
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
          <AdminPanel
            startGame={this.startGame}
            players={this.state.playerList}
            transition={this.state.transition}
          />
        );

      case "ShowRole":
        return (
          <ShowRole
            player={this.state.player}
            next={this.seenInfo}
            wait={this.wait}
            transition={this.state.transition}
          />
        );

      case "NightMode":
        return (
          <NightMode
            admin={this.state.player.admin}
            changeStatus={this.changeGameStatus}
            game={Object.assign({}, this.state.game)}
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
            doesMafiaAgree={this.doesMafiaAgree}
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
            resetSeenInfo={this.resetSeenInfo}
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
            player={this.state.player}
            wantsToKill={this.wantsToKill}
            doesPlayersAgree={this.doesPlayersAgree}
            noneVotes={this.state.votesToKillNone}
            seenInfo={this.seenInfo}
          />
        );

      case "DayReport":
        return (
          <DayReport
            players={this.state.playerList.filter(this.isAlive)}
            player={Object.assign({}, this.state.player)}
            changePage={this.changePage}
            changeStatus={this.changeGameStatus}
            didIDie={this.didIDie}
            didSomeoneWin={this.didSomeoneWin}
            cityChose={this.state.cityChose}
            seenInfo={this.seenInfo}
            resetKillVotes={this.resetKillVotes}
          />
        );

      case "WaitPage":
        return (
          <WaitPage
            status={this.state.game.status}
            players={this.state.playerList.filter(this.isAlive)}
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
        return this.setState({ page: "FirstPage" });
    }
  };

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={4}
          style={{ minHeight: "98vh", textAlign: "center" }}
        >
          {this.gameComponents()}
        </Grid>
      </ThemeProvider>
    );
  }
}

export default App;
