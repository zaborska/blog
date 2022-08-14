import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from '../header/Header';
import Posts from '../posts/Posts';
import store from '../../store/index';

import './app.scss';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Posts />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
