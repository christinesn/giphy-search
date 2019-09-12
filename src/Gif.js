import React from 'react'
import {Grid, CardActionArea, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  gif: {
    height: 200,
    width: 'auto',
    borderBottom: '7px solid #f0e94a'
  }
}))

export function Gif ({ gif, paused }) {
  const classes = useStyles()

  return (
    <Grid item>
      <CardActionArea
        href={gif.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={paused ? gif.images.fixed_height_still.url : gif.images.fixed_height.url}
          alt={gif.title}
          className={classes.gif}
        />
      </CardActionArea>
    </Grid>
  )
}