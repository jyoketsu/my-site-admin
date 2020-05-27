import React from "react";
import Loadable from "react-loadable";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

export default function Pages() {
  const App = Loadable({
    loader: () => import("./App"),
    loading: () => <div />,
  });
  const Login = Loadable({
    loader: () => import("./components/pages/Login"),
    loading: () => <div />,
  });

  const NotFound = Loadable({
    loader: () => import("./components/pages/NotFound"),
    loading: () => <div />,
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" push />} />
        <Route path="/home" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/404" component={NotFound} />
      </Switch>
    </Router>
  );
}
