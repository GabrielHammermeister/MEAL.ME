import { Box, Card, CardHeader } from '@mui/material'
import ReactApexChart from 'react-apexcharts'

import React from 'react'
import { ApexOptions } from 'apexcharts'
import useChart from '@/hooks/useChart'

export default function UserGoalChart({ chartData }: any) {
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: [
      '01/01/2003',
      '02/01/2003',
      '03/01/2003',
      '04/01/2003',
      '05/01/2003',
      '06/01/2003',
      '07/01/2003',
      '08/01/2003',
      '09/01/2003',
      '10/01/2003',
      // '11/01/2003',
      // '12/01/2003',
    ],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} kg`
          }
          return y
        },
      },
    },
  })

  return (
    <>
      <Card>
        <CardHeader title={'title'} subheader={'subheader'} />

        <Box sx={{ p: 3, pb: 1 }} dir='ltr'>
          <ReactApexChart type='line' series={chartData} options={chartOptions} height={364} />
        </Box>
      </Card>
    </>
  )
}
