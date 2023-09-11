import { useState } from "react";
import { useAuth } from "./contexts/AuthContext";

import AuthenticationPage from "./pages/AuthenticationPage";
import Dashboard from "./pages/Dashboard";

import AnonymousAlert from "./alerts/AnonymousAlert";
import InstallAlert from "./alerts/InstallAlert";

function App() {
  const { currentUser } = useAuth()
  
  return (
    <>
      {!currentUser && <AuthenticationPage />}
      {currentUser && <Dashboard />}
      <br></br>
      {currentUser && currentUser.isAnonymous && <AnonymousAlert />}
      {navigator.userAgent.includes("Mobile") && !window.matchMedia('(display-mode: standalone)').matches && <InstallAlert />}
    </>
  );
}

export default App;
