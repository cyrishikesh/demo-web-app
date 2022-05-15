import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../../provider/AuthProvider";
import BarGraph from "../BarGraph";
import PieChart from "../PieChart";
import * as dbQuery from "../../../utils/dbQueryHelper";
import { getAnalytics, logEvent } from "firebase/analytics";
import TabOptions from "../../Tabs";

const CompanyVisualizationPageStyledWrapper = styled.div`
  display: flex;
  padding: 0 100px;
  flex-direction: column;
  font-size: 24px;
  align-items: center;
  color: black;

  .info {
    display: flex;
    div {
      padding-right: 32px;
      font-weight: bold;
    }
  }

  .loading {
    width: 50%;
    padding-top: 250px;
    padding-left: 250px;
  }

  .pie-chart-wrapper {
    width: 50%;
  }
  .bar-graph-wrapper {
    width: 80%;
  }
`;

const CompanyVisualizationPage: React.FC = () => {
  const { country, company } = useParams();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [labels, setLabels] = useState<string[]>([]);
  const [revenues, setReveunues] = useState<number[]>([]);
  const [initalLoadingMessage, setInitialLoadingMessage] =
    useState("Loading data .....");
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/signIn");
  }
  useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, "visited_country_wise_visualization_page");
  }, [user]);

  useEffect(() => {
    dbQuery
      .getMonthWiseRevenueOfCompany(country || "", company || "")
      .then((res: { label: string[]; value: number[] }) => {
        console.log("RES_BAR", res);
        setLabels(res.label);
        setReveunues(res.value);
        setInitialLoadingMessage("");
      })
      .catch((error) => {
        {
          setInitialLoadingMessage(
            "Error while retrieving company wise revenue, please refresh page again!"
          );
        }
        console.log(
          "Error while retrieving company wise revenue, please refresh page again!",
          error
        );
      });
  }, [country, company]);

  const chartOptions = ["BAR GRAPH", "PIE CHART"];
  console.log("[Compnay]", country, " ", company);

  return (
    <CompanyVisualizationPageStyledWrapper>
      <div className="info">
        <div>Country: {country}</div>
        <div>Company: {company}</div>
      </div>
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
            labels={labels}
            revenues={revenues}
            titleText={`Monthly revenue of ${company} in ${country}`}
          />
        </div>
      )}
      {chartOptions[activeIndex] === "BAR GRAPH" && !initalLoadingMessage && (
        <div className="bar-graph-wrapper">
          <BarGraph
            labels={labels}
            revenues={revenues}
            titleText={`Monthly revenue of ${company} in ${country}`}
          />
        </div>
      )}
    </CompanyVisualizationPageStyledWrapper>
  );
};

export default CompanyVisualizationPage;
