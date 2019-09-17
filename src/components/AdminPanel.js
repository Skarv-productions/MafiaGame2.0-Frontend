import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

class AdminPanel extends Component {
  state = {
    mafia: 1,
    sheriff: 0,
    doctor: 0
  };

  handleChange = event => {
    console.log("CHange!");
    this.setState({ [event.target.name]: event.target.value });
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
              value={this.state.mafia}
              name="mafia"
            >
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
              <MenuItem value={4}>Four</MenuItem>
              <MenuItem value={5}>Five</MenuItem>
              <MenuItem value={6}>Six</MenuItem>
              <MenuItem value={7}>Seven</MenuItem>
              <MenuItem value={8}>Eight</MenuItem>
              <MenuItem value={9}>Nine</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl>
            <InputLabel htmlFor="sheriff-input">Sheriff</InputLabel>
            <Select
              style={{ width: "200px" }}
              onChange={this.handleChange}
              value={this.state.sheriff}
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
              value={this.state.doctor}
              name="doctor"
            >
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={1}>One</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Button variant="contained" size="large" color="secondary">
            Start Game
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default AdminPanel;
