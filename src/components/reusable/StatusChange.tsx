import React, { useState } from "react";
import { Select, SelectChangeEvent, MenuItem } from "@mui/material";
import theme from "../../theme";
import axios from "axios";
import toast from "react-hot-toast";

const statusArr = [
  {
    label: "ORDER PLACED",
    value: "ORDER_PLACED",
    color: "#077E8C",
    disabledColor: theme.palette.grey[500],
  },
  {
    label: "PREPARING",
    value: "PREPARING",
    color: "#F29339",
    disabledColor: theme.palette.grey[500],
  },
  {
    label: "ON THE WAY",
    value: "ON_THE_WAY",
    // color: "#634430",
    color: "purple",
    disabledColor: theme.palette.grey[500],
  },
  {
    label: "COMPLETED",
    value: "COMPLETED",
    color: "#198754",
    disabledColor: theme.palette.grey[500],
  },
  {
    label: "CANCELLED",
    value: "CANCELLED",
    color: "#FF0000",
    disabledColor: theme.palette.grey[500],
  },
];

const getColor = (value: string) => {
  const item = statusArr.find((it) => it.value === value);
  if (item?.label === "COMPLETED" || item?.label === "CANCELLED") {
    return item.disabledColor;
  }
  return item ? item.color : "";
};

const StatusChange = (props: any) => {
  const { order, handleApiCall } = props;
  const [color, setColor] = useState<string>(getColor(order?.status));

  const handleStatusChange = (event: SelectChangeEvent) => {
    const item = statusArr.find((item) => item.value === event.target.value);
    if (item) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/update-order`, {
          order_id: order._id,
          status: item.value,
        })
        .then((res) => {
          setColor(getColor(item?.value));
          toast.success(res?.data?.message);
          handleApiCall();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const checkDisabled = (index: number) => {
    const item = statusArr.filter((it) => it.value === order?.status)[0];
    return index < statusArr.indexOf(item);
  };

  return (
    <Select
      value={order?.status}
      onChange={handleStatusChange}
      disabled={order?.status === "COMPLETED" || order?.status === "CANCELLED"}
      sx={{
        backgroundColor:
          order?.status === "COMPLETED" || order?.status === "CANCELLED"
            ? theme.palette.grey[100]
            : "black",
        // backgroundColor: theme.palette.grey[100],
        padding: "2px",
        width: "150px",
        color: color,
        fontWeight: 600,
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&.MuiOutlinedInput-root": {
          // height: "24px",
          // borderRadius: "3px",
        },
        "& .MuiSelect-outlined": {
          textAlign: "left",
        },
        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
        },
        "& .MuiSelect-icon": {
          fontSize: "2rem",
          right: "4px",
          color:
            order?.status !== "COMPLETED" || order?.status !== "CANCELLED"
              ? "white"
              : "",
        },
        "& .Mui-disabled": {
          color: "rgba(0, 0, 0, 0.54)",
        },
        "& .MuiInputBase-input.Mui-disabled": {
          color: color,
          WebkitTextFillColor: color,
        },
      }}
      MenuProps={{
        PaperProps: {
          elevation: 2,
          sx: {
            borderRadius: 0,
            minWidth: "100px",
            width: "130px",
            "& .MuiList-root": {
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(0.6),
            },
            //   "& .MuiMenuItem-root": {
            //     textTransform: "none",
            //     p: 1.25,
            //     fontSize: "13px",
            //     borderRadius: 0,
            //     borderBottom: `1px solid ${theme.palette.grey[200]}`,
            //     "&:last-child": {
            //       borderBottom: "none",
            //     },
            //     "&:hover": {
            //       background: theme.palette.primary.light,
            //     },
            //   },

            "& .MuiMenuItem-root": {
              backgroundColor: theme.palette.grey[100],
              borderRadius: "4px",
              fontSize: "13px",
              "&:hover": {
                backgroundColor: "#EDF5FF",
              },
            },
          },
        },
      }}
    >
      {statusArr?.map((item: any, index: number) => {
        return (
          <MenuItem
            value={item?.value}
            key={item?.label}
            disabled={checkDisabled(index)}
            sx={{ color: item?.color, fontWeight: 600 }}
          >
            {item?.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default StatusChange;
