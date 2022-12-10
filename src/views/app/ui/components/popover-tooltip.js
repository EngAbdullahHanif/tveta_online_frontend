/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import PopoverItem from 'components/common/PopoverItem';
import TooltipItem from 'components/common/TooltipItem';

const popovers = [
  {
    placement: 'top',
    text: 'پاپ آور برای top',
    body: 'محتوای پاپ آور در اینجا',
  },
  {
    placement: 'bottom',
    text: 'پاپ آور برای bottom',
    body: 'محتوای پاپ آور در اینجا',
  },
  {
    placement: 'left',
    text: 'پاپ آور برای left',
    body: 'محتوای پاپ آور در اینجا',
  },
  {
    placement: 'right',
    text: 'پاپ آور برای right',
    body: 'محتوای پاپ آور در اینجا',
  },
];

const tooltips = [
  {
    placement: 'top',
    text: 'تولتیپ برای top',
    body: 'محتوای تولتیپ در اینجا',
  },
  {
    placement: 'bottom',
    text: 'تولتیپ برای bottom',
    body: 'محتوای تولتیپ در اینجا',
  },
  {
    placement: 'left',
    text: 'تولتیپ برای left',
    body: 'محتوای تولتیپ در اینجا',
  },
  {
    placement: 'right',
    text: 'تولتیپ برای right',
    body: 'محتوای تولتیپ در اینجا',
  },
];

const PopoverTooltipUi = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.popover-tooltip" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <IntlMessages id="popover-tooltip.popover" />
              </CardTitle>
              {popovers.map((popover, i) => {
                return (
                  <PopoverItem key={`popover_${i}`} item={popover} id={i} />
                );
              })}
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <IntlMessages id="popover-tooltip.tooltip" />
              </CardTitle>
              {tooltips.map((tooltip, i) => {
                return (
                  <TooltipItem key={`tooltip_${i}`} item={tooltip} id={i} />
                );
              })}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default PopoverTooltipUi;
