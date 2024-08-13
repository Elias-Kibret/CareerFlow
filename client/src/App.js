import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Login,
  SignupForm,
  Layout,
  AllJobs,
  JobDetails,
} from "./components/index.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="allJobs" element={<AllJobs />} />
        <Route path="/job/:jobId" element={<JobDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
