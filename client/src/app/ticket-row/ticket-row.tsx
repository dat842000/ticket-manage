import { Ticket } from "@acme/shared-models";
import styles from "./ticket-row.module.css";
import Assignee from "../assignee/assignee";
import Status from "../status/status";
import { Link } from "react-router-dom";

export interface TicketRowProps {
  ticket: Ticket;
}

export function TicketRow(props: TicketRowProps) {
  const { ticket } = props;

  return (
    <div className={styles["ticket"]}>
      <Link className={styles["left"]} to={`/${ticket.id}`}>
        {`${ticket.id}-${ticket.description}`}
      </Link>
      <div className={styles["right"]}>
        <Status currentTicket={ticket} />
        <Assignee currentTicket={ticket} />
      </div>
    </div>
  );
}

export default TicketRow;
