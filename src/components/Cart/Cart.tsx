import { Button, Typography, Stack } from "@mui/material";
import CartProduct from "./CartProduct";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
// import { createOrder } from "../../Redux/CounterSlice";
import { useNavigate } from "react-router-dom";
import * as navLinks from "../../routes/constants";
import cartImage from "../../assets/cartImage.png"

const Cart = (props: any) => {
  const { cart } = useSelector((state: any) => state.auth.userData);
  const navigate = useNavigate();

  // if (loading) {
  //   return (
  //     <Stack
  //       sx={{
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         height: "calc(100vh - 195px)",
  //       }}
  //     >
  //       <CircularProgress />
  //     </Stack>
  //   );
  // }
  return (
    <Stack
    // sx={{
    //   display: "flex",
    //   flexDirection: "column",
    //   alignItems: "center",
    //   justifyContent: "flex-start",
    //   backgroundColor: "white",
    //   padding: "0px 20px",
    //   minHeight: "100%",
    // }}
    >
      {cart.cartProductsCount !== 0 && (
        <Stack
          sx={{
            // height: "calc(100vh - 450px)",
            height: "calc(100vh - 250px)",
            overflow: "auto",
            gap: "1.5rem",
          }}
        >
          {cart?.items?.map((item: any) => (
            <CartProduct
              item={item.product}
              quantity={item.quantity}
              key={item?.product?._id}
            />
          ))}
        </Stack>
      )}
      {cart.cartProductsCount !== 0 && (
        <Stack
          sx={{
            position: "fixed",
            bottom: 0,
            width: "380px",
            backgroundColor: "#ffff",
            justifyContent: "center",
            padding: "20px 0px",
            display: "flex",
          }}
        >
          <Button
            fullWidth
            color="error"
            variant="contained"
            sx={{
              fontSize: "0.875rem",
              fontWeight: "600",
              // padding: "6px 16px",
              marginBottom: "12px",
            }}
            onClick={() => {
              // dispatch(createOrder());
              navigate(navLinks.CHECKOUT);
              props.onClose();
            }}
          >
            {/* Checkout Now (${parseFloat(cart.totalPrice).toFixed(2)}) */}
            Checkout Now ( &#8377; {cart.totalPrice.toFixed(2)})
          </Button>
        </Stack>
      )}
      {cart.cartProductsCount === 0 && (
        <Stack
          // sx={{
          //   display: !cart.cartProductsCount ? "flex" : "none",
          //   flexDirection: "column",
          //   alignItems: "center",
          //   justifyContent: "center",
          //   height: "calc(100vh - 74px )",
          //   width: "100%",
          // }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 195px)",
          }}
        >
          <img
            // src="https://bazar-react.vercel.app/assets/images/logos/shopping-bag.svg"
            src={cartImage}
            alt="shopping bag"
            height="100px"
            width="150px"
          />
          <Typography
            variant="body2"
            sx={{
              color: "primary.main",
              fontWeight: "600",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            {/* Your Shopping Bag is empty! */}
            Your Cart is empty!
            {/* <br />
            Start Shopping */}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default Cart;
