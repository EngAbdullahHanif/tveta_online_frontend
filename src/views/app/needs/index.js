import { ProtectedRoute } from 'helpers/authHelper';
import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { userRole } from 'constants/defaultValues';
import NeedRegister from './register';

const WorkshopList = React.lazy(() =>
  import(
    /* webpackChunkName: "evaluation-list" */ './evaluation-list/WorkshopListMain'
  ),
);

const EvaluationDetails = React.lazy(() =>
  import(/* webpackChunkName: "promotion-demotion" */ './evaluation-details'),
);

const Evaluations = ({ match, props }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/evaluations`} />
      <ProtectedRoute
        path={`${match.url}/needs`}
        component={WorkshopList}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      <ProtectedRoute
        exact
        path={`${match.url}/register`}
        component={NeedRegister}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      <ProtectedRoute
        exact
        path={`${match.url}/register/:needId`}
        component={NeedRegister}
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
