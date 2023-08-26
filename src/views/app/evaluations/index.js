import { ProtectedRoute } from 'helpers/authHelper';
import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { userRole } from 'constants/defaultValues';

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

const EvaluationDetails = React.lazy(() =>
  import(/* webpackChunkName: "promotion-demotion" */ './evaluation-details')
);

const TeacherEvaluation = React.lazy(() =>
  import(/* webpackChunkName: "teacher-evaluation" */ './teacher-evaluation')
);

const Evaluations = ({ match, props }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/evaluations`} />
      <ProtectedRoute
        path={`${match.url}/evaluations`}
        component={EvaluationList}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      <ProtectedRoute
        exact
        path={`${match.url}/teacher-evalaution`}
        component={TeacherEvaluation}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/promotion-demotion`}
        component={PromotionDemotion}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/evaluation-details`}
        component={EvaluationDetails}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Evaluations;
