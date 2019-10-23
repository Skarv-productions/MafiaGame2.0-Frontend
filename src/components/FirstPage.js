import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class FirstPage extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Grid item>
          <Typography variant="h2">MAFIA GAME</Typography>
        </Grid>

        <Grid item></Grid>
        <Grid item>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => {
              this.props.changePage("StartPage");
            }}
          >
            Play Game
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => {
              this.props.changePage("GameManual");
            }}
          >
            How to play
          </Button>
        </Grid>
      </React.Fragment>
    );
  }
}

export default FirstPage;
