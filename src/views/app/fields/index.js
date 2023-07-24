import { userRole } from 'constants/defaultValues';
import { ProtectedRoute } from 'helpers/authHelper';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const FieldRegister = React.lazy(() =>
  import(/* webpackChunkName: "field-register" */ './field-register')
);

const InstituteFieldDepartmentRegister = React.lazy(() =>
  import(
    /* webpackChunkName: "institute-field-department-register" */ './institute-field-department-register'
  )
);
const FieldList = React.lazy(() =>
  import(
    /* webpackChunkName: "subject-register" */ './field-list/FieldListMain'
  )
);

const DepartmentRegister = React.lazy(() =>
  import(/* webpackChunkName: "subject-register" */ './department-register')
);
const DepartmentList = React.lazy(() =>
  import(
    /* webpackChunkName: "subject-register" */ './department-list/DepartmentListMain'
  )
);

const SectorList = React.lazy(() =>
  import(
    /* webpackChunkName: "subject-register" */ './sector-list/SectorListMain'
  )
);

const SectorRegister = React.lazy(() =>
  import(/* webpackChunkName: "subject-register" */ './sector-register')
);

const Fields = ({ match, props }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/fields`} />
      <ProtectedRoute
        path={`${match.url}/register`}
        component={FieldRegister}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/field-list`}
        component={FieldList}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/institute-field-department-register`}
        component={InstituteFieldDepartmentRegister}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/department-register`}
        component={DepartmentRegister}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/department-list`}
        component={DepartmentList}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />

      <ProtectedRoute
        path={`${match.url}/sector-list`}
        component={SectorList}
        roles={[
          userRole.superUser,
          userRole.admin,
          userRole.provincial,
          userRole.institute,
        ]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/sector-register`}
        component={SectorRegister}
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
export default Fields;
