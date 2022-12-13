import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const InstitueList = React.lazy(() =>
  import(/* webpackChunkName: "institue-list" */ './institute-list')
);

const InstitueCreate = React.lazy(() =>
  import(/* webpackChunkName: "institue-create" */ './institute-create')
);

const Institues = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/institutes`} />
      <Route
        path={`${match.url}/institutes`}
        render={(props) => <InstitueList {...props} />}
      />
      <Route
        path={`${match.url}/institute-create`}
        render={(props) => <InstitueCreate {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Institues;
