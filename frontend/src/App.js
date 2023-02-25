import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import React, { useState, useEffect } from "react";
import LoginScreen from "./Login"
import ProtectedRoute from "./ProtectedRoute"
import ProfilePage from "./Profile";
import MySubSejjit from "./MySubSejjit";
import SubSejjitDisplayPage from "./SubsejjitsPage";
import SubMainPage from "./SubMainPage";
import SubModPage from "./SubModPage";
import SavedPosts from "./SavedPosts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginScreen />} />
        <Route path="/profile" element={<ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>}>
        </Route>
        <Route path="/saved" element={<ProtectedRoute>
          <SavedPosts />
        </ProtectedRoute>}>
        </Route>
        <Route path="/mysubsejjits" element={<ProtectedRoute>
          <MySubSejjit />
        </ProtectedRoute>}>
        </Route>
        <Route path="/mysubsejjits/*" element={<ProtectedRoute>
          <SubModPage />
        </ProtectedRoute>}>
        </Route>
        <Route path="/subsejjits" element={<ProtectedRoute>
          <SubSejjitDisplayPage />
        </ProtectedRoute>}>
        </Route>
        <Route path="/subsejjits/*" element={<ProtectedRoute>
          <SubMainPage />
        </ProtectedRoute>}>
        </Route>
        <Route path='*' element={<Navigate to='/profile' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
