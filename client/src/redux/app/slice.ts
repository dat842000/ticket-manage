import { Ticket, User } from "@acme/shared-models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterType } from "client/src/utils/constant";

interface appState {
  isLoading: boolean;
  isCreatingTicket: boolean;
  filter: FilterType;
  tickets: Ticket[];
  users: User[];
}

const initialState: appState = {
  isLoading: false,
  isCreatingTicket: false,
  filter: FilterType.ALL,
  tickets: [],
  users: [],
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    getAppData: (state) => {
      state.isLoading = true;
    },
    getAppDataFail: (state) => {
      state.isLoading = false;
    },
    getAppDataSuccess: (
      state,
      action: PayloadAction<{ users: User[]; tickets: Ticket[] }>
    ) => {
      const { users, tickets } = action.payload;
      state.tickets = tickets;
      state.users = users;
      state.isLoading = false;
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets = [...state.tickets, action.payload];
      state.isCreatingTicket = false;
    },
    createTicket: (state, _action: PayloadAction<{ description: string }>) => {
      state.isCreatingTicket = true;
    },
    createTicketFail: (state) => {
      state.isCreatingTicket = false;
    },
    updateTicket: (state, action: PayloadAction<{ updateTicket: Ticket }>) => {
      const { updateTicket } = action.payload;
      state.tickets = state.tickets.map((ticket) => {
        if (ticket.id === updateTicket.id) return updateTicket;
        return ticket;
      });
    },
    getTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
    },
    toggleTicketStatus: (
      _state,
      _action: PayloadAction<{ updateTicket: Ticket }>
    ) => {},
    assignUser: (
      _state,
      _action: PayloadAction<{ updateTicket: Ticket; assigneeId?: number }>
    ) => {},
    getUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
