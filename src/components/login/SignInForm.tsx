import React from "react";
import { useFormik } from "formik";
import FIREBASE_AUTHENTICATION from "../../utils/firebase";
import { SignUpOrSignInFormStyleWrapper } from "./SignUpForm";
import GoogleIcon from "../../assests/google.png";
import { useAuth } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const SignInForm: React.FC = () => {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  if (user) {
    navigate("/homePage");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      FIREBASE_AUTHENTICATION.auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then((res) => {
          console.log("Successfully logged in");
        })
        .catch((err) => {
          console.log("Oops login failed Try again!");
        });
    },
  });
  return (
    <SignUpOrSignInFormStyleWrapper>
      <div className="google-auth-wrapper" onClick={signInWithGoogle}>
        Sign In with
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
            <label htmlFor="email">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </SignUpOrSignInFormStyleWrapper>
  );
};

export default SignInForm;
