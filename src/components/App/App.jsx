import React from 'react';
import './app.scss';
import Carousel from '../Carousel/Carousel';
import { framesArray } from '../../functions';

const App = () => {

  return (
    <div className="main-wrapper">
      <Carousel
        framesArray={framesArray}
        framesOnSlide={3}
        slideTime={3000}
      />
        <Carousel
          framesArray={framesArray}
          framesOnSlide={2}
          slideTime={2000}
        />
        <Carousel
          framesArray={framesArray}
          framesOnSlide={1}
          slideTime={1000}
        />
    </div>
  );
};

export default App;
