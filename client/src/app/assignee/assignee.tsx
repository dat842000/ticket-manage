import { Ticket } from "@acme/shared-models";
import { Avatar, Dropdown } from "antd";
import styles from "./assignee.module.css";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAppDispatch, useAppSelector } from "client/src/redux/hooks";
import { appActions } from "client/src/redux/app/slice";

export interface AssigneeProps {
  currentTicket?: Ticket;
}

const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

export function Assignee(props: AssigneeProps) {
  const dispatch = useAppDispatch();
  const currentTicket = props?.currentTicket;
  if (!currentTicket) return null;

  const users = useAppSelector((state) => state.app.users);
  const currentUser = users.find(
    (user) => user.id === currentTicket.assigneeId
  );
  const color = ColorList[Math.floor(Math.random() * ColorList.length)];

  const handleAssignUser = (assigneeId?: number) => {
    dispatch(
      appActions.assignUser({ updateTicket: currentTicket, assigneeId })
    );
  };

  const assignee: MenuProps["items"] = [
    {
      key: "-1",
      label: (
        <div className={styles["selectOption"]}>
          <Avatar
            style={{ backgroundColor: color, verticalAlign: "middle" }}
            size="small"
          >
            <UserOutlined />
          </Avatar>
          Unassign
        </div>
      ),
      onClick: () => {
        handleAssignUser();
      },
    },
    ...users
      .filter((user) => user.id !== currentUser?.id)
      .map((user) => {
        const color = ColorList[Math.floor(Math.random() * ColorList.length)];
        return {
          key: user.id,
          label: (
            <div className={styles["selectOption"]}>
              <Avatar
                style={{ backgroundColor: color, verticalAlign: "middle" }}
                size="small"
              >
                {user?.name}
              </Avatar>
              {user?.name}
            </div>
          ),
          onClick: () => {
            handleAssignUser(user.id);
          },
        };
      }),
  ];

  return (
    <Dropdown menu={{ items: assignee }} trigger={["click"]}>
      <Avatar
        style={{ backgroundColor: color, verticalAlign: "middle" }}
        size="small"
      >
        {currentUser?.name || <UserOutlined />}
      </Avatar>
    </Dropdown>
  );
}

export default Assignee;
