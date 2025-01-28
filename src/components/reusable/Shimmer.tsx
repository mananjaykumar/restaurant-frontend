import { Skeleton, TableCell, TableRow } from "@mui/material";
import theme from "../../theme";

export const tableBorderStyles = {
  "& td": {
    borderBottom: `1px dashed ${theme.palette.grey[200]}`,
  },
  "&.MuiTableRow-hover:hover": {
    backgroundColor: theme.palette.primary.light,
  },
  cursor: "pointer",
};

export const Shimmer = ({
  length,
  colsWidth,
}: {
  length: number;
  colsWidth?: string[];
}) => {
  return (
    <TableRow sx={{ ...tableBorderStyles }}>
      {Array.from(Array(length).keys()).map((item) => (
        <TableCell
          key={item}
          width={colsWidth && colsWidth[item]}
          sx={{ verticalAlign: "top" }}
        >
          <Skeleton animation="wave" width="100%" height={25} />
          <br />
          <Skeleton animation="wave" width="100%" height={25} />
        </TableCell>
      ))}
    </TableRow>
  );
};
