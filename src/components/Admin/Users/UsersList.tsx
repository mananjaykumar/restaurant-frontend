/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { CommonTable } from "../../reusable/CommonTable";
import { Shimmer, tableBorderStyles } from "../../reusable/Shimmer";
import { Button, Stack, TableCell, TableRow } from "@mui/material";
import SearchInput from "../../reusable/SearchInput";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import toast from "react-hot-toast";
import { CommonMenu } from "../../reusable/CommonMenu";
import { CustomDrawer } from "../../reusable/CustomDrawer";
import AddAdmin from "./AddAdmin";
import { Debounce } from "../../../utils/Debounce";
import { setProgress } from "../../../store/slices/ProgressSlice";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";

interface Users {
  data: any[];
  meta: {
    pagination: {
      page: number;
      total: number;
    };
  };
}

const UsersList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [adminDrawer, setAdminDrawer] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [fieldId, setFieldId] = useState("");
  const [isRestrictedUser, setIsRestrictedUser] = useState<boolean>();
  const [users, setUsers] = useState<Users>();
  const [searchText, setSearchText] = useState("");
  const [isSearchTextAdded, setIsSearchTextAdded] = useState(false);

  const handleChangePage = (_event: unknown, newPage: number) => {
    const _newPage = newPage + 1;
    setPage(_newPage);
    let url = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/admin/users?page=${_newPage}&rowsPerPage=${rowsPerPage}`;
    if (searchText) {
      url = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/admin/users?search=${searchText}&page=${page}&rowsPerPage=${rowsPerPage}`;
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
    }/api/admin/users?page=${page}&rowsPerPage=${number}`;
    if (searchText) {
      url = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/admin/users?search=${searchText}&page=${page}&rowsPerPage=${number}`;
    }
    return handleApiCall(url);
  };

  const propsData = {
    columns: ["Name", "Email", "Role", "Phone", "Created At", "Updated At", ""],
    rowsPerPage: rowsPerPage,
    // info: {
    //   data: users,
    //   meta: {
    //     total: users?.length,
    //     page: page,
    //   },
    // },
    info: users,
    handleChangePage: handleChangePage,
    handleChangeRowsPerPage: handleChangeRowsPerPage,
    height: "calc(100vh - 250px)",
    msg: "No matching Users",
    subMsg: "We could not find any Users matching your search",
  };

  // const handleEdit = () => {
  //   setAnchorEl(null);
  // };
  const handleBlock = () => {
    setAnchorEl(null);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/block-user`, {
        user_id: fieldId,
      })
      .then((res) => {
        handleApiCall();
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
    setFieldId("");
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setAnchorEl(null);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/delete-user`, {
        user_id: fieldId,
      })
      .then((res) => {
        handleApiCall();
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
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
      {
        displayName: isRestrictedUser ? "Unblock" : "Block",
        disable: false,
        handlerFunc: handleBlock,
        icon: <BlockIcon />,
      },
    ],
  };
  const handleMenu = (
    event: React.ChangeEvent<HTMLInputElement>,
    _id: string,
    item: any
  ) => {
    setAnchorEl(event.currentTarget);
    setFieldId(_id);
    setIsRestrictedUser(item.isRestricted);
  };

  const menuProps = {
    anchorEl,
    setAnchorEl,
    open,
    handleMenu,
    menuItems,
  };
  const handleSearchText = (inputText: React.SetStateAction<string>) => {
    setSearchText(inputText);
    setIsSearchTextAdded(true);
  };

  const handleApiCall = (url?: string) => {
    dispatch(setProgress({ progress: 10 }));
    let URL = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/admin/users?page=${page}&rowsPerPage=${rowsPerPage}`;
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
        setUsers(res?.data?.data);
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

  const call = useCallback(Debounce(handleApiCall, 500), []);
  useEffect(() => {
    if (isSearchTextAdded) {
      setPage(1);
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/admin/users?search=${searchText}&page=1&rowsPerPage=${rowsPerPage}`;
      call(url);
    } else {
      handleApiCall();
    }
  }, [searchText]);
  return (
    <Stack
      direction="column"
      gap={1}
      sx={{
        padding: "5px 20px",
        marginTop: "50px",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <SearchInput
            changeAction={handleSearchText}
            searchValue={searchText}
            placeholder="Search by Name"
          />
        </Stack>
        <Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setAdminDrawer(true);
            }}
          >
            Admin
          </Button>
        </Stack>
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
            users?.data?.map((user: any) => {
              const updatedMenuProps = {
                ...menuProps,
                item: user,
              };
              return (
                <TableRow
                  key={user._id}
                  sx={{
                    ...tableBorderStyles,
                    backgroundColor: user?.isRestricted
                      ? "antiquewhite"
                      : "inherit",
                  }}
                >
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user?.email || "_"}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {user?.role.sort().join(",")}
                  </TableCell>
                  <TableCell>{user?.phone}</TableCell>
                  <TableCell>{dayjs(user?.createdAt).format("LLL")}</TableCell>
                  <TableCell>{dayjs(user?.updatedAt).format("LLL")}</TableCell>
                  <TableCell>
                    <CommonMenu {...updatedMenuProps} />
                  </TableCell>
                </TableRow>
              );
            })}
        </CommonTable>
      </Stack>
      <CustomDrawer
        open={adminDrawer}
        handleClose={() => setAdminDrawer(false)}
        title="Add Admin"
        width="380px"
      >
        <AddAdmin
          handleClose={() => setAdminDrawer(false)}
          handleApiCall={handleApiCall}
        />
      </CustomDrawer>
    </Stack>
  );
};

export default UsersList;
