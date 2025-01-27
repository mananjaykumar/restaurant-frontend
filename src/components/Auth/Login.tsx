import React from "react";
import { Stack, TextField, Button, Typography, Box } from "@mui/material";
import { login } from "../../store/slices/AuthSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { toggleLoginDrawer } from "../../store/slices/TogglerSlice";
import { setProgress } from "../../store/slices/ProgressSlice";

interface ILogin {
  setShowLoginDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = (props: ILogin) => {
  const dispatch = useDispatch();
  const { defaultLoginData } = useSelector((state: any) => state.toggle);
  const { setShowLoginDrawer } = props;
  const [loginState, setLoginState] = React.useState({
    phone: "",
    otp: "",
    _id: "",
  });
  const [otpSent, setOtpSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleLogin = () => {
    dispatch(setProgress({ progress: 10 }));
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/send-otp`, {
        phone: loginState.phone,
      })
      .then((res) => {
        dispatch(setProgress({ progress: 30 }));
        if (res?.data?.message === "User access has been granted") {
          dispatch(login({ userInfo: res?.data?.data }));
          setShowLoginDrawer(false);
          dispatch(setProgress({ progress: 100 }));
        } else {
          dispatch(setProgress({ progress: 70 }));
          setLoginState((prev: any) => {
            return {
              ...prev,
              _id: res?.data?.data?._id,
            };
          });
          setOtpSent(true);
        }
        toast.success(res?.data?.message);
        setLoading(false);
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
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-otp`, {
        otp: loginState.otp,
        _id: loginState._id,
      })
      .then((res) => {
        dispatch(setProgress({ progress: 30 }));
        // setOtpSent(false);
        setLoading(false);
        toast.success(res?.data?.message);
        dispatch(setProgress({ progress: 100 }));
        setShowLoginDrawer(false);
        dispatch(login({ userInfo: res?.data?.data }));
        dispatch(toggleLoginDrawer({ open: false }));
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
        dispatch(setProgress({ progress: 100 }));
      });
  };

  React.useState(() => {
    if (defaultLoginData.drawerOpen) {
      toast.error("Please Log In First!");
    }
  });
  return (
    <Stack width="100%">
      <Stack mt={4} gap={2}>
        <TextField
          autoFocus
          variant="outlined"
          label="Phone Number*"
          type="number"
          disabled={otpSent}
          value={loginState.phone}
          onChange={(e) => {
            if (e.target.value.toString().length <= 10) {
              setLoginState((prev) => {
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
            autoFocus
            variant="outlined"
            label="OTP*"
            type="number"
            value={loginState.otp}
            onChange={(e) => {
              setLoginState((prev) => {
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
            sx={{
              backgroundColor: "#FC8019",
              "&:hover": {
                backgroundColor: "#FC8019",
              },
              "&.Mui-disabled": {
                backgroundColor: "#f3f3f3",
              },
            }}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        ) : (
          <Stack>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FC8019",
                "&:hover": {
                  backgroundColor: "#FC8019",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#f3f3f3",
                },
              }}
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            <Typography
              variant="body2"
              sx={{
                fontSize: "12px",
                color: "#686b78",
                marginTop: "6px",
                fontWeight: 500,
              }}
            >
              By Clicking on Login, I accept the{" "}
              <Box component="span" sx={{ fontWeight: 600 }}>
                Terms & Conditions & Privacy Policy
              </Box>
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Login;
