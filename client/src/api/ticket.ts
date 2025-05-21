import { Ticket } from "@acme/shared-models";
import { api } from ".";

const getTickets = async (): Promise<Ticket[]> => {
  const { data } = await api.get("/tickets");
  return data;
};

const getTicket = async (id: number): Promise<Ticket> => {
  const { data } = await api.get(`/tickets/${id}`);
  return data;
};

const createTicket = async (description: string): Promise<Ticket> => {
  const body = {
    description,
  };
  const { data } = await api.post("/tickets", body);
  return data;
};

const assignUser = async (ticketId: number, userId: number) =>
  api.put(`/tickets/${ticketId}/assign/${userId}`);

const unAssignUser = async (ticketId: number) =>
  api.put(`/tickets/${ticketId}/unassign`);

const markCompleteTicket = async (id: number) =>
  api.put(`/tickets/${id}/complete`);

const markIncompleteTicket = async (id: number) =>
  api.delete(`/tickets/${id}/complete`);

export const ticketApi = {
  getTickets,
  getTicket,
  createTicket,
  assignUser,
  unAssignUser,
  markCompleteTicket,
  markIncompleteTicket,
};
