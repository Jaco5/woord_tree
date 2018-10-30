import React, { Fragment } from "react";
import Tree from "./Pages/Tree";
import Info from "./Pages/Info";
import NoMatch from "./Pages/NoMatch";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => (
  <Router>
    <Fragment>
      <Nav />
      <Switch>
        <Route exact path="/info" component={Info} />
        <Route exact path="/" component={Tree} />
        <Route component={NoMatch} />
      </Switch>

    </Fragment>
  </Router>

);

export default App;
