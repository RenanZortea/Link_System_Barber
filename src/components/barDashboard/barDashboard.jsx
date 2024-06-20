import React, { useState, useEffect, useContext } from 'react';
import { Box } from '@mui/system';
import Slider from '@mui/material/Slider';
import { BarChart, barElementClasses } from '@mui/x-charts/BarChart';
import { fetchBillingData }  from '../../contexts/billingData/index'; // adjust the import path as needed
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useTheme } from '@emotion/react';
import { DarkModeContext } from '../../contexts/darkModeContext';

const highlightScope = {
  highlighted: 'series',
  faded: 'global',
};

export default function BarDashboard() {
  const [itemNb, setItemNb] = useState(18);
  const [profitData, setProfitData] = useState([]);
  const [billingActualData, setBillingActualData] = useState([]);
  const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const { darkMode } = useContext(DarkModeContext);
  const [colors, setColors] = useState(darkMode ? ['#8884d8', '#5c5ca3'] : ['#8884d8', '#5c5ca3']);

  useEffect(() => {
    setColors(darkMode ? ['#8884d8', '#5c5ca3'] : ['#8884d8', '#5c5ca3']);
  }, [darkMode]);

  const [text_colors, setTextColors] = useState(darkMode ? ['#FFFFFF', '#000000'] : ['#000000', '#FFFFFF']);

useEffect(() => {
  setTextColors(darkMode ? ['#FFFFFF', '#000000'] : ['#000000', '#FFFFFF']);
}, [darkMode]);


  

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBillingData();
      setProfitData(data.profitData);
      setBillingActualData(data.billingActualData);
    };
    fetchData();
  }, []);

  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setItemNb(newValue);
  };

  const series = [
    {
      label: 'Lucro',
      data: profitData,
    },
    {
      label: 'Líquido',
      data: billingActualData,
    },
  ].map((s) => ({ ...s, highlightScope }));

  return (
    <Box sx={{ width: '100%' }}>
      <BarChart
        sx={(theme) => ({
          [`.${barElementClasses.root}`]: {
            fill: '',
            strokeWidth: 5,
          },
          [`.MuiBarElement-series-auto-generated-id-0`]: {
            stroke: colors[0],
          },
          [`.MuiBarElement-series-auto-generated-id-1`]: {
            stroke: colors[1],
          },
          [`.${axisClasses.root}`]: {
            [`.${axisClasses.tick}, .${axisClasses.line}`]: {
              stroke: 'transparent',
              strokeWidth: 3,
            },
            [`.${axisClasses.tickLabel}`]: {
              fill: 'transparent',
            },
          },
          
        })}
          xAxis={[{ scaleType: 'band', data: labels , disableTicks: true}]}
          yAxis={[{disableLine: true, disableTicks: true }]}

        height={300}
        series={series.map((s, index) => ({
          ...s, 
          data: s.data.slice(0, itemNb + 1),
        }))}
        grid={false}
        colors={colors}
      />
    </Box>
  );
}