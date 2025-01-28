import dayjs from "dayjs";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import theme from "../../theme";

const pastDateArray = [
  {
    label: "This Week",
    value: "this_week",
    getValue: () => {
      const today = dayjs().startOf("day");
      return [today.startOf("week"), today.endOf("week")];
    },
  },
  {
    label: "Last Week",
    value: "last_week",
    getValue: () => {
      const today = dayjs().startOf("day");
      const prevWeek = today.subtract(7, "day");
      return [prevWeek.startOf("week"), prevWeek.endOf("week")];
    },
  },
  {
    label: "Last 7 Days",
    value: "last_7_days",
    getValue: () => {
      const today = dayjs().startOf("day");
      return [today.subtract(7, "day"), today.endOf("day")];
    },
  },
  {
    label: "Current Month",
    value: "current_month",
    getValue: () => {
      const today = dayjs().startOf("day");
      return [today.startOf("month"), today.endOf("month")];
    },
  },
  {
    label: "Prev Month",
    value: "prev_month",
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
          width: "130px",
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
            <MenuItem value={item?.value} key={item?.label}>
              {item?.label}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default DateMenu;
