import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class MafiaKilled extends Component {
  state = {};

  componentDidUpdate() {
    // If we have seenInfo
    if (this.props.player.seenInfo) {
      this.ifLastMafia();
    }
  }

  seenInfo = () => {
    this.props.seenInfo(this.ifLastMafia);
  };

  ifLastMafia = () => {
    console.log("ifLastMafia called!");
    // Check if you were the last mafia to see
    const numMafia = this.props.players.filter(this.props.isAlive).filter(p => {
      return p.role === "mafia";
    }).length;

    console.log("There are", numMafia, " mafias alive.");

    const hasSeen = this.props.players.filter(this.props.isAlive).filter(p => {
      console.log("Cheking player", p.name, ". seenInfo:", p.seenInfo);
      return p.seenInfo;
    }).length;

    console.log(hasSeen, "of them has voted.");

    if (numMafia === hasSeen) {
      console.log("Changing game status to doctor!");
      this.props.resetSeenInfo();
      this.props.changeGameStatus("doctor");
    }

    this.props.changePage("NightMode");
  };

  render() {
    return (
      <React.Fragment>
        <Grid item>
          <Typography variant="h4">
            The mafia chose {this.props.mafiaChose} to be killed
          </Typography>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.seenInfo}
          >
            OK
          </Button>
        </Grid>
      </React.Fragment>
    );
  }
}

export default MafiaKilled;
