import React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Stack, Box } from "@mui/material";
import DateMenu from "./DateMenu";
import { IDateRangeData } from "../Admin/Orders";

// export interface IDateRangeData {
//   startDate: Dayjs | null;
//   endDate: Dayjs | null;
//   pastDate: string;
// }

interface IProps {
  dateRangeData: IDateRangeData;
  setDateRangeData: React.Dispatch<React.SetStateAction<IDateRangeData>>;
}

const CustomDateRangePicker = (props: IProps) => {
  const { dateRangeData, setDateRangeData } = props;
  //   const [dateRangeData, setDateRangeData] = useState<IDateRangeData>({
  //     startDate: dayjs().subtract(7, "day"),
  //     endDate: dayjs(),
  //     pastDate: "last_7_days",
  //   });
  // const [startDate, setStartDate] = useState<Dayjs | null>(null);
  // const [endDate, setEndDate] = useState<Dayjs | null>(null);

  //   console.log(
  //     "startDate",
  //     dayjs(dateRangeData.startDate).format("YYYY-MM-DDTHH:mm:ss")
  //   );
  //   console.log(
  //     "endDate",
  //     dayjs(dateRangeData.endDate).format("YYYY-MM-DDTHH:mm:ss"),
  //     dayjs("2023-10-07T22:14:09.822+00:00")
  //   );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        sx={{
          // backgroundColor: "black",
          height: "38px",
          p: 1,
          borderRadius: "6px",
          background: "#fff",
          ":hover": {
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          },
          width: "fit-content",
        }}
      >
        <DateMenu
          dateRangeData={dateRangeData}
          setDateRangeData={setDateRangeData}
        />
        <DatePicker
          label="Start Date"
          format="DD/MM/YYYY"
          value={dateRangeData.startDate}
          maxDate={dayjs(dateRangeData.endDate).subtract(1, "day")}
          onChange={(newValue) => {
            setDateRangeData((prev: any) => {
              return {
                ...prev,
                startDate: newValue,
                pastDate: "custom",
              };
            });
          }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiInputLabel-root": {
              display: "none",
            },
            width: "130px",
          }}
        />
        <Box>-</Box>
        <DatePicker
          label="End Date"
          format="DD/MM/YYYY"
          value={dateRangeData.endDate}
          minDate={dayjs(dateRangeData.startDate).add(1, "day")}
          onChange={(newValue: any) => {
            setDateRangeData((prev) => {
              return {
                ...prev,
                endDate: newValue,
                pastDate: "custom",
              };
            });
          }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiInputLabel-root": {
              display: "none",
            },
            width: "130px",
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default CustomDateRangePicker;
