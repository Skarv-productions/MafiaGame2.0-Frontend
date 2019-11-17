import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import Slide from "@material-ui/core/Slide";

class AdminPanel extends Component {
  state = {
    roles: {
      mafia: 1,
      sheriff: 0,
      doctor: 0
    },
    numbers: [
      "None",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve"
    ],
    locked: this.props.players.length > 2 ? false : true
  };

  handleChange = event => {
    console.log("Change!");
    this.setState(prevState => ({
      roles: Object.assign(prevState.roles, {
        [event.target.name]: event.target.value
      })
    }));
  };

  mafiaMenuItems = () => {
    let menuItems = [];

    const players = this.props.players.length;

    if (players > 2) {
      for (let i = 2; i <= Math.ceil(players / 2) - 1; i++) {
        menuItems.push(
          <MenuItem key={i} value={i}>
            {this.state.numbers[i]}
          </MenuItem>
        );
      }
    }

    return menuItems;
  };

  render() {
    return (
      <React.Fragment>
        <Slide
          in={this.props.transition.in}
          direction="down"
          timeout={this.props.transition.timeout}
          unmountOnExit
        >
          <Grid item>
            <Typography variant="h4">Choose roles</Typography>
          </Grid>
        </Slide>

        <Zoom
          in={this.props.transition.in}
          timeout={this.props.transition.timeout}
          unmountOnExit
        >
          <Grid item>
            <FormControl>
              <InputLabel htmlFor="mafia">Mafia</InputLabel>
              <Select
                style={{ width: "200px" }}
                onChange={this.handleChange}
                value={this.state.roles.mafia}
                name="mafia"
              >
                <MenuItem value={1}>One</MenuItem>
                {this.mafiaMenuItems()}
              </Select>
            </FormControl>
          </Grid>
        </Zoom>

        <Zoom
          in={this.props.transition.in}
          timeout={this.props.transition.timeout}
          unmountOnExit
        >
          <Grid item>
            <FormControl>
              <InputLabel htmlFor="sheriff">Sheriff</InputLabel>
              <Select
                style={{ width: "200px" }}
                onChange={this.handleChange}
                value={this.state.roles.sheriff}
                name="sheriff"
              >
                <MenuItem value={0}>None</MenuItem>
                <MenuItem value={1}>One</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Zoom>

        <Zoom
          in={this.props.transition.in}
          timeout={this.props.transition.timeout}
          unmountOnExit
        >
          <Grid item>
            <FormControl>
              <InputLabel htmlFor="doctor">Doctor</InputLabel>
              <Select
                style={{ width: "200px" }}
                onChange={this.handleChange}
                value={this.state.roles.doctor}
                name="doctor"
              >
                <MenuItem value={0}>None</MenuItem>
                <MenuItem value={1}>One</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Zoom>

        <Grid item>
          <Tooltip title="You need atleast 3 players" open={this.state.locked}>
            <span>
              <Slide
                in={this.props.transition.in}
                direction="up"
                timeout={this.props.transition.timeout}
                unmountOnExit
              >
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  disabled={this.state.locked}
                  onClick={() => {
                    this.props.startGame(this.state.roles);
                  }}
                >
                  Start Game
                </Button>
              </Slide>
            </span>
          </Tooltip>
        </Grid>
      </React.Fragment>
    );
  }
}

export default AdminPanel;
