import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import styles from "./app.module.css";
import Tickets from "./tickets/tickets";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { appActions } from "../redux/app/slice";

const App = () => {
  const dispatch = useAppDispatch();
  const tickets = useAppSelector((state) => state.app.tickets);
  const users = useAppSelector((state) => state.app.users);

  useEffect(() => {
    dispatch(appActions.getAppData());
  }, []);

  return (
    <div className={styles["app"]}>
      <h1>Ticketing App</h1>
      <Routes>
        <Route path="/" element={<Tickets tickets={tickets} />} />
        <Route path="/:id" element={<h2>Details Not Implemented</h2>} />
      </Routes>
    </div>
  );
};

export default App;
