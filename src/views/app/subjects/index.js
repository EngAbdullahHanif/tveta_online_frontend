import { userRole } from 'constants/defaultValues';
import { ProtectedRoute } from 'helpers/authHelper';
import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';

const SubjectRegister = React.lazy(() =>
  import(/* webpackChunkName: "subject-register" */ './subject-register'),
);

const Curriculum = React.lazy(() =>
  import(/* webpackChunkName: "curriculum" */ './curriculum'),
);
const ProvincialDashboard = React.lazy(() =>
  import(/* webpackChunkName: "provincial-dash" */ './draftFileJustForTest'),
);
const AdminDashboard = React.lazy(() =>
  import(/* webpackChunkName: "admin-dashboard" */ './admin-dashboard'),
);
const SubjectList = React.lazy(() =>
  import(
    /* webpackChunkName: "admin-dashboard" */ './subject-list/SubjectListMain'
  ),
);
const CurriculumList = React.lazy(() =>
  import(
    /* webpackChunkName: "admin-dashboard" */ './curriculum-list/CurriculumListMain'
  ),
);

const Subjects = ({ match, props }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/subjects`} />
      <ProtectedRoute
        path={`${match.url}/register`}
        component={SubjectRegister}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />

      <ProtectedRoute
        path={`${match.url}/curriculum`}
        component={Curriculum}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/provincial-dash`}
        component={ProvincialDashboard}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/admin-dashboard`}
        component={AdminDashboard}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/subject-list`}
        component={SubjectList}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/curriculum-list`}
        component={CurriculumList}
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
export default Subjects;
