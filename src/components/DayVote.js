import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

class DayVote extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Grid item>
          <Typography variant="h3">Who do you want to vote out?</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h5">
            You need {Math.floor(this.props.players.length / 2) + 1} votes on
            the same action in order to move on.
          </Typography>
        </Grid>

        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          spacing={4}
        >
          {this.props.players.map(player => (
            <Grid item key={player.name}>
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
                      : "default"
                  }
                  onClick={() => {
                    this.props.wantsToKill(player, this.props.doesPlayersAgree);
                  }}
                >
                  {player.name}
                </Button>
              </Tooltip>
            </Grid>
          ))}
          <Grid item>
            <Tooltip
              placement="top"
              title={this.props.noneVotes}
              open={this.props.noneVotes > 0}
            >
              <Button
                variant="contained"
                size="large"
                color={
                  "none" === this.props.player.wantsToKill
                    ? "primary"
                    : "default"
                }
                onClick={() => {
                  this.props.wantsToKill(
                    { name: "none" },
                    this.props.doesPlayersAgree
                  );
                }}
              >
                None
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default DayVote;
