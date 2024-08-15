import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Login,
  SignupForm,
  Layout,
  AllJobs,
  JobDetails,
  SuccesFullAppied,
  LandingPage,
  JobCreationPage,
  SuccessPage,
  JobsList,
  Home,
  SignupPage,
  LoginPage,
} from "./components/index.js";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="allJobs" element={<AllJobs />} />
        <Route path="/job/:jobId" element={<JobDetails />} />
        <Route path="/success" element={<SuccesFullAppied />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/create-job" element={<JobCreationPage />} />
        <Route path="/success-created-job" element={<SuccessPage />} />
        <Route path="/myJobs" element={<JobsList />} />
      </Route>
    </Routes>
  );
}

export default App;
