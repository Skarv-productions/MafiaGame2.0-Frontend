import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import LoadSvg from "../images/loading.svg";
import Typography from "@material-ui/core/Typography";

class WaitPage extends Component {
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
          <Typography variant="h5">Waiting for other players</Typography>
        </Grid>

        <Grid item>
          <img src={LoadSvg} alt="Load SVG" />
        </Grid>
      </Grid>
    );
  }
}

export default WaitPage;
