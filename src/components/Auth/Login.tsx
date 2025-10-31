import React from "react";
import {
  Stack,
  TextField,
  Button,
  Typography,
  Box,
  Modal,
} from "@mui/material";
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
    password: "",
    otp: "",
    _id: "",
  });
  const [forgotPasswordState, setForgotPasswordState] = React.useState({
    phone: "",
    password: "",
    otp: "",
    _id: "",
  });
  const [otpSent, setOtpSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [verifiedOtp, setVerifiedOtp] = React.useState(false);

  const handleForgotPasswordSendOTP = () => {
    dispatch(setProgress({ progress: 10 }));
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/send-otp`, {
        phone: forgotPasswordState.phone,
      })
      .then((res) => {
        dispatch(setProgress({ progress: 30 }));
        if (res?.data?.message === "User access has been granted") {
          // dispatch(login({ userInfo: res?.data?.data }));
          // setShowLoginDrawer(false);
          dispatch(setProgress({ progress: 100 }));
        } else {
          dispatch(setProgress({ progress: 70 }));
          setForgotPasswordState((prev: any) => {
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

  const verifyOtp = () => {
    dispatch(setProgress({ progress: 10 }));
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-otp`, {
        otp: forgotPasswordState.otp,
        _id: forgotPasswordState._id,
      })
      .then((res) => {
        dispatch(setProgress({ progress: 30 }));
        // setOtpSent(false);
        setLoading(false);
        toast.success(res?.data?.message);
        dispatch(setProgress({ progress: 100 }));
        setVerifiedOtp(true);
        // dispatch(login({ userInfo: res?.data?.data }));
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
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-user`, {
        // otp: loginState.otp,
        phone: loginState.phone,
        password: loginState.password,
        // _id: loginState._id,
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
  const handleForgotPasswordSubmit = () => {
    dispatch(setProgress({ progress: 10 }));
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`, {
        phone: forgotPasswordState.phone,
        password: forgotPasswordState.password,
      })
      .then((res) => {
        dispatch(setProgress({ progress: 30 }));
        // if (res?.data?.message === "User access has been granted") {
        // dispatch(login({ userInfo: res?.data?.data }));
        setShowLoginDrawer(true);
        setOpenModal(false);
        dispatch(setProgress({ progress: 100 }));
        // }
        toast.success(res?.data?.message);
        setLoading(false);
        dispatch(setProgress({ progress: 100 }));
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setLoading(false);
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
          // disabled={otpSent}
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
        <TextField
          variant="outlined"
          label="Password*"
          type="password"
          // disabled={otpSent}
          value={loginState.password}
          onChange={(e) => {
            if (e.target.value.toString().length <= 100) {
              setLoginState((prev) => {
                return {
                  ...prev,
                  password: e.target.value,
                };
              });
            }
          }}
        />
        {/* {otpSent && (
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
        )} */}
        {/* {otpSent ? (
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
        )} */}
        <Stack>
          <Typography
            variant="body2"
            sx={{
              fontSize: "12px",
              color: "black",
              marginLeft: "2px",
              fontWeight: 500,
            }}
          >
            Forgot Password?{"  "}
            <span
              style={{
                cursor: "pointer",
                color: "#472009",
                textDecoration: "none",
              }}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Click here
            </span>
          </Typography>
        </Stack>

        <Stack>
          <Button
            variant="contained"
            sx={{
              // backgroundColor: "#FC8019",
              backgroundColor: "#472009",
              "&:hover": {
                // backgroundColor: "#FC8019",
                backgroundColor: "#472009",
              },
              "&.Mui-disabled": {
                backgroundColor: "#f3f3f3",
              },
            }}
            disabled={loading}
            onClick={handleSubmit}
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

        <Modal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: {
                xs: "250px", // for extra-small screens (mobile)
                sm: "400px", // for small and larger screens (tablet, laptop, desktop)
              },
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Stack mt={4} gap={2}>
              <TextField
                autoFocus
                variant="outlined"
                label="Phone Number*"
                type="number"
                disabled={otpSent}
                value={forgotPasswordState.phone}
                onChange={(e) => {
                  if (e.target.value.toString().length <= 10) {
                    setForgotPasswordState((prev) => {
                      return {
                        ...prev,
                        phone: e.target.value,
                      };
                    });
                  }
                }}
              />
              {otpSent && (
                <Stack>
                  <TextField
                    autoFocus
                    variant="outlined"
                    label="OTP*"
                    type="number"
                    disabled={verifiedOtp}
                    value={forgotPasswordState.otp}
                    onChange={(e) => {
                      setForgotPasswordState((prev) => {
                        return {
                          ...prev,
                          otp: e.target.value,
                        };
                      });
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "12px",
                      color: "#686b78",
                      marginLeft: "2px",
                      fontWeight: 500,
                    }}
                  >
                    Haven't received OTP, contact +91 9006992491{" "}
                    <Box component="span" sx={{ color: "#FC8019" }}>
                      *
                    </Box>
                  </Typography>
                </Stack>
              )}
              {verifiedOtp && (
                <TextField
                  autoFocus
                  variant="outlined"
                  label="Password*"
                  type="password"
                  value={forgotPasswordState.password}
                  onChange={(e) => {
                    setForgotPasswordState((prev) => {
                      return {
                        ...prev,
                        password: e.target.value,
                      };
                    });
                  }}
                />
              )}
              {otpSent || verifiedOtp ? (
                <Stack>
                  <Button
                    variant="contained"
                    sx={{
                      // backgroundColor: "#FC8019",
                      backgroundColor: "#472009",
                      "&:hover": {
                        // backgroundColor: "#FC8019",
                        backgroundColor: "#472009",
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "#f3f3f3",
                      },
                    }}
                    disabled={loading}
                    onClick={
                      otpSent && forgotPasswordState.password === ""
                        ? verifyOtp
                        : handleForgotPasswordSubmit
                    }
                  >
                    {loading ? "Loading..." : "Submit"}
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
                    By Clicking on Submit, I accept the{" "}
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      Terms & Conditions & Privacy Policy
                    </Box>
                  </Typography>
                </Stack>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    // backgroundColor: "#FC8019",
                    backgroundColor: "#472009",
                    "&:hover": {
                      // backgroundColor: "#FC8019",
                      backgroundColor: "#472009",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "#f3f3f3",
                    },
                  }}
                  disabled={loading}
                  onClick={handleForgotPasswordSendOTP}
                >
                  {loading ? "Loading..." : "Send OTP"}
                </Button>
              )}
            </Stack>
          </Box>
        </Modal>
      </Stack>
    </Stack>
  );
};

export default Login;
