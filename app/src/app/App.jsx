import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routes from "../data/routes";
import MainTemplate from "../common/MainTemplate";
import HomePage from "../pages/HomePage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <MainTemplate>
          <Routes>
            <Route path={routes.home} element={<HomePage />} />
            <Route path="*" element={<Navigate to={routes.home} />} />
          </Routes>
        </MainTemplate>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
