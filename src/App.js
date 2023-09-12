
import { useAuth } from "./contexts/AuthContext"

import AuthenticationPage from "./pages/AuthenticationPage"
import Dashboard from "./pages/Dashboard"

import AnonymousAlert from "./alerts/AnonymousAlert"
import InstallAlert from "./alerts/InstallAlert"
import DarkModeAlert from "./alerts/DarkModeAlert"

import styles from "./App.module.css"

function App() {
  const { currentUser } = useAuth()
  
  return (
    <>
      <div className={styles.background}></div>
      {!currentUser && <AuthenticationPage />}
      {currentUser && <Dashboard />}
      <br></br>
      <div className={styles.alerts}>
        {currentUser && currentUser.isAnonymous && <AnonymousAlert />}
        {navigator.userAgent.match(/samsung/i) && <DarkModeAlert />}
        {navigator.userAgent.includes("Mobile") && !window.matchMedia('(display-mode: standalone)').matches && <InstallAlert />}
      </div>
    </>
  );
}

export default App;
