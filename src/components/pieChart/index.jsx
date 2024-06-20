import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
    { id: 0, value: 10, label: 'Crédito', color: '#e79c25' }, // original color
    { id: 1, value: 15, label: 'Dinheiro', color: '#009ef7' }, // analogous color
    { id: 2, value: 20, label: 'Débito', color: '#7cfac3' }, // analogous color
  ];

export default function PieActiveArc() {
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
    />
  );
}