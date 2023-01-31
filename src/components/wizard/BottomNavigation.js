/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React from 'react';
import { WithWizard } from 'react-albus';
import { Row, Button } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';

const BottomNavigation = ({
  className,
  onClickPrev,
  prevLabel,
  onClickNext,
  nextLabel,
}) => {
  return (
    <WithWizard
      render={({ next, previous, step, steps }) => (
        <Row className={`wizard-buttons ${className}`}>
          <Colxx>
            <Button
              color="primary"
              style={{ marginRight: '400px' }}
              className={`mr-1 ${
                steps.indexOf(step) <= 0 ? 'disabled  m-4' : ' m-4'
              }`}
              onClick={() => {
                onClickPrev(previous, steps, step);
              }}
            >
              <IntlMessages id="button.Back" />
            </Button>
          </Colxx>
          <Colxx>
            <Button
            
              color="primary"
              style={{ paddingInline: '30px' }}
              className={
                steps.indexOf(step) >= steps.length - 1
                  ? 'disabled float-right m-4'
                  : ' float-right m-4'
              }
              onClick={() => {
                onClickNext(next, steps, step);
               
              }}
            >
              {steps.indexOf(step) >= steps.length - 2 ? (
                <IntlMessages id="button.SubmitButton" />
              ) : (
                <IntlMessages id="button.Next" />
              )}
            </Button>
          </Colxx>
        </Row>
      )}
    />
  );
};
export default BottomNavigation;
