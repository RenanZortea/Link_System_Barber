import React, { useEffect, useState } from 'react';

const AnimatedProgressProvider = ({ valueStart, valueEnd, duration, easingFunction, children }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [value, setValue] = useState(valueStart);

  useEffect(() => {
    let startTimestamp;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setValue(easingFunction(progress) * (valueEnd - valueStart) + valueStart);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setIsAnimated(true);
      }
    };

    requestAnimationFrame(step);

    return () => {
      setIsAnimated(false);
    };
  }, [valueStart, valueEnd, duration, easingFunction]);

  return children(isAnimated ? valueEnd : value);
};

export default AnimatedProgressProvider;
