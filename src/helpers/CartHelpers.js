import Toast from 'react-native-toast-message';

// addToCartHandler
const addToCartHandler = (dispatch, product, quantity, price) => {
  dispatch({
    type: 'ADD_TO_CART',
    payload: {
      name: product.name,
      slug: product.slug,
      parentCategories: product?.parentCategories?.map(item => {
        return item._id;
      }),
      categories: product?.categories?.map(item => {
        return item._id;
      }),
      productId: product._id,
      quantity: quantity,
      price: price.sellingPrice,
      mrp: price.mrp,
      weight: price.weight,
      // color: product.color.name,
      flavour: product?.flavour?.name,
      shape: product?.shape?.name,
      cakeType: product?.type?.name,
      image: product?.defaultImage,
      messageOnCake: '',
      imageOnCake: '',
      maximumOrderQuantity: product?.maximumOrderQuantity,
    },
  });

  Toast.show({
    text1: 'Product Added to Cart',
  });

  return null;
};

export {addToCartHandler};
