import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const SubjectRegister = React.lazy(() =>
  import(/* webpackChunkName: "subject-register" */ './subject-register')
);

const Curriculum = React.lazy(() =>
  import(/* webpackChunkName: "curriculum" */ './curriculum')
);
const Subjects = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/subjects`} />
      <Route
        path={`${match.url}/register`}
        render={(props) => <SubjectRegister {...props} />}
      />

      <Route
        path={`${match.url}/curriculum`}
        render={(props) => <Curriculum {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Subjects;
