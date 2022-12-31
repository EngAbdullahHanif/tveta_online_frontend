import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const EvaluationList = React.lazy(() =>
  import(
    /* webpackChunkName: "evaluation-list" */ './evaluation-list/EvaluationListMain'
  )
);

const PromotionDemotion = React.lazy(() =>
  import(
    /* webpackChunkName: "promotion-demotion" */ './teacher-promotion-demotion'
  )
);

const Evaluations = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/evaluations`} />
      <Route
        path={`${match.url}/evaluations`}
        render={(props) => <EvaluationList {...props} />}
      />
      <Route
        path={`${match.url}/promotion-demotion`}
        render={(props) => <PromotionDemotion {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Evaluations;
