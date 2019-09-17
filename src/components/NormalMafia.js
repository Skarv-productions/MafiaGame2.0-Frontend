import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class NormalMafia extends Component {
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
            Point at the person you want to kill. {this.props.mafiaBoss} will
            then pick on their device.
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default NormalMafia;
