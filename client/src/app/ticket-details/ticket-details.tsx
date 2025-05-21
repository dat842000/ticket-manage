import { useNavigate, useParams } from "react-router-dom";
import styles from "./ticket-details.module.css";
import { Button, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Ticket } from "@acme/shared-models";
import { ticketApi } from "client/src/api/ticket";
import Assignee from "../assignee/assignee";
import Status from "../status/status";
import { useAppSelector } from "client/src/redux/hooks";
import { getTicket } from "client/src/redux/app/selectors";

export interface TicketDetailsProps {}

export function TicketDetails(props: TicketDetailsProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const ticketId = parseInt(id || "");

  const ticketDetail = useAppSelector((state) => getTicket(state, ticketId));

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles["detail"]}>
      <div className={styles["header"]}>
        <Button
          type="default"
          onClick={handleGoBack}
          icon={<ArrowLeftOutlined />}
        ></Button>
        <h1>Welcome to TicketDetails!</h1>
      </div>

      <div className={styles["body"]}>
        <div className={styles["row"]}>
          <div>Description:</div>
          <div>{ticketDetail?.description}</div>
        </div>
        <div className={styles["row"]}>
          <div>Status:</div>
          <Status currentTicket={ticketDetail} />
        </div>
        <div className={styles["row"]}>
          <div>Assignee:</div>
          <Assignee currentTicket={ticketDetail} />
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
