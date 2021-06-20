import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ThemeContext from "./ThemeContext";

import SearchParams from "./SearchParams";
import Details from "./Details";

const App = () => {
  const theme = useState("darkblue");
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Router>
          <header>
            <Link to="/">
              <h1>Adopt Me!</h1>
            </Link>
          </header>
          <Switch>
            <Route path="/details/:id" exact>
              <Details />
            </Route>

            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

render(<App />, document.getElementById("root"));
