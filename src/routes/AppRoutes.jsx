import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Details from "../pages/Details";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route
            path="/details"
            element={
              <ProtectedRoute>
                <Details />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
