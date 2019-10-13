import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class SheriffChecked extends Component {
  state = {};

  next = () => {
    this.props.nightKill();
    this.props.changeStatus("day");
    this.props.changePage("NightMode");
  };

  render() {
    const chosen = this.props.players.find(
      player => player.name === this.props.sheriffChose
    );
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
            You checked {chosen.name}. They are{" "}
            {chosen.role === "mafia" ? "evil" : "good"}
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

export default SheriffChecked;
