import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

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
        menuItems.push(<MenuItem value={i}>{this.state.numbers[i]}</MenuItem>);
      }
    }

    return menuItems;
  };

  render() {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={4}
        style={{ minHeight: "98vh", textAlign: "center" }}
      >
        <Grid item>
          <Typography variant="h4">Choose roles</Typography>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel htmlFor="mafia-input">Mafia</InputLabel>
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

        <Grid item>
          <FormControl>
            <InputLabel htmlFor="sheriff-input">Sheriff</InputLabel>
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

        <Grid item>
          <FormControl>
            <InputLabel htmlFor="doctor-input">Doctor</InputLabel>
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

        <Grid item>
          <Tooltip title="You need atleast 3 players" open={this.state.locked}>
            <span>
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
            </span>
          </Tooltip>
        </Grid>
      </Grid>
    );
  }
}

export default AdminPanel;
