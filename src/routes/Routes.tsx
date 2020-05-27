import React from "react";
import { Switch, Route } from "react-router-dom";
import routers from "./index";

export default function Routes() {
  return (
    <Switch>
      {routers.map((r, key) => (
        <Route
          key={key}
          component={r.component}
          exact={!!r.exact}
          path={r.path}
        />
      ))}
    </Switch>
  );
}
