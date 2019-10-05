import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import LoadSvg from "../images/loading.svg";
import Typography from "@material-ui/core/Typography";

class WaitPage extends Component {
  state = {};

  componentDidMount() {
    this.maybeStartNight();
  }

  componentDidUpdate(prevProps) {
    // If admin and status is "assigned" and people have seen their role
    this.maybeStartNight();

    // If status has changed
    if (prevProps.status !== this.props.status) {
      switch (this.props.status) {
        case "assigned":
          this.props.showRole();
          break;

        case "night":
          this.props.night();
          break;
      }
    }
  }

  maybeStartNight = () => {
    if (
      this.props.status === "assigned" &&
      this.props.player.admin &&
      this.checkSeenRole()
    ) {
      this.props.changeStatus("night");
      this.props.resetSeenInfo();
    }
  };

  checkSeenRole = () => {
    return this.props.players.find(player => {
      return !player.seenInfo;
    })
      ? false
      : true;
  };

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
