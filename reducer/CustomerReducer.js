import AsyncStorage from '@react-native-async-storage/async-storage';

export const initialState = {
  jwtToken: null,
  cart: [],
  skip: false,
  shipping: {
    pincode: '',
    method: '',
    amount: '',
    date: '',
    startTime: '',
    endTime: '',
  },
  adonCart: [],
  coupon: {},
};

const updateItemToLocalStorage = async item => {
  try {
    await AsyncStorage.setItem('customerInfo', JSON.stringify({...item}));
  } catch (error) {
    alert(error.message);
  }

  //   localStorage.setItem('customerInfo', JSON.stringify({...item}));
};

export const customerReducer = (state, action) => {
  if (action.type == 'CUSTOMER') {
    return {...state, jwtToken: action.payload};
  } else if (action.type == 'CLEAR') {
    return initialState;
  } else if (action.type == 'ADD_TO_CART') {
    updateItemToLocalStorage({
      ...state,
      cart: [...state.cart, action.payload],
    });
    return {...state, cart: [...state.cart, action.payload]};
  } else if (action.type == 'UPDATE_STATE') {
    return {...state, ...action.payload};
  } else if (action.type == 'INCREASE_QUANTITY') {
    updateItemToLocalStorage({
      ...state,
      cart: state.cart.map(item =>
        item.productId == action.payload.productId
          ? {...item, quantity: item.quantity + 1}
          : {...item},
      ),
    });
    return {
      ...state,
      cart: state.cart.map(item =>
        item.productId == action.payload.productId
          ? {...item, quantity: item.quantity + 1}
          : {...item},
      ),
    };
  } else if (action.type == 'DECREASE_QUANTITY') {
    updateItemToLocalStorage({
      ...state,
      cart: state.cart.map(item => {
        return item.productId == action.payload.productId
          ? {...item, quantity: item.quantity - 1}
          : {...item};
      }),
    });
    return {
      ...state,
      cart: state.cart.map(item => {
        return item.productId == action.payload.productId
          ? {...item, quantity: item.quantity - 1}
          : {...item};
      }),
    };
  } else if (action.type == 'CLEAR_CART') {
    updateItemToLocalStorage({...state, cart: []});
    return {...state, cart: []};
  } else if (action.type == 'REMOVE_FROM_CART') {
    if (state.cart.length > 1) {
      updateItemToLocalStorage({
        ...state,
        cart: state.cart.filter(c => c.productId !== action.payload.productId),
      });
      return {
        ...state,
        cart: state.cart.filter(c => c.productId !== action.payload.productId),
      };
    } else {
      updateItemToLocalStorage({
        ...state,
        cart: state.cart.filter(c => c.productId !== action.payload.productId),
        adonCart: [],
      });
      return {
        ...state,
        cart: state.cart.filter(c => c.productId !== action.payload.productId),
        adonCart: [],
      };
    }
  } else if (action.type == 'UPDATE_CART_PRODUCT') {
    updateItemToLocalStorage({
      ...state,
      cart: state.cart.map(c => {
        if (c.productId == action.payload.productId) {
          return action.payload;
        } else {
          return c;
        }
      }),
    });
    return {
      ...state,
      cart: state.cart.map(c => {
        if (c.productId == action.payload.productId) {
          return action.payload;
        } else {
          return c;
        }
      }),
    };
  } else if (action.type == 'SHIPPING_METHOD') {
    updateItemToLocalStorage({
      ...state,
      shipping: {...state.shipping, ...action.payload},
    });
    return {
      ...state,
      shipping: {...state.shipping, ...action.payload},
    };
  } else if (action.type == 'CLEAR_SHIPPING_METHOD') {
    updateItemToLocalStorage({
      ...state,
      shipping: initialState.shipping,
    });
    return {
      ...state,
      shipping: initialState.shipping,
    };
  } else if (action.type == 'ADD_COUPON') {
    updateItemToLocalStorage({
      ...state,
      coupon: action.payload,
    });
    return {...state, coupon: action.payload};
  } else if (action.type == 'SET_SKIP') {
    updateItemToLocalStorage({
      ...state,
      skip: action.payload.skip,
    });
    return {
      ...state,
      skip: action.payload.skip,
    };
  } else {
    return state;
  }
};
