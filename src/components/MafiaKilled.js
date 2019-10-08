import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class MafiaKilled extends Component {
  state = {};

  seenInfo = () => {
    this.props.seenInfo(this.ifLastMafia);
  };

  // SetState update is not being noticed. Probably needs to do a onComponantUpdate and see ifLastMafia()

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
      this.props.changeGameStatus("doctor");
    }

    this.props.changePage("NightMode");
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
