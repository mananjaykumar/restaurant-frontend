import React, { useState, useEffect, useCallback } from "react";
import { Stack, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import toast from "react-hot-toast";
import CustomDateRangePicker from "../../reusable/CustomDateRangePicker";
import { CommonTable } from "../../reusable/CommonTable";
import { Shimmer, tableBorderStyles } from "../../reusable/Shimmer";
import { CommonMenu } from "../../reusable/CommonMenu";
import StatusChange from "../../reusable/StatusChange";
import { socket } from "../../../socket";
// import SearchInput from "../../reusable/SearchInput";
import { Debounce } from "../../../utils/Debounce";
import { useDispatch } from "react-redux";
import { setProgress } from "../../../store/slices/ProgressSlice";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { AutocompleteInput } from "../../reusable/AutoCompleteInput";
// import NewCommonTable from "../../reusable/NewCommonTable";

export interface IDateRangeData {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  pastDate: string;
}

interface CopyState {
  value: string;
  copied: boolean;
}

const AdminOrders = () => {
  const dispatch = useDispatch();
  const [dateRangeData, setDateRangeData] = useState<IDateRangeData>({
    startDate: dayjs().startOf("day").subtract(7, "day"),
    endDate: dayjs().endOf("day"),
    pastDate: "last_7_days",
  });
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [orders, setOrders] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  // const [isSearchTextAdded, setIsSearchTextAdded] = useState(false);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [fieldId, setFieldId] = useState("");
  const [copyState, setCopyState] = useState<CopyState>({
    value: "",
    copied: false,
  });

  // console.log("dateRangeData", dateRangeData);

  // const handleSearchText = (inputText: React.SetStateAction<string>) => {
  //   setSearchText(inputText);
  //   setIsSearchTextAdded(true);
  // };
  const handleChangePage = (_event: unknown, newPage: number) => {
    const _newPage = newPage + 1;
    setPage(_newPage);
    let ob: any = {
      page: _newPage,
      rowsPerPage: rowsPerPage,
      startDate: dayjs(dateRangeData.startDate).format("YYYY-MM-DDTHH:mm:ss"),
      endDate: dayjs(dateRangeData.endDate).format("YYYY-MM-DDTHH:mm:ss"),
    };
    if (searchText) {
      ob = {
        ...ob,
        search: searchText,
      };
    }
    handleApiCall(ob);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const number = parseInt(event.target.value, 10);
    setRowsPerPage(number);
    setPage(1);
    let ob: any = {
      page: page,
      rowsPerPage: number,
      startDate: dayjs(dateRangeData.startDate).format("YYYY-MM-DDTHH:mm:ss"),
      endDate: dayjs(dateRangeData.endDate).format("YYYY-MM-DDTHH:mm:ss"),
    };
    if (searchText) {
      ob = {
        ...ob,
        search: searchText,
      };
    }
    return handleApiCall(ob);
  };

  const handleApiCall = (postObj?: any, includeDate?: boolean) => {
    dispatch(setProgress({ progress: 10 }));
    const obj = {
      // startDate: dayjs(dateRangeData.startDate).format("YYYY-MM-DDTHH:mm:ss"),
      // endDate: dayjs(dateRangeData.endDate).format("YYYY-MM-DDTHH:mm:ss"),
      page,
      rowsPerPage,
      ...postObj,
    };
    const dateObj = includeDate
      ? {
          startDate: dayjs(dateRangeData.startDate).format(
            "YYYY-MM-DDTHH:mm:ss"
          ),
          endDate: dayjs(dateRangeData.endDate).format("YYYY-MM-DDTHH:mm:ss"),
          search: searchText,
        }
      : {};
    setLoading(true);
    dispatch(setProgress({ progress: 30 }));
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`, {
        ...obj,
        ...dateObj,
        // startDate: dayjs(dateRangeData.startDate).format("YYYY-MM-DDTHH:mm:ss"),
        // endDate: dayjs(dateRangeData.endDate).format("YYYY-MM-DDTHH:mm:ss"),
      })
      .then((res) => {
        dispatch(setProgress({ progress: 70 }));
        setOrders(res?.data?.data);
        setLoading(false);
        dispatch(setProgress({ progress: 100 }));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
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
      { displayName: "Delete", disable: false, handlerFunc: handleDelete },
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
        label: "Order Id",
        // numeric: false,
      },
      {
        label: "Products",
        numeric: false,
      },
      {
        label: "Customer",
        // numeric: false,
      },
      {
        label: "Address",
        // numeric: false,
      },
      {
        label: "Instructions",
        // numeric: false,
      },
      {
        label: "Order Type",
        // numeric: false,
      },
      {
        label: "Status",
        // numeric: false,
      },
      {
        label: "Amount",
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
    info: orders,
    handleChangePage: handleChangePage,
    handleChangeRowsPerPage: handleChangeRowsPerPage,
    height: "calc(100vh - 260px)",
    msg: "No matching Orders",
    subMsg: "We could not find any Orders matching your search",
    dense: true,
    handleRequestSort: () => {},
    loading,
  };

  const call = useCallback(Debounce(handleApiCall, 500), []);
  useEffect(() => {
    const ob = {
      page: page,
      rowsPerPage: rowsPerPage,
      startDate: dayjs(dateRangeData.startDate).format("YYYY-MM-DDTHH:mm:ss"),
      endDate: dayjs(dateRangeData.endDate).format("YYYY-MM-DDTHH:mm:ss"),
    };
    if (searchText) {
      const ob1 = {
        // ...ob,
        page: 1,
        rowsPerPage: rowsPerPage,
        search: searchText,
      };
      call({ ...ob1 });
    } else {
      handleApiCall(ob);
    }
  }, [dateRangeData, searchText]);

  useEffect(() => {
    socket.emit("join", "adminRoom");
    socket.on("orderPlaced", (data) => {
      toast.success("New Order Placed");
      setOrders((prev: any) => {
        const oldOrders = [...prev.data];
        // console.log("oldOrders", oldOrders);
        oldOrders.unshift(data.data);
        return {
          ...prev,
          data: oldOrders,
          meta: data.meta,
        };
      });
    });
  }, [socket]);

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
          {/* <SearchInput
            changeAction={handleSearchText}
            searchValue={searchText}
            placeholder="Search by Order Id"
            disabled={false}
          /> */}
          <AutocompleteInput
            inputValue={searchText}
            setInputValue={setSearchText}
            placeHolder="Search by Order Id"
            onClear={() => {}}
            attributes={[]}
            width="300px"
          />
        </Stack>
        <Stack>
          <CustomDateRangePicker
            dateRangeData={dateRangeData}
            setDateRangeData={setDateRangeData}
          />
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
            orders?.data?.map((order: any) => {
              const updatedMenuProps = {
                ...menuProps,
                item: order,
              };
              return (
                <TableRow key={order?._id} sx={{ ...tableBorderStyles }}>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    {order.products?.length > 0 ? (
                      order?.products.map(
                        (product: any, productKey: number) => (
                          <Typography key={productKey}>
                            {product.item.title} x {product.quantity}
                          </Typography>
                        )
                      )
                    ) : (
                      <Typography sx={{ textAlign: "center" }}>-</Typography>
                    )}
                  </TableCell>
                  <TableCell>{order?.user?.name}</TableCell>
                  <TableCell>{order?.address}</TableCell>
                  <TableCell>{order?.instructions}</TableCell>
                  <TableCell>{order?.order_type}</TableCell>
                  <TableCell>
                    <StatusChange order={order} handleApiCall={handleApiCall} />
                  </TableCell>
                  <TableCell>&#8377;{order?.amount}</TableCell>
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

      {/* New Table */}
      {/* <Stack>
        <NewCommonTable {...propsData}>
          {loading && (
            <Shimmer
              length={propsData?.columns?.length}
              colsWidth={["60%", "10%", "17%", "12%", "1%"]}
            />
          )}
          {!loading &&
            orders?.data?.map((order: any) => {
              const updatedMenuProps = {
                ...menuProps,
                item: order,
              };
              return (
                <TableRow
                  key={order?._id}
                  sx={{
                    ...tableBorderStyles,
                    verticalAlign:
                      orders?.data?.length === 1 ? "top" : "center",
                  }}
                >
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>{order?.user?.name}</TableCell>
                  <TableCell>{order?.products}</TableCell>
                  <TableCell>{order?.address}</TableCell>
                  <TableCell>{order?.instructions}</TableCell>
                  <TableCell>{order?.order_type}</TableCell>
                  <TableCell>
                    <StatusChange order={order} handleApiCall={handleApiCall} />
                  </TableCell>
                  <TableCell>&#8377;{order?.amount}</TableCell>
                  <TableCell>{dayjs(order?.createdAt).format("LLL")}</TableCell>
                  <TableCell>{dayjs(order?.updatedAt).format("LLL")}</TableCell>
                  <TableCell>
                    <CommonMenu {...updatedMenuProps} />
                  </TableCell>
                </TableRow>
              );
            })}
        </NewCommonTable>
      </Stack> */}
    </Stack>
  );
};

export default AdminOrders;
