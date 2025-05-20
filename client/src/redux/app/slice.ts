import { Ticket, User } from "@acme/shared-models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface appState {
  isLoading: boolean;
  tickets: Ticket[];
  users: User[];
}

const initialState: appState = {
  isLoading: false,
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
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets = [...state.tickets, action.payload];
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
    getUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
