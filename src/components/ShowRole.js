import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";

class ShowRole extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Zoom
          in={this.props.transition.in}
          timeout={this.props.transition.timeout}
          unmountOnExit
        >
          <Grid item>
            <Typography variant="h5">You are a</Typography>
          </Grid>
        </Zoom>

        <Zoom
          in={this.props.transition.in}
          timeout={this.props.transition.timeout}
          unmountOnExit
        >
          <Grid item>
            <Typography
              color={
                this.props.player.role === "mafia" ? "secondary" : "primary"
              }
              variant="h3"
            >
              {this.props.player.role}
            </Typography>
          </Grid>
        </Zoom>

        <Zoom
          in={this.props.transition.in}
          timeout={this.props.transition.timeout}
          unmountOnExit
        >
          <Grid item>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => {
                this.props.next(this.props.wait);
              }}
            >
              OK
            </Button>
          </Grid>
        </Zoom>
      </React.Fragment>
    );
  }
}

export default ShowRole;
