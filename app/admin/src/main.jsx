import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Bikes from "./pages/Bikes.jsx";
import Helmets from "./pages/Helmets.jsx";

const RequireAuth = ({children}) => {
  const t = localStorage.getItem("token");
  return t ? children : <Navigate to="/login" replace />;
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/bikes" element={<RequireAuth><Bikes/></RequireAuth>} />
      <Route path="/helmets" element={<RequireAuth><Helmets/></RequireAuth>} />
      <Route path="*" element={<Navigate to="/bikes" replace />} />
    </Routes>
  </BrowserRouter>
);
