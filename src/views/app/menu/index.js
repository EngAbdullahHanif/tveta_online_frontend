import { userRole } from 'constants/defaultValues';
import { ProtectedRoute } from 'helpers/authHelper';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const MenuTypes = React.lazy(() =>
  import(/* webpackChunkName: "menu-types" */ './types')
);
const Levels = React.lazy(() =>
  import(/* webpackChunkName: "menu-levels" */ './levels')
);

const UI = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/types`} />
      <ProtectedRoute
        path={`${match.url}/types`}
        component={MenuTypes}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/levels`}
        component={Levels}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default UI;
