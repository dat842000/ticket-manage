import { FilterType } from "client/src/utils/constant";
import { RootState } from "../store";

export const selectTickets = (state: RootState) => {
  switch (state.app.filter) {
    case FilterType.COMPLETED: {
      return state.app.tickets.filter((ticket) => ticket.completed);
    }
    case FilterType.TODO: {
      return state.app.tickets.filter((ticket) => !ticket.completed);
    }
    default: {
      return state.app.tickets;
    }
  }
};
export const getTicket = (state: RootState, id: number) => {
  return state.app.tickets.find((ticket) => ticket.id === id);
};
