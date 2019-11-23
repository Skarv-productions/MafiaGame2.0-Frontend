import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

class MafiaNight extends Component {
  state = {};

  componentDidUpdate(prevProps) {
    if (
      this.props.game.status !== prevProps.game.status &&
      this.props.game.status === "mafiaDone"
    ) {
      this.props.changePage("MafiaKilled");
    }
  }

  render() {
    let i = 0;

    return (
      <React.Fragment>
        <Slide
          direction="up"
          in={true}
          style={{ transitionDelay: "" + i++ * 200 + "ms" }}
          mountOnEnter
          unmountOnExit
        >
          <Grid item>
            <Typography variant="h3">Who do you want to kill?</Typography>
          </Grid>
        </Slide>

        <Grid item></Grid>
        <Grid item></Grid>

        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          spacing={2}
        >
          {this.props.players.map(player => (
            <Grid item key={player.name}>
              <Tooltip
                placement="top"
                title={player.killVotes}
                open={player.killVotes > 0}
                TransitionComponent={Zoom}
              >
                <Slide
                  direction="up"
                  in={true}
                  style={{ transitionDelay: "" + i++ * 200 + "ms" }}
                  mountOnEnter
                  unmountOnExit
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
                      this.props.wantsToKill(player, this.props.doesMafiaAgree);
                    }}
                  >
                    {player.name}
                  </Button>
                </Slide>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

export default MafiaNight;
