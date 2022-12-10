import React from 'react';
import {
  CardText,
  CardSubtitle,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  Badge,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

const ImageCards = () => {
  return (
    <Row>
      <Colxx xxs="12">
        <CardTitle className="mb-4">
          <IntlMessages id="cards.image-card" />
        </CardTitle>
        <Row>
          <Colxx xxs="12" xs="6" lg="4">
            <Card className="mb-4">
              <div className="position-relative">
                <CardImg
                  top
                  src="/assets/img/cards/thumb-1.jpg"
                  alt="Card image cap"
                />
                <Badge
                  color="primary"
                  pill
                  className="position-absolute badge-top-left"
                >
                  جدید
                </Badge>
                <Badge
                  color="secondary"
                  pill
                  className="position-absolute badge-top-left-2"
                >
                  ترند
                </Badge>
              </div>
              <CardBody>
                <CardSubtitle className="mb-4">
                  چیزکیک خانگی با توت تازه و نعناع
                </CardSubtitle>
                <CardText className="text-muted text-small mb-0 font-weight-light">
                  20 مهر 1400
                </CardText>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" xs="6" lg="4">
            <Card className="mb-4">
              <CardBody>
                <CardSubtitle className="mb-4">
                  چیزکیک خانگی با توت تازه و نعناع
                </CardSubtitle>
                <CardText className="text-muted text-small mb-0 font-weight-light">
                  25 مهر 1400
                </CardText>
              </CardBody>
              <div className="position-relative">
                <CardImg
                  bottom
                  src="/assets/img/cards/thumb-1.jpg"
                  alt="Card image cap"
                />
                <Badge
                  color="primary"
                  pill
                  className="position-absolute badge-top-left"
                >
                  جدید
                </Badge>
                <Badge
                  color="secondary"
                  pill
                  className="position-absolute badge-top-left-2"
                >
                  ترند
                </Badge>
              </div>
            </Card>
          </Colxx>
        </Row>
      </Colxx>
    </Row>
  );
};

export default ImageCards;
