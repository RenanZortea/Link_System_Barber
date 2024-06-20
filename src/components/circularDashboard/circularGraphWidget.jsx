import React, { useContext, useState, useEffect } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { easeQuadInOut } from 'd3-ease';
import AnimatedProgressProvider from './animatedProgressProvider';
import './circularGraphWidget.css';
import { DarkModeContext } from '../../contexts/darkModeContext';





const CircularGraphWidget = ({ title, percentage }) => {
  const { darkMode } = useContext(DarkModeContext);
const [textColor, setTextColor] = useState(darkMode ? '#FFF' : '#000');

useEffect(() => {
  setTextColor(darkMode ? '#FFF' : '#000');
}, [darkMode]);
  return (
    <div className="widget">
      <div className="progress-container">
        <AnimatedProgressProvider
          valueStart={0}
          valueEnd={percentage}
          duration={5}
          easingFunction={easeQuadInOut}
        >
          {(value) => (
            <CircularProgressbarWithChildren
              value={value}
              text={`${Math.round(value)}%`}
              styles={buildStyles({
                textColor: textColor, 
                pathColor: '#8884d8', 
                trailColor: '#d9d9d9', // hexadecimal for a medium gray
              })}
            >
            </CircularProgressbarWithChildren>
          )}
        </AnimatedProgressProvider>
      </div>
      <h3 className="widget-title">{title}</h3>
    </div>
  );
};
export default CircularGraphWidget;
