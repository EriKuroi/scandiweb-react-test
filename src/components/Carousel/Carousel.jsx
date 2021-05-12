/* eslint-disable react/no-array-index-key */
import React, {useEffect, useState} from 'react';
import './carousel.scss';
import PropTypes from 'prop-types';
import Frame from '../Frame/Frame';
import ArrowButton from "../ArrowButton/ArrowButton";
import Point from "../Point/Point";

const mapCardsToSlides = (frames, slideSize) => {
  return frames.reduce((acc, cur, index) => {
    const slideIndex = Math.floor((index) / slideSize);
    acc[slideIndex] = acc[slideIndex] ? acc[slideIndex] : [];
    acc[slideIndex].push(cur);
    return acc;
  }, []);
};

const Carousel = ({framesArray, framesOnSlide}) => {
  const [active, setActive] = useState(0);
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const [slides] = useState(mapCardsToSlides(framesArray, framesOnSlide));
  const gap = 5;

  const slideTo = (index) => {
    if (index < 0) {
      setIsAnimationActive(false)
      setActive(slides.length)
      return
    }
    if (index > slides.length - 1) {
      setIsAnimationActive(false)
      setActive(-1)
      return
    }
    setActive(index)
  }

  const handleLeftArrowClick = () => {
    slideTo(active - 1)
  }

  const handleRightArrowClick = () => {
    slideTo(active + 1)
  }

  useEffect(() => {
    if (!isAnimationActive) {
      setIsAnimationActive(true)
      if (active >= slides.length) {
        setActive(slides.length - 1)
      }
      if (active < 0) {
        setActive(0)
      }
    }
  }, [isAnimationActive])
  return (
    framesArray.length > 0 && (
      <article
        className="carousel"
        aria-live="polite"
        style={{
          width: (300 * framesOnSlide) + (gap * (framesOnSlide + 1)) + 'px'
        }}
      >
        <div className="slider">
          <div
            className={"slide slide--virtual slide--virtual-left"}
            style={{
              transform: `translate3d(${(-1 - active) * 100}%, 0px, 0px)`,
              transition: isAnimationActive ? "all 450ms ease-out 0s" : null
            }}
          >
            {slides[slides.length - 1].map((card, ci) =>
              <Frame
                key={ci}
                data={card}
              />
            )}
          </div>
          {
            slides.map((frames, si) =>
              <div
                key={si}
                className={active === si ? "slide" : "slide"}
                style={{
                  transform: `translate3d(${(si - active) * 100}%, 0px, 0px)`,
                  transition: isAnimationActive ? "all 450ms ease-out 0s" : null
                }}
              >
                {
                  frames.map((frame, ci) => (
                      <Frame
                        key={ci}
                        frameHtml={frame}
                      />
                    ),
                  )
                }
              </div>)
          }
        </div>
        <div
          className={"slide slide--virtual slide--virtual-right"}
          style={{
            transform: `translate3d(${(slides.length - active) * 100}%, 0px, 0px)`,
            transition: isAnimationActive ? "all 450ms ease-out 0s" : null
          }}
        >
          {slides[0].map((card, ci) =>
            <Frame
              key={ci}
              data={card}
            />
          )}
        </div>
        <section className="all-points">
          {
            slides.map((frame, index) => <Point key={index} active={index === active} handleClick={slideTo} index={index}/>)
          }
        </section>
        <ArrowButton direction={'left'} handleClick={handleLeftArrowClick} />
        <ArrowButton direction={'right'} handleClick={handleRightArrowClick} />
      </article>
    )
  );
};

Carousel.propTypes =
  {
    framesArray: PropTypes.arrayOf(PropTypes.element).isRequired,
    framesOnSlide:PropTypes.number.isRequired,
};
export default Carousel;
