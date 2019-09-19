import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

class StartPage extends Component {
  state = {
    name: "",
    code: ""
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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
          <Typography variant="h6">What's your name?</Typography>
        </Grid>

        <Grid item>
          <TextField
            onChange={this.onChange}
            name="name"
            placeholder="Write your name here"
          ></TextField>
        </Grid>

        <Grid item>
          <Typography variant="h6">Do you want to create a new game</Typography>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => {
              this.props.createGame(this.state.name);
            }}
          >
            Create Game
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="h6">or join an existing game?</Typography>
        </Grid>

        <Grid item>
          <TextField
            onChange={this.onChange}
            name="code"
            placeholder="Write game code here"
          ></TextField>
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
