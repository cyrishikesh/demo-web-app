import React, { useEffect, useState } from "react";
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
import * as dbQuery from "../../utils/dbQueryHelper";

const BarGraphStyledWrapper = styled.div`
  display: flex;
  padding: 30px;
  margin: 0 auto;
  width: 60%;
`;

type TBarGraphProps = {
  country: string;
  company: string;
};

const BarGraph: React.FC<TBarGraphProps> = ({ country, company }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const [labelList, setLabelList] = useState<string[]>([]);
  const [revenueList, setRevenueList] = useState<number[]>([]);
  const [data, setData] = useState({
    labels: labelList,
    datasets: [
      {
        label: "Revenue",
        data: revenueList,
        backgroundColor: generareRandomColor(),
      },
    ],
  });

  useEffect(() => {
    dbQuery
      .getMonthWiseRevenueOfCompany(country, company)
      .then((res: { label: string[]; value: number[] }) => {
        console.log("RES_BAR", res);
        setLabelList(res.label);
        setRevenueList(res.value);
      })
      .catch((error) => {
        console.log("Error while retrieving company wise revenue", error);
      });
  }, [country, company]);

  useEffect(() => {
    const data = {
      labels: labelList,
      datasets: [
        {
          label: "Revenue",
          data: revenueList,
          backgroundColor: generareRandomColor(),
        },
      ],
    };
    setData(data);
    console.log("[DATA_BAR", data);
  }, [labelList, revenueList]);

  useEffect(() => {
    console.log("[data]", data);
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        position: "bottom" as const,
        text: "Month wise Revenue of this Company",
      },
    },
  };

  return (
    <BarGraphStyledWrapper>
      <Bar options={options} data={data}></Bar>
    </BarGraphStyledWrapper>
  );
};

export default BarGraph;
