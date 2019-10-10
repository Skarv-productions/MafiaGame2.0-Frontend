import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class DoctorSaved extends Component {
  state = {};

  next = () => {
    this.props.changeStatus("sheriff");
    this.props.changePage("NightMode");
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
            You chose {this.props.doctorChose} to be saved
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

export default DoctorSaved;
