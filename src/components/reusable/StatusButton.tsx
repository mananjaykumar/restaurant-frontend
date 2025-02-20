import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu"; // Order Placed
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen"; // Preparing
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining"; // On The Way
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Completed
import CancelIcon from "@mui/icons-material/Cancel"; // Cancelled
import axios from "axios";
import toast from "react-hot-toast";

// Status array (keeping the same structure as StatusChange.tsx)
const statusArr = [
  {
    label: "ORDER PLACED",
    value: "ORDER_PLACED",
    icon: <RestaurantMenuIcon fontSize="small" />,
  },
  {
    label: "PREPARING",
    value: "PREPARING",
    icon: <SoupKitchenIcon fontSize="small" />,
  },
  {
    label: "ON THE WAY",
    value: "ON_THE_WAY",
    icon: <DeliveryDiningIcon fontSize="small" />,
  },
  {
    label: "COMPLETED",
    value: "COMPLETED",
    icon: <CheckCircleIcon fontSize="small" />,
  },
  {
    label: "CANCELLED",
    value: "CANCELLED",
    icon: <CancelIcon fontSize="small" />,
  },
];

interface StatusButtonProps {
  order: { _id: string; status: string };
  handleApiCall: (arg1?: any, arg2?: boolean) => void;
}

const StatusButton: React.FC<StatusButtonProps> = ({
  order,
  handleApiCall,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    statusArr.findIndex((it) => it.value === order?.status) || 0
  );
  const [buttonWidth, setButtonWidth] = useState<number>(130); // Compact width
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(Math.max(130, buttonRef.current.offsetWidth)); // Minimum width 130px
    }
  }, [selectedIndex]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (index: number | null) => {
    if (index === null || index === selectedIndex) {
      setAnchorEl(null);
      return;
    }

    const selectedStatus = statusArr[index];

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/update-order`,
        {
          order_id: order._id,
          status: selectedStatus.value,
        }
      );

      setSelectedIndex(index);
      toast.success(res?.data?.message);
      handleApiCall(undefined, true);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }

    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        ref={buttonRef}
        variant="outlined"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon fontSize="small" />}
        disabled={order?.status === "COMPLETED" || order?.status === "CANCELLED"}
        sx={{
          width: buttonWidth, // Compact width
          fontSize: "10px", // Smaller text size
          fontWeight: 500,
          padding: "5px 10px", // Reduced padding
          borderRadius: "4px",
          transition: "0.2s ease-in-out",
          borderColor: "black",
          borderWidth: "0.1px",
          color: "black",
        }}
      >
        {statusArr[selectedIndex].label}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(null)}
        PaperProps={{
          style: { width: buttonWidth, maxHeight: "auto" }, // AUTO HEIGHT TO FIT ALL OPTIONS
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "4px",
            padding: "2px 0",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.07)",
          },
        }}
      >
        {statusArr.map((option, index) => (
          <div key={option.label}>
            <MenuItem
              onClick={() => handleClose(index)}
              disabled={index < selectedIndex || index === selectedIndex} // Disable past & current statuses
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "3px", // Smaller gap
                padding: "4px 6px", // Better padding for readability
                borderRadius: "3px",
                fontSize: "9px", // Smaller font size
                fontWeight: 400,
                minHeight: "22px", // Enough height to be visible
                "&:hover": { backgroundColor: "#F2F2F2" },
                "&.MuiMenuItem-root": {
                  height: "20px",
                },
              }}
            >
              {option.icon}
              <Typography sx={{ fontSize: "9px" }}>{option.label}</Typography>
            </MenuItem>
            {index !== statusArr.length - 1 && (
              <Divider sx={{ margin: "1px 0" }} />
            )}
          </div>
        ))}
      </Menu>
    </Box>
  );
};

export default StatusButton;
