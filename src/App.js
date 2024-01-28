
import React from 'react';
import { Provider } from 'react-redux';
import PizzaOrderForm from './components/PizzaOrderForm';
import PizzaStagesDisplay from './components/PizzaStagesDisplay';
import MainSectionDisplay from './components/MainSectionDisplay';

import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <PizzaOrderForm />
        <div style={{ display: 'flex' }}></div>
        <PizzaStagesDisplay />
        <MainSectionDisplay />
      </div>
    </Provider>
  );
};

export default App;
