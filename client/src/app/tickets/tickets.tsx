import { Ticket } from "@acme/shared-models";
import styles from "./tickets.module.css";
import TicketRow from "../ticket-row/ticket-row";
import { useAppDispatch, useAppSelector } from "client/src/redux/hooks";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Modal, Spin } from "antd";
import type { MenuProps } from "antd";
import { FilterType } from "client/src/utils/constant";
import { appActions } from "client/src/redux/app/slice";
import { useState } from "react";

export interface TicketsProps {
  tickets: Ticket[];
}

export function Tickets(props: TicketsProps) {
  const { tickets } = props;
  const { isCreatingTicket, isLoading } = useAppSelector((state) => state.app);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();
  const handleFilter = (value: FilterType) => {
    dispatch(appActions.setFilter(value));
  };
  const items: MenuProps["items"] = [
    {
      key: FilterType.ALL,
      label: "All",
      onClick: () => {
        handleFilter(FilterType.ALL);
      },
    },
    {
      key: FilterType.TODO,
      label: "To do",
      onClick: () => {
        handleFilter(FilterType.TODO);
      },
    },
    {
      key: FilterType.COMPLETED,
      label: "Completed",
      onClick: () => {
        handleFilter(FilterType.COMPLETED);
      },
    },
  ];

  const showModal = () => {
    setOpen(true);
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  const handleOk = () => {
    dispatch(appActions.createTicket({ description }));
    handleCancel();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className={styles["tickets"]}>
      <div className={styles["header"]}>
        {"Tickets"}
        <div className={styles["header-right"]}>
          <Button
            size="small"
            shape="circle"
            onClick={showModal}
            icon={<PlusOutlined />}
          />
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button size="small" shape="circle" icon={<FilterOutlined />} />
          </Dropdown>
        </div>
      </div>
      {!isLoading ? (
        tickets.length > 0 ? (
          <div>
            {tickets.map((t) => (
              <TicketRow key={t.id} ticket={t} />
            ))}
          </div>
        ) : (
          <div className={styles["body"]}>...Empty ticket</div>
        )
      ) : (
        <div className={styles["body"]}>
          <Spin />
        </div>
      )}
      <Modal
        title="Create ticket"
        open={open}
        onOk={handleOk}
        confirmLoading={isCreatingTicket}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Input your task"
          onChange={handleOnChange}
          value={description}
        />
      </Modal>
    </div>
  );
}

export default Tickets;
