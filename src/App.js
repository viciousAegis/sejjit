import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import React, { useState, useEffect } from "react";
import Auth from "./Auth"
import LoginScreen from "./Login"
import ProtectedRoute from "./ProtectedRoute"
import ProfilePage from "./Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginScreen />} />
        <Route path="/profile" element={<ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>}>
        </Route>
        <Route path='*' element={<Navigate to='/profile' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
