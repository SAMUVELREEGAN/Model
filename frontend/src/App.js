import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import PrivateRoute from "./components/PrivateRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedPage from "./pages/ProtectedPage";
import HomePage from "./pages/HomePage";
import PrivateLoginRoute from "./components/PrivateLoginRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/login" element={
            <PrivateLoginRoute>
            <LoginPage />
            </PrivateLoginRoute>
            } />
          <Route path="/register" element={
            <PrivateLoginRoute>
            <RegisterPage />
            </PrivateLoginRoute>
            } />
          <Route path="/protected"
            element={
              // <PrivateRoute>
                <ProtectedPage />
              // </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
