/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

// inteface for the types
// interface userDataType {
//   email: string;
//   token: string;
//   message: string;
//   user_id: string;
//   firstName: string;
//   wishlist: string[];
// }

// interface AuthState {
//   userData: userDataType | null;
// }

// Define the initial state using that type
const initialState = {
  userData: JSON.parse(localStorage.getItem("userData") || "{}"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // For Users
    //Reducer function to login
    login: (state, action) => {
      localStorage.setItem("userData", JSON.stringify(action.payload.userInfo));
      state.userData = action.payload.userInfo;
      // console.log('state', state);
      // console.log('action', action);
    },
    //Reducer function to logout
    logout: (state) => {
      state.userData = null;
      localStorage.removeItem("userData");
    },
    // Add to Wishlist
    updateWishList: (state, action) => {
      // const product = state?.userData?.wishlist?.find(
      //   (p: any) => p === action.payload._id
      // );
      // if (product) {
      //   state.userData.wishlist = state?.userData?.wishlist?.filter(
      //     (p: any) => p !== action.payload._id
      //   );
      // } else {
      //   state?.userData?.wishlist?.push(action.payload._id);
      // }
      // const { cart, ...user } = state.userData;
      const newUserData = {
        ...state.userData,
        wishlist: action.payload.wishlist,
        updatedAt: action.payload.updatedAt,
      };
      state.userData = newUserData;
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },

    // Cart Operations
    // clearCart: (state, action) => {
    //   const cartOb = {
    //     items: [],
    //     cartProductsCount: 0,
    //     totalPrice: 0,
    //   };
    //   state.userData.cart = cartOb;
    //   localStorage.setItem("userData", JSON.stringify(state.userData));
    // },
    updateCart: (state, action) => {
      // const product = state.userData.cart.items.find(
      //   (item: any) => action.payload._id === item.product._id
      // );

      // if (!product) {
      //   state.userData.cart.cartProductsCount += 1;
      //   state.userData.cart.items.push({
      //     product: action.payload,
      //     quantity: 1,
      //   });
      // } else {
      //   product.quantity++;
      // }
      // state.userData.cart.totalPrice += action.payload.discountedPrice;
      const newUserData = {
        ...state.userData,
        cart: action.payload.cart,
        updatedAt: action.payload.updatedAt,
      };
      state.userData = newUserData;
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },
    // removeFromCart: (state, action) => {
    //   const product = state.userData.cart.items.find(
    //     (item: any) => action.payload._id === item.product._id
    //   );

    //   if (product && product.quantity === 1) {
    //     state.userData.cart.cartProductsCount -= 1;
    //     state.userData.cart.items = state.userData.cart.items.filter(
    //       (item: any) => item.product._id !== action.payload._id
    //     );
    //   } else {
    //     product.quantity--;
    //   }
    //   state.userData.cart.totalPrice -= action.payload.discountedPrice;
    //   localStorage.setItem("userData", JSON.stringify(state.userData));
    // },
  },
});

export default authSlice.reducer;

export const { login, logout, updateWishList, updateCart } = authSlice.actions;
