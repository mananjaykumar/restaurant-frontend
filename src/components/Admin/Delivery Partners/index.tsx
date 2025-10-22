import React, {
  useState,
  useEffect,
  useCallback,
  // useRef
} from "react";
import {
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  Chip,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import toast from "react-hot-toast";
// import CustomDateRangePicker from "../../reusable/CustomDateRangePicker";
import { CommonTable } from "../../reusable/CommonTable";
import { Shimmer, tableBorderStyles } from "../../reusable/Shimmer";
import { CommonMenu } from "../../reusable/CommonMenu";
// import StatusChange from "../../reusable/StatusChange";
// import { socket } from "../../../socket";
// import SearchInput from "../../reusable/SearchInput";
import { Debounce } from "../../../utils/Debounce";
import { useDispatch } from "react-redux";
import { setProgress } from "../../../store/slices/ProgressSlice";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import { AutocompleteInput } from "../../reusable/AutoCompleteInput";
// import StatusButton from "../../reusable/StatusButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchInput from "../../reusable/SearchInput";
// import NewCommonTable from "../../reusable/NewCommonTable";
// import notification from "../../../assets/notification.mp3";

// export interface IDateRangeData {
//   startDate: Dayjs | null;
//   endDate: Dayjs | null;
//   pastDate: string;
// }

interface CopyState {
  value: string;
  copied: boolean;
}

const AdminDeliveryPartners = () => {
  // const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useDispatch();
  // const [dateRangeData, setDateRangeData] = useState<IDateRangeData>({
  //   startDate: dayjs().startOf("day").subtract(7, "day"),
  //   endDate: dayjs().endOf("day"),
  //   pastDate: "last_7_days",
  // });

  const [rowsPerPage, setRowsPerPage] = useState(25);
  // const [orders, setOrders] = useState<any>([]);
  const [gigs, setGigs] = useState<any>({
    data: [],
    meta: { pagination: { total: 0, page: 1 }, totalSales: 0 },
  });
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearchTextAdded, setIsSearchTextAdded] = useState(false);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [fieldId, setFieldId] = useState("");
  const [copyState, setCopyState] = useState<CopyState>({
    value: "",
    copied: false,
  });

  // console.log("dateRangeData", dateRangeData);

  const handleSearchText = (inputText: React.SetStateAction<string>) => {
    setSearchText(inputText);
    setIsSearchTextAdded(true);
  };
  const handleChangePage = (_event: unknown, newPage: number) => {
    const _newPage = newPage + 1;
    setPage(_newPage);
    let url = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/admin/gigs?page=${_newPage}&rowsPerPage=${rowsPerPage}`;
    if (searchText) {
      url = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/admin/gigs?search=${searchText}&page=${page}&rowsPerPage=${rowsPerPage}`;
    }
    handleApiCall(url);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const number = parseInt(event.target.value, 10);
    setRowsPerPage(number);
    setPage(1);
    let url = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/admin/gigs?page=${page}&rowsPerPage=${number}`;
    if (searchText) {
      url = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/admin/gigs?search=${searchText}&page=${page}&rowsPerPage=${number}`;
    }
    return handleApiCall(url);
  };

  // const handleApiCall = (postObj?: any, includeDate?: boolean) => {
  //   dispatch(setProgress({ progress: 10 }));
  //   const obj = {
  //     // startDate: dayjs(dateRangeData.startDate).format("YYYY-MM-DDTHH:mm:ss"),
  //     // endDate: dayjs(dateRangeData.endDate).format("YYYY-MM-DDTHH:mm:ss"),
  //     page,
  //     rowsPerPage,
  //     ...postObj,
  //   };
  //   const dateObj = includeDate
  //     ? {
  //         // startDate: dayjs(dateRangeData.startDate).format(
  //         //   "YYYY-MM-DDTHH:mm:ss"
  //         // ),
  //         // endDate: dayjs(dateRangeData.endDate).format("YYYY-MM-DDTHH:mm:ss"),
  //         search: searchText,
  //       }
  //     : {};
  //   setLoading(true);
  //   dispatch(setProgress({ progress: 30 }));
  //   axios
  //     .post(
  //       `${
  //         import.meta.env.VITE_BACKEND_URL
  //       }/api/admin/gigs?page=${page}&rowsPerPage=${rowsPerPage}`,
  //       {
  //         ...obj,
  //         ...dateObj,
  //         // startDate: dayjs(dateRangeData.startDate).format("YYYY-MM-DDTHH:mm:ss"),
  //         // endDate: dayjs(dateRangeData.endDate).format("YYYY-MM-DDTHH:mm:ss"),
  //       }
  //     )
  //     .then((res) => {
  //       dispatch(setProgress({ progress: 70 }));
  //       setGigs(res?.data?.data);
  //       setLoading(false);
  //       dispatch(setProgress({ progress: 100 }));
  //     })
  //     .catch((err) => {
  //       toast.error(err.response.data.message);
  //       setLoading(false);
  //       dispatch(setProgress({ progress: 100 }));
  //     });
  // };

  const handleApiCall = (url?: string) => {
    dispatch(setProgress({ progress: 10 }));
    let URL = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/admin/gigs?page=${page}&rowsPerPage=${rowsPerPage}`;
    if (url) {
      URL = url;
    }
    setLoading(true);
    dispatch(setProgress({ progress: 30 }));
    axios
      .get(URL)
      .then((res) => {
        dispatch(setProgress({ progress: 70 }));
        setLoading(false);
        setGigs(res?.data?.data);
        dispatch(setProgress({ progress: 100 }));
      })
      .catch((err) => {
        setLoading(false);
        // if (
        //   err?.response?.data?.message ===
        //   "Session Expired, Please Login again!"
        // ) {
        //   dispatch(logout());
        // }
        toast.error(err?.response?.data?.message);
        dispatch(setProgress({ progress: 100 }));
      });
  };

  const handleDelete = () => {
    setAnchorEl(null);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/delete-order`, {
        order_id: fieldId,
      })
      .then((res) => {
        handleApiCall();
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        toast.success(err?.response?.data?.message);
      });
    setFieldId("");
    setAnchorEl(null);
  };

  const menuItems = {
    items: [
      {
        displayName: "Delete",
        disable: false,
        handlerFunc: handleDelete,
        icon: <DeleteIcon />,
      },
    ],
  };
  const handleMenu = (
    event: React.ChangeEvent<HTMLInputElement>,
    _id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setFieldId(_id);
  };

  const menuProps = {
    anchorEl,
    setAnchorEl,
    open,
    handleMenu,
    menuItems,
  };

  const propsData = {
    columns: [
      {
        label: "Name",
        numeric: false,
      },
      {
        label: "Available",
        numeric: false,
      },
      {
        label: "Phone",
        // numeric: false,
      },
      {
        label: "Role",
        // numeric: false,
      },
      {
        label: "Assigned Mess",
        // numeric: false,
      },
      {
        label: "Phone OTP",
        // numeric: false,
      },
      // {
      //   label: "Wallet Balance",
      //   // numeric: false,
      // },
      {
        label: "Customer Addresses",
        // numeric: false,
      },
      {
        label: "Created At",
        // numeric: false,
      },
      {
        label: "Updated At",
        // numeric: false,
      },
      {
        label: "",
        // numeric: false,
      },
    ],
    page,
    rowsPerPage: rowsPerPage,
    // info: {
    //   data: users,
    //   meta: {
    //     total: users?.length,
    //     page: page,
    //   },
    // },
    info: gigs,
    handleChangePage: handleChangePage,
    handleChangeRowsPerPage: handleChangeRowsPerPage,
    height: "calc(100vh - 250px)",
    msg: "No matching Partners",
    subMsg: "We could not find any Partners matching your search",
    dense: true,
    handleRequestSort: () => {},
    loading,
    // totalSalesRequired: true,
  };

  const call = useCallback(Debounce(handleApiCall, 500), []);
  useEffect(() => {
    if (isSearchTextAdded) {
      setPage(1);
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/admin/gigs?search=${searchText}&page=1&rowsPerPage=${rowsPerPage}`;
      call(url);
    } else {
      handleApiCall();
    }
  }, [searchText]);

  // useEffect(() => {
  //   socket.emit("join", "adminRoom");
  //   socket.on("orderPlaced", (data) => {
  //     toast.success("New Order Placed");
  //     setGigs((prev: any) => {
  //       const oldOrders = [...prev.data];
  //       // console.log("oldOrders", oldOrders);
  //       oldOrders.unshift(data.data);
  //       return {
  //         ...prev,
  //         data: oldOrders,
  //         meta: {
  //           ...data.meta,
  //           pagination: {
  //             ...data.meta.pagination,
  //             total:
  //               prev?.data?.length === 1
  //                 ? 1
  //                 : prev?.meta?.pagination?.total + 1,
  //           },
  //           totalSales:
  //             prev?.meta?.totalSales === undefined
  //               ? 0 + data?.data?.amount
  //               : prev?.meta?.totalSales + data?.data?.amount,
  //         },
  //       };
  //     });
  //     playNotificationSound();
  //   });
  // }, [socket]);

  // useEffect(() => {
  //   audioRef.current = new Audio(notification);
  //   // Optional: preload the sound
  //   audioRef.current.load();
  // }, []);

  // const playNotificationSound = () => {
  //   if (audioRef.current) {
  //     audioRef.current.play().catch((error: unknown) => {
  //       console.log("Error playing sound", error);
  //     });
  //   }
  // };
  return (
    <Stack gap={1} direction="column">
      {/* <Stack alignSelf="flex-end">
        <CustomDateRangePicker
          dateRangeData={dateRangeData}
          setDateRangeData={setDateRangeData}
        />
      </Stack> */}
      <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
        <Stack width="25%">
          <SearchInput
            changeAction={handleSearchText}
            searchValue={searchText}
            placeholder="Search by Name"
          />
          {/* <AutocompleteInput
            inputValue={searchText}
            setInputValue={setSearchText}
            placeHolder="Search by Order Id"
            onClear={() => {}}
            attributes={[]}
            width="300px"
            apiUrl="api/admin/gigs/id"
          /> */}
        </Stack>
        <Stack>
          {/* <CustomDateRangePicker
            dateRangeData={dateRangeData}
            setDateRangeData={setDateRangeData}
          /> */}
        </Stack>
        {/* <Stack>
          <Button
            variant="contained"
            // startIcon={<AddIcon />}
            // onClick={() => {
            //   setAdminDrawer(true);
            // }}
          >
            Admin
          </Button>
        </Stack> */}
      </Stack>

      <Stack>
        <CommonTable {...propsData}>
          {loading && (
            <Shimmer
              length={propsData?.columns?.length}
              colsWidth={["60%", "10%", "17%", "12%", "1%"]}
            />
          )}
          {!loading &&
            (gigs?.data ?? []).map((order: any) => {
              const updatedMenuProps = {
                ...menuProps,
                item: order,
              };
              return (
                <TableRow key={order?._id} sx={{ ...tableBorderStyles }}>
                  {/* <TableCell>
                    <Stack
                      sx={{
                        display: "flex",
                        gap: "0.5rem",
                        flexDirection: "row",
                        alignIems: "center",
                      }}
                    >
                      <CopyToClipboard
                        text={order?._id}
                        onCopy={() => {
                          setCopyState({
                            value: order?._id,
                            copied: true,
                          });
                        }}
                      >
                        <Tooltip
                          title={
                            copyState?.value === order?._id
                              ? "Copied"
                              : "Copy To Clipboard"
                          }
                        >
                          <ContentCopyIcon />
                        </Tooltip>
                      </CopyToClipboard>
                      <Typography>{order?._id}</Typography>
                    </Stack>
                  </TableCell> */}
                  <TableCell>{order?.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={order?.isAvailable ? "Available" : "Not Available"}
                      color={order?.isAvailable ? "success" : "error"}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{order?.phone}</TableCell>
                  <TableCell>{order?.role?.toLocaleUpperCase()}</TableCell>
                  <TableCell>{order?.assignedMess[0]?.name}</TableCell>
                  <TableCell>
                    {order?.phoneOtp ? order?.phoneOtp : "-"}
                  </TableCell>
                  {/* <TableCell>&#8377;{order?.walletBalance}</TableCell> */}
                  <TableCell
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      height: "150px",
                      overflowY: "auto",
                    }}
                  >
                    {order?.customerAddress?.length > 0
                      ? order?.customerAddress?.map(
                          (address: any, index: number) => {
                            return (
                              <Stack
                                key={address?._id}
                                sx={{
                                  borderBottom: "1px solid #e0e0e0",
                                  paddingBottom: "0.5rem",
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  gap: "1rem",
                                }}
                              >
                                <Stack>
                                  <Typography>{index + 1}</Typography>
                                </Stack>
                                <Stack
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.5rem",
                                    // backgroundColor: "#F0DBA5",
                                    background: "linear-gradient(to right, #0a192f, #1467c6)",
                                    color: "white",
                                    padding: "0.5rem",
                                    width: "100%",
                                    height: "100px",
                                    overflow: "auto",
                                  }}
                                >
                                  <Typography>
                                    <b>Customer Name: </b>
                                    {address?.customerName}
                                  </Typography>
                                  <Typography>
                                    <b>Address: </b>
                                    <a
                                      href={address?.addressUrl}
                                      target="_blank"
                                      style={{ textDecoration: "none", color: "white" }}
                                    >
                                      {address?.addressUrl}
                                    </a>
                                  </Typography>
                                  <Typography>
                                    <b>Food Preference: </b>
                                    {address?.foodPreference}
                                  </Typography>
                                  <Typography>
                                    <b>Customer Mobile Number: </b>
                                    {address?.customerMobileNumber}
                                  </Typography>
                                  <Typography>
                                    <b>Added On: </b>
                                    {dayjs(address?.createdAt).format("LLL")}
                                  </Typography>
                                </Stack>
                              </Stack>
                            );
                          }
                        )
                      : "-"}
                  </TableCell>

                  <TableCell>{dayjs(order?.createdAt).format("LLL")}</TableCell>
                  <TableCell>{dayjs(order?.updatedAt).format("LLL")}</TableCell>
                  <TableCell>
                    <CommonMenu {...updatedMenuProps} />
                  </TableCell>
                </TableRow>
              );
            })}
        </CommonTable>
      </Stack>
    </Stack>
  );
};

export default AdminDeliveryPartners;
