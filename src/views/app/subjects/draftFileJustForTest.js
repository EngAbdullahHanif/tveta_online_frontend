import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Photo55 from '../../../assets/img/blog/car1.png';
import Photo52 from '../../../assets/img/blog/car2.png';
import Photo53 from '../../../assets/img/blog/45.png';

const DemoCarousel = () => {
  const onChange = (currentSlide, _prevSlide) => {
    console.log('onChange:', currentSlide);
  };

  const onClickItem = (index, _item) => {
    console.log('onClickItem:', index);
  };

  const onClickThumb = (index, _item) => {
    console.log('onClickThumb:', index);
  };

  return (
    <Carousel
      showArrows={true}
      onChange={onChange}
      onClickItem={onClickItem}
      onClickThumb={onClickThumb}
      autoPlay={true}
      interval={3000}
    >
      <div>
        <img src={Photo55} alt="slide 1" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={Photo52} alt="slide 2" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src={Photo53} alt="slide 3" />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default DemoCarousel;