import React, { Component } from "react";
import { Router, Route, IndexRoute, browserHistory } from "react-router-dom";
import App from "./App";
import Result from "./Result";
class Routers extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="App" component={App} />
        <Route path="Result" component={Result} />
      </Router>
    );
  }
}
export default Routers;
