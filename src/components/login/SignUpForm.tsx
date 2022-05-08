import React, { useState } from "react";
import { useFormik } from "formik";
import styled from "styled-components";
import { useAuth } from "../../provider/AuthProvider";
import GoogleIcon from "../../assests/google.png";
import { useNavigate } from "react-router-dom";

export const SignUpOrSignInFormStyleWrapper = styled.div`
  form {
    label {
      display: block;
      padding-bottom: 12px;
    }

    input {
      height: 36px;
      width: 400px;
      font-size: 20px;
      margin-bottom: 24px;
    }

    button {
      width: 180px;
      height: 50px;
      font-size: 24px;
      margin-top: 12px;
      cursor: pointer;
      background-color: #0062ff;
      color: white;
      border: none;
      border-radius: 4px;

      &:hover {
        background-color: blue;
      }
    }
  }

  .form-container {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    width: 500px;
    padding: 20px 16px;
    box-sizing: border-box;
    border-radius: 8px;
    font-size: 28px;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 30%);
  }

  .google-auth-wrapper {
    display: flex;
    width: 500px;
    height: 76px;
    border: solid 1px #525564;
    font-size: 28px;
    margin: 0 auto 36px;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    box-sizing: border-box;

    &:hover {
      background-color: #eeeeef;
    }
    .google-logo {
      height: 64px;
      width: 64px;
      margin-left: 16px;
    }
  }
`;

const SignUpForm: React.FC = () => {
  const { user, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  if (user) {
    navigate("/homePage");
  }
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log("[Form values]", values);
      if (values.confirmPassword !== values.password) {
        setError("Password didn't match, Please try again!");
        return;
      }
      try {
        setLoading(true);
        signUp(values.email, values.password);
      } catch {
        setError("Password didn't match, Please try again!");
      }
      setLoading(false);
    },
  });

  return (
    <SignUpOrSignInFormStyleWrapper>
      <div className="google-auth-wrapper" onClick={signInWithGoogle}>
        Sign Up with
        <img className="google-logo" alt="GoogleIcon" src={GoogleIcon} />
      </div>
      <div className="form-container">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div>
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
          </div>
          {error && <div>{error}</div>}
          <div style={{ textAlign: "center" }}>
            <button type="submit" disabled={isLoading}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </SignUpOrSignInFormStyleWrapper>
  );
};

export default SignUpForm;
