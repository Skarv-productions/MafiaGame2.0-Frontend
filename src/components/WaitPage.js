import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import LoadSvg from "../images/loading.svg";
import Typography from "@material-ui/core/Typography";

class WaitPage extends Component {
  state = {};

  componentDidMount() {
    this.statusCheck();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      this.statusCheck();
    }
  }

  statusCheck = () => {
    switch (this.props.status) {
      case "assigned":
        if (this.props.player.seenInfo) {
          if (this.props.player.admin) {
            this.maybeStartNight();
          }
        } else {
          this.props.showRole();
        }
        break;

      case "night":
        this.props.resetSeenInfo();
        this.props.night();
        break;
    }
  };

  maybeStartNight = () => {
    if (this.checkSeenRole()) {
      this.props.changeStatus("night");
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
      <React.Fragment>
        <Grid item>
          <Typography variant="h5">Waiting for other players</Typography>
        </Grid>

        <Grid item>
          <img src={LoadSvg} alt="Load SVG" />
        </Grid>
      </React.Fragment>
    );
  }
}

export default WaitPage;
