import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../provider/AuthProvider";

const LandingPageStyledWrapper = styled.div`
  .content {
    display: flex;
    flex-direction: column;
    font-size: 20px;
    align-items: center;
    color: #525564;

    div {
      padding: 16px 0;
    }

    .sign-in {
      text-decoration: none;
      padding: 8px;
      border: solid 1px black;
      border-radius: 8px;
      cursor: pointer;
      margin-bottom: 8px;
      color: black;
      background-color: #eeeeef;
      &:hover {
        background-color: #0062ff;
      }
    }
  }
`;

const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (user) {
    navigate("/homepage");
  }
  return (
    <LandingPageStyledWrapper>
      <div className="content">
        <div>Welcome to Get Mega Demo Project</div>
        {!user ? (
          <>
            <div>To explore the content of website. Please Sign up</div>
            <div>
              Already have an account ? please{" "}
              <a className="sign-in" href="/signIn">
                {" "}
                Sign In
              </a>
            </div>
          </>
        ) : (
          <div> Visulize the Revenue of company country wise</div>
        )}
      </div>
    </LandingPageStyledWrapper>
  );
};

export default LandingPage;
