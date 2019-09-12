import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

class StartPage extends Component {
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
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => {
              this.props.changePage("GameLobby");
            }}
          >
            Create Game
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="h6">or join an existing game</Typography>
        </Grid>

        <Grid item>
          <TextField placeholder="Write game code here"></TextField>
        </Grid>

        <Grid item>
          <Button variant="contained" size="large" color="primary">
            Join Game
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default StartPage;
