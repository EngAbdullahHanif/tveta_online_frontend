import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const InstituteList = React.lazy(() =>
  import(
    // /* webpackChunkName: "institue-list" */ './bio/institute-list/InstituteListMain'
    './institute-list/InstituteListMain'
  )
);
const InstituteRegister = React.lazy(() => import('./institute-register.js'));

const InstitueCreate = React.lazy(() =>
  import(/* webpackChunkName: "institue-create" */ './institute-create')
);
const InstituteUpgrade = React.lazy(() =>
  import(/* webpackChunkName: "institute-upgrade" */ './institute-upgrade')
);

const Institues = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/institutes`} />
      <Route
        path={`${match.url}/institutes`}
        render={(props) => <InstituteList {...props} />}
      />

      <Route
        path={`${match.url}/register`}
        render={(props) => <InstituteRegister {...props} />}
      />
      <Route
        path={`${match.url}/institute-create`}
        render={(props) => <InstitueCreate {...props} />}
      />

      <Route
        path={`${match.url}/institute-upgrade`}
        render={(props) => <InstituteUpgrade {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Institues;
