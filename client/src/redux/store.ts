import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/slice";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const logger = createLogger({
  collapsed: true,
});
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    middlewares.push(logger);
    middlewares.push(sagaMiddleware);
    return middlewares;
  },
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
