import React from 'react'
import {Grid, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
  loading: {
    fontFamily: 'Pacifico',
    fontSize: '2em',
    color: 'rgba(0, 0, 0, 0.75)',
    margin: '1em',
    marginBottom: '2em',
    textAlign: 'center'
  }
})

export function Loading () {
  const classes = useStyles()

  return (
    <Grid item xs={12} className={classes.loading}>
      Loading...
    </Grid>
  )
}