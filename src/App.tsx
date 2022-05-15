import LandingPage from "./components/pages/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpForm from "./components/login/SignUpForm";
import SignInForm from "./components/login/SignInForm";
import Header from "./components/Header";
import HomePage from "./components/pages/HomePage";
import CompanyVisualizationPage from "./components/pages/VisualizationPages/CompanyVisualizationPage";
import VisualizationWrapperPage from "./components/pages/VisualizationPages/VisulizationWrapper";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/homePage" element={<HomePage />} />
        <Route
          path="/homePage/:country"
          element={<VisualizationWrapperPage />}
        />
        <Route
          path="/homePage/:country/:company"
          element={<CompanyVisualizationPage />}
        />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/signIn" element={<SignInForm />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
