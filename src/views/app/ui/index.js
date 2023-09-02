import { userRole } from 'constants/defaultValues';
import { ProtectedRoute } from 'helpers/authHelper';
import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';

const Forms = React.lazy(() =>
  import(/* webpackChunkName: "ui-forms" */ './forms'),
);
const Components = React.lazy(() =>
  import(/* webpackChunkName: "ui-components" */ './components'),
);

const UI = ({ match, props }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/forms`} />
      <ProtectedRoute
        path={`${match.url}/forms`}
        component={Forms}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/components`}
        component={Components}
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
