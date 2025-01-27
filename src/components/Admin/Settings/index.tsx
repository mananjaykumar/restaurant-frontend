import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { CircularProgress, Stack, Switch, Typography } from "@mui/material";
import theme from "../../../theme";
import { useDispatch } from "react-redux";
import { setProgress } from "../../../store/slices/ProgressSlice";
import axios from "axios";
import toast from "react-hot-toast";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

const Settings = () => {
  const dispatch = useDispatch();
  // const { userData } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = React.useState(true);
  const [settingData, setSettingData] = React.useState({
    notify_orders_via_sms: false,
  });

  const fetchSettings = () => {
    dispatch(setProgress({ progress: 10 }));
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/settings`)
      .then((res) => {
        dispatch(setProgress({ progress: 50 }));
        setSettingData(res?.data?.data[0]);
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettingData((prev) => {
      return {
        ...prev,
        notify_orders_via_sms: event.target.checked,
      };
    });
    dispatch(setProgress({ progress: 10 }));
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/update-settings`, {
        settings: {
          ...settingData,
          notify_orders_via_sms: event.target.checked,
        },
      })
      .then((res) => {
        dispatch(setProgress({ progress: 50 }));
        setSettingData(res?.data?.data);
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
  const CustomSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: theme.palette.primary.success,
      "&:hover": {
        backgroundColor:
          (theme.palette.primary.success, theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: theme.palette.primary.success,
    },
  }));

  useEffect(() => {
    fetchSettings();
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
        <CircularProgress sx={{ color: theme.palette.primary.main }} />
      </Stack>
    );
  }
  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: "5px 20px",
        marginTop: "50px",
        textAlign: "center",
      }}
    >
      <Grid item xs={6}>
        <Typography fontSize={20} fontWeight="bold">
          {" "}
          Settings{" "}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography fontSize={20} fontWeight="bold">
          Actions
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          sx={{
            fontSize: "15px",
          }}
        >
          Notify Orders Via SMS
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <CustomSwitch
          checked={settingData?.notify_orders_via_sms}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Grid>
    </Grid>
  );
};

export default Settings;
