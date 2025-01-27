import {
  Card,
  Grid,
  Checkbox,
  CardMedia,
  Box,
  CardContent,
  Typography,
  CardActions,
  Rating,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import {} from "../../store/slices/CartSlice";
import {
  updateWishList,
  // addToCart,
  // removeFromCart,
  updateCart,
} from "../../store/slices/AuthSlice";
import axios from "axios";
import toast from "react-hot-toast";
// import { wishlistProduct } from "../Redux/userSlice";

interface ICustomCard {
  item?: any;
  index?: number;
}

const CardAddButton = styled(Button)(({ theme }) => ({
  padding: "0.1rem",
  minWidth: "0",
  width: "25px", // testing
  border: `1px solid ${theme.palette.error.main}`,
  color: theme.palette.error.main,
}));

const CardChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.text.error,
  height: "24px",
  fontSize: "10px",
}));

const CustomCard = ({ item, index }: ICustomCard) => {
  const [addItemLoading, setAddItemLoading] = React.useState(false);
  const [removeItemLoading, setRemoveItemLoading] = React.useState(false);
  // const { cart } = useSelector((state: any) => state.cart);
  const { userData } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const product = userData?.cart?.items?.find(
    (cartItem: any) => cartItem.product._id === item._id
  );
  let quantity = 0;
  if (product) {
    quantity = product.quantity;
  }
  const isLiked = userData?.wishlist?.find((p: any) => p === item._id) || false;
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
  const addItemToWishList = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/user/addToWishList`, {
        item,
      })
      .then((res) => {
        dispatch(updateWishList(res?.data?.data));
        toast.success(res?.data?.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <Card
      key={item._id ?? index}
      style={{
        fontWeight: "600",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        // boxShadow: "1",
        boxShadow: " 15px  rgba(40,44,63,.15)",
        transition: "all 250ms ease-in-out",
        height: "386px",
        // "&:hover": {
        //   boxShadow: "2",
        // },
      }}
    >
      <Grid
        container
        justifyContent={item.discount ? "space-between" : "flex-end"}
        alignItems="center"
      >
        {item.discount !== 0 && <CardChip label={`${item.discount}% off`} />}
        <Checkbox
          sx={{
            color: "rgba(0, 0, 0, 0.54)",
          }}
          checked={Boolean(isLiked)}
          // checked={false}
          icon={<FavoriteBorderIcon fontSize="small" />}
          checkedIcon={<FavoriteIcon color="error" fontSize="small" />}
          onChange={addItemToWishList}
        />
      </Grid>
      <Link to={`/product/${item._id}`}>
        <CardMedia
          sx={{
            height: "225px",
            width: "250px",
            "&:hover": {
              transform: "scale(1.1,1.1)",
              transition: "transform 0.2s",
            }, // temporary
          }}
          component="img"
          // src={`${import.meta.env.VITE_BACKEND_URL}/${item.img}`}
          src={`data:image/${item.img.contentType};base64,
          ${item.img.data}`}
        />
      </Link>
      <Box display="flex" justifyContent="space-between" padding="0.5rem">
        <CardContent
          sx={{
            maxWidth: "85%",
            padding: "0",
            gap: "0.45rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Link to={`/product/${item._id}`}>
            <Typography
              sx={{
                fontWeight: 600,
                color: "#373F50",
              }}
              noWrap
            >
              {item.title}
            </Typography>
          </Link>
          <Box>
            <Rating
              name="read-only"
              value={item.rating}
              readOnly
              size="small"
            />
          </Box>
          <Box display="flex" gap="0.5rem">
            <Typography sx={{ color: "error.main", fontWeight: "600" }}>
              &#8377;{item.discountedPrice}
            </Typography>
            {item.discount !== 0 && (
              <Typography sx={{ color: "#7D879C", fontWeight: "600" }}>
                <s>{item.originalPrice}</s>
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ padding: 0 }}>
          <Box
            display="flex"
            flexDirection="column-reverse"
            gap="0.1rem"
            alignItems="center"
            height="100%"
          >
            <CardAddButton onClick={addItemToCart}>
              {addItemLoading ? (
                <CircularProgress size="15px" color="error" />
              ) : (
                <AddIcon fontSize="small" color="error" />
              )}
            </CardAddButton>
            {quantity !== 0 && (
              <>
                <Typography variant="body1">{quantity}</Typography>
                <CardAddButton onClick={removeItemFromCart}>
                  {removeItemLoading ? (
                    <CircularProgress size="15px" color="error" />
                  ) : (
                    <RemoveIcon fontSize="small" color="error" />
                  )}
                </CardAddButton>
              </>
            )}
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
};

export default CustomCard;
