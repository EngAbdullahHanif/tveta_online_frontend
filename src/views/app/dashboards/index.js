import { userRole } from 'constants/defaultValues';
import { ProtectedRoute } from 'helpers/authHelper';
import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
// import { ProtectedRoute, userRole } from 'helpers/authHelper';

const Admin = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './admin')
);

const Provincial = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-provincial" */ './ProvincialDashboard')
);

const InstituteDashboard = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-provincial" */ './InstituteDashboard')
);

const Dashboards = ({ match, props }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/admin`} />
      <ProtectedRoute
        path={`${match.url}/admin`}
        component={Admin}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.instituteDataentry,
          userRole.instituteManager,
          userRole.provinceDataentry,
          userRole.provinceSupervisor,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/provincial`}
        component={Provincial}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provinceDataentry,
          userRole.provinceSupervisor,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/institute`}
        component={InstituteDashboard}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.instituteManager,
          userRole.instituteDataentry,
        ]}
        props={props}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dashboards;
