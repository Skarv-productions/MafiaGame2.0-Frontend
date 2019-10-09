import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import WakeCity from "../audio/WakeCity.mp3";
import SleepCity from "../audio/SleepCity.mp3";
import WakeMafia from "../audio/WakeMafia.mp3";
import SleepMafia from "../audio/SleepMafia.mp3";
import WakeDoctor from "../audio/WakeDoctor.mp3";
import SleepDoctor from "../audio/SleepDoctor.mp3";
import WakeSheriff from "../audio/WakeSheriff.mp3";
import SleepSheriff from "../audio/SleepSheriff.mp3";

class NightMode extends Component {
  state = {
    activeSound: SleepCity
  };

  audio_wakeCity = new Audio(WakeCity);
  audio_sleepCity = new Audio(SleepCity);
  audio_wakeMafia = new Audio(WakeMafia);
  audio_sleepMafia = new Audio(SleepMafia);
  audio_wakeDoctor = new Audio(WakeDoctor);
  audio_sleepDoctor = new Audio(SleepDoctor);
  audio_wakeSheriff = new Audio(WakeSheriff);
  audio_sleepSheriff = new Audio(SleepSheriff);

  componentDidMount() {
    console.log("Component mounted!");

    this.checkStatus();

    // This should only be called when mounted, not updated
    if (this.props.admin && this.props.game.status === "night") {
      this.audio_sleepCity.play();
      setTimeout(() => {
        this.props.changeStatus("mafia");
      }, 5000);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.checkStatus();
    }
  }

  doctorAlive = () => {
    let doctor = false;

    this.props.players.map(player => {
      if (player.role === "doctor") {
        doctor = true;
      }
    });

    return doctor;
  };

  sheriffAlive = () => {
    let sheriff = false;

    this.props.players.map(player => {
      if (player.role === "sheriff") {
        sheriff = true;
      }
    });

    return sheriff;
  };

  checkStatus = () => {
    switch (this.props.game.status) {
      case "mafia":
        if (this.props.admin) {
          this.audio_wakeMafia.play();
        }
        if (this.props.player.role === "mafia") {
          this.props.changePage("MafiaNight");
        }
        break;

      case "doctor":
        if (this.props.admin) {
          this.audio_sleepMafia.play();

          if (this.doctorAlive()) {
            setTimeout(() => {
              this.audio_wakeDoctor.play();
            }, 5000);
          }
          // If doctor is not alive
          else {
            this.props.changeStatus("sheriff");
          }
        }
        if (this.props.player.role === "doctor") {
          setTimeout(() => {
            this.props.changePage("DoctorNight");
          }, 5000);
        }
        break;

      case "sheriff":
        if (this.props.admin) {
          if (this.doctorAlive()) {
            this.audio_sleepDoctor.play();
          }
          if (this.sheriffAlive()) {
            setTimeout(() => {
              this.audio_wakeSheriff.play();
            }, 5000);
          } else {
            this.props.changeStatus("day");
          }
        }
        if (this.props.player.role === "sheriff") {
          setTimeout(() => {
            this.props.changePage("SheriffNight");
          }, 5000);
        }
        break;

      case "day":
        if (this.props.admin) {
          if (this.sheriffAlive()) {
            this.audio_sleepSheriff.play();
          }
          setTimeout(() => {
            this.audio_wakeCity.play();
          }, 5000);
        }
        setTimeout(() => {
          this.props.changePage("NightReport");
        }, 5000);
        break;
    }
  };

  render() {
    return (
      <Grid
        container
        direction="column"
        alignItems="stretch"
        justify="center"
        spacing={4}
        style={{ minHeight: "98vh", textAlign: "center" }}
      >
        <Grid item>
          <Typography variant="h3">Go to sleep</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default NightMode;
