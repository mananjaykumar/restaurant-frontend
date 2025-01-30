/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react";
import { Stack, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { makeStyles } from "@mui/styles";
import theme from "../../theme";
import { Loading } from "./Loading";
import axios from "axios";
import toast from "react-hot-toast";

const useStyles = makeStyles(() => ({
  listbox: {
    padding: "5px !important",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.6),
    maxHeight: "200px !important",
  },
  option: {
    backgroundColor: theme.palette.grey[100],
    borderRadius: "4px",
    fontSize: "13px",
    "&:hover": {
      backgroundColor: `${theme.palette.primary.light} !important`,
    },
    minHeight: "34px !important",
  },
  searchInput: {
    backgroundColor: "#fff",
    color: "inherit",
    border: `1px solid ${theme.palette.grey[300]} !important`,
    borderRadius: "6px",
    textTransform: "none",
    fontWeight: "normal",
    height: theme.spacing(4.5),
    minWidth: "280px",
    "& fieldset": {
      border: 0,
    },
    "&:hover": {
      bgcolor: "#fff",
      color: "inherit",
      borderColor: `${theme.palette.grey[400]} !important`,
    },
  },
}));

interface IAutocompleteInputProps {
  inputValue: string;
  setInputValue: (name: string) => void;
  onClear: () => void;
  attributes: any[];
  placeHolder?: string;
  attributeType?: string;
  paramAttribute?: any;
  suggestionType?: "schema" | "computed" | "audience" | "grouping";
  handlePosnChange?: () => void;
  width?: string;
}

export const AutocompleteInput = (props: IAutocompleteInputProps) => {
  const {
    inputValue,
    setInputValue,
    onClear,
    attributes,
    placeHolder,
    // attributeType,
    // paramAttribute = {},
    // suggestionType,
    handlePosnChange,
    width,
  } = props;
  const classes = useStyles(theme);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  //   const { getSearchSchemaSuggestions } = useSelector(
  //     (state: StoreType) => state.schemaAttributesReducer
  //   );
  const [searchData, setSearchData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);

  // frontend search
  useEffect(() => {
    if (searchText) {
      if (searchText) {
        setFilteredData(
          searchData.filter((data: string) =>
            data.toLowerCase().includes(searchText.toLowerCase())
          )
        );
      } else {
        // Reset to original options when the input is cleared
        setFilteredData(searchData);
      }
    }
  }, [searchText, searchData]);

  const handleApiCall = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/id`)
      .then((res) => {
        setSearchData(res?.data?.data);
        setFilteredData(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
    // dispatch(
    //   schemaAttributesDataAction(GET_SEARCH_SCHEMA_SUGGESTIONS, {
    //     params: fetchData,
    //   })
    // );
  };

  useEffect(() => {
    handleApiCall();
    // handleApiCall({
    //   ...(attributeType
    //     ? {
    //         [attributeType]: true,
    //         ...paramAttribute,
    //       }
    //     : {
    //         ...paramAttribute,
    //       }),
    //   ...(suggestionType ? { suggestion: suggestionType } : {}),
    // });
  }, []);

  //   useEffect(() => {
  //     if (getSearchSchemaSuggestions.loaded) {
  //       setSearchData(getSearchSchemaSuggestions?.data?.data);
  //     }
  //   }, [getSearchSchemaSuggestions]);

  console.log("inputValue", inputValue);
  console.log("searchText", searchText);
  console.log("searchData", searchData);
  console.log("loading", loading);

  return (
    <>
      <Autocomplete
        disableClearable
        classes={{
          listbox: classes.listbox,
          option: classes.option,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            padding: "0 8px !important",
          },
        }}
        value={inputValue}
        onChange={(_event: any, newValue: string | null) => {
          setInputValue(newValue || "");
        }}
        inputValue={searchText}
        onInputChange={(_event, newInputValue) => {
          setSearchText(newInputValue);
          if (handlePosnChange) {
            handlePosnChange();
          }
        }}
        options={
          //   getSearchSchemaSuggestions?.loaded && searchData?.length > 0
          //     ? searchData?.reduce((acc: any, item: any) => {
          //         if (
          //           !attributes.find(
          //             (attribute) => attribute?.name === item?.name
          //           )
          //         ) {
          //           acc.push(item.name);
          //         }
          //         return acc;
          //       }, [])
          //     : []
          loading ? [] : filteredData // Show empty options while loading
        }
        noOptionsText={
          //   getSearchSchemaSuggestions.loaded && searchData?.length === 0 ? (
          //     "No records found"
          //   ) : (
          //     <Stack direction="row" spacing={1}>
          //       <span>
          //         <Loading />
          //       </span>
          //       <span>Loading...</span>
          //     </Stack>
          //   )
          loading ? (
            <Stack direction="row" spacing={1}>
              <span>
                <Loading />
              </span>
              <span>Loading...</span>
            </Stack>
          ) : (
            filteredData?.length === 0 && "No records found"
          )
        }
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeHolder || "Search attribute to boost"}
            InputProps={{
              ...params.InputProps,
              endAdornment:
                (searchText || inputValue) && attributes?.length >= 1 ? (
                  <ClearIcon
                    fontSize="small"
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      onClear();
                      setInputValue("");
                      setSearchText("");
                    }}
                  />
                ) : (
                  <SearchIcon sx={{ color: theme.palette.grey[500] }} />
                ),
            }}
            classes={{ root: classes.searchInput }}
            sx={{
              width: width || "100%",
            }}
          />
        )}
      />
    </>
  );
};
