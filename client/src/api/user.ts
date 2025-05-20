import { Ticket, User } from "@acme/shared-models";
import { api } from ".";

const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get("/users");
  return data;
};

export const userApi = {
  getUsers,
};
