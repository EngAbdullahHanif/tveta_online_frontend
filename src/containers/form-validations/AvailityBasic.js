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

const AvailityBasic = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const onSubmit = (event, errors, values) => {
    console.log(errors);
    console.log(values);
    if (errors.length === 0) {
      // submit
    }
  };

  return (
  
    <Card className="mb-5">
  <h4 className="mt-5 m-5">بیوگرافی</h4>
     
          
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
            <Label>د پلار نوم/نام پدر</Label>
            <AvInput name="rank" required />
            <AvFeedback>یه ارور همینطوری</AvFeedback>
          </AvGroup>

                    <AvGroup>
            <Label>دنده/وظیفه</Label>
            <AvInput name="rank" required />
            <AvFeedback>یه ارور همینطوری</AvFeedback>
              </AvGroup>
                  <AvField
            type="select"
            name="select"
            required
            label="زده کړې/ تحصیل"
            errorMessage="یکی از گزینه هارو باید انتخاب کنی!"
          >
            <option value="0" />
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
              </AvField>
              
                        <AvGroup>
            <Label>دنده/وظیفه</Label>
            <AvInput name="rank" required />
            <AvFeedback>یه ارور همینطوری</AvFeedback>
              </AvGroup>

               <AvGroup>
                <Label>د زیږیدنې ځای / تاریخ تولد</Label>
                <DatePicker />
              </AvGroup>

              
              
              <AvGroup>
                    <Label>د زیږیدنې ځای / تاریخ تولد</Label>
              <AvField name="date" type="date" selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat='dd/MM/yyyy' placeholderText='dd/mm/yyyy' minDate={new Date()} />
 
              </AvGroup>
             
              
 
              <AvGroup>
                   <Label>د تلفن شمیره / نمبر تلفن</Label>
                <AvField name="maxPropString"  type="number" max="10000000000" />
              </AvGroup>
           
        
          {/* <AvCheckboxGroup
            className="error-l-150"
            inline
            name="checkboxCustomInputExample2"
            required
          >
            <Label className="d-block">د تذکرې بڼه/نوعیت تذکره</Label>
            <AvCheckbox customInput label="الکترونیکی" value="Yes" />
            <AvCheckbox customInput label="کاغذی" value="No" />
              </AvCheckboxGroup> */}
              
      </Colxx>     
              <Colxx>
          <AvGroup>
            <Label>تخلص</Label>
            <AvInput name="name" required />
            <AvFeedback>نام اجباری اسس!/نوم ضروری دی</AvFeedback>
          </AvGroup>

          <AvGroup>
            <Label>د نیکه نوم/نام پدر کلان</Label>
            <AvInput name="rank" required />
            <AvFeedback>یه ارور همینطوری</AvFeedback>
          </AvGroup>

                <AvGroup>
            <Label>د پلار دنده/ وظیفه پدر</Label>
            <AvInput name="rank" required />
            <AvFeedback>یه ارور همینطوری</AvFeedback>
              </AvGroup>
              
                    <AvGroup>
                    <Label>د فراغت کال / سال فراغت</Label>
              <AvField name="date" type="date" selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat='dd/MM/yyyy' placeholderText='dd/mm/yyyy' minDate={new Date()} />
 
              </AvGroup>

                           <AvField
            type="select"
            name="select"
            required
            label="جنسیت"
            errorMessage="یکی از گزینه هارو باید انتخاب کنی!"
          >
            <option value="0" />
            <option>نارینه/ مذکر</option>
            <option>ښځینه/مونث</option>
              </AvField>
             
              
              
          <AvGroup>
            <Label>د زیږیدنې ځای/ مکان تولد</Label>
            <AvInput name="rank" required />
            <AvFeedback>یه ارور همینطوری</AvFeedback>
          </AvGroup>
 
                      <AvGroup>
         <Label> برښنا لیک/ایمیل ادرس</Label><Label/>
            <AvInput name="ث" required />
            <AvFeedback>یه ارور همینطوری</AvFeedback>
              </AvGroup>


              <AvGroup>
                 <Label> لطفا اسناد مورد نیاز را درج نماید</Label><Label/>
                   <MDBFile label='اسناد فراغت' size='bg'  />
              </AvGroup>
              
            </Colxx>
            
          </Row>
           <Button color="primary">ارسال فرم</Button>
        </AvForm>
          </CardBody>
    </Card>
  );
};

export default AvailityBasic;
