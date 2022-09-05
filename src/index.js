import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import rootReducer, {rootSaga} from './modules';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware(); // 사가 미들웨어를 만듭니다.

const store = createStore(
  rootReducer,
  // logger 를 사용하는 경우, logger 가 가장 마지막에 와야 합니다.
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk,
      sagaMiddleware, // 사가 미들웨어를 적용하고
      logger,
    ),
  ),
); // 여러개의 미들웨어를 적용할 수 있습니다.

sagaMiddleware.run(rootSaga); // 루트 사가를 실행해 줍니다.
// 주의: 스토어 생성이 된 다음에 위 코드를 실행해야 합니다.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
