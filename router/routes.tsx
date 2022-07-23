import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
const MyRoutes: FC = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/example" element={<div>example</div>} />
    <Route path="*" element={<Navigate replace to="/" />} />
  </Routes>
);
export default MyRoutes;
