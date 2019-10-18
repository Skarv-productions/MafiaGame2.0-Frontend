import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

class StartPage extends Component {
  state = {
    name: "",
    code: ""
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value.toUpperCase() });
  };

  render() {
    return (
      <React.Fragment>
        <Grid item>
          <Typography variant="h2">Mafia Game</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6">What's your name?</Typography>
        </Grid>

        <Grid item>
          <FormControl error={this.props.nameError.active}>
            <Input
              id="component-error"
              placeholder="Write your name here"
              onChange={this.onChange}
              name="name"
            />
            <FormHelperText id="component-error-text">
              {this.props.nameError.text}
            </FormHelperText>
          </FormControl>
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
          <FormControl error={this.props.codeError.active}>
            <Input
              id="component-error"
              placeholder="Write game code here"
              onChange={this.onChange}
              name="code"
            />
            <FormHelperText>{this.props.codeError.text}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => {
              this.props.joinGame(this.state.code, this.state.name);
            }}
          >
            Join Game
          </Button>
        </Grid>
      </React.Fragment>
    );
  }
}

export default StartPage;
