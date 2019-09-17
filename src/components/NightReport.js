import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class NightReport extends Component {
  state = {};

  render() {
    const mafiaChose = this.props.mafiaChose;
    const doctorChose = this.props.doctorChose;
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
            {mafiaChose} was {mafiaChose === doctorChose ? "saved" : "killed"}{" "}
            during the night
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default NightReport;
