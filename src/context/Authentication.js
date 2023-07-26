import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const ViewHome = React.lazy(() =>
  import(/* webpackChunkName: "views" */ '../views/home')
);

const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ '../views/user')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ '../views/error')
);
const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ '../views/unauthorized')
);
function Authentication(props) {
  return (
    <Switch>
      <Route path="/user" render={(props) => <ViewUser {...props} />} />
      <Route path="/error" exact render={(props) => <ViewError {...props} />} />
      <Route
        path="/unauthorized"
        exact
        render={(props) => <ViewUnauthorized {...props} />}
      />
      <Route path="/" exact render={(props) => <ViewHome {...props} />} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Authentication;
