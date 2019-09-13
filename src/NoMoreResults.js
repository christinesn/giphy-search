import React from "react";
import { makeStyles, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    textAlign: "center",
    marginTop: "4em",
    marginBottom: "8em"
  },
  header: {
    fontFamily: "Pacifico",
    fontSize: "1.8em",
    marginBottom: "0.5em"
  }
});

export function NoMoreResults() {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.container}>
      <Typography className={classes.header} variant="h5">
        That's all.
      </Typography>
      <Typography>
        There are no more results. Why not search for something else?
      </Typography>
    </Grid>
  );
}
