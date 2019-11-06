import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Slide from "@material-ui/core/Slide";
import CreateOrJoin from "./CreateOrJoin";

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
    return (
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
        spacing={4}
      >
        <Slide
          in={this.props.transition.in}
          direction="up"
          timeout={this.props.transition.timeout}
        >
          <Grid item>
            <Typography variant="h6">What's your name?</Typography>
          </Grid>
        </Slide>
        <Slide
          in={this.props.transition.in}
          direction="up"
          timeout={this.props.transition.timeout}
        >
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
        {this.state.showButtons && (
          <CreateOrJoin
            createGame={this.props.createGame}
            nameError={this.props.nameError}
            codeError={this.props.codeError}
            joinGame={this.props.joinGame}
            onChange={this.onChange}
            name={this.state.name}
            code={this.state.code}
            transition={this.props.transition}
          />
        )}
      </Grid>
    );
  }
}

export default StartPage;
