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
} from "./components/index.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="allJobs" element={<AllJobs />} />
        <Route path="/job/:jobId" element={<JobDetails />} />
        <Route path="/success" element={<SuccesFullAppied />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/create-job" element={<JobCreationPage />} />
      </Route>
    </Routes>
  );
}

export default App;
