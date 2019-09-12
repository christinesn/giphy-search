import React from 'react'
import {AppBar, makeStyles, Button, Grid, Hidden} from '@material-ui/core'
import {SearchForm} from './SearchForm'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPause, faPlay} from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: '#fffa7a',
    color: 'rgba(0, 0, 0, 0.75)',
    boxShadow: 'none',
    borderBottom: '2px solid #f0e94a'
  },
  title: {
    fontFamily: 'Pacifico',
    fontSize: '2em',
    height: '100%',
    padding: '0 1em',
    textShadow: '5px 0px 0px rgba(255, 255, 255, 0.9)',
    textTransform: 'none',
    borderRadius: 0,
    [theme.breakpoints.down('md')]: {
      fontSize: '1.7em'
    }
  },
  pauseButton: {
    float: 'right',
    marginLeft: 'auto',
    padding: '2.3em',
    borderRadius: 0,
    color: 'rgba(0, 0, 0, 0.75)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  }
}))

export function Header ({ paused, setPaused, setQuery, query }) {
  const classes = useStyles()

  return (
    <AppBar
      className={classes.header}
      variant="fixed"
    >
      <Grid container>
        <Hidden smDown>
          <Grid item xs={3}>
            <Button className={classes.title} onClick={() => setQuery('')}>
              Giphy Search
            </Button>
          </Grid>
        </Hidden>
        <Grid item xs>
          <SearchForm
            setQuery={setQuery}
            query={query}
          />
        </Grid>
        <Hidden xsDown>
          <Grid item xs={2}>
            <Button
              onClick={() => setPaused(!paused)}
              className={classes.pauseButton}
              title={paused ? 'Resume animations' : 'Pause animations'}
            >
              <FontAwesomeIcon
                icon={paused ? faPlay : faPause}
              />
            </Button>
          </Grid>
        </Hidden>
      </Grid>
    </AppBar>
  )
}