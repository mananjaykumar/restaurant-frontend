import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import CustomStepper from "../reusable/CustomStepper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { socket } from "../../socket";
import toast from "react-hot-toast";

// const map: {
//   [k: string]: {
//     step: number;
//     // component: React.FC<{ handleNext: () => void }>;
//     label: string;
//   };
// } = {
//   ORDER_PLACED: {
//     step: 0,
//     // component: ModelConfiguration,
//     label: "Order Placed",
//   },
//   PREPARING: {
//     step: 1,
//     // component: DataPrep,
//     label: "Preparing",
//   },
//   ON_THE_WAY: {
//     step: 2,
//     // component: PreviewData,
//     label: "On The Way",
//   },
//   COMPLETED: {
//     step: 3,
//     // component: Training,
//     label: "Completed",
//   },
//   CANCELLED: {
//     step: 4,
//     // component: Evaluate,
//     label: "Cancelled",
//   },
// };

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [mapData, setMapData] = useState<{
    [k: string]: {
      step: number;
      // component: React.FC<{ handleNext: () => void }>;
      label: string;
      value: string;
      updatedAt: string;
    };
  }>({
    ORDER_PLACED: {
      step: 0,
      // component: ModelConfiguration,
      label: "Order Placed",
      value: "ORDER_PLACED",
      updatedAt: "",
    },
    PREPARING: {
      step: 1,
      // component: DataPrep,
      label: "Preparing",
      value: "PERPARING",
      updatedAt: "",
    },
    ON_THE_WAY: {
      step: 2,
      // component: PreviewData,
      label: "On The Way",
      value: "ON_THE_WAY",
      updatedAt: "",
    },
    COMPLETED: {
      step: 3,
      // component: PreviewData,
      label: "Completed",
      value: "COMPLETED",
      updatedAt: "",
    },
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/order/${id}`)
      .then((res) => {
        if (res?.data?.data?.status === "CANCELLED") {
          setMapData({
            CANCELLED: {
              step: 0,
              // component: ModelConfiguration,
              label: "Cancelled",
              value: "CANCELLED",
              updatedAt: res?.data?.data?.updatedAt,
            },
          });
        }
        setMapData((prev) => {
          prev[res?.data?.data?.status] = {
            ...prev[res?.data?.data?.status],
            updatedAt: res?.data?.data?.updatedAt,
          };
          return {
            ...prev,
          };
        });
        setActiveStep(mapData[res?.data?.data?.status]?.step);
        const index = mapData[res?.data?.data?.status]?.step;
        setCompleted((prev) => ({
          ...prev,
          ...Object.keys(mapData).reduce((acc, curr, i) => {
            if (i < index) {
              acc[mapData[curr].step] = true;
            }
            return acc;
          }, {} as { [k: number]: boolean }),
        }));
        setLoading(false);
      })
      .catch(() => {
        setMapData({
          NOT_FOUND: {
            step: 0,
            label: "Not Found",
            value: "NOT_FOUND",
            updatedAt: "",
          },
        });
        toast.error("Order Not Found!");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    socket.emit("join", id?.toString());
    socket.on("orderUpdated", (data) => {
      toast.success("Order Updated");
      if (data?.data?.status === "CANCELLED") {
        setMapData({
          CANCELLED: {
            step: 0,
            // component: ModelConfiguration,
            label: "Cancelled",
            value: "CANCELLED",
            updatedAt: data?.data?.updatedAt,
          },
        });
      }
      setMapData((prev) => {
        prev[data?.data?.status] = {
          ...prev[data?.data?.status],
          updatedAt: data?.data?.updatedAt,
        };
        return {
          ...prev,
        };
      });
      setActiveStep(mapData[data?.data?.status]?.step);
      const index = mapData[data?.data?.status]?.step;
      setCompleted((prev) => ({
        ...prev,
        ...Object.keys(mapData).reduce((acc, curr, i) => {
          if (i < index) {
            acc[mapData[curr].step] = true;
          }
          return acc;
        }, {} as { [k: number]: boolean }),
      }));
    });
  }, [socket]);

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
        padding: "50px 25px",
        gap: "2rem",
        // height: "330px",
        // height: { xs: "220px", sm: "250px" },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            navigate(-1);
          }}
          sx={{
            borderColor: "#FC8019",
            color: "#FC8019",
            "&:hover": {
              borderColor: "#FC8019",
              color: "#FC8019",
            },
          }}
        >
          Back
        </Button>
        <Typography
          fontSize="18px"
          fontStyle="italic"
          sx={{ color: "#7e808c" }}
        >
          Order #{id}
        </Typography>
      </Stack>
      <CustomStepper
        map={mapData}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        completed={completed}
        setCompleted={setCompleted}
      />
    </Stack>
  );
};

export default OrderDetails;
