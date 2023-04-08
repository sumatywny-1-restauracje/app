import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainTemplate from "../common/MainTemplate";
import routes from "../data/routes";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <MainTemplate>
          <Routes>
            <Route path={routes.home} element={<div />} />
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
