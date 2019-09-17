import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

class ShowRole extends Component {
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
          <Typography variant="h5">You are a</Typography>
        </Grid>
        <Grid item>
          <Typography color="secondary" variant="h3">
            {this.props.role}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default ShowRole;
