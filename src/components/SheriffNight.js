import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class SheriffNight extends Component {
  state = {
    language: "Swe",
    text: [
      { lang: "Swe", content: "Vem vill du kolla?" },
      { lang: "Eng", content: "Who do you want to check?" },
      { lang: "Tung", content: "Shokiraba shando rakato?" }
    ]
  };

  render() {
    return (
      <React.Fragment>
        <Grid item>
          <Typography variant="h3">
            {
              this.state.text.find(text => text.lang === this.state.language)
                .content
            }
          </Typography>
        </Grid>

        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          spacing={4}
        >
          {this.props.players.map(player => (
            <Grid item key={player.name}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => {
                  this.props.sheriffCheck(player);
                }}
              >
                {player.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

export default SheriffNight;
