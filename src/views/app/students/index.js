import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Register = React.lazy(() =>
  import(/* webpackChunkName: "register" */ './bio/register')
);

const RegisterKankor = React.lazy(() =>
  import(/* webpackChunkName: "kankor-result" */ './bio/register-kankor')
);

const StudentList = React.lazy(() =>
  import(/* webpackChunkName: "student-list" */ './bio/student-list/StudentListMain')
);
const MarksRegistration = React.lazy(() =>
  import(/* webpackChunkName: "marks-register" */ './marks-register')
);
const AttendanceRegistration = React.lazy(() =>
  import(/* webpackChunkName: "attendance-register" */ './attendence/resgister')
);
const Students = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/register`} />

      <Route
        path={`${match.url}/register`}
        render={(props) => <Register {...props} />}
      />
      <Route
        path={`${match.url}/register-kankor`}
        render={(props) => <RegisterKankor {...props} />}
      />
      <Route
        path={`${match.url}/students`}
        render={(props) => <StudentList {...props} />}
      />

          <Route
        path={`${match.url}/marks-register`}
        render={(props) => <MarksRegistration {...props} />}
      />
             <Route
        path={`${match.url}/attendance-register`}
        render={(props) => <AttendanceRegistration {...props} />}
      />

      {/* <ProtectedRoute
        path={`${match.url}/default`}
        component={DashboardDefault}
        roles={[UserRole.Admin]}
      />
       */}

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Students;
