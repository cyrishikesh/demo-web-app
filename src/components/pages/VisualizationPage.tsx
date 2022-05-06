import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../provider/AuthProvider";
import BarGraph from "./BarGraph";
import PieChart from "./PieChart";
import * as dbQuery from "../../utils/dbQueryHelper";
import { getAnalytics, logEvent } from "firebase/analytics";

const VisualizationStyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  align-items: center;
  color: black;

  .country {
    font-weight: bold;
  }

  .visualization-container {
    display: flex;
    flex-wrap: wrap;
    padding: 24px 0;

    .visualization-options {
      display: flex;

      .option {
        border-radius: 4px;
        padding: 8px;
        margin-right: 52px;
        background-color: #86d786;
        cursor: pointer;

        &--active {
          background-color: purple;
          color: white;
        }
        &--inactive {
          pointer-events: none;
          opacity: 0.5;
        }
      }
    }

    .company-list-container {
      position: relative;
      margin-right: 52px;

      .selected-company {
        display: flex;
        align-items: center;
        padding: 8px;
        background-color: #86d786;
        border-radius: 4px;
        cursor: pointer;

        span {
          margin-right: 8px;
        }
        .arrow {
          border: solid black;
          border-width: 0 3px 3px 0;
          display: inline-block;
          padding: 3px;
        }
        .down {
          transform: rotate(45deg);
        }
      }
      .company-list {
        position: absolute;
        top: 110%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: white;
        width: 200px;
        padding: 12px;
        border-radius: 8px;
        background-color: #e2f9e2;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);

        &--hide {
          display: none;
        }
      }

      .name {
        padding: 8px;
        cursor: pointer;
        &:hover {
          color: blue;
        }

        &--selected {
          color: blue;
        }
      }
    }
  }
`;

const VisualizationPage: React.FC = () => {
  const { country } = useParams();
  const [companyList, setCompanyList] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [selectedCompany, setSelectedCompnay] = useState<string>("");
  const [showCompany, setShowCompany] = useState(false);
  const [chartType, setChartType] = useState("PIE");

  // redirect if user not authenticated
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/signIn");
  }
  useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, "visited_visualization_page");
  }, [user]);

  useEffect(() => {
    dbQuery
      .getCompanyList(country || "")
      .then((itemList) => {
        setCompanyList(itemList);
      })
      .catch((error) => {
        console.log("Error while retrieving company List");
      });
  }, [country]);

  useEffect(() => {
    if (activeIndex !== -1) {
      setSelectedCompnay(companyList[activeIndex]);
      setChartType("BAR");
    }
  }, [activeIndex, companyList]);

  return (
    <VisualizationStyleWrapper>
      <div className="country">Country: {country}</div>
      <div className="visualization-container">
        <div className="company-list-container">
          <div
            className="selected-company"
            onClick={() => {
              setShowCompany((prev) => !prev);
            }}
          >
            <span>{selectedCompany || "Select company"}</span>
            <i className="arrow down"></i>
          </div>
          <div
            className={`company-list ${
              showCompany ? "" : "company-list--hide"
            }`}
          >
            {companyList.map((company, index) => {
              return (
                <div
                  className="name"
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setShowCompany(false);
                  }}
                >
                  {company}
                </div>
              );
            })}
          </div>
        </div>
        <div className="visualization-options">
          <div
            className={`option ${chartType === "PIE" ? "option--active" : ""}`}
            onClick={() => {
              setSelectedCompnay("");
              setActiveIndex(-1);
              setChartType("PIE");
            }}
          >
            Pie Chart
          </div>
          <div
            className={`option ${chartType === "BAR" ? "option--active" : ""} ${
              activeIndex === -1 ? "option--inactive" : ""
            }`}
            onClick={() => {
              setChartType("BAR");
            }}
          >
            Bar Graph
          </div>
        </div>
      </div>

      {chartType === "PIE" && country && <PieChart country={country} />}
      {chartType === "BAR" && country && (
        <BarGraph country={country} company={selectedCompany} />
      )}
    </VisualizationStyleWrapper>
  );
};

export default VisualizationPage;
