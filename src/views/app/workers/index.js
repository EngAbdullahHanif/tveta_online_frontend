import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Worker = React.lazy(() =>
  import(/* webpackChunkName: "worker" */ './worker-register'),
);
const WorkerList = React.lazy(() =>
  import(/* webpackChunkName: "worker" */ './worker-list/workerListMain'),
);

// This used to create a sub memu of the sidebar.
const WorkerProfile = React.lazy(() =>
  import(/* webpackChunkName: "profile" */ './worker-list/worker-profile'),
);

const Teachers = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/teachers`} />

      <Route
        path={`${match.url}/worker`}
        render={(props) => <Worker {...props} />}
      />
      <Route
        path={`${match.url}/worker-List`}
        render={(props) => <WorkerList {...props} />}
      />
      <Route
        path={`${match.url}/:workerId`}
        render={(props) => <WorkerProfile {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Teachers;
