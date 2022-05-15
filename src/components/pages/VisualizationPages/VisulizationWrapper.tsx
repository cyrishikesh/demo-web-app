import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../../provider/AuthProvider";
import * as dbQuery from "../../../utils/dbQueryHelper";
import { getAnalytics, logEvent } from "firebase/analytics";
import CountryVisualizationPage from "./CountryVisualizationPage";

const VisualizationStyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  padding: 0 100px;
  color: black;

  .instruction {
    display: flex;
    justify-content: center;
    font-size: 16px;
    padding-left: 16px;
    padding-bottom: 16px;
    font-weight: bold;
    color: #4e065a;
  }

  .visualization-option {
    display: flex;
    align-items: center;
    justify-content: center;
    .country {
      font-weight: bold;
      padding: 16px 32px 16px 16px;
    }
  }

  .visualization-container {
    padding: 24px 0;
  }
  .company-list-container {
    position: relative;
    margin-right: 52px;

    .selected-company {
      display: flex;
      align-items: center;
      padding: 8px;
      background-color: #cc99d4;
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
      width: 200px;
      padding: 12px;
      border-radius: 8px;
      background-color: #e7acf3;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);

      &--hide {
        display: none;
      }
    }

    .name {
      padding: 8px;
      cursor: pointer;
      text-decoration: none;
      color: black;
    }
  }
`;

const VisualizationWrapperPage: React.FC = () => {
  const { country } = useParams();
  const [companyList, setCompanyList] = useState<string[]>([]);
  const [openDropDown, setOpenDropDown] = useState(false);

  // redirect if user not authenticated
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/signIn");
  }

  useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, "visited_visualization_wrapper_page");
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

  return (
    <VisualizationStyleWrapper>
      <div className="instruction">
        Select company to visualize monthly revenue of company in this country
      </div>
      <div className="visualization-option">
        <div className="country">Country: {country}</div>
        <div className="company-list-container">
          <div
            className="selected-company"
            onClick={() => {
              setOpenDropDown((prev) => !prev);
            }}
          >
            <span>{"Select company"}</span>
            <i className="arrow down"></i>
          </div>
          <div
            className={`company-list ${
              openDropDown ? "" : "company-list--hide"
            }`}
          >
            {companyList.map((company, index) => {
              return (
                <a
                  className="name"
                  key={index}
                  href={`/homePage/${country}/${company}`}
                >
                  {company}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <CountryVisualizationPage />
    </VisualizationStyleWrapper>
  );
};

export default VisualizationWrapperPage;
