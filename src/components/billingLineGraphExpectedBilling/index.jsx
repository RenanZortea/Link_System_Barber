import React from 'react'
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { LinePlot, MarkPlot, lineElementClasses, markElementClasses } from '@mui/x-charts/LineChart';

export default function BillingLineGraphExpectedBilling({ title, data }) {

    const xLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  return (
    <div className='bg-white/10 dark:bg-slate-800/20 backdrop-blur-sm rounded-b-xl p-4 z-50 w-full'>
    <ChartContainer
    width={400}
    height={200}
    series={[{ type: 'line', data: data }]}
    xAxis={[{ scaleType: 'band', data: xLabels }]}
    sx={{
      [`& .${lineElementClasses.root}`]: {
        stroke: '#8884d8',
        strokeWidth: 5,
      },
      [`& .${markElementClasses.root}`]: {
        stroke: '#8884d8',
        scale: '0.6',
        fill: '#fff',
        strokeWidth: 2,
      },
    }}
  >
    <LinePlot />
    <MarkPlot />
  </ChartContainer>
  </div>
  );
}
