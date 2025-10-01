import { useEffect, useState } from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useDispatch, useSelector } from "react-redux";
import CustomAccordion from "../reusable/CustomAccordion";
import axios from "axios";
import toast from "react-hot-toast";
import { setProgress } from "../../store/slices/ProgressSlice";

interface Item {
  _id: string;
  order_type: string;
  status: string;
  instructions: string;
  amount: number;
  products: any[];
  user: string;
  createdAt: string;
  updatedAt: string;
}

const Orders = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { userData } = useSelector((state: any) => state.auth);
  const [orders, setOrders] = useState<Item[]>([]);

  const fetchOrders = () => {
    dispatch(setProgress({ progress: 10 }));
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/user/orders`, {
        _id: userData._id,
      })
      .then((res) => {
        dispatch(setProgress({ progress: 50 }));
        setOrders(res?.data?.data);
        dispatch(setProgress({ progress: 70 }));
        setLoading(false);
        dispatch(setProgress({ progress: 100 }));
      })
      .catch((err) => {
        dispatch(setProgress({ progress: 100 }));
        toast.error(err?.response?.data?.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 190px)",
        }}
      >
        <CircularProgress
          sx={{
            // color: "#FC8019"
            color: "#472009",
          }}
        />
      </Stack>
    );
  }
  return (
    <Stack
      sx={{
        marginLeft: {
          sm: "calc(10% + 36px)",
          // xs: "calc(2%)",
        },
        marginRight: {
          sm: "calc(10% + 36px)",
          // xs: "calc(2%)",
        },
        // alignItems: "center",
        padding: "10px 25px",
        gap: "2rem",
        // height: "330px",
        // height: { xs: "220px", sm: "250px" },
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "0.5rem",
          alignItems: "center",
          justifyContent: "flex-start",
          // width: "90%",
        }}
      >
        <ShoppingBagOutlinedIcon sx={{ color: "#282c3f" }} />
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#282c3f",
          }}
        >
          Past Orders
        </Typography>
      </Stack>
      <Stack
        sx={{
          // width: "90%",
          gap: "1rem",
        }}
      >
        {orders.length === 0 ? (
          <Typography textAlign="center">No Orders</Typography>
        ) : (
          orders?.map((item) => <CustomAccordion item={item} key={item?._id} />)
        )}
      </Stack>
    </Stack>
  );
};

export default Orders;
