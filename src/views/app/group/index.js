import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const GroupRegister = React.lazy(() =>
  import(/* webpackChunkName: "register" */ './group-register')
);

const GroupPremssions = React.lazy(() =>
  import(/* webpackChunkName: "premissions" */ './group-premissions')
);

const Groups = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/groups`} />
      <Route
        path={`${match.url}/register`}
        render={(props) => <GroupRegister {...props} />}
      />
      <Route
        path={`${match.url}/premissions`}
        render={(props) => <GroupPremssions {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Groups;
