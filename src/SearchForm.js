import React from "react";
import { InputBase, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    textAlign: "center",
    width: "100%"
  },
  input: {
    width: "calc(100% - 64px - 80px)",
    margin: "0.5em",
    borderRadius: 0,
    padding: "0.5em 1em",
    border: "4px solid #f0e94a",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    fontWeight: "bold",
    fontSize: "1.1em",
    color: "rgba(0, 0, 0, 0.6)",
    transition: "border 0.3s",
    "&:hover": {
      border: "4px solid #e3db0b"
    },
    "&$focus": {
      outline: "4px solid #e3db0b"
    }
  },
  button: {
    width: 64,
    margin: "0.5em",
    marginTop: "0.2em",
    marginLeft: 0,
    boxSizing: "border-box",
    fontSize: "1.2em",
    fontFamily: "Pacifico",
    color: "rgba(0, 0, 0, 0.7)",
    padding: "0.4em 2.25em",
    textTransform: "none",
    borderRadius: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    border: "4px solid #f0e94a",
    "&$focus": {
      outline: "4px solid #e3db0b"
    }
  },
  focus: {}
});

export function SearchForm({ setQuery, query }) {
  const classes = useStyles();
  const [input, setInput] = React.useState("");

  function handleSubmit(e) {
    e && e.preventDefault();
    setQuery(input);
  }

  React.useEffect(() => {
    setInput(query);
  }, [query]);

  return (
    <form onSubmit={handleSubmit} className={classes.container}>
      <InputBase
        classes={{
          root: classes.input,
          focused: classes.focus
        }}
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Search for Gifs"
      />
      <Button
        classes={{
          root: classes.button,
          focusVisible: classes.focus
        }}
        type="submit"
        variant="outlined"
        data-testid="search"
      >
        Search
      </Button>
    </form>
  );
}
