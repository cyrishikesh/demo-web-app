import React from "react";
import styled from "styled-components";
import { useAuth } from "../provider/AuthProvider";

const HeaderStyledWrapper = styled.div`
  .header {
    height: 80px;
    display: flex;
    align-items: center;
    padding: 24px 100px 48px;
    justify-content: space-between;

    .logo {
      padding: 10px;
      font-size: 50px;
      border: solid 1px black;
      border-radius: 10px;
      text-decoration: none;
      margin-right: 50px;
      color: purple;
      &:hover {
        background-color: #eeeeef;
      }
    }

    .sign-in,
    .sign-up,
    .sign-out {
      text-decoration: none;
      font-size: 25px;
      padding: 10px;
      border-radius: 8px;
      color: purple;
      cursor: pointer;
      &:hover {
        background-color: #eeeeef;
      }
    }

    .sign-in {
      margin-right: 40px;
    }
  }
`;

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <HeaderStyledWrapper>
      <div className="header">
        <a href="https://www.getmega.com/" className="logo">
          GetMegaDemo
        </a>
        <div style={{ display: "flex" }}>
          {!user && (
            <>
              <a className="sign-in" href="/signIn">
                Sign In
              </a>
              <a className="sign-up" href="/signUp">
                Sign up
              </a>
            </>
          )}

          {!!user && (
            <div className="sign-out" onClick={signOut}>
              Sign out
            </div>
          )}
        </div>
      </div>
    </HeaderStyledWrapper>
  );
};

export default Header;
