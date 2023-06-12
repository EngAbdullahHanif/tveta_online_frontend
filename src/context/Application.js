import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// import StudentRegistrationBio from "./Student/Registraion‌Bio";

import { adminRoot } from "../constants/defaultValues";

const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "../views/app")
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ "../views/error")
);
const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ "../views/unauthorized")
);

function Application(props) {
  return (
    <Switch>
      <Redirect exact from="/user/login" to={`${adminRoot}`} />
      <Route path={adminRoot} render={(props) => <ViewApp {...props} />} />
      s
      <Route path="/error" exact render={(props) => <ViewError {...props} />} />
      <Route
        path="/unauthorized"
        exact
        render={(props) => <ViewUnauthorized {...props} />}
      />
      {/* <Route path="/std" exact render={(props) => <StudentRegistrationBio />} /> */}
      <Redirect to="/error" />
    </Switch>
  );
}

export default Application;
