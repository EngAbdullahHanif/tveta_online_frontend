import { userRole } from 'constants/defaultValues';
import { ProtectedRoute } from 'helpers/authHelper';
import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';

const Todo = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './todo'),
);
const Survey = React.lazy(() =>
  import(/* webpackChunkName: "application-survey" */ './survey'),
);
const SurveyDetail = React.lazy(() =>
  import(/* webpackChunkName: "application-survey-detail" */ './survey-detail'),
);
const Chat = React.lazy(() =>
  import(/* webpackChunkName: "application-chat" */ './chat'),
);

const Applications = ({ match, props }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/todo`} />
      <ProtectedRoute
        path={`${match.url}/todo`}
        component={Todo}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/survey/:surveyid`}
        component={SurveyDetail}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
        isExact
      />
      <ProtectedRoute
        path={`${match.url}/survey`}
        component={Survey}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
        isExact
      />
      <ProtectedRoute
        path={`${match.url}/chat`}
        component={Chat}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Applications;
