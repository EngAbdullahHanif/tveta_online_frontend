import { ProtectedRoute } from 'helpers/authHelper';
import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { userRole } from 'constants/defaultValues';
import TeacherSelection from './teacher-selection';
import EmployeeEvaluation from './employee-evaluation';
import EvaluationListing from './evaluation-list/EvaluationListing';

const EvaluationList = React.lazy(() =>
  import(
    /* webpackChunkName: "evaluation-list" */ './evaluation-list/EvaluationListMain'
  ),
);

const PromotionDemotion = React.lazy(() =>
  import(
    /* webpackChunkName: "promotion-demotion" */ './teacher-promotion-demotion'
  ),
);

const EvaluationDetails = React.lazy(() =>
  import(/* webpackChunkName: "promotion-demotion" */ './evaluation-details'),
);

const TeacherEvaluation = React.lazy(() =>
  import(/* webpackChunkName: "teacher-evaluation" */ './teacher-evaluation'),
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
        path={`${match.url}/employee-evalaution`}
        component={EmployeeEvaluation}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      <ProtectedRoute
        exact
        path={`${match.url}/teacher-evalaution/:type/:teacherId`}
        component={TeacherEvaluation}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      <ProtectedRoute
        exact
        path={`${match.url}/teacher-evalaution/:type`}
        component={TeacherSelection}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      <ProtectedRoute
        exact
        path={`${match.url}/employee/:type`}
        component={EvaluationListing}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      {/* <ProtectedRoute
        exact
        path={`${match.url}/teacher-evalaution/needs`}
        component={TeacherSelection}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      /> */}
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
