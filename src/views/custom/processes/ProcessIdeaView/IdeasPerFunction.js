import { merge } from 'lodash';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'components/Charts/Apexcharts';
import {
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';

// ----------------------------------------------------------------------



export default function IdeasPerFunction({ data }) {
  const chartOptions = merge(ApexChartsOption(), {
    stroke: { show: false },
    plotOptions: {
      bar: { horizontal: true, barHeight: '30%', endingShape: 'rounded' }
    },
    xaxis: {
      categories: [
        'Finance',
        'Inventory',
        'Production',
        'Supply Chain',
        'Procurement',
        'Accounting',
        'HR',
        'Legal',
        'Marketing',
        'Sales',
        'Customer Services',
        'Development',
        'IT',
        'Other',
        'Not answered',
      ],
      labels: {
        style: {
          colors: ['#F9FAFB']
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: ['#F9FAFB']
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Number of Submitted Ideas per Function" />
      <CardContent>
        <ReactApexChart
          type="bar"
          height={320}
          series={[{ data }]}
          options={chartOptions}
        />
      </CardContent>
    </Card>

  );
}

// import React from 'react';
// import { ComposedChart, Bar, ResponsiveContainer } from 'recharts';
// import {
//   XAxisRecharts,
//   YAxisRecharts,
//   TooltipRecharts,
//   CartesianGridRecharts
// } from 'components/Charts/Recharts';
// import { useTheme } from '@material-ui/core/styles';

// // ----------------------------------------------------------------------

// const CHART_DATA = [
//   { name: 'Page A', value: 590 },
//   { name: 'Page B', value: 868 },
//   { name: 'Page C', value: 1397 },
//   { name: 'Page D', value: 1480 },
//   { name: 'Page E', value: 1520 },
//   { name: 'Page F', value: 1400 }
// ];

// function BarRechart() {
//   const theme = useTheme();

//   return (
//     <ResponsiveContainer width="100%" height={360}>
//       <ComposedChart layout="vertical" data={CHART_DATA}>
//         {XAxisRecharts({ type: 'number' })}
//         {YAxisRecharts({ dataKey: 'name', type: 'category' })}
//         {TooltipRecharts({ cursor: false })}
//         {CartesianGridRecharts()}
//         <Bar
//           dataKey="value"
//           barSize={8}
//           fill={theme.palette.primary.main}
//           radius={[0, 10, 10, 0]}
//         />
//       </ComposedChart>
//     </ResponsiveContainer>
//   );
// }

// export default BarRechart;

