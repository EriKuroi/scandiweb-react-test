import React from 'react';
import './app.scss';
import Carousel from '../Carousel/Carousel';
import ghibli from '../../assets/ghibli.jpg';
import ghibli1 from '../../assets/ghibli1.jpg';
import ghibli2 from '../../assets/ghibli2.jpg';
import ghibli3 from '../../assets/ghibli3.jpg';
import ghibli4 from '../../assets/ghibli4.jpg';
import ghibli5 from '../../assets/ghibli5.jpg';

const App = () => {
  const framesArray = [
    <img src={ghibli} alt="" />,
    <article>
      <h2>Some useful headline</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        . Proin tempor ullamcorper enim eget fermentum. Quisque dolor odio
        , iaculis eget porttitor vitae, pellentesque at tortor. Nam lectus lectus
        , volutpat vitae placerat sit amet, finibus vitae massa
        . Integer sed magna quis elit eleifend tristique.
      </p>
    </article>,
    <img src={ghibli1} alt="" />,
    <img src={ghibli2} alt="" />,

    <h1 style={{
      fontFamily: 'sans-serif',
      fontSize: '2.5em',
      fontWeight: 900,
      textAlign: "center",
      color: "orange"
    }}>ORANGE ROARING HEADLINE!</h1>,
    <img src={ghibli3} alt="" />,
    <img src={ghibli4} alt="" />,
    <div style={{display: 'flex',
      flexFlow: 'column',
    alignItems: 'center'}}>
      <img src={ghibli1} alt=""  style={{width: '280px'}}/>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>,
    <img src={ghibli5} alt="" />,
  ];
  return (
    <div className="main-wrapper">
      <Carousel
        framesArray={framesArray}
        framesOnSlide={3}
      />
      <Carousel
        framesArray={framesArray}
        framesOnSlide={2}
      />
      <Carousel
        framesArray={framesArray}
        framesOnSlide={1}
      />
    </div>
  );
};

export default App;
