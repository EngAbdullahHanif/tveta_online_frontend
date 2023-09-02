import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation';
import { Button, Label, Card, CardBody, Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { useState } from 'react';

const StudentRegistrationBio = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [IdCard, setIdCard] = useState(null);
  const onSubmit = (event, errors, values) => {
    console.log(errors);
    console.log(values);
    if (errors.length === 0) {
      // submit
    }
  };

  console.log(IdCard, ' this is Id card');

  return (
    <Card className="mb-5">
      <h4 className="mt-5 m-5"> دحاضرۍ ثبت/ ثبت حاضری</h4>

      <CardBody>
        <AvForm
          className="av-tooltip tooltip-label-right p-5"
          onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
        >
          <Row>
            <Colxx>
              <AvGroup>
                <Label>مضمون</Label>
                <AvInput name="name" required />
                <AvFeedback>/نوم ضروری دی/نام اجباری است!</AvFeedback>
              </AvGroup>

              <AvField
                type="select"
                name="select"
                onChange={(e) => {
                  const selectedOption = e.target.value;
                  setIdCard(selectedOption);
                }}
                required
                label="کریدت"
                errorMessage="یکی از گزینه هارو باید انتخاب کنی!"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </AvField>

              <AvField
                type="select"
                name="select"
                onChange={(e) => {
                  const selectedOption = e.target.value;
                  setIdCard(selectedOption);
                }}
                required
                label="د مضمون ډول/ نوع مضمون"
                errorMessage="یکی از گزینه هارو باید انتخاب کنی!"
              >
                <option value="اصلی">اصلی</option>
                <option value="فرعی">فرعی</option>
              </AvField>

              <AvField
                type="select"
                name="select"
                onChange={(e) => {
                  const selectedOption = e.target.value;
                  setIdCard(selectedOption);
                }}
                required
                label="کریدت"
                errorMessage="یکی از گزینه هارو باید انتخاب کنی!"
              >
                {' '}
                <option value="3">اداره و منجمنت</option>
                <option value="1">برق</option>
                <option value="2">زراعت</option>
                <option value="3">تخنیک موتر</option>
                <option value="1">کمپیوتر ساینس</option>
                <option value="2">وترنری</option>
                <option value="1">تجارت</option>
                <option value="2">هنرهای زیبا</option>
              </AvField>
            </Colxx>
          </Row>
          <Button color="primary m-4">ثبت</Button>
        </AvForm>
      </CardBody>
    </Card>
  );
};

export default StudentRegistrationBio;
