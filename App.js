import React, {createContext, useReducer, useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/helpers/ToastHelper';
import {customerReducer, initialState} from './reducer/CustomerReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Create Context
export const CustomerContext = createContext();

function App() {
  const {state, dispatch} = useContext(CustomerContext);
  // update the super state variable
  useEffect(() => {
    const getdataFromAsyncStorage = async () => {
      try {
        const customerInfoStr = await AsyncStorage.getItem('customerInfo');
        const customerInfo = JSON.parse(customerInfoStr);
        if (customerInfo?.jwtToken)
          dispatch({type: 'CUSTOMER', payload: customerInfo.jwtToken});
        if (customerInfo)
          dispatch({type: 'UPDATE_STATE', payload: customerInfo});
      } catch (error) {
        alert(error.message);
      }
    };

    getdataFromAsyncStorage();
  }, []);
  return (
    <>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}

export default () => {
  const [state, dispatch] = useReducer(customerReducer, initialState);
  return (
    <CustomerContext.Provider value={{state, dispatch}}>
      <App />
    </CustomerContext.Provider>
  );
};
