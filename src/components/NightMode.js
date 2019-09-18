import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ReactPlayer from "react-player";
import SleepCity from "../audio/SleepCity.mp3";

class NightMode extends Component {
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
          <Typography variant="h3">Go to sleep</Typography>
        </Grid>

        <ReactPlayer url={SleepCity} playing={true} />
      </Grid>
    );
  }
}

export default NightMode;
