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
  const [mouseDown, setMouseDown] = useState(false);
  const [pagex, setPagex] = useState(null);
  const [startPoint, setStartPoint] = useState(null)

  const gap = 5;
  const time = 3000;

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
  const getTranslate = (position) => {
    let result = (position - active);
    if (mouseDown && pagex) {
      let shift = (pagex - startPoint);
      // if (shift > 200){
      //   shift = 200;
      // }
      // if (shift < -200){
      //   shift = -200
      // }
      result = result + shift / 600;
    }
    return result * 100
  };
  const switchActiveSlide = (e) => {
    const shift = pagex - startPoint;
    const width = window.getComputedStyle(e.currentTarget).width;
    const enough = width.slice(0, -2) / 3;
    if (shift >= enough){
      setActive(active - 1);
    }
    if (shift <= -enough) {
      setActive(active + 1);
    }
  }
  const handleLeftArrowClick = () => {
    slideTo(active - 1)
  }

  const handleRightArrowClick = () => {
    slideTo(active + 1)
  }
  const handleMouseDown = (e) => {
    setMouseDown(true);
    setStartPoint(Math.round(e.targetTouches[0].pageX));
  };
  const handleMouseUp = (e) => {
    switchActiveSlide(e);
    setMouseDown(false);
    setPagex(null);
    setStartPoint(null);
  }
  const handleMouseMove = (e) => {
    if (mouseDown) {
      let position
      e.type === 'touchmove' ? position = Math.round(e.targetTouches[0].pageX) : position = e.pageX;
      setPagex(position);
    }
  };
  const handlePreventDrag = (e) => {
    e.preventDefault();
  };

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
  }, [isAnimationActive]);

  useEffect(() => {
    if (!mouseDown) {
      let next
      if (active === slides.length - 1) {
        next = 0
      } else {
        next = (active + 1);
      }
      const id = setTimeout(() => slideTo(next), time);
      return () => clearTimeout(id);
    }
  }, [active, mouseDown]);

  return (
    framesArray.length > 0 && (
      <article
        className="carousel"
        aria-live="polite"
        style={{
          width: (300 * framesOnSlide) + (gap * (framesOnSlide + 1)) + 'px'
        }}
      >
        <div
          className="slider"
        >
          <div
            className={"slide slide--virtual slide--virtual-left"}
            style={{
              transform: `translate3d(${getTranslate(-1)}%, 0px, 0px)`,
              transition: isAnimationActive ? "all 450ms ease-out 0s" : null
            }}
          >
            {slides[slides.length - 1].map((frame, fi) =>
              <Frame
                key={fi}
                frameHtml={frame}
              />
            )}
          </div>
          {
            slides.map((frames, si) =>
              <div
                key={si}
                className={active === si ? "slide" : "slide"}
                style={{
                  transform: `translate3d(${getTranslate(si)}%, 0px, 0px)`,
                  transition: isAnimationActive ? "all 450ms ease-out 0s" : null
                }}
                onDragStart={handlePreventDrag}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                onTouchMove={handleMouseMove}
              >
                {
                  frames.map((frame, fi) => (
                      <Frame
                        key={fi}
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
            transform: `translate3d(${getTranslate(slides.length)}%, 0px, 0px)`,
            transition: isAnimationActive ? "all 450ms ease-out 0s" : null
          }}
        >
          {slides[0].map((frame, ci) =>
            <Frame
              key={ci}
              frameHtml={frame}
            />
          )}
        </div>
        <section className="all-points">
          {
            slides.map((frame, index) => <Point key={index} active={index === active} handleClick={slideTo}
                                                index={index}/>)
          }
          <p>PageX: {pagex - startPoint}</p>
        </section>
        <ArrowButton direction={'left'} handleClick={handleLeftArrowClick}/>
        <ArrowButton direction={'right'} handleClick={handleRightArrowClick}/>
      </article>
    )
  );
};

Carousel.propTypes =
  {
    framesArray: PropTypes.arrayOf(PropTypes.element).isRequired,
    framesOnSlide: PropTypes.number.isRequired,
  };
export default Carousel;
