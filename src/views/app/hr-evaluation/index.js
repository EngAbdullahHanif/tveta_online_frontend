import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const HREvaluationList = React.lazy(() =>
  import(
    /* webpackChunkName: "evaluation-list" */ './hr-evaluation-list/HREvaluationListMain'
  )
);
const HREvaluation = React.lazy(() =>
  import(
    /* webpackChunkName: "teacher-hr-evalaution" */ './teacher-hr-evaluation'
  )
);

const HREvaluations = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/hr-evaluations`}
      />
      <Route
        path={`${match.url}/hr-evaluations`}
        render={(props) => <HREvaluationList {...props} />}
      />
      <Route
        path={`${match.url}/teacher-hr-evaluation`}
        render={(props) => <HREvaluation {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default HREvaluations;
