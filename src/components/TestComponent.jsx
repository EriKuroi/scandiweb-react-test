import React from 'react';
import ghibli1 from "../assets/ghibli1.jpg";

const TestComponent = () => {
  return (
    <div style={{
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'center'
    }}>
      <img src={ghibli1} alt="" style={{width: '280px'}}/>
      <p style={{marginLeft: '10px'}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  );
};


export default TestComponent;
