import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class MafiaKilled extends Component {
  state = {};

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
          <Typography variant="h4">
            The mafia chose {this.props.mafiaChose} to be killed
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default MafiaKilled;
