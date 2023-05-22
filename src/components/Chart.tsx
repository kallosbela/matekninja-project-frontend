import { Bar } from 'react-chartjs-2';
import { Box, Flex } from '@chakra-ui/react';
import React, { FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

type Props = {
  myArray: { date: string, point?: number, time?: number }[];
  titleText: string;
  labelText: string;
  keyPropertie: string; // "point" or "time"
};

const Chart: FC<Props> = ({ myArray, titleText, labelText, keyPropertie }) => {

  const sortedArray = myArray.sort((a, b) => a.date.localeCompare(b.date)).slice(0, -1);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: titleText,
      },
    },
  };

  const labels = sortedArray.map((item) => item.date);

  const data = {
    labels,
    datasets: [
      {
        label: labelText,
        data: sortedArray.map((item) => item[keyPropertie as 'point' | 'time']),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Flex width="100%" justifyContent={"center"} >
      <Box width="100%" margin={"2rem 0"} alignContent={"center"}>
        <Bar data={data} options={options} />
      </Box>
    </Flex>
  )
};

export default Chart;
