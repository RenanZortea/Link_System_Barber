import React from 'react'
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { LinePlot, MarkPlot, lineElementClasses, markElementClasses } from '@mui/x-charts/LineChart';

export default function Graph({ title, data }) {

    const xLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  return (
    <div className='fixed bottom-4 right-5 bg-black/50 dark:bg-white/50 backdrop-blur-sm rounded-xl p-4 z-50'>
        <div>
            <h1 className='text-white dark:text-black'>{title}</h1>
        </div>
    <ChartContainer
    width={400}
    height={300}
    series={[{ type: 'line', data: data }]}
    xAxis={[{ scaleType: 'point', data: xLabels }]}
    sx={{
      [`& .${lineElementClasses.root}`]: {
        stroke: '#8884d8',
        strokeWidth: 2,
      },
      [`& .${markElementClasses.root}`]: {
        stroke: '#8884d8',
        scale: '0.6',
        fill: '#fff',
        strokeWidth: 2,
      },
    }}
    disableAxisListener
  >
    <LinePlot />
    <MarkPlot />
  </ChartContainer>
  </div>
  );
}
