import React from 'react';

import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox,
} from 'availity-reactstrap-validation';
import { Button, Label, FormGroup, Card, CardBody } from 'reactstrap';

const defaultValues = {
  locationType: 'تجاری',
  locationQualities: ['2 ستاره', '3 ستاره', '5 ستاره'],
  firstname: 'فاطمه',
  lastname: 'کاظمی زاده',
  location: {
    street: 'شریعتی',
    suite: '110',
    city: 'تهران',
    state: 'تهران',
    zip: '32256',
  },
};

const AvailityDefaultValues = () => {
  const onSubmit = (event, errors, values) => {
    console.log(errors);
    console.log(values);
    if (errors.length === 0) {
      // submit
    }
  };

  return (
    <Card className="mb-5">
      <CardBody>
        <h6 className="mb-4">مقادیر پیش فرض فرم</h6>

        <AvForm
          onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
          model={defaultValues}
          className="av-tooltip tooltip-right-bottom"
        >
          <AvRadioGroup inline name="locationType" required>
            <Label className="d-block">نوع موقعیت</Label>
            <AvRadio label="مسکونی" value="home" />
            <AvRadio label="تجاری" value="work" />
            <AvRadio label="تفریحی" value="awesome" />
          </AvRadioGroup>
          <AvCheckboxGroup inline name="locationQualities" required>
            <Label className="d-block">کیفیت مکان</Label>
            <AvCheckbox label="2 ستاره" value="beautiful" />
            <AvCheckbox label="3 ستاره" value="awesome" />
            <AvCheckbox label="5 ستاره" value="wonderful" />
          </AvCheckboxGroup>

          <AvField name="firstname" label="نام" required />
          <AvField name="lastname" label="نام خانوادگی" required />
          <AvGroup>
            <Label for="street">خیابان</Label>
            <AvInput name="location.street" id="street" required />
            <AvFeedback>یه ارور همینطوری</AvFeedback>
          </AvGroup>

          <AvField name="location.suite" label="سوییت" required />
          <AvField name="location.city" label="شهر" required />

          <AvField type="select" name="location.state" label="استان" required>
            <option>یه چیزی</option>
            <option>یه چیز دیگه</option>
            <option>تهران</option>
          </AvField>

          <AvField name="location.zip" label="کد شهروندی" required />

          <FormGroup className="mb-0">
            <Button color="primary">ارسال فرم</Button>
          </FormGroup>
        </AvForm>
      </CardBody>
    </Card>
  );
};

export default AvailityDefaultValues;
