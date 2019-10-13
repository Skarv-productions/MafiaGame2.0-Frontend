import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class MafiaKilled extends Component {
  state = {};

  render() {
    const whoWon = this.props.whoWon;
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
          <Typography variant="h2">Game Over</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h4">
            {whoWon ? "The " + whoWon + " won!" : "You were killed!"}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default MafiaKilled;
