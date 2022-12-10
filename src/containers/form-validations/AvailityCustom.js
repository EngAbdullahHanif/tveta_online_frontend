import React from 'react';

import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import { Button, Label, Card, CardBody } from 'reactstrap';

const AvailityCustom = () => {
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
        <h6 className="mb-4">قراردادن قوانین دلخواه در اعتبارسنجی</h6>
        <AvForm
          className="av-tooltip tooltip-label-right"
          onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
        >
          <AvGroup className="error-t-negative">
            <Label>نام</Label>
            <AvField
              name="nameCustomMessage"
              type="text"
              validate={{
                required: {
                  value: true,
                  errorMessage: 'لطفا اسمت رو وارد کن',
                },
                pattern: {
                  value: '^[A-Za-z]+$',
                  errorMessage: 'اسمت باید فقط شامل حروف باشه',
                },
                minLength: {
                  value: 2,
                  errorMessage: 'اسمت باید بین 2 تا 16 حرف باشه',
                },
                maxLength: {
                  value: 16,
                  errorMessage: 'اسمت باید بین 2 تا 16 حرف باشه',
                },
              }}
            />
          </AvGroup>

          <AvGroup className="error-t-negative">
            <Label>پست الکترونیک</Label>
            <AvField
              name="emailCustomMessage"
              type="email"
              validate={{
                required: {
                  value: true,
                  errorMessage: 'لطفا پست الکترونیکی خودتو وارد کن',
                },
                email: {
                  value: true,
                  errorMessage: 'لطفا یه آدرس ایمیل صحیح وارد کن',
                },
              }}
            />
          </AvGroup>

          <AvGroup className="error-l-100 error-t-negative">
            <Label>تکرار پست الکترونیک</Label>
            <AvField
              name="confirmationEmail"
              type="email"
              validate={{
                match: {
                  value: 'emailCustomMessage',
                  errorMessage: 'آدرس های ایمیل یکسان نیستند',
                },
                required: {
                  value: true,
                  errorMessage: 'لطفا پست الکترونیکی خودتو وارد کن',
                },
              }}
            />
          </AvGroup>

          <AvGroup className="error-l-100 error-t-negative">
            <Label>شماره همراه</Label>
            <AvField
              name="numberProp"
              type="text"
              validate={{
                number: {
                  value: true,
                  errorMessage: 'شماره همراه باید فقط عدد باشد',
                },
                required: {
                  value: true,
                  errorMessage: 'شماره همراه اجباری است!',
                },
              }}
            />
          </AvGroup>

          <AvGroup className="error-t-negative">
            <Label>حداکثر</Label>
            <AvField
              name="maxPropNumberProp"
              type="text"
              validate={{
                max: { value: 5, errorMessage: 'حداکثر 5' },
                required: {
                  value: true,
                  errorMessage: 'لطفا یه عدد وارد کنید',
                },
              }}
            />
          </AvGroup>

          <AvGroup className="error-t-negative">
            <Label>حداقل</Label>
            <AvField
              name="minPropNumberProp"
              type="text"
              validate={{
                min: { value: 5, errorMessage: 'حداقل 5' },
                required: {
                  value: true,
                  errorMessage: 'لطفا یه عدد وارد کن',
                },
              }}
            />
          </AvGroup>

          <AvGroup className="error-l-125 error-t-negative">
            <Label>عبارت های Regex (^[A-Z]*$)</Label>
            <AvField
              name="patternPropRegex"
              type="text"
              validate={{
                pattern: {
                  value: /^[A-Z]*$/,
                  errorMessage: 'فقط حروف بزرگ وارد کنید A تا Z',
                },
                required: {
                  value: true,
                  errorMessage: 'این فیلد اجباریه',
                },
              }}
            />
          </AvGroup>

          <Button color="primary">ارسال فرم</Button>
        </AvForm>
      </CardBody>
    </Card>
  );
};

export default AvailityCustom;
