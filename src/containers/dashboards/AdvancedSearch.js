import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  CustomInput,
} from 'reactstrap';
import Select from 'react-select';

import IntlMessages from 'helpers/IntlMessages';
import CustomSelectInput from 'components/common/CustomSelectInput';

const selectData = [
  { label: 'شکلاتی', value: 'chocolate', key: 0 },
  { label: 'وانیلی', value: 'vanilla', key: 1 },
  { label: 'توت فرنگی', value: 'strawberry', key: 2 },
  { label: 'کارامل', value: 'caramel', key: 3 },
  { label: 'شیرینی و خامه', value: 'cookiescream', key: 4 },
  { label: 'نعناع تند', value: 'peppermint', key: 5 },
];

const selectDataType = [
  { label: 'کیک', value: 'cake', key: 0 },
  { label: 'کاپ کیک', value: 'cupcake', key: 1 },
  { label: 'دسر', value: 'dessert', key: 2 },
];

const AdvancedSearch = ({ messages }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptionsType, setSelectedOptionsType] = useState([]);

  return (
    <Card className="dashboard-search">
      <CardBody>
        <CardTitle className="text-white">
          <IntlMessages id="dashboards.advanced-search" />
        </CardTitle>
        <Form className="form-container">
          <FormGroup>
            <label>
              <IntlMessages id="dashboards.toppings" />
            </label>
            <Select
              components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"
              name="form-field-name"
              value={selectedOptions}
              onChange={(val) => setSelectedOptions(val)}
              options={selectData}
            />
          </FormGroup>
          <FormGroup>
            <label>
              <IntlMessages id="dashboards.type" />
            </label>
            <Select
              components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"
              name="form-field-name"
              value={selectedOptionsType}
              onChange={(val) => setSelectedOptionsType(val)}
              options={selectDataType}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <IntlMessages id="dashboards.keyword" />
            </Label>
            <Input type="text" placeholder={messages['dashboards.keyword']} />
          </FormGroup>
          <FormGroup>
            <CustomInput
              type="checkbox"
              id="exampleCustomCheckbox"
              label="این چک باکس رو علامت بزنین"
            />
          </FormGroup>
          <FormGroup className="text-center">
            <Button color="primary" className="btn-lg mt-3">
              <IntlMessages id="dashboards.search" />
            </Button>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};
export default AdvancedSearch;
