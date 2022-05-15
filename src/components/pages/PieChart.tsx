import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";
import { generareRandomColor } from "../../utils/randomColorGenerator";

const PieChartStyledWrapper = styled.div`
  display: flex;
  padding: 24px;
  margin: 0 auto;
`;
type TPieChart = {
  labels: string[];
  revenues: number[];
  titleText: string;
};

const PieChart: React.FC<TPieChart> = ({
  labels,
  revenues,
  titleText = "Market share of company's in this country",
}) => {
  const pieChartData = {
    labels: labels,
    datasets: [
      {
        label: "Revenue",
        data: revenues,
        backgroundColor: labels.map(() => generareRandomColor()),
        hoverOffset: 4,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    width: "200",
    height: "200",
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        position: "bottom" as const,
        text: titleText,
      },
    },
  };

  ChartJS.register(LinearScale, ArcElement, Title, Tooltip, Legend);

  return (
    <PieChartStyledWrapper>
      <Pie options={pieChartOptions} data={pieChartData}></Pie>
    </PieChartStyledWrapper>
  );
};

export default PieChart;
