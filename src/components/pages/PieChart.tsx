import React, { useEffect, useState } from "react";
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
import * as dbQuery from "../../utils/dbQueryHelper";

const PieChartStyledWrapper = styled.div`
  display: flex;
  padding: 24px;
  width: 30%;
  margin: 0 auto;
`;
type TPieChart = {
  country: string;
};

const PieChart: React.FC<TPieChart> = ({ country }) => {
  const [labelList, setLabelList] = useState<string[]>([]);
  const [revenueList, setRevenueList] = useState<number[]>([]);
  const [data, setData] = useState({
    labels: labelList,
    datasets: [
      {
        label: "Revenue",
        data: revenueList,
        backgroundColor: labelList.map(() => generareRandomColor()),
        hoverOffset: 4,
      },
    ],
  });

  useEffect(() => {
    const data = {
      labels: labelList,
      datasets: [
        {
          label: "Revenue",
          data: revenueList,
          backgroundColor: labelList.map(() => generareRandomColor()),
          hoverOffset: 4,
        },
      ],
    };
    console.log("DATA_PIE", data);
    setData(data);
  }, [labelList, revenueList]);

  useEffect(() => {
    dbQuery
      .getCompanyWiseRevenue(country)
      .then((res: { label: string[]; value: number[] }) => {
        console.log("RES_PIE", res);
        setLabelList(res.label);
        setRevenueList(res.value);
      })
      .catch((error) => {
        console.log("Error while retrieving company wise revenue", error);
      });
  }, [country]);

  ChartJS.register(LinearScale, ArcElement, Title, Tooltip, Legend);
  const options = {
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
        text: "Market share of company's in this country",
      },
    },
  };

  return (
    <PieChartStyledWrapper>
      <Pie options={options} data={data}></Pie>
    </PieChartStyledWrapper>
  );
};

export default PieChart;
