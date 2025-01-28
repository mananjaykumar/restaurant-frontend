import { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { setProgress } from "../../store/slices/ProgressSlice";
import { useDispatch, useSelector } from "react-redux";

const NewOrder = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: any) => state.auth);
  const [newOrderState, setNewOrderState] = useState({
    order_type: "",
    status: "",
    instructions: "",
    amount: "",
    address: "",
    user: userData._id,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    dispatch(setProgress({ progress: 10 }));
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/add-order`, {
        order: newOrderState,
      })
      .then((res) => {
        dispatch(setProgress({ progress: 30 }));
        toast.success(res?.data?.message);
        dispatch(setProgress({ progress: 70 }));
        setLoading(false);
        dispatch(setProgress({ progress: 100 }));
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setLoading(false);
        dispatch(setProgress({ progress: 100 }));
      });
  };
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
      }}
    >
      <Stack
        sx={{
          margin: { sm: "0px 64px", xs: "0px 20px", md: "64px 192px" },
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        <Stack>
          <Typography fontFamily="Basis Grotesque Pro" fontSize="25px">
            Place New Order
          </Typography>
        </Stack>
        <Stack sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            autoFocus
            variant="outlined"
            label="Order Type*"
            value={newOrderState.order_type}
            disabled={loading}
            onChange={(e) => {
              setNewOrderState((prev) => {
                return {
                  ...prev,
                  order_type: e.target.value,
                };
              });
            }}
          />
          <TextField
            variant="outlined"
            label="Status*"
            value={newOrderState.status}
            disabled={loading}
            onChange={(e) => {
              setNewOrderState((prev) => {
                return {
                  ...prev,
                  status: e.target.value,
                };
              });
            }}
          />
          <TextField
            variant="outlined"
            label="Instructions*"
            value={newOrderState.instructions}
            disabled={loading}
            onChange={(e) => {
              setNewOrderState((prev) => {
                return {
                  ...prev,
                  instructions: e.target.value,
                };
              });
            }}
          />
          <TextField
            variant="outlined"
            label="Amount*"
            type="number"
            value={newOrderState.amount}
            disabled={loading}
            onChange={(e) => {
              setNewOrderState((prev) => {
                return {
                  ...prev,
                  amount: e.target.value,
                };
              });
            }}
          />
          <TextField
            variant="outlined"
            label="Address*"
            value={newOrderState.address}
            disabled={loading}
            onChange={(e) => {
              setNewOrderState((prev) => {
                return {
                  ...prev,
                  address: e.target.value,
                };
              });
            }}
          />
        </Stack>
        <Stack>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              "&:hover": {
                backgroundColor: "#FC8019",
              },
              "&.Mui-disabled": {
                backgroundColor: "#f3f3f3",
              },
            }}
          >
            {loading ? "Loading ..." : "Submit"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NewOrder;
