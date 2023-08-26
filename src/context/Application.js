import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// import StudentRegistrationBio from "./Student/Registraion‌Bio";

import { adminRoot, roleRoots } from '../constants/defaultValues';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ '../views/app')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ '../views/error')
);
const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ '../views/unauthorized')
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ '../views/user')
);

function Application(props) {
  const { user } = useContext(AuthContext);

  // const root = '/app/dashboards/provincial';
  const root = roleRoots[user?.groups[0]?.name] || '/';

  return (
    <Switch>
      <Redirect exact from="/" to={`${root}`} />
      <Route path="/user" render={(props) => <ViewUser {...props} />} />
      <Route path={adminRoot} render={(props) => <ViewApp {...props} />} />

      <Route path="/error" exact render={(props) => <ViewError {...props} />} />
      <Route
        path="/unauthorized"
        exact
        render={(props) => <ViewUnauthorized {...props} />}
      />
      <Route path="/user" render={(props) => <ViewUser {...props} />} />
    </Switch>
  );
}

export default Application;
