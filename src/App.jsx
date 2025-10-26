// src/App.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.appContainer}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
