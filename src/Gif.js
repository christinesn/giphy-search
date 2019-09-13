import React from 'react'
import {Grid, CardActionArea, makeStyles} from '@material-ui/core'
import classnames from 'classnames'

const useStyles = makeStyles({
  gif: {
    height: 200,
    width: 'auto',
    borderBottom: '7px solid #f0e94a'
  },
  loading: {
    width: 250,
    backgroundColor: 'rgba(0, 0, 0, 0.02)'
  }
})

export function Gif ({ gif, paused }) {
  const classes = useStyles()
  const [loaded, setLoaded] = React.useState(false)

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
          className={classnames(
            classes.gif,
            { [classes.loading]: !loaded }
          )}
          onLoad={() => setLoaded(true)}
          data-testid={paused ? 'paused' : 'animated'}
        />
      </CardActionArea>
    </Grid>
  )
}