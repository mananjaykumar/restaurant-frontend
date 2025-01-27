import {
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch } from "react-redux";
import // addToCart,
// removeFromCart,
//   deleteFromCart,
"../../store/slices/AuthSlice";
import { useState } from "react";
import { updateCart } from "../../store/slices/AuthSlice";
import axios from "axios";
import toast from "react-hot-toast";

// const CardIncButton = styled(Button)(({ theme }) => ({
//   padding: "0.1rem",
//   minWidth: "0",
//   border: `1px solid ${theme.palette.error.main}`,
//   color: theme.palette.error.main,
//   borderRadius: "50%",
// }));

// const CardDecButton = styled(Button)(({ theme }) => ({
//   padding: "0.1rem",
//   minWidth: "0",
//   border: `1px solid ${theme.palette.error.main}`,
//   color: theme.palette.error.main,
//   borderRadius: "50%",
//   "&:disabled": {
//     border: `1px solid ${theme.palette.disabled.primary}`,
//   },
// }));
export const CardIncButton = styled(Button)(({ theme }) => ({
  padding: "0.1rem",
  minWidth: "0",
  border: `1px solid ${theme.palette.error.main}`,
  color: theme.palette.error.main,
  borderRadius: "50%",
})) as typeof Button;

export const CardDecButton = styled(Button)(({ theme }) => ({
  padding: "0.1rem",
  minWidth: "0",
  border: `1px solid ${theme.palette.error.main}`,
  color: theme.palette.error.main,
  borderRadius: "50%",
  "&:disabled": {
    border: `1px solid #DADADA`,
  },
})) as typeof Button;

function CartProduct(props: any) {
  const { item } = props;
  const [addItemLoading, setAddItemLoading] = useState(false);
  const [removeItemLoading, setRemoveItemLoading] = useState(false);
  const [completelyRemoveItemLoading, setCompletelyRemoveItemLoading] =
    useState(false);
  const dispatch = useDispatch();

  const addItemToCart = () => {
    setAddItemLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/user/addToCart`, { item })
      .then((res) => {
        // dispatch(addToCart(item));
        console.log(res);
        dispatch(updateCart(res?.data?.data));
        if (res?.data?.message === "Item added to cart successfully") {
          toast.success(res?.data?.message);
        }
        setAddItemLoading(false);
      })
      .catch((error) => {
        // console.log("error", err)
        toast.error(error?.response?.data?.message);
        setAddItemLoading(false);
      });
  };

  const removeItemFromCart = () => {
    setRemoveItemLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/user/removeFromCart`, {
        item,
      })
      .then((res) => {
        // dispatch(removeFromCart(item));
        dispatch(updateCart(res?.data?.data));
        if (res?.data?.message === "Item removed from cart successfully") {
          toast.success(res?.data?.message);
        }
        setRemoveItemLoading(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        setRemoveItemLoading(false);
      });
  };
  const completelyRemoveItemFromCart = () => {
    setCompletelyRemoveItemLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/completelyRemoveFromCart`,
        {
          item,
        }
      )
      .then((res) => {
        // dispatch(removeFromCart(item));
        dispatch(updateCart(res?.data?.data));
        toast.success(res?.data?.message);
        setCompletelyRemoveItemLoading(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        setCompletelyRemoveItemLoading(false);
      });
  };

  return (
    <Stack
      direction="row"
      sx={{
        height: "90px",
        gap: "1.5rem",
      }}
    >
      <Stack direction="row" gap={2}>
        <Stack>
          <CardIncButton
            // onClick={() => {
            //   // dispatch(addToCart(props.item));
            // }}
            onClick={addItemToCart}
          >
            {addItemLoading ? (
              <CircularProgress size="15px" color="error" />
            ) : (
              <AddOutlinedIcon />
            )}
          </CardIncButton>
          <Stack sx={{ textAlign: "center" }}>
            <Typography sx={{ fontWeight: "600" }}>{props.quantity}</Typography>
          </Stack>
          <CardDecButton
            disabled={props.quantity === 1}
            // onClick={() => {
            //   // dispatch(removeFromCart(props.item));
            // }}
            onClick={removeItemFromCart}
          >
            {removeItemLoading ? (
              <CircularProgress size="15px" color="error" />
            ) : (
              <RemoveOutlinedIcon />
            )}
          </CardDecButton>
        </Stack>
        <Stack sx={{ width: "25%" }}>
          <img
            src={`data:image/${props.item.img.contentType};base64,
          ${props.item.img.data}`}
            alt={props.item.title}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
            {props.item.title}
          </Typography>
          {/* <br /> */}
          <Typography sx={{ fontSize: "10px", color: "#7d879c" }}>
            &#8377; {props.item.discountedPrice} x {props.quantity}
          </Typography>
          {/* <br /> */}
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "600",
              color: "error.main",
            }}
          >
            &#8377; {props.quantity * props.item.discountedPrice}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        sx={{
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            minHeight: "24px",
            minWidth: "24px",
            borderRadius: "50%",
            padding: "6px",
            color: "#959595",
            backgroundColor: "#fff",
            // "&:hover": {
            //   backgroundColor: "primary.main",
            // },
          }}
          //   onClick={() => dispatch(deleteFromCart(props.item))}
          onClick={completelyRemoveItemFromCart}
        >
          {completelyRemoveItemLoading ? (
            <CircularProgress size="15px" color="error" />
          ) : (
            <CloseOutlinedIcon />
          )}
        </Button>
      </Stack>
    </Stack>
    // <Box
    //   display="flex"
    //   flexDirection="row"
    //   alignItems="center"
    //   justifyContent="space-between"
    //   sx={{
    //     padding: "16px 20px",
    //     borderBottom: "1px solid rgb(243, 245, 249)",
    //   }}
    // >
    //   <Box
    //     display="flex"
    //     flexDirection="column"
    //     alignItems="center"
    //     justifyContent="space-between"
    //     sx={{
    //       width: "10%",
    //       gap: "0.25rem",
    //     }}
    //   >
    //     <CardIncButton
    //       onClick={() => {
    //         // dispatch(addToCart(props.item));
    //       }}
    //     >
    //       <AddOutlinedIcon />
    //     </CardIncButton>
    //     <Typography sx={{ fontWeight: "600" }}>{props.quantity}</Typography>
    //     <CardDecButton
    //       disabled={props.quantity === 1}
    //       onClick={() => {
    //         // dispatch(removeFromCart(props.item));
    //       }}
    //     >
    //       <RemoveOutlinedIcon />
    //     </CardDecButton>
    //   </Box>
    //   <Box
    //     sx={{
    //       width: "20%",
    //     }}
    //   >
    //     <img
    //       src={`data:image/${props.item.img.contentType};base64,
    //       ${props.item.img.data}`}
    //       alt={props.item.name}
    //       style={{
    //         width: "100%",
    //         height: "100%",
    //       }}
    //     />
    //   </Box>
    //   <Box
    //     sx={{
    //       width: "58%",
    //       maxWidth: "200px",
    //     }}
    //   >
    //     <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
    //       {props.item.name}
    //     </Typography>
    //     <br />
    //     <Typography sx={{ fontSize: "10px", color: "#7d879c" }}>
    //       $ {props.item.discountedPrice} x {props.quantity}
    //     </Typography>
    //     <br />
    //     <Typography
    //       sx={{
    //         fontSize: "14px",
    //         fontWeight: "600",
    //         color: "error.main",
    //       }}
    //     >
    //       $ {props.quantity * props.item.discountedPrice}
    //     </Typography>
    //   </Box>
    //   <Box
    //     sx={{
    //       width: "12%",
    //     }}
    //   >
    //     <Button
    //       sx={{
    //         minHeight: "24px",
    //         minWidth: "24px",
    //         borderRadius: "50%",
    //         padding: "6px",
    //         color: "#959595",
    //         backgroundColor: "#fff",
    //         "&:hover": {
    //           backgroundColor: "primary.main",
    //         },
    //       }}
    //       //   onClick={() => dispatch(deleteFromCart(props.item))}
    //     >
    //       <CloseOutlinedIcon />
    //     </Button>
    //   </Box>
    // </Box>
  );
}

export default CartProduct;
