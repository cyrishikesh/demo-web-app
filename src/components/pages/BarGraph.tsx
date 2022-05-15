import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import { generareRandomColor } from "../../utils/randomColorGenerator";

const BarGraphStyledWrapper = styled.div`
  display: flex;
  padding: 30px;
  margin: 0 auto;
`;

type TBarGraphProps = {
  labels: string[];
  revenues: number[];
  titleText: string;
};

const BarGraph: React.FC<TBarGraphProps> = ({
  labels = [],
  revenues = [],
  titleText = "Month wise Revenue of this Company",
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const BarGraphdata = {
    labels: labels,
    datasets: [
      {
        label: "Revenue",
        data: revenues,
        backgroundColor: generareRandomColor(),
      },
    ],
  };

  const BarGraphOption = {
    responsive: true,
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

  return (
    <BarGraphStyledWrapper>
      <Bar options={BarGraphOption} data={BarGraphdata}></Bar>
    </BarGraphStyledWrapper>
  );
};

export default BarGraph;
