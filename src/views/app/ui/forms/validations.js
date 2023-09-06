import React from 'react';
import { Row } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import yup
import * as Yup from 'yup';
import { CURRENT_SHAMSI_YEAR } from 'constants/defaultValues';

export const YEAR_VALIDATOR = Yup.number()
  .min(1300, 'از 1300 باید بیشتر باشد')
  .max(CURRENT_SHAMSI_YEAR, 'باید از سال فعلی کوچکتر باشد')
  .required('سال تاسیس الزامی است');

export const EDUCATIONAL_YEAR_VALIDATOR = Yup.number()
  .min(1350, 'از ۱۳۴۹ باید بیشتر باشد')
  .max(CURRENT_SHAMSI_YEAR, 'باید از سال فعلی بزرگتر نباشد')
  .required('سال تاسیس الزامی است');

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
          {/* <StudentRegistrationBio /> */}
          HI
        </Colxx>
      </Row>
    </>
  );
};
export default FormValidationsUi;
