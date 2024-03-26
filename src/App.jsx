import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./app/page";
import Login from "./app/login/page";
import Register from "./app/signup/page";
import DashBoard from "./app/me/page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
