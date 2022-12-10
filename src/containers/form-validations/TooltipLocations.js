import React from 'react';

import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation';
import { Button, Label, Card, CardBody, Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';

const TooltipLocations = () => {
  return (
    <Card className="mb-5">
      <CardBody>
        <h6 className="mb-4">موقعیت تولتیپ</h6>
        <AvForm className="av-tooltip mb-5" onSubmit={() => {}}>
          <AvGroup className="error-l-100 tooltip-label-right">
            <Label>برچسب راست</Label>
            <AvInput name="input1" required />
            <AvFeedback>برچسب راست!</AvFeedback>
          </AvGroup>

          <AvGroup className="tooltip-center-top">
            <Label>بالا وسط</Label>
            <AvInput name="input2" required />
            <AvFeedback>بالا وسط!</AvFeedback>
          </AvGroup>

          <AvGroup className="tooltip-center-bottom">
            <Label>پایین وسط</Label>
            <AvInput name="input3" required />
            <AvFeedback>پایین وسط!</AvFeedback>
          </AvGroup>

          <AvGroup className="tooltip-left-top">
            <Label>بالا چپ</Label>
            <AvInput name="input4" required />
            <AvFeedback>بالا چپ!</AvFeedback>
          </AvGroup>

          <AvGroup className="tooltip-right-top">
            <Label>بالا راست</Label>
            <AvInput name="input5" required />
            <AvFeedback>بالا راست!</AvFeedback>
          </AvGroup>

          <AvGroup className="tooltip-left-bottom">
            <Label>پایین چپ</Label>
            <AvInput name="input6" required />
            <AvFeedback>پایین چپ!</AvFeedback>
          </AvGroup>

          <AvGroup className="tooltip-right-bottom">
            <Label>پایین راست</Label>
            <AvInput name="input7" required />
            <AvFeedback>پایین راست!</AvFeedback>
          </AvGroup>

          <Button color="primary">ارسال فرم</Button>
        </AvForm>

        <h6 className="mb-4">موقعیت Label Right Helpers</h6>
        <AvForm
          className="av-tooltip mb-5 tooltip-label-right"
          onSubmit={() => {}}
        >
          <Row>
            <Colxx xxs="12" sm="6">
              <AvGroup className="error-l-0">
                <Label>error-l-0</Label>
                <AvInput name="input8" required />
                <AvFeedback>error-l-0</AvFeedback>
              </AvGroup>
            </Colxx>

            <Colxx xxs="12" sm="6">
              <AvGroup className="error-l-25">
                <Label>error-l-25</Label>
                <AvInput name="input9" required />
                <AvFeedback>error-l-25</AvFeedback>
              </AvGroup>
            </Colxx>

            <Colxx xxs="12" sm="6">
              <AvGroup className="error-l-50">
                <Label>error-l-50</Label>
                <AvInput name="input10" required />
                <AvFeedback>error-l-50</AvFeedback>
              </AvGroup>
            </Colxx>

            <Colxx xxs="12" sm="6">
              <AvGroup className="error-l-75">
                <Label>error-l-75</Label>
                <AvInput name="input11" required />
                <AvFeedback>error-l-75</AvFeedback>
              </AvGroup>
            </Colxx>

            <Colxx xxs="12" sm="6">
              <AvGroup className="error-l-100">
                <Label>error-l-100</Label>
                <AvInput name="input12" required />
                <AvFeedback>error-l-100</AvFeedback>
              </AvGroup>
            </Colxx>

            <Colxx xxs="12" sm="6">
              <AvGroup className="error-l-125">
                <Label>error-l-125</Label>
                <AvInput name="input13" required />
                <AvFeedback>error-l-125</AvFeedback>
              </AvGroup>
            </Colxx>

            <Colxx xxs="12" sm="6">
              <AvGroup className="error-l-150">
                <Label>error-l-150</Label>
                <AvInput name="input14" required />
                <AvFeedback>error-l-150</AvFeedback>
              </AvGroup>
            </Colxx>

            <Colxx xxs="12" sm="6">
              <AvGroup className="error-l-175">
                <Label>error-l-175</Label>
                <AvInput name="input15" required />
                <AvFeedback>error-l-175</AvFeedback>
              </AvGroup>
            </Colxx>

            <Colxx xxs="12" sm="6">
              <AvGroup className="error-l-200">
                <Label>error-l-200</Label>
                <AvInput name="input16" required />
                <AvFeedback>error-l-200</AvFeedback>
              </AvGroup>
            </Colxx>
            <Colxx xxs="12" sm="6">
              <AvGroup className="error-l-225">
                <Label>error-l-225</Label>
                <AvInput name="input17" required />
                <AvFeedback>error-l-225</AvFeedback>
              </AvGroup>
            </Colxx>

            <Colxx xxs="12" sm="6">
              <AvGroup className="error-l-250">
                <Label>error-l-250</Label>
                <AvInput name="input18" required />
                <AvFeedback>error-l-250</AvFeedback>
              </AvGroup>
            </Colxx>

            <Colxx xxs="12" sm="6">
              <AvGroup className="error-l-275">
                <Label>error-l-275</Label>
                <AvInput name="input19" required />
                <AvFeedback>error-l-275</AvFeedback>
              </AvGroup>
            </Colxx>
          </Row>
          <Button color="primary">ارسال فرم</Button>
        </AvForm>
      </CardBody>
    </Card>
  );
};

export default TooltipLocations;
