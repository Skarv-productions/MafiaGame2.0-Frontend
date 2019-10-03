import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class MafiaNight extends Component {
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
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={() => {
                  this.props.mafiaMark(player);
                }}
              >
                {player.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }
}

export default MafiaNight;