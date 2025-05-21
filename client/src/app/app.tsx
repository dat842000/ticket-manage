import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import styles from "./app.module.css";
import Tickets from "./tickets/tickets";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { appActions } from "../redux/app/slice";
import { selectTickets } from "../redux/app/selectors";
import TicketDetails from "./ticket-details/ticket-details";

const App = () => {
  const dispatch = useAppDispatch();
  const tickets = useAppSelector(selectTickets);

  useEffect(() => {
    dispatch(appActions.getAppData());
  }, []);

  return (
    <div className={styles["app"]}>
      <h1>Ticketing App</h1>
      <Routes>
        <Route path="/" element={<Tickets tickets={tickets} />} />
        <Route path="/:id" element={<TicketDetails />} />
      </Routes>
    </div>
  );
};

export default App;
