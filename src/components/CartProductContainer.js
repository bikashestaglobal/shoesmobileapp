import React, {useState, useContext} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {CustomerContext} from '../../App';
import CartProductCard from './CartProductCard';
import MyText from './MyText';
import {color, font} from '../helpers/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CartProductContainer = () => {
  const {state, dispatch} = useContext(CustomerContext);
  const [itemsForRemove, setItemsForRemove] = useState([]);
  const {cart = []} = state;

  const deletedSelectedItemHandler = () => {
    itemsForRemove.forEach(pid => {
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: {
          productId: pid,
        },
      });
    });
    setItemsForRemove([]);
  };

  const selectItemsForRemoveHandler = pId => {
    let currentItems = [...itemsForRemove];

    if (currentItems.some(p => p == pId)) {
      currentItems = currentItems.filter(p => p != pId);
    } else {
      currentItems.push(pId);
    }
    setItemsForRemove([...currentItems]);
  };

  return (
    <>
      {itemsForRemove.length ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
            alignItems: 'center',
          }}>
          <MyText
            style={{
              fontSize: 17,
              color: color.red500,
              fontFamily: font.medium,
            }}>
            {itemsForRemove.length} Product Selected
          </MyText>
          <TouchableOpacity
            onPress={deletedSelectedItemHandler}
            style={{
              height: 30,
              width: 30,
              backgroundColor: color.red500,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
            }}>
            <FontAwesome name="trash" size={15} color={color.white700} />
          </TouchableOpacity>
        </View>
      ) : null}
      {cart.map((product, index) => {
        return (
          <CartProductCard
            product={product}
            key={product.productId}
            onSelectItems={selectItemsForRemoveHandler}
          />
        );
      })}
    </>
  );
};

export default CartProductContainer;
