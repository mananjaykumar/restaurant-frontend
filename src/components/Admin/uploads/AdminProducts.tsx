import React from "react";
import {
  Stack,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import toast from "react-hot-toast";
import { setProgress } from "../../../store/slices/ProgressSlice";
import { useDispatch } from "react-redux";
import theme from "../../../theme";

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

const AdminProducts = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [mostLovedState, setMostLovedState] = React.useState({
    title: "",
    originalPrice: "",
    discountedPrice: "",
    rating: "",
    discount: "",
    category: "",
    subCategory: "",
    selectedFile: {
      name: "",
    },
  });
  const acceptedFiles = [".jpg", ".png", ".jpeg"];
  const [categoryLoading, setCategoryLoading] = React.useState(false);
  const [subCategoryLoading, setSubCategoryLoading] = React.useState(false);
  const [categoryState, setCategoryState] = React.useState([]);
  const [subCategoryState, setSubCategoryState] = React.useState([]);

  const handleSubmit = () => {
    dispatch(setProgress({ progress: 10 }));
    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/uploads/most-loved`,
        {
          title: mostLovedState.title,
          originalPrice: mostLovedState.originalPrice,
          discountedPrice: mostLovedState.discountedPrice,
          rating: mostLovedState.rating,
          discount: mostLovedState.discount,
          category: mostLovedState.category,
          subCategory: mostLovedState.subCategory,
          mostLoved: mostLovedState.selectedFile,
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
        setMostLovedState({
          title: "",
          originalPrice: "",
          discountedPrice: "",
          rating: "",
          discount: "",
          category: "",
          subCategory: "",
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

  const handleChange = (event: SelectChangeEvent) => {
    setMostLovedState((prev) => {
      return {
        ...prev,
        category: event.target.value as string,
      };
    });
  };
  const handleChangeSubCategory = (event: SelectChangeEvent) => {
    setMostLovedState((prev) => {
      return {
        ...prev,
        subCategory: event.target.value as string,
      };
    });
  };

  const fetchCategories = () => {
    setCategoryLoading(true);
    setSubCategoryLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/categories`)
      .then((res) => {
        fetchSubCategories();
        setCategoryState(res?.data?.data);
        setCategoryLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setCategoryLoading(false);
      });
  };
  const fetchSubCategories = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/sub-categories`)
      .then((res) => {
        setSubCategoryState(res?.data?.data);
        setSubCategoryLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setSubCategoryLoading(false);
      });
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);
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
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          // height: "450px",
          // overflow: "auto",
          // "::-webkit-scrollbar": {
          //   display: "none",
          // },
        }}
      >
        <Stack>
          <Typography fontFamily="Basis Grotesque Pro" fontSize="25px">
            Upload Products
          </Typography>
        </Stack>
        <Stack sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            autoFocus
            variant="outlined"
            label="Title*"
            value={mostLovedState.title}
            onChange={(e) => {
              setMostLovedState((prev: any) => {
                return {
                  ...prev,
                  title: e.target.value,
                };
              });
            }}
          />
          <TextField
            variant="outlined"
            label="Original Price*"
            type="Number"
            value={mostLovedState.originalPrice}
            onChange={(e) => {
              setMostLovedState((prev: any) => {
                return {
                  ...prev,
                  originalPrice: e.target.value,
                };
              });
            }}
          />
          <TextField
            variant="outlined"
            label="Discounted Price*"
            type="Number"
            value={mostLovedState.discountedPrice}
            onChange={(e) => {
              setMostLovedState((prev: any) => {
                return {
                  ...prev,
                  discountedPrice: e.target.value,
                };
              });
            }}
          />
          <TextField
            variant="outlined"
            label="Rating*"
            type="Number"
            value={mostLovedState.rating}
            onChange={(e) => {
              setMostLovedState((prev: any) => {
                return {
                  ...prev,
                  rating: e.target.value,
                };
              });
            }}
          />
          <TextField
            variant="outlined"
            label="Discount%*"
            type="Number"
            value={mostLovedState.discount}
            onChange={(e) => {
              setMostLovedState((prev: any) => {
                return {
                  ...prev,
                  discount: e.target.value,
                };
              });
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {categoryLoading ? "Loading..." : "Category"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mostLovedState.category}
              label={categoryLoading ? "Loading" : "Category"}
              onChange={handleChange}
              disabled={categoryLoading}
              MenuProps={{
                PaperProps: {
                  sx: {
                    "& .MuiList-root": {
                      padding: "5px",
                      display: "flex",
                      flexDirection: "column",
                      gap: theme.spacing(0.6),
                    },
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
              {categoryState?.map((item: any) => {
                return (
                  <MenuItem value={item?._id} key={item?._id}>
                    {item?.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {subCategoryLoading ? "Loading..." : "Sub Category"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mostLovedState.subCategory}
              label={subCategoryLoading ? "Loading" : "Sub Category"}
              onChange={handleChangeSubCategory}
              disabled={subCategoryLoading}
              MenuProps={{
                PaperProps: {
                  sx: {
                    "& .MuiList-root": {
                      padding: "5px",
                      display: "flex",
                      flexDirection: "column",
                      gap: theme.spacing(0.6),
                    },
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
              {subCategoryState?.map((item: any) => {
                return (
                  <MenuItem value={item?._id} key={item?._id}>
                    {item?.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

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
                  setMostLovedState((prev: any) => {
                    return {
                      ...prev,
                      selectedFile: event.target.files && event.target.files[0],
                    };
                  });
                }}
              />
            </Button>
            {mostLovedState.selectedFile && (
              <Typography>{mostLovedState?.selectedFile?.name}</Typography>
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

export default AdminProducts;
