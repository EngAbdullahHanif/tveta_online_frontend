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
  <h4 className="mt-5 m-5">نور مالومات / معلومات دیگر</h4>

      
         
     
          
      <CardBody>
        <AvForm
          className="av-tooltip tooltip-label-right"
          onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
        >
           <Row>
            <Colxx>
              

              
        

                 <AvField
            type="select"
                name="select"
                onChange={(e) => {
                  const selectedOption = e.target.value;
                  setIdCard(selectedOption)
                }}
            required
            label="تذکره"
            errorMessage="یکی از گزینه هارو باید انتخاب کنی!"
          >   
            <option value="الکترونیکی" >الکترونیکی</option>
            <option  value="کاغذی">کاغذی</option>
              </AvField>

              {IdCard === 'کاغذی' ? 
                   <AvGroup>
            <Label>جلد </Label>
            <AvInput name="name" required />
            <AvFeedback>/نوم ضروری دی/نام اجباری است!</AvFeedback>
          </AvGroup>
                  : (<div></div>)}
              
                
              


              <div className='square border border-dark p-3 '>
                <h6>دایمی ادرس/ ادرس دایمی</h6>

          <AvGroup>
            <Label>قریه/ ناحیه</Label>
            <AvInput name="name" required />
            <AvFeedback>/نوم ضروری دی/نام اجباری است!</AvFeedback>
          </AvGroup>

          <AvGroup>
            <Label>ولسوالی</Label>
            <AvInput name="rank" required />
            <AvFeedback>یه ارور همینطوری</AvFeedback>
          </AvGroup>

                    <AvGroup>
            <Label>ولایت</Label>
            <AvInput name="rank" required />
            <AvFeedback>یه ارور همینطوری</AvFeedback>
              </AvGroup>
       
               </div>  
      </Colxx>     
              <Colxx>
        
              {IdCard === 'کاغذی' ? 
                 <AvGroup>
            <Label>د تذکرې شمیره/نمبر تذکره </Label>
            <AvInput name="name" required />
            <AvFeedback>/نوم ضروری دی/نام اجباری است!</AvFeedback>
          </AvGroup>

                

              : ( <AvGroup>
            <Label>د تذکرې شمیره/نمبر تذکره </Label>
            <AvInput name="name" required />
            <AvFeedback>/نوم ضروری دی/نام اجباری است!</AvFeedback>
          </AvGroup>)}
            

                 {IdCard === 'کاغذی' ? 
                  <AvGroup>
            <Label>پاڼه/ صفحه</Label>
            <AvInput name="name" required />
            <AvFeedback>/نوم ضروری دی/نام اجباری است!</AvFeedback>
          </AvGroup>

                : (<div></div>)}
              

 <div className='square border border-dark p-3 '>
                <h6> اوسنی ادرس/ ادرس فعلی</h6>

         <AvGroup>
            <Label>قریه/ ناحیه</Label>
            <AvInput name="name" required />
            <AvFeedback>/نوم ضروری دی/نام اجباری است!</AvFeedback>
          </AvGroup>

          <AvGroup>
            <Label>ولسوالی</Label>
            <AvInput name="rank" required />
            <AvFeedback>یه ارور همینطوری</AvFeedback>
          </AvGroup>

                    <AvGroup>
            <Label>ولایت</Label>
            <AvInput name="rank" required />
            <AvFeedback>یه ارور همینطوری</AvFeedback>
              </AvGroup>
       
       
               </div> 
              
            </Colxx>
            
          </Row>
           <Button color="primary m-4">ثبت</Button>
        </AvForm>
          </CardBody>
    </Card>
  );
};

export default StudentRegistrationBio;


