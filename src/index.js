import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";
import { Provider } from 'react-redux';
import { Store } from './store';

import indexRoutes from "routes/index.jsx";

import "assets/scss/material-kit-react.css";

var hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={Store}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} key={key} component={prop.component} />;
        })}
      </Switch>
    </Router>
  </Provider>,
    document.getElementById("root")
);
