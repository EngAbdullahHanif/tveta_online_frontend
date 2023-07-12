import { userRole } from 'constants/defaultValues';
import { ProtectedRoute } from 'helpers/authHelper';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const TeacherList = React.lazy(() =>
  import(
    /* webpackChunkName: "teacher-list" */ './bio/teacher-list/TeacherListMain'
  )
);

// This used to create a sub memu of the sidebar.
const TeacherRegister = React.lazy(() =>
  import(/* webpackChunkName: "teacher-register" */ './bio/teacher-register')
);

// This used to create a sub memu of the sidebar.
const TeacherProfile = React.lazy(() =>
  import(/* webpackChunkName: "profile" */ './bio/teacher-profile')
);

const TeacherHrEvaluation = React.lazy(() =>
  import(
    /* webpackChunkName: "hr-evaluation" */ '../hr-evaluation/teacher-hr-evaluation'
  )
);
const TeacherPromotionDemotion = React.lazy(() =>
  import(
    /* webpackChunkName: "promotion-demotion" */ './promotion-demotion-list/PromotionDemotionListMain'
  )
);
const TeacherTransfer = React.lazy(() =>
  import(/* webpackChunkName: "teacher-transfer" */ './bio/teacher-transfer')
);

const Main = React.lazy(() =>
  import(/* webpackChunkName: "register-1" */ '../main-register-route')
);

const Test = React.lazy(() =>
  import(/* webpackChunkName: "teacher-transfer" */ './test')
);

const Teachers = ({ match, props }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/teachers`} />
      <ProtectedRoute
        path={`${match.url}/teachers`}
        component={TeacherList}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />

      {/* Teacher register sub menu is created */}
      <ProtectedRoute
        exact
        path={`${match.url}/register`}
        component={TeacherRegister}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/register/:teacherId`}
        component={TeacherRegister}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/teacher-hr-evalaution`}
        component={TeacherHrEvaluation}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/teacher/:teacherId`}
        component={TeacherProfile}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      {/* <ProtectedRoute
        path={`${match.url}/teacher-evalaution/:teacherId`}
        component={TeacherEvaluation}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      /> */}
      <ProtectedRoute
        path={`${match.url}/teacher-promotion-demotion`}
        component={TeacherPromotionDemotion}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />

      <ProtectedRoute
        path={`${match.url}/teacher-transfer`}
        component={TeacherTransfer}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/register-1`}
        component={Main}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/test`}
        component={Test}
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
export default Teachers;
