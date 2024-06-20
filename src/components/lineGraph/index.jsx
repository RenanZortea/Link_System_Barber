  import * as React from 'react';
  import { LineChart, AnimatedLine } from '@mui/x-charts/LineChart';
  import { useChartId, useDrawingArea, useXScale } from '@mui/x-charts/hooks';
  import { axisClasses } from '@mui/x-charts';
 /*  import { fetchCustomerData } from '../../contexts/customerData'; */


  function CustomAnimatedLine(props) {
    const { limit, sxBefore, sxAfter, ...other } = props;
    const { top, bottom, height, left, width } = useDrawingArea();
    const scale = useXScale();
    const chartId = useChartId();
    
    

    if (limit === undefined) {
      return <AnimatedLine {...other} />;
    }

    const limitPosition = scale(limit); // Convert value to x coordinate.

    if (limitPosition === undefined) {
      return <AnimatedLine {...other} />;
    }

    const clipIdleft = `${chartId}-${props.ownerState.id}-line-limit-${limit}-1`;
    const clipIdRight = `${chartId}-${props.ownerState.id}-line-limit-${limit}-2`;
    return (
      <React.Fragment>
        <clipPath id={clipIdleft}>
          <rect
            x={left}
            y={0}
            width={limitPosition - left}
            height={top + height + bottom}
          />
        </clipPath>
        <clipPath id={clipIdRight}>
          <rect
            x={limitPosition}
            y={0}
            width={left + width - limitPosition}
            height={top + height + bottom}
          />
        </clipPath>
        <g clipPath={`url(#${clipIdleft})`}>
          <AnimatedLine {...other} sx={sxBefore} />
        </g>
        <g clipPath={`url(#${clipIdRight})`}>
          <AnimatedLine {...other} sx={sxAfter} />
        </g>
      </React.Fragment>
    );
  }

export default function LineGraph() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const exampleData = [25, 35, 45, 200, 65, 75, 85, 75, 65, 55, 45, 35];

  const [customerData, setCustomerData] = React.useState(exampleData);


  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

/* React.useEffect(() => {
  const fetchData = async () => {
    const fetchedData = await fetchCustomerData();
    if (fetchedData && Array.isArray(fetchedData.customerActualData)) {
      setCustomerData(fetchedData.customerActualData);
    } else {
      console.error('fetchedData is not an object or customerActualData is not an array:', fetchedData);
    }
  };

  fetchData();
}, []); */

const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  return (
  <>
    <svg style={{ height: 0, width: '100%'}}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#8884d8', stopOpacity: 0.1 }} />
          <stop offset="100%" style={{ stopColor: '#8884d8', stopOpacity: 0.5 }} />
        </linearGradient>
      </defs>
    </svg>
    <LineChart
  sx={(theme) => ({
    [`.${axisClasses.root}`]: {
      [`.${axisClasses.tick}, .${axisClasses.line}`]: {
        stroke: '#dbdbdb',
        strokeWidth: 3,
      },
      [`.${axisClasses.tickLabel}`]: {
        fill: '#CFCFCF',
      },
    },
    [`.MuiAreaElement-root`]: {
      fill: 'url(#gradient)'
    },
  })}
  series={[
    {
      type: 'line',
      data: customerData,
      valueFormatter: (v, i) => <span style={{ color: 'black' }}>{`${v}`}</span>,
      showMark: ({ index }) => index % 2 === 0,
      color: '#8884d8',
      area: true,
    },
  ]}
  xAxis={[{ scaleType: 'point', data: labels }]}
  height={300}
  width={width/2}
  slots={{ line: CustomAnimatedLine }}
  slotProps={{ line: { limit: 5, sxAfter: { strokeDasharray: '10 5' } } }}
  grid={false}
/>
  </>
);
}