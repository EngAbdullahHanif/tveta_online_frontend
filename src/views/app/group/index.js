import { userRole } from 'constants/defaultValues';
import { ProtectedRoute } from 'helpers/authHelper';
import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';

const GroupRegister = React.lazy(() =>
  import(/* webpackChunkName: "register" */ './group-register')
);

const GroupPremssions = React.lazy(() =>
  import(/* webpackChunkName: "premissions" */ './group-premissions')
);

const Groups = ({ match, props }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/groups`} />
      <ProtectedRoute
        path={`${match.url}/register`}
        component={GroupRegister}
        roles={[userRole.superUser, userRole.admin]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/premissions`}
        component={GroupPremssions}
        roles={[userRole.superUser, userRole.admin]}
        props={props}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Groups;
