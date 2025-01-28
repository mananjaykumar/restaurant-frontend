import { useState } from "react";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProgress } from "../../store/slices/ProgressSlice";
import toast from "react-hot-toast";
import { updateCart } from "../../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import * as routes from "../../routes/constants";

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData } = useSelector((state: any) => state.auth);
  const { cart } = userData;

  const handlePlaceOrder = () => {
    dispatch(setProgress({ progress: 10 }));
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/user/place-order`, {
        cart: cart,
        instructions: instructions,
        address: address,
        user: userData._id,
      })
      .then((res) => {
        dispatch(setProgress({ progress: 30 }));
        toast.success(res?.data?.message);
        console.log("res.data", res?.data);
        dispatch(
          updateCart({
            cart: res?.data?.data?.data?.user?.cart,
            updatedAt: res?.data?.data?.data?.user?.updatedAt,
          })
        );
        dispatch(setProgress({ progress: 70 }));
        setLoading(false);
        dispatch(setProgress({ progress: 100 }));
        navigate(routes.ORDERS);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setLoading(false);
        dispatch(setProgress({ progress: 100 }));
      });
  };

  return (
    <Grid container spacing={2}>
      {cart?.items.length > 0 ? (
        <>
          <Grid item container lg={12} md={12} sm={12}>
            {cart.items.map((item: any) => (
              <Grid
                item
                container
                lg={12}
                md={12}
                sm={12}
                sx={{
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Grid item lg={6} md={6} sm={6} sx={{ textAlign: "center" }}>
                  <img
                    src={`data:image/${item?.product?.img?.contentType};base64,
                  ${item?.product?.img?.data}`}
                    alt={item.product.title}
                    style={{
                      height: "150px",
                      width: "150px",
                    }}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} sx={{ textAlign: "center" }}>
                  <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                    {item?.product?.title}
                  </Typography>
                  <Typography sx={{ fontSize: "10px", color: "#7d879c" }}>
                    &#8377; {item?.product?.discountedPrice} x {item.quantity}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "error.main",
                    }}
                  >
                    &#8377; {item.quantity * item.product.discountedPrice}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{ textAlign: "center" }}
          >
            <TextField
              //   fullWidth
              autoFocus
              variant="outlined"
              label="Instructions*"
              type="text"
              disabled={loading}
              value={instructions}
              onChange={(e) => {
                setInstructions(e.target.value);
              }}
              sx={{ width: "50%" }}
            />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{ textAlign: "center" }}
          >
            <TextField
              //   fullWidth
              variant="outlined"
              label="Address*"
              type="text"
              disabled={loading}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              sx={{ width: "50%" }}
            />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{ textAlign: "center" }}
          >
            <Typography
              fontSize={14}
              fontWeight={600}
              sx={{ color: "#7d879c" }}
            >
              To Pay: {cart.totalPrice}{" "}
            </Typography>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{ textAlign: "center" }}
          >
            <Button
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: "#FC8019",
                "&:hover": {
                  backgroundColor: "#FC8019",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#f3f3f3",
                },
              }}
              onClick={handlePlaceOrder}
            >
              {loading ? "Loading..." : "Place Order"}
            </Button>
          </Grid>
        </>
      ) : (
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
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 195px)",
          }}
        >
          <img
            src="https://bazar-react.vercel.app/assets/images/logos/shopping-bag.svg"
            alt="shopping bag"
          />
          <Typography
            variant="body2"
            sx={{
              color: "secondary.main",
              fontWeight: "600",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            Your Shopping Bag is empty!
            <br />
            Start Shopping
          </Typography>
        </Stack>
      )}
    </Grid>
  );
};

export default CheckOut;
