import { ProtectedRoute } from 'helpers/authHelper';
import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { userRole } from 'constants/defaultValues';

const DormList = React.lazy(() =>
  import(/* webpackChunkName: "dorm-list" */ './dorm-list/DormListMain'),
);

const DormRegister = React.lazy(() =>
  import(/* webpackChunkName: "dorm-register" */ './dorm-register'),
);

const StudentDormList = React.lazy(() =>
  import(
    /* webpackChunkName: "student-dorm-list" */ './dorm-students-list/DormStudentsListMain'
  ),
);

const StudentRegistrationInDorm = React.lazy(() =>
  import(
    /* webpackChunkName: "student-register" */ './student-register-in-dorm'
  ),
);

const DormProfile = React.lazy(() =>
  import(/* webpackChunkName: "details" */ './dorm-profile'),
);

const DormStudentDismissal = React.lazy(() =>
  import(
    /* webpackChunkName: "student-dismissal" */ './dorm-student-dismissal'
  ),
);

const Dorms = ({ match, props }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/dorms`} />
      <ProtectedRoute
        path={`${match.url}/dorms`}
        component={DormList}
        roles={[
          userRole.admin,
          userRole.dormManager,
          userRole.provinceDataentry,
          userRole.provinceSupervisor,
        ]}
        props={props}
      />
      <ProtectedRoute
        exact
        path={`${match.url}/register`}
        component={DormRegister}
        roles={[userRole.admin, userRole.dormManager]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/register/:dormId`}
        component={DormRegister}
        roles={[
          userRole.admin,
          userRole.dormManager,
          userRole.provinceDataentry,
          userRole.provinceSupervisor,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/students`}
        component={StudentDormList}
        roles={[
          userRole.admin,
          userRole.dormManager,
          userRole.provinceDataentry,
          userRole.provinceSupervisor,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/student-register`}
        component={StudentRegistrationInDorm}
        roles={[userRole.admin, userRole.dormManager]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/dorm/:dormId`}
        component={DormProfile}
        roles={[
          userRole.admin,
          userRole.dormManager,
          userRole.provinceDataentry,
          userRole.provinceSupervisor,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/student-dismissal`}
        component={DormStudentDismissal}
        roles={[userRole.admin, userRole.dormManager]}
        props={props}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dorms;
