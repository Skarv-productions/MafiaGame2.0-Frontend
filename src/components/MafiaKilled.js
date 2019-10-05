import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class MafiaKilled extends Component {
  state = {};

  seenInfo = () => {
    this.props.seenInfo();

    // Check if you were the last mafia to see
    const numMafia = this.props.players.filter(p => {
      return p.role === "mafia";
    }).length;

    console.log("There are", numMafia, "alive.");

    const hasVoted = this.state.playerList.filter(p => {
      return p.wantsToKill !== "";
    }).length;

    console.log(hasVoted, "of them has voted.");

    if (numMafia === hasVoted) {
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
      </Grid>
    );
  }
}

export default MafiaKilled;
