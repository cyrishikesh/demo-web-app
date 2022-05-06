import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../provider/AuthProvider";
import * as dbQuery from "../../utils/dbQueryHelper";

const HomePageStyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  align-items: center;
  color: #525564;

  .select-country {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-top: 24px;

    .name {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 150px;
      padding: 4px;
      margin-right: 12px;
      margin-bottom: 12px;
      background-color: #86d786;
      cursor: pointer;
      border-radius: 4px;
      text-decoration: none;
      color: #4d4dad;
      &:hover {
        background-color: #9cee9c;
      }
    }
  }
`;

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/signIn");
  }

  const [countryList, setCountryList] = useState<string[]>([]);
  useEffect(() => {
    dbQuery
      .getCountryList()
      .then((itemlist) => {
        setCountryList(itemlist);
      })
      .catch((error) => {
        console.log("Error in retrieving the countryList, Error is:", error);
      });
  }, []);

  return (
    <HomePageStyledWrapper>
      <div>
        Select country to visulize the revenue data of company in the country
      </div>
      <div className="select-country">
        {countryList.map((country, index) => {
          return (
            <a className="name" key={index} href={`homePage/${country}`}>
              {country}
            </a>
          );
        })}
      </div>
    </HomePageStyledWrapper>
  );
};

export default HomePage;
