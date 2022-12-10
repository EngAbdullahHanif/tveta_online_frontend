import React from 'react';
import {
  CardText,
  Row,
  Card,
  CardTitle,
  CardImg,
  CardImgOverlay,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

const ImageOverlayCard = () => {
  return (
    <Row>
      <Colxx xxs="12">
        <CardTitle className="mb-4">
          <IntlMessages id="cards.image-overlay-card" />
        </CardTitle>
        <Row>
          <Colxx xxs="12" xs="6" lg="3">
            <Card inverse className="mb-4">
              <CardImg
                src="/assets/img/cards/thumb-1.jpg"
                alt="Card image cap"
              />
              <CardImgOverlay>
                <CardTitle>کیک میوه ای</CardTitle>
                <CardText>
                این محتوایی که می بینید اینجا وارد شده برای توضیحات خلاصه این کارته
                </CardText>
              </CardImgOverlay>
            </Card>
          </Colxx>
        </Row>
      </Colxx>
    </Row>
  );
};
export default ImageOverlayCard;
