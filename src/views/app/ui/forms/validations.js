import React from 'react';
import { Row } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';

// import FormikBasicFieldLevel from 'containers/form-validations/FormikBasicFieldLevel';
// import FormikBasicFormLevel from 'containers/form-validations/FormikBasicFormLevel';
import StudentRegistrationBio from '../../../../Student/Registraion‌Bio';
// import AvailityCustom from 'containers/form-validations/AvailityCustom';
// import AvailityDefaultValues from 'containers/form-validations/AvailityDefaultValues';

const FormValidationsUi = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.form-validations" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx x="12" md="12" className="mb-3">
          <StudentRegistrationBio />
        
        </Colxx>
      </Row>
    </>
  );
};
export default FormValidationsUi;
