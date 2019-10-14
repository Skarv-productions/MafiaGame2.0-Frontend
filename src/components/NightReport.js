import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class NightReport extends Component {
  state = {};

  next = () => {
    // If someone won or we died
    if (this.props.didSomeoneWin() || this.props.didIDie()) {
      this.props.changePage("GameOver");
    }
    // If game is still on and we survived
    else {
      this.props.changePage("DayVote");
    }
  };

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

export default NightReport;
