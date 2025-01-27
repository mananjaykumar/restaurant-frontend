import React from "react";
import { Stack, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import toast from "react-hot-toast";
import { setProgress } from "../../../store/slices/ProgressSlice";
import { useDispatch } from "react-redux";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AdminBanner = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [bannerState, setBannerState] = React.useState({
    title: "",
    description: "",
    selectedFile: {
      name: "",
    },
  });
  const acceptedFiles = [".jpg", ".png", ".jpeg"];

  const handleSubmit = () => {
    dispatch(setProgress({ progress: 10 }));
    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/uploads/banner`,
        {
          title: bannerState.title,
          description: bannerState.description,
          banner: bannerState.selectedFile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        dispatch(setProgress({ progress: 30 }));
        toast.success(res?.data?.message);
        dispatch(setProgress({ progress: 70 }));
        setBannerState({
          title: "",
          description: "",
          selectedFile: {
            name: "",
          },
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
            Upload Banner
          </Typography>
        </Stack>
        <Stack sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            autoFocus
            variant="outlined"
            label="Title*"
            value={bannerState.title}
            onChange={(e) => {
              setBannerState((prev) => {
                return {
                  ...prev,
                  title: e.target.value,
                };
              });
            }}
          />
          <TextField
            variant="outlined"
            label="Description*"
            value={bannerState.description}
            onChange={(e) => {
              setBannerState((prev) => {
                return {
                  ...prev,
                  description: e.target.value,
                };
              });
            }}
          />
          <Stack direction="row" alignItems="center" gap="0.5rem">
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ width: "fit-content" }}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                name="photo"
                accept={acceptedFiles.join(",")}
                onChange={(event) => {
                  setBannerState((prev: any) => {
                    return {
                      ...prev,
                      selectedFile: event.target.files && event.target.files[0],
                    };
                  });
                }}
              />
            </Button>
            {bannerState.selectedFile && (
              <Typography>{bannerState?.selectedFile?.name}</Typography>
            )}
          </Stack>
        </Stack>
        <Stack>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              "&:hover": {
                backgroundColor: "#FC8019",
              },
              "&.Mui-disabled": {
                backgroundColor: "#f3f3f3",
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

export default AdminBanner;
