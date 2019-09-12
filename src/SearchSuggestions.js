import React from 'react'
import {Grid, Typography, Button, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    textAlign: 'center',
    padding: '0 2em !important',
    marginTop: '2em',
    marginBottom: '5em'
  },
  header: {
    fontFamily: 'Pacifico',
    marginBottom: '0.5em'
  },
  button: {
    padding: 0,
    textTransform: 'none',
    boxSizing: 'border-box',
    borderRadius: 0,
    fontSize: '1em',
    minWidth: 0,
    marginTop: '-0.25em',
    fontWeight: 'bold',
    color: '#65ad32',
    '&:hover': {
      background: 'transparent',
      borderBottom: '3px solid #65ad32'
    }
  }
}))

export function SearchSuggestions ({ setQuery }) {
  const classes = useStyles()

  const suggestions = [
    'laughing',
    'cats',
    'mermaids',
    'spongebob',
    'squidward',
    'puppies'
  ]

  const suggest = suggestions[Math.floor(Math.random() * suggestions.length)]

  return (
    <Grid item xs className={classes.container}>
      <Typography variant="h4" className={classes.header}>
        Search for gifs.
      </Typography>
      <Typography>
        Search&nbsp;
          <Button
            href="https://giphy.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.button}
          >
            Giphy's  
          </Button>
          &nbsp;trove of gifs. (Only PG results will be returned.)
        <br />Why not search for&nbsp;
        <Button
          onClick={() => setQuery(suggest)}
          className={classes.button}
        >
          {suggest}
        </Button>
        ?
      </Typography>
    </Grid>
  )
}