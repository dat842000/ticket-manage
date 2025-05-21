import { Ticket } from "@acme/shared-models";
import { Button, Dropdown } from "antd";
// import styles from "./status.module.css";
import type { MenuProps } from "antd";
import { appActions } from "client/src/redux/app/slice";
import { useAppDispatch } from "client/src/redux/hooks";

export interface StatusProps {
  currentTicket?: Ticket;
}

export function Status(props: StatusProps) {
  const dispatch = useAppDispatch();
  const currentTicket = props?.currentTicket;
  if (!currentTicket) return null;

  const isCompleted = currentTicket.completed;
  const toggleStatus = () => {
    dispatch(appActions.toggleTicketStatus({ updateTicket: currentTicket }));
  };
  const items: MenuProps["items"] = [
    {
      key: 1,
      label: isCompleted ? "To do" : "Completed",
      onClick: toggleStatus,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button
        style={{ maxWidth: "fit-content" }}
        size="small"
        color={isCompleted ? "green" : "primary"}
        variant="solid"
      >
        {isCompleted ? "Completed" : "To do"}
      </Button>
    </Dropdown>
  );
}

export default Status;
