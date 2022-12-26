import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ClassRegister = React.lazy(() =>
  import(/* webpackChunkName: "subject-register" */ './class-register')
);

const ClassList = React.lazy(() =>
  import(/* webpackChunkName: "subject-list" */ './class-list/ClassListMain')
);

const Classes = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/classes`} />
      <Route
        path={`${match.url}/classes`}
        render={(props) => <ClassList {...props} />}
      />
      <Route
        path={`${match.url}/register`}
        render={(props) => <ClassRegister {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Classes;
