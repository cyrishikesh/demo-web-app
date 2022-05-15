import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BarGraph from "../BarGraph";
import PieChart from "../PieChart";
import * as dbQuery from "../../../utils/dbQueryHelper";
import TabOptions from "../../Tabs";

const CountryVisualizationPageStyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .loading {
    width: 50%;
    padding-left: 250px;
    padding-top: 250px;
  }

  .pie-chart-wrapper {
    width: 40%;
  }
  .bar-graph-wrapper {
    width: 80%;
  }
`;

const CountryVisualizationPage: React.FC = () => {
  const { country } = useParams();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [companyList, setCompnayList] = useState<string[]>([]);
  const [revenues, setReveunues] = useState<number[]>([]);
  const [initalLoadingMessage, setInitialLoadingMessage] =
    useState("Loading data .....");

  useEffect(() => {
    dbQuery
      .getCompanyWiseRevenue(country || "")
      .then((res: { label: string[]; value: number[] }) => {
        setCompnayList(res.label);
        setReveunues(res.value);
        setInitialLoadingMessage("");
      })
      .catch((error: any) => {
        console.log("Error while retrieving company wise revenue", error);
        setInitialLoadingMessage(
          "Error while retrieving company wise revenue, Please refresh the page"
        );
      });
  }, [country]);

  const chartOptions = ["PIE CHART", "BAR GRAPH"];

  return (
    <CountryVisualizationPageStyledWrapper>
      <TabOptions
        labels={chartOptions}
        value={activeIndex}
        setValue={setActiveIndex}
      ></TabOptions>
      {initalLoadingMessage && (
        <div className="loading">{initalLoadingMessage}</div>
      )}
      {chartOptions[activeIndex] === "PIE CHART" && !initalLoadingMessage && (
        <div className="pie-chart-wrapper">
          <PieChart
            labels={companyList}
            revenues={revenues}
            titleText={`Market share of company's in ${
              country || "this country"
            }`}
          />
        </div>
      )}
      {chartOptions[activeIndex] === "BAR GRAPH" && !initalLoadingMessage && (
        <div className="bar-graph-wrapper">
          <BarGraph
            labels={companyList}
            revenues={revenues}
            titleText={`Market share of company's in ${country}`}
          />
        </div>
      )}
    </CountryVisualizationPageStyledWrapper>
  );
};

export default CountryVisualizationPage;
