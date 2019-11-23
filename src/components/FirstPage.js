import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";

class FirstPage extends Component {
  state = {};

  render() {
    let i = 0;
    return (
      <React.Fragment>
        <Zoom in={this.props.transition.in} mountOnEnter unmountOnExit>
          <Grid item>
            <Typography variant="h2">MAFIA GAME</Typography>
          </Grid>
        </Zoom>

        <Grid item></Grid>

        <Zoom in={this.props.transition.in} mountOnEnter unmountOnExit>
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
        </Zoom>

        <Zoom in={this.props.transition.in} mountOnEnter unmountOnExit>
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
        </Zoom>
      </React.Fragment>
    );
  }
}

export default FirstPage;
