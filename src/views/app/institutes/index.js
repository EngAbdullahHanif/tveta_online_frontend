import { userRole } from 'constants/defaultValues';
import { ProtectedRoute } from 'helpers/authHelper';
import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';

const InstituteList = React.lazy(() =>
  import('./institute-list/InstituteListMain'),
);
const PromotionDemotionList = React.lazy(() =>
  import('./promotion-demotion-list/PromotionDemortionListMain'),
);
const InstituteRegister = React.lazy(() => import('./institute-register.js'));

const InstitueCreate = React.lazy(() => import('./institute-create'));
const InstituteUpgrade = React.lazy(() => import('./institute-upgrade'));
const InstituteProfile = React.lazy(() => import('./institute-profile'));
const InstituteDepartmentRegister = React.lazy(() =>
  import('./institute-department-register'),
);

const InstituteDepartmentList = React.lazy(() =>
  import('./institute-department-list/InstituteDepartmentListMain'),
);

const Institues = ({ match, props }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/institutes`} />
      <ProtectedRoute
        path={`${match.url}/institutes`}
        component={InstituteList}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/promotion-demotion-list`}
        component={PromotionDemotionList}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />

      <ProtectedRoute
        exact
        path={`${match.url}/register`}
        component={InstituteRegister}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/register/:instituteId`}
        component={InstituteRegister}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/institute-create`}
        component={InstitueCreate}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />

      <ProtectedRoute
        path={`${match.url}/institute-upgrade`}
        component={InstituteUpgrade}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/institute/:instituteId`}
        component={InstituteProfile}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/institute-department/register`}
        component={InstituteDepartmentRegister}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      <ProtectedRoute
        path={`${match.url}/institute-department/list`}
        component={InstituteDepartmentList}
        roles={[userRole.superUser, userRole.authenticated]}
        props={props}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Institues;
