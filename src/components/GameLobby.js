import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class GameLobby extends Component {
  state = {};

  componentDidUpdate() {
    if (this.props.game.status !== "open") {
      this.props.startGame();
    }
  }

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
          <Typography variant="h3">Game Lobby</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h5">Game code:</Typography>
          <Typography variant="h5" color="primary">
            {this.props.game.code}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="h5">Playerlist</Typography>
        </Grid>

        {this.props.players.map(player => (
          <Grid item>
            <Typography
              color={player.admin ? "primary" : "inherit"}
              variant="h6"
            >
              {player.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default GameLobby;
