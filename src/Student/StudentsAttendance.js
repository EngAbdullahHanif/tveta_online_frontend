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
import { Button, Label, Card, CardBody, Row} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { useState } from 'react';

const StudentRegistrationBio = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const [IdCard, setIdCard] = useState(null)
  const onSubmit = (event, errors, values) => {
    console.log(errors);
    console.log(values);
    if (errors.length === 0) {
      // submit
    }
  };

  console.log(IdCard, " this is Id card");


  return (
  
    <Card className="mb-5">
  <h4 className="mt-5 m-5"> دحاضرۍ ثبت/ ثبت حاضری</h4>

      
         
     
          
      <CardBody>
        <AvForm
          className="av-tooltip tooltip-label-right p-5"
          onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
        >
          <Row>
            
            <Colxx > 
           <AvGroup>
            <Label>آی ډی</Label>
            <AvInput name="name" required />
            <AvFeedback>/نوم ضروری دی/نام اجباری است!</AvFeedback>
              </AvGroup>

                      <AvGroup>
                   <Label>سوب/ حاضر</Label>
                <AvField name="maxPropString"  type="number" max="10000000000" />
              </AvGroup>


                      <AvGroup>
                   <Label>ناسوب/غیر حاضر</Label>
                <AvField name="maxPropString"  type="number" max="10000000000" />
              </AvGroup>

             

                      <AvGroup>
                   <Label>بیمار/ مریض</Label>
                <AvField name="maxPropString"  type="number" max="10000000000" />
              </AvGroup>

                      <AvGroup>
                   <Label> ضروروی کار/ کار ضروری (رخصت)</Label>
                <AvField name="maxPropString"  type="number" max="10000000000" />
              </AvGroup>

        


                <AvGroup>
                   <Label>نمرې/ نمرات</Label>
                <AvField name="maxPropString"  type="number" max="10000000000" />
              </AvGroup>
            </Colxx>  



          </Row>
           <Button color="primary m-4">ثبت</Button>
        </AvForm>
          </CardBody>
    </Card>
  );
};

export default StudentRegistrationBio;


