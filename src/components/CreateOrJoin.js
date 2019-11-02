import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Slide from "@material-ui/core/Slide";

class CreateOrJoin extends Component {
  state = {};
  render() {
    return (
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
        <Grid item></Grid>
        <Grid item></Grid>

        <Slide in={true} direction="up">
          <Grid item>
            <FormControl error={this.props.codeError.active}>
              <Input
                id="component-error"
                placeholder="Existing game code here"
                onChange={this.props.onChange}
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
                this.props.joinGame(this.props.code, this.props.name);
              }}
            >
              Join Existing Game
            </Button>
          </Grid>
        </Slide>
      </React.Fragment>
    );
  }
}

export default CreateOrJoin;
