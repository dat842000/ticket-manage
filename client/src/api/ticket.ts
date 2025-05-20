import { Ticket } from "@acme/shared-models";
import { api } from ".";

const getTickets = async (): Promise<Ticket[]> => {
  const { data } = await api.get("/tickets");
  return data;
};

export const ticketApi = {
  getTickets,
};
