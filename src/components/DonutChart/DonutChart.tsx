// DonutChart.tsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface DonutChartProps {
  series: number[];
  labels: string[];
}

export function DonutChart({ series, labels }: DonutChartProps) {
  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <ReactApexChart options={options} series={series} type="donut" />
  );
}
