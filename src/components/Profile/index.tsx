import {
  Avatar,
  Box,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  Stack,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import axios from "axios";
import { setProgress } from "../../store/slices/ProgressSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    orders: 0,
    initials: "",
  });

  const fetchProfile = () => {
    dispatch(setProgress({ progress: 10 }));
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
        _id: userData._id,
      })
      .then((res) => {
        const { name } = res?.data?.data;
        const initials =
          name.split(" ")[0].slice(0, 1) + name.split(" ")[1].slice(0, 1);
        dispatch(setProgress({ progress: 50 }));
        setUser(res?.data?.data);
        setUser((prev) => {
          return {
            ...prev,
            initials,
          };
        });
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
    fetchProfile();
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
        <CircularProgress sx={{ color: "#FC8019" }} />
      </Stack>
    );
  }
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 4 },
          maxWidth: 900,
          margin: "0 auto",
          borderRadius: 3,
        }}
      >
        {/* Header Section */}
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={3}
          alignItems="center"
          justifyContent="flex-start"
          mb={4}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: theme.palette.warning.main,
              fontSize: 32,
            }}
          >
            {user.initials}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {user.name}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} mt={1}>
              <PhoneIcon fontSize="small" color="warning" />
              <Typography variant="body1">{user.phone}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
              <EmailIcon fontSize="small" color="warning" />
              <Typography variant="body1">{user.email}</Typography>
            </Stack>
          </Box>
        </Stack>

        {/* Stats Grid */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 2,
              }}
            >
              <ShoppingCartIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Total Orders</Typography>
              <Typography variant="h4" color="warning" fontWeight="bold">
                {user.orders}
              </Typography>
            </Paper>
          </Grid>

          {/* Add more stat cards here if needed */}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;
