import LandingPage from "./components/pages/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpForm from "./components/login/SignUpForm";
import SignInForm from "./components/login/SignInForm";
import Header from "./components/Header";
import HomePage from "./components/pages/HomePage";
import VisualizationPage from "./components/pages/VisualizationPage";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/homePage/:country" element={<VisualizationPage />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/signIn" element={<SignInForm />} />
      </Routes>
    </Router>
  );
};

export default App;
