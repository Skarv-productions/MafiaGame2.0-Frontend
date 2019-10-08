import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

class MafiaNight extends Component {
  state = {};

  componentDidUpdate() {
    if (this.props.game.status === "mafiaDone") {
      this.props.changePage("MafiaKilled");
    }
  }

  render() {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={10}
        style={{ minHeight: "98vh", textAlign: "center" }}
      >
        <Grid item>
          <Typography variant="h3">Who do you want to kill?</Typography>
        </Grid>

        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          spacing={4}
        >
          {this.props.players.map(player => (
            <Grid item>
              <Tooltip
                placement="top"
                title={player.killVotes}
                open={player.killVotes > 0}
              >
                <Button
                  variant="contained"
                  size="large"
                  color={
                    player.name === this.props.player.wantsToKill
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => {
                    this.props.wantsToKill(player);
                  }}
                >
                  {player.name}
                </Button>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }
}

export default MafiaNight;
