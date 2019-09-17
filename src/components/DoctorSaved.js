import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class DoctorSaved extends Component {
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
            You chose {this.props.doctorChose} to be saved
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default DoctorSaved;
