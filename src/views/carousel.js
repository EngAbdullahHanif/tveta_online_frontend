import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,
  Input,
} from 'reactstrap';
import './carousel.css';
import Select from 'react-select';
import logo from '../assets/img/logo2.png';
import CarPhoto from '../assets/img/blog/car.png';
import CarPhoto1 from '../assets/img/blog/car1.png';
import CarPhoto2 from '../assets/img/blog/car2.png';
import CarPhoto3 from '../assets/img/blog/45.png';
import CarPhoto22 from '../assets/img/blog/Car22.png';
import CarPhoto12 from '../assets/img/blog/12.png';
import CarPhoto13 from '../assets/img/blog/13.png';
import CarPhoto14 from '../assets/img/blog/14.png';

function IndividualIntervalsExample() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Card
      style={{
        minHeight: '380px',
        maxHeight: '380px',
        minWidth: '430px',
        marginBottom: '200px',
      }}
    >
      <Carousel activeIndex={index} onSelect={handleSelect} className="rounded">
        <Carousel.Item interval={1900} autoplayTimeout={2000} className="rounded">
          <Card>
            <img
              className="d-block w-100"
              id="img"
              style={{
                borderRadius: '10px',
              }}
              width="100%"
              src={CarPhoto3}
              alt="First slide"
            />
            <Carousel.Caption
              className="bg-primary "
              style={{
                opacity: 0.85,
                marginInline: '-85px',
                paddingInline: '10px',
                borderRadius: '5px',
              }}
            >
              <h5 className="text-white">
                دیدار معین سیاسی وزارت خارجه از موتر مادل جدید ساخت افغانستان
              </h5>
            </Carousel.Caption>
          </Card>
        </Carousel.Item>
        <Carousel.Item interval={2500}>
          <Card>
            <img
              className="d-block w-100"
              style={{
                borderRadius: '10px',
              }}
              width="100%"
              src={CarPhoto2}
              alt="First slide"
            />
            <Carousel.Caption
              className="bg-primary "
              style={{
                opacity: 0.85,
                marginInline: '-85px',
                paddingInline: '10px',
                borderRadius: '5px',
              }}
            >
              <h5 className="text-white">
                د کورنیو چارو وزارت معین له نوي ماډل موټر څخه لیدنه وکړه
              </h5>
            </Carousel.Caption>
          </Card>
        </Carousel.Item>
        <Carousel.Item interval={2500}>
          <Card>
            <img
              className="d-block w-100"
              style={{
                borderRadius: '10px',
              }}
              width="100%"
              src={CarPhoto12}
              alt="First slide"
            />
            <Carousel.Caption
              className="bg-primary"
              style={{
                opacity: 0.85,
                marginInline: '-85px',
                paddingInline: '10px',
                borderRadius: '5px',
              }}
            >
              <h5 className="text-white">
                اداره تعلیمات تخنیکی و مسلکی بیستو دو بست استادی در انستیتوت های
                شهر کابل را به اعلان گذاشته است
              </h5>
            </Carousel.Caption>
          </Card>
        </Carousel.Item>{' '}
        <Carousel.Item interval={2500}>
          <Card>
            <img
              className="d-block w-100"
              style={{
                borderRadius: '10px',
              }}
              width="100%"
              src={CarPhoto13}
              alt="First slide"
            />
            <Carousel.Caption
              className="bg-primary"
              style={{
                opacity: 0.85,
                marginInline: '-85px',
                paddingInline: '10px',
                borderRadius: '5px',
              }}
            >
              <h5 className="text-white">
                د تخنیکی او مسلکی زده کړو ادارې د نوی کال لپاره د شاګردانو د جذب
                خبر ورکړ
              </h5>
            </Carousel.Caption>
          </Card>
        </Carousel.Item>{' '}
        <Carousel.Item interval={2500}>
          <Card>
            <img
              className="d-block w-100"
              style={{
                borderRadius: '10px',
              }}
              src={CarPhoto14}
              alt="First slide"
            />
            <Carousel.Caption
              className="bg-primary"
              style={{
                opacity: 0.85,
                marginInline: '-85px',
                paddingInline: '10px',
                borderRadius: '5px',
              }}
            >
              <h5 className="text-white">
                ایجاد سیستم انلاین برای مدیریت و اداره دیتای شاگردان و استادان
              </h5>
            </Carousel.Caption>
          </Card>
        </Carousel.Item>
      </Carousel>
    </Card>
  );
}

export default IndividualIntervalsExample;
