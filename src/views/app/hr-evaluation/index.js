import { userRole } from 'constants/defaultValues';
import { ProtectedRoute } from 'helpers/authHelper';
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

const HREvaluations = ({ match, props }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/hr-evaluations`}
      />
      <ProtectedRoute
        path={`${match.url}/hr-evaluations`}
        component={HREvaluationList}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/teacher-hr-evaluation`}
        component={HREvaluation}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default HREvaluations;
