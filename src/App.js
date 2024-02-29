import React, { useState, useEffect } from 'react';
import './App.css';

const Block1 = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimated(prevState => !prevState);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className={`block1 ${animated ? 'animated' : ''}`}>1</div>;
};

const Block2 = () => {
  return <div className='block2'>2</div>;
};

const Circle = ({ animationStarted }) => {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (animationStarted) {
      const timeout = setTimeout(() => {
        setAnimating(true);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [animationStarted]);

  return <div className={`circle ${animating ? 'animate' : ''}`} />;
};

const Timer = ({}) => {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return <div className='timer'>Timer: {seconds}</div>;
};

const App = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  const handleAnimationStart = () => {
    setAnimationStarted(true);
  };

  return (
    <div className='wrapper'>
      <div className='app'>
        <Block1 />
        <Block2 />
      </div>

      <button
        className='start'
        onClick={handleAnimationStart}
        disabled={animationStarted}
      >
        {animationStarted ? <Timer /> : 'START'}
      </button>

      {animationStarted && <Circle animationStarted={animationStarted} />}
    </div>
  );
};

export default App;
