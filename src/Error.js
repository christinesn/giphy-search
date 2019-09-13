import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles({
  error: {
    padding: "1em",
    backgroundColor: "#f2dddc",
    width: "50%",
    margin: "auto",
    textAlign: "center",
    borderRadius: 10,
    border: "3px solid #ebc2c0",
    fontSize: "0.95em"
  },
  icon: {
    marginRight: "0.5em",
    color: "#d49390"
  }
});

export function Error({ error }) {
  const classes = useStyles();
  console.error(error);

  return (
    <Grid item xs={12}>
      <Typography className={classes.error}>
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className={classes.icon}
        />
        Error {error}
      </Typography>
    </Grid>
  );
}
