import React from "react";
import Loadable from "react-loadable";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "../../components/common/Loading";

export default function Index() {
  const Articles = Loadable({
    loader: () => import("../article/Articles"),
    loading: () => <Loading />,
  });
  const Article = Loadable({
    loader: () => import("../article/Article"),
    loading: () => <Loading />,
  });
  return (
    <Switch>
      <Route exact path="/home/article" component={Articles} />
      <Route path="/home/article/:id" component={Article} />
      <Redirect to="/404" />
    </Switch>
  );
}
