import { useState } from "react";
import { Stack, TextField, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/slices/AuthSlice";
import { setProgress } from "../../../store/slices/ProgressSlice";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const { progress } = useSelector((state: any) => state.progress);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminLoginState, setAdminLoginState] = useState({
    phone: "",
    _id: "",
    otp: "",
  });
  const handleLogin = () => {
    dispatch(setProgress({ progress: 10 }));
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/admin/send-otp`, {
        phone: adminLoginState.phone,
      })
      .then((res) => {
        dispatch(setProgress({ progress: 30 }));
        setLoading(false);
        dispatch(setProgress({ progress: 50 }));
        setOtpSent(true);
        setAdminLoginState((prev: any) => {
          return {
            ...prev,
            _id: res?.data?.data?._id,
          };
        });
        dispatch(setProgress({ progress: 70 }));
        toast.success(res.data.message);
        dispatch(setProgress({ progress: 100 }));
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
        dispatch(setProgress({ progress: 100 }));
      });
  };
  const handleSubmit = () => {
    dispatch(setProgress({ progress: 10 }));
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/admin/verify-otp`, {
        _id: adminLoginState._id,
        otp: adminLoginState.otp,
      })
      .then((res) => {
        dispatch(setProgress({ progress: 30 }));
        setLoading(false);
        dispatch(setProgress({ progress: 50 }));
        dispatch(login({ userInfo: res?.data?.data }));
        dispatch(setProgress({ progress: 70 }));
        toast.success(res.data.message);
        dispatch(setProgress({ progress: 100 }));
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
        dispatch(setProgress({ progress: 100 }));
      });
  };
  return (
    <>
      <LoadingBar color="#f11946" progress={progress} height={3} />
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
          gap={2}
          sx={{
            padding: { xs: "30px", sm: "50px", md: "50px 300px" },
          }}
        >
          <Stack>
            <Typography fontSize="24px">Welcome to Admin Console</Typography>
          </Stack>
          <Stack gap={2}>
            <TextField
              autoFocus
              variant="outlined"
              type="number"
              label="Phone Number"
              disabled={otpSent}
              value={adminLoginState.phone}
              onChange={(e) => {
                if (e.target.value.toString().length <= 10) {
                  setAdminLoginState((prev: any) => {
                    return {
                      ...prev,
                      phone: e.target.value,
                    };
                  });
                }
              }}
            />
            {otpSent && (
              <TextField
                variant="outlined"
                type="number"
                label="OTP"
                value={adminLoginState.otp}
                onChange={(e) => {
                  setAdminLoginState((prev: any) => {
                    return {
                      ...prev,
                      otp: e.target.value,
                    };
                  });
                }}
              />
            )}
            {otpSent ? (
              <Button
                variant="contained"
                disabled={loading}
                onClick={handleSubmit}
                sx={{
                  width: "fit-content",
                }}
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled={loading}
                onClick={handleLogin}
                sx={{
                  width: "fit-content",
                }}
              >
                {loading ? "Loading..." : "Login"}
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default AdminLogin;
