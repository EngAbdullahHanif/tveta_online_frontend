import React from 'react';
import DatePicker from 'react-datepicker';
import { MDBFile } from 'mdb-react-ui-kit';
import 'react-datepicker/dist/react-datepicker.css';
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
import { Button, Label, Card, CardBody, Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { useState } from 'react';

const KankorResult = () => {
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
      <h4 className="mt-5 m-5">د کانکور پایلې/نتایج کانکور</h4>
      <CardBody>
        <AvForm
          className="av-tooltip tooltip-label-right"
          onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
        >
          <Row>
            <Colxx>
              <AvGroup>
                <Label>نوم/ نام</Label>
                <AvInput name="name" required />
                <AvFeedback>/نوم ضروری دی/نام اجباری است!</AvFeedback>
              </AvGroup>

              <AvGroup>
                <Label>د پلار نوم/ نام پدر</Label>
                <AvInput name="rank" required />
                <AvFeedback>یه ارور همینطوری</AvFeedback>
              </AvGroup>

              <AvGroup>
                <Label>انستیتوت</Label>
                <AvInput name="rank" required />
                <AvFeedback>یه ارور همینطوری</AvFeedback>
              </AvGroup>

              <AvField
                type="select"
                name="select"
                onChange={(e) => {
                  const selectedOption = e.target.value;
                  setIdCard(selectedOption);
                }}
                required
                label="وخت/تایم"
                errorMessage="یکی از گزینه هارو باید انتخاب کنی!"
              >
                <option value="روزانه">ورځې/روزانه</option>
                <option value="شبانه">شپې/ شبانه</option>
              </AvField>
            </Colxx>

            <Colxx>
              <AvGroup>
                <Label>د آزموینې آی ډی/ آیډی امتحان</Label>
                <AvInput name="rank" required />
                <AvFeedback>یه ارور همینطوری</AvFeedback>
              </AvGroup>

              <AvGroup>
                <Label>نمرې/ نمرات</Label>
                <AvField name="maxPropString" type="number" max="10000000000" />
              </AvGroup>

              <AvGroup>
                <Label>رشته</Label>
                <AvInput name="rank" required />
                <AvFeedback>یه ارور همینطوری</AvFeedback>
              </AvGroup>
            </Colxx>
          </Row>
          <Button color="primary m-4">ثبت</Button>
        </AvForm>
      </CardBody>
    </Card>
  );
};

export default KankorResult;
