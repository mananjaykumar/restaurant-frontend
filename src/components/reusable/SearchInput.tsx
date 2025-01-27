import * as React from "react";
import { OutlinedInput, SxProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import theme from "../../theme";
interface SearchProps {
  changeAction: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  placeholder?: string;
  onKeyUp?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  fromFacetsCuration?: boolean;
  disabled?: boolean;
}

export const borderStyles = {
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: "6px",
};

export const inputStyles: SxProps = {
  bgcolor: "#fff",
  color: "inherit",
  ...borderStyles,
  textTransform: "none",
  fontWeight: "normal",
  height: theme.spacing(4.5),
  minWidth: "280px",
  "& .MuiInputBase-input": {
    margin: theme.spacing(0, 1),
  },
  "& fieldset": {
    border: 0,
  },
  "&:hover": {
    bgcolor: "#fff",
    color: "inherit",
    borderColor: theme.palette.grey[400],
  },
  padding: theme.spacing(2, 1),
};

const SearchInput = (props: SearchProps) => {
  const {
    changeAction,
    searchValue,
    placeholder = "Search for a word",
    onKeyUp,
    fromFacetsCuration,
    disabled,
  } = props;
  return (
    <>
      <OutlinedInput
        value={searchValue}
        onChange={(e) => changeAction(e.target.value)}
        autoComplete="off"
        placeholder={placeholder}
        disabled={disabled}
        startAdornment={<SearchIcon sx={{ color: theme.palette.grey[500] }} />}
        endAdornment={
          searchValue && (
            <ClearIcon
              sx={{
                color: theme.palette.grey[500],
                cursor: "pointer",
              }}
              onClick={() => changeAction("")}
            />
          )
        }
        onKeyUp={onKeyUp}
        sx={{
          ...inputStyles,
          "&:hover": {
            borderColor: disabled ? "none" : theme.palette.grey[400],
          },
          ...(fromFacetsCuration && {
            minWidth: "",
          }),
        }}
        autoFocus
      />
    </>
  );
};

export default SearchInput;
