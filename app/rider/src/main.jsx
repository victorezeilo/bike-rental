import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Browse from "./pages/Browse.jsx";
import Flow from "./pages/Flow.jsx";

const RequireAuth = ({children}) => localStorage.getItem("token") ? children : <Navigate to="/login" replace />;

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/browse" element={<RequireAuth><Browse/></RequireAuth>} />
      <Route path="/flow" element={<RequireAuth><Flow/></RequireAuth>} />
      <Route path="*" element={<Navigate to="/browse" replace />} />
    </Routes>
  </BrowserRouter>
);
