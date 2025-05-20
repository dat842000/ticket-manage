import { all, call, put, takeEvery } from "redux-saga/effects";
import { Saga } from "redux-saga";
import { appActions } from "./slice";
import { userApi } from "client/src/api/user";
import { ticketApi } from "client/src/api/ticket";

function* getUserSettingsSaga() {
  yield takeEvery(appActions.getAppData, function* f() {
    try {
      const [users, tickets] = yield all([
        call(userApi.getUsers),
        call(ticketApi.getTickets),
      ]);
      yield put(appActions.getTickets(tickets));
      yield put(appActions.getUsers(users));
    } catch (error) {
      yield put(appActions.getAppDataFail());
    }
  });
}

const appSagas: Saga[] = [getUserSettingsSaga];

export default appSagas;
