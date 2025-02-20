import dayjs from "dayjs";
import { Select, MenuItem, SelectChangeEvent, Typography } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote"; // This Week
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft"; // Last Week
import HistoryIcon from "@mui/icons-material/History"; // Last 7 Days
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; // Current Month
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"; // Previous Month
import SettingsIcon from "@mui/icons-material/Settings"; // Custom Filter
import theme from "../../theme";

const pastDateArray = [
  {
    label: "This Week",
    value: "this_week",
    icon: <EventNoteIcon fontSize="small" />,
    getValue: () => {
      const today = dayjs().startOf("day");
      return [today.startOf("week"), today.endOf("week")];
    },
  },
  {
    label: "Last Week",
    value: "last_week",
    icon: <ArrowCircleLeftIcon fontSize="small" />,
    getValue: () => {
      const today = dayjs().startOf("day");
      const prevWeek = today.subtract(7, "day");
      return [prevWeek.startOf("week"), prevWeek.endOf("week")];
    },
  },
  {
    label: "Last 7 Days",
    value: "last_7_days",
    icon: <HistoryIcon fontSize="small" />,
    getValue: () => {
      const today = dayjs().startOf("day");
      return [today.subtract(7, "day"), today.endOf("day")];
    },
  },
  {
    label: "Current Month",
    value: "current_month",
    icon: <CalendarMonthIcon fontSize="small" />,
    getValue: () => {
      const today = dayjs().startOf("day");
      return [today.startOf("month"), today.endOf("month")];
    },
  },
  {
    label: "Prev Month",
    value: "prev_month",
    icon: <KeyboardArrowLeftIcon fontSize="small" />,
    getValue: () => {
      const today = dayjs().startOf("day");
      //   const startOfNextMonth = today.endOf("month").add(1, "day");
      return [
        today.subtract(30, "day").startOf("month"),
        today.startOf("month").subtract(1, "day").endOf("day"),
      ];
    },
  },
  {
    label: "Custom",
    value: "custom",
    icon: <SettingsIcon fontSize="small" />,
    getValue: () => {
      const today = dayjs().startOf("day");
      return [today, today.add(1, "day").endOf("day")];
    },
  },
];

const DateMenu = (props: any) => {
  const handleChange = (event: SelectChangeEvent) => {
    const Item = pastDateArray.find(
      (item) => item.value === event.target.value
    );
    props.setDateRangeData((prev: any) => {
      return {
        ...prev,
        startDate: Item?.getValue()[0],
        endDate: Item?.getValue()[1],
        pastDate: event.target.value as string,
      };
    });
  };
  return (
    <div>
      <Select
        value={props.dateRangeData.pastDate}
        label="Select Past Date"
        onChange={handleChange}
        // disabled={categoryLoading}
        sx={{
          backgroundColor: theme.palette.grey[100],
          padding: "2px",
          width: "155px",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.MuiOutlinedInput-root": {
            height: "24px",
            borderRadius: "3px",
          },
          "& .MuiSelect-outlined": {
            textAlign: "left",
          },
          "& .MuiSelect-select": {
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          },
          "& .MuiSelect-icon": {
            fontSize: "2rem",
            right: "4px",
          },
        }}
        MenuProps={{
          PaperProps: {
            elevation: 2,
            sx: {
              borderRadius: 0,
              minWidth: "100px",
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
                height: "35px",
                "&:hover": {
                  backgroundColor: "#EDF5FF",
                },
              },
            },
          },
        }}
      >
        {pastDateArray?.map((item: any) => {
          return (
            <MenuItem
              value={item?.value}
              key={item?.label}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px",
                fontSize: "12px",
                "&.Mui-selected": { backgroundColor: "#E3F2FD" },
                "&:hover": { backgroundColor: "#F5F5F5" },
              }}
            >
              {item?.icon}
              {/* {item?.label} */}
              <Typography>{item?.label}</Typography>
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default DateMenu;
