import { all } from "redux-saga/effects";
import appSagas from "./app/saga";

function* rootSaga() {
  yield all([...appSagas.map((saga) => saga())]);
}

export default rootSaga;
