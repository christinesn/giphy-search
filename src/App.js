import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { apiKey } from "./apiKey";
import axios from "axios";
import { Gif } from "./Gif";
import { Header } from "./Header";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { NoMoreResults } from "./NoMoreResults";
import { DetectScroll } from "./DetectScroll";
import { SearchSuggestions } from "./SearchSuggestions";

const useStyles = makeStyles({
  "@global": {
    body: {
      margin: 0,
      backgroundColor: "rgba(0, 0, 0, 0.01)"
    }
  },
  gifsContainer: {
    maxWidth: "95%",
    margin: "auto",
    marginTop: "6em",
    boxSizing: "border-box"
  }
});

function App() {
  const classes = useStyles();
  const [query, setQuery] = React.useState("");
  const [gifs, setGifs] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [paused, setPaused] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [noMoreResults, setNoMoreResults] = React.useState(false);
  const [loadMore, setLoadMore] = React.useState(false);

  /** Search */
  React.useEffect(() => {
    let canceled = false;

    async function search() {
      setNoMoreResults(false);
      setGifs([]);

      if (!query) {
        return;
      }

      setLoading(true);

      try {
        const res = await axios({
          method: "GET",
          url: "https://api.giphy.com/v1/gifs/search",
          validateStatus: () => true,
          params: {
            api_key: apiKey,
            q: query,
            rating: "PG",
            lang: "en"
          }
        });

        if (canceled) {
          return;
        }

        setGifs(res.data.data || []);

        if (res.data.meta.status !== 200) {
          setError(`${res.data.meta.status}: ${res.data.meta.msg}`);
        }
      } catch (error) {
        setError(`500: ${error.message}`);
      }

      setLoading(false);
    }

    search();
    return () => {
      canceled = true;
    };
  }, [query]);

  /** Infinite scroll */
  React.useEffect(() => {
    async function loadMoreResults() {
      if (!loadMore || noMoreResults || !query) return;
      setLoading(true);

      try {
        const res = await axios({
          method: "GET",
          url: "https://api.giphy.com/v1/gifs/search",
          validateStatus: () => true,
          params: {
            api_key: apiKey,
            q: query,
            rating: "PG",
            lang: "en",
            offset: gifs.length
          }
        });

        setGifs(gifs.concat(res.data.data || []));

        if (res.data.meta.status !== 200) {
          setError(`${res.data.meta.status}: ${res.data.meta.msg}`);
        }

        if (res.data.data.length === 0) {
          setNoMoreResults(true);
        }
      } catch (error) {
        setError(`500: ${error.message}`);
      }

      setLoadMore(false);
      setLoading(false);
    }

    loadMoreResults();
  }, [loadMore, noMoreResults, query, gifs]);

  return (
    <div>
      <DetectScroll
        gifsCount={gifs.length}
        loadMore={loadMore}
        setLoadMore={setLoadMore}
      />
      <Header
        paused={paused}
        setPaused={setPaused}
        setQuery={setQuery}
        query={query}
      />
      <Grid
        container
        justify="center"
        spacing={1}
        className={classes.gifsContainer}
      >
        {gifs.length === 0 && !query && (
          <SearchSuggestions setQuery={setQuery} />
        )}
        {gifs.map(gif => (
          <Gif gif={gif} key={gif.id} paused={paused} />
        ))}
        {loading && <Loading />}
        {error && <Error error={error} />}
        {noMoreResults && <NoMoreResults />}
      </Grid>
    </div>
  );
}

export default App;
