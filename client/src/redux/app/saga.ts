import { all, call, put, takeEvery } from "redux-saga/effects";
import { Saga } from "redux-saga";
import { appActions } from "./slice";
import { userApi } from "client/src/api/user";
import { ticketApi } from "client/src/api/ticket";
import { Ticket } from "@acme/shared-models";

function* getUserSettingsSaga() {
  yield takeEvery(appActions.getAppData, function* f() {
    try {
      const [users, tickets] = yield all([
        call(userApi.getUsers),
        call(ticketApi.getTickets),
      ]);
      yield put(appActions.getAppDataSuccess({ users, tickets }));
    } catch (error) {
      yield put(appActions.getAppDataFail());
    }
  });
}

function* createTicketSaga() {
  yield takeEvery(appActions.createTicket, function* f(action) {
    const { description } = action.payload;
    try {
      const newTicket: Ticket = yield call(ticketApi.createTicket, description);
      yield put(appActions.addTicket(newTicket));
    } catch (error) {
      yield put(appActions.createTicketFail());
    }
  });
}

function* toggleTicketStatusSaga() {
  yield takeEvery(appActions.toggleTicketStatus, function* f(action) {
    const { updateTicket } = action.payload;
    try {
      const updatedTicket: Ticket = {
        ...updateTicket,
        completed: !updateTicket.completed,
      };
      yield put(appActions.updateTicket({ updateTicket: updatedTicket }));
      if (!updateTicket.completed)
        yield call(ticketApi.markCompleteTicket, updatedTicket.id);
      else yield call(ticketApi.markIncompleteTicket, updatedTicket.id);
    } catch (error) {
      yield put(appActions.updateTicket({ updateTicket }));
    }
  });
}

function* assignUserSaga() {
  yield takeEvery(appActions.assignUser, function* f(action) {
    const { updateTicket } = action.payload;
    const assigneeId = action.payload?.assigneeId || null;
    try {
      const updatedTicket: Ticket = {
        ...updateTicket,
        assigneeId,
      };
      yield put(appActions.updateTicket({ updateTicket: updatedTicket }));
      if (assigneeId)
        yield call(ticketApi.assignUser, updatedTicket.id, assigneeId);
      else yield call(ticketApi.unAssignUser, updatedTicket.id);
    } catch (error) {
      yield put(appActions.updateTicket({ updateTicket }));
    }
  });
}

const appSagas: Saga[] = [
  getUserSettingsSaga,
  toggleTicketStatusSaga,
  createTicketSaga,
  assignUserSaga,
];

export default appSagas;
