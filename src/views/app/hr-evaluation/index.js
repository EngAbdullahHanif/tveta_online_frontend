import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const HREvaluationList = React.lazy(() =>
  import(
    /* webpackChunkName: "evaluation-list" */ './hr-evaluation-list/HREvaluationListMain'
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

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default HREvaluations;
