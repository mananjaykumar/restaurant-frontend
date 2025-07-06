import React from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { setProgress } from "../../../store/slices/ProgressSlice";
import { useDispatch } from "react-redux";

const AddAdminSubCategory = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [subCategoryState, setSubCategoryState] = React.useState({
    name: "",
  });

  const handleSubmit = () => {
    dispatch(setProgress({ progress: 10 }));
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/add-subCategory`, {
        name: subCategoryState.name,
      })
      .then((res) => {
        dispatch(setProgress({ progress: 30 }));
        toast.success(res?.data?.message);
        dispatch(setProgress({ progress: 70 }));
        setSubCategoryState((prev) => {
          return {
            ...prev,
            name: "",
          };
        });
        setLoading(false);
        dispatch(setProgress({ progress: 100 }));
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setLoading(false);
        dispatch(setProgress({ progress: 100 }));
      });
  };
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
      }}
    >
      <Stack
        sx={{
          margin: { sm: "0px 64px", xs: "0px 20px", md: "64px 192px" },
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        <Stack>
          <Typography fontFamily="Basis Grotesque Pro" fontSize="25px">
            Add Sub Category
          </Typography>
        </Stack>
        <Stack sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            autoFocus
            variant="outlined"
            label="Sub Category*"
            value={subCategoryState.name}
            disabled={loading}
            onChange={(e) => {
              setSubCategoryState((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              });
            }}
          />
        </Stack>
        <Stack>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              background: "linear-gradient(to right, #0a192f, #1467c6)",
              "&:hover": {
                // backgroundColor: "#FC8019",
                background:
                  "linear-gradient(to right,rgb(128, 157, 201), #1467c6)",
              },
              "&.Mui-disabled": {
                background: "#f3f3f3 !important",
              },
            }}
          >
            {loading ? "Loading ..." : "Submit"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AddAdminSubCategory;
