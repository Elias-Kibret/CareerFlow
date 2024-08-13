import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, SignupForm, Layout } from "./components/index.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignupForm />} />
        {/* Add other routes here */}
      </Route>
    </Routes>
  );
}

export default App;
