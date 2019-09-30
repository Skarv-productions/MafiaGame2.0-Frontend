import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class AdminVote extends Component {
  state = {};

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
          <Typography variant="h3">Who do you want to vote out?</Typography>
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
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  this.props.onKill(player.name);
                }}
              >
                {player.name}
              </Button>
            </Grid>
          ))}
          <Grid item>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                this.props.onKill("none");
              }}
            >
              None
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default AdminVote;
