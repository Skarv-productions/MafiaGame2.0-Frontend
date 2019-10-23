import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Slide from "@material-ui/core/Slide";

class StartPage extends Component {
  state = {
    name: "",
    code: "",
    showButtons: false
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value.toUpperCase() });
  };

  nameDone = () => {
    if (!this.state.showButtons && this.state.name) {
      console.log("Fired!");
      this.setState({ showButtons: true });
    }
  };

  render() {
    const buttonFragment = this.state.showButtons ? (
      <React.Fragment>
        {/* <Slide in={true} direction="up">
          <Grid item>
            <Typography variant="h6">
              Do you want to create a new game
            </Typography>
          </Grid>
        </Slide> */}

        <Slide in={true} direction="up">
          <Grid item>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => {
                this.props.createGame(this.state.name);
              }}
            >
              Create New Game
            </Button>
          </Grid>
        </Slide>

        {/* <Slide in={true} direction="up">
          <Grid item>
            <Typography variant="h6">or join an existing game?</Typography>
          </Grid>
        </Slide> */}

        <Slide in={true} direction="up">
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
        </Slide>

        <Slide in={true} direction="up">
          <Grid item>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => {
                this.props.joinGame(this.state.code, this.state.name);
              }}
            >
              Join Existing Game
            </Button>
          </Grid>
        </Slide>
      </React.Fragment>
    ) : (
      ""
    );

    return (
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        spacing={4}
      >
        <Slide in={true} direction="up">
          <Grid item>
            <Typography variant="h6">What's your name?</Typography>
          </Grid>
        </Slide>
        <Slide in={true} direction="up">
          <Grid item>
            <FormControl error={this.props.nameError.active}>
              <Input
                id="component-error"
                placeholder="Write your name here"
                onChange={this.onChange}
                name="name"
                onBlur={this.nameDone}
              />
              <FormHelperText id="component-error-text">
                {this.props.nameError.text}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Slide>
        {buttonFragment}
      </Grid>
    );
  }
}

export default StartPage;
