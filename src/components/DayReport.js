import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class DayReport extends Component {
  state = {};

  next = () => {
    // If someone won or we died
    if (this.props.didSomeoneWin() || this.props.didIDie()) {
      this.props.changePage("GameOver");
    }
    // If game is still on and we survived
    else {
      this.props.seenInfo();
    }
  };

  componentDidUpdate(prevProps) {
    console.log("Component updated!");
    console.log("PrevProps.player.seenInfo =", prevProps.player.seenInfo);
    console.log("this.props.player.seenInfo =", this.props.player.seenInfo);

    // If update was due to us seeing info
    if (prevProps.player.seenInfo !== this.props.player.seenInfo) {
      // If all players have seen info
      if (this.playersSeenInfo()) {
        this.props.resetKillVotes();
        this.props.changeStatus("night");
      }

      // Everyone should move to wait
      this.props.changePage("WaitPage");
    }
  }

  playersSeenInfo = () => {
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
          <Typography variant="h4">
            The city decided to{" "}
            {this.props.cityChose === "none"
              ? "move on without killing anyone."
              : "kill " + this.props.cityChose + "."}
          </Typography>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.next}
          >
            OK
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default DayReport;
