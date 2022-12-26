import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const DormList = React.lazy(() =>
  import(/* webpackChunkName: "dorm-list" */ './dorm-list/DormListMain')
);

const DormRegister = React.lazy(() =>
  import(/* webpackChunkName: "dorm-register" */ './dorm-register')
);

const Dorms = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/dorms`} />
      <Route
        path={`${match.url}/dorms`}
        render={(props) => <DormList {...props} />}
      />

      <Route
        path={`${match.url}/register`}
        render={(props) => <DormRegister {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dorms;
