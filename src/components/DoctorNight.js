import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class DoctorNight extends Component {
  state = {
    language: "Swe",
    text: [
      { lang: "Swe", content: "Vem vill du rädda?" },
      { lang: "Eng", content: "Who do you want to save?" },
      { lang: "Tung", content: "Shokiraba shando lababa?" }
    ]
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
          <Typography variant="h3">
            {
              this.state.text.find(text => text.lang === this.state.language)
                .content
            }
          </Typography>
        </Grid>

        {this.props.players.map(player => (
          <Grid item>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => {
                this.props.doctorMark(player);
              }}
            >
              {player.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default DoctorNight;
