import React, {useEffect, useState, useRef} from 'react';
import './carousel.scss';
import PropTypes from 'prop-types';
import Frame from '../Frame/Frame';
import ArrowButton from "../ArrowButton/ArrowButton";
import Point from "../Point/Point";
import {mapCardsToSlides} from '../../functions';

const Carousel = ({framesArray, framesOnSlide, slideTime}) => {
  const [active, setActive] = useState(0);
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const [slides] = useState(mapCardsToSlides(framesArray, framesOnSlide));
  const [mouseDown, setMouseDown] = useState(false);
  const [pagex, setPagex] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [frameWidth, setFrameWidth] = useState(300);
  const frameRef = useRef(null)
  const gap = 5;
  let delayedSlideMove;

  const slideTo = (index) => {
    setActive(index)
    if (index < 0 || index > slides.length - 1) {
      setTimeout(() => {
        setIsAnimationActive(false)
      }, 450);
    }
  }
  const getTranslate = (position) => {
    let result = (position - active);
    if (mouseDown && pagex) {
      const shift = (pagex - startPoint);
      result = result + shift / 600;
    }
    return result * 100
  };
  const switchActiveSlide = (e) => {
    const shift = pagex - startPoint;
    const width = window.getComputedStyle(e.currentTarget).width;
    const enough = width.slice(0, -2) / 3;
    if (shift >= enough) {
      slideTo(active - 1);
    }
    if (shift <= -enough) {
      slideTo(active + 1);
    }
  }
  const handleLeftArrowClick = () => {
    clearTimeout(delayedSlideMove);
    slideTo(active - 1)
  }

  const handleRightArrowClick = () => {
    clearTimeout(delayedSlideMove);
    slideTo(active + 1)
  }
  const handleMouseDown = (e) => {
    setIsAnimationActive(false);
    clearTimeout(delayedSlideMove);
    setMouseDown(true);
    setStartPoint(Math.round(e.targetTouches[0].pageX));
  };
  const handleMouseUp = (e) => {
    switchActiveSlide(e);
    setMouseDown(false);
    setPagex(null);
    setStartPoint(null);
    setIsAnimationActive(true);
  }
  const handleMouseMove = (e) => {
    if (mouseDown) {
      let position
      e.type === 'touchmove' ? position = Math.round(e.targetTouches[0].pageX) : position = e.pageX;
      setPagex(position);
    }
  };
  const handlePointClick = (slide) => {
    slideTo(slide);
  };
  const handlePreventDrag = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const parameters = frameRef.current.getBoundingClientRect();
    setFrameWidth(parameters.width);
  }, [frameRef])

  useEffect(() => {
    if (!isAnimationActive) {
      if (active >= slides.length) {
        setActive(0);
      }
      if (active < 0) {
        setActive(slides.length - 1);
      }

    }
  }, [active, isAnimationActive]);

  useEffect(() => {
    if (active === 0 || active === slides.length - 1) {
      setTimeout(() => {
        setIsAnimationActive(true);
      }, 450)
    }
    if (!mouseDown) {
      delayedSlideMove = setTimeout(() => slideTo(active + 1), slideTime);
      return () => clearTimeout(delayedSlideMove);
    }
  }, [active, mouseDown]);

  return (
    framesArray.length > 0 && (
      <article
        className="carousel"
        aria-live="polite"
        style={{
          width: (frameWidth * framesOnSlide) + (gap * (framesOnSlide + 1)) + 'px'
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
                refFrame={frameRef}
              />
            )}
          </div>
          {
            /* I know that it is not safe to use index as key in most cases,
            but as long as this carousel uses fixed elements I did not forced unique keys. */
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
            slides.map((frame, index) => <Point key={index} active={index === active} handleClick={handlePointClick}
                                                index={index}/>)
          }
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
    slideTime: PropTypes.number,
  };

Carousel.defaultProps = {
  slideTime: 3000,
}
export default Carousel;
