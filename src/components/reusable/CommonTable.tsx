/* eslint-disable no-nested-ternary */
/* eslint-disable  @typescript-eslint/no-unused-vars */
import React from "react";
// import classNames from 'classnames';
import {
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  Typography,
  Checkbox,
  Stack,
  Divider,
  tablePaginationClasses,
  TablePagination,
  SxProps,
  Theme,
} from "@mui/material";
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import TableSortLabel from "@mui/material/TableSortLabel";
import { makeStyles } from "@mui/styles";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
// import { canUserApprove } from 'utils/util';
// import { useGetUserRole } from 'hooks/useGetUserRole';
// import { PoweredBy } from "components/Layout/icons";
// import { MuiHtmlTooltip } from "components/reusable/MuiHTMLToolTip";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import { DragDropContext, Droppable } from "react-beautiful-dnd";
import theme from "../../theme";
import { Loading } from "./Loading";
// import { ErrorComp } from './ErrorComp';

const useStyles = makeStyles(() => ({
  tHeader: {
    position: "relative",
    "& .MuiTableCell-stickyHeader": {
      backgroundColor: "#ffffff",
      lineHeight: 1.2,
    },
  },
  table: {
    minWidth: 650,
  },
  noData: {
    margin: 10,
    padding: "10px",
    backgroundColor: "#f3f3f3 !important ",
  },
  container: {
    backgroundColor: "#ffffff",
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: "6px",
  },
}));

type ITable = {
  // columns:
  //   | string[]
  //   | {
  //       name: string;
  //       align: 'left' | 'right' | 'inherit' | 'center' | 'justify';
  //     }[];
  columns: any;
  children: React.ReactNode | React.ReactNode[];
  info?: {
    code?: number;
    data: object[];
    meta:
      | {
          limit: number;
          page: number;
          total: number;
        }
      | any;
    error?: boolean;
    message?: string;
  };
  handleChangePage?: any;
  handleChangeRowsPerPage?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  rowsPerPage: number;
  msg?: string;
  subMsg?: string;
  loading?: boolean;
  order?: number;
  sortBy?: string;
  onRequestSort?: (arg0: string) => void;
  includingHeaderList?: string[];
  showCheckbox?: boolean;
  rowCount?: number;
  numSelected?: number;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFromRules?: boolean;
  isFilterApplied?: boolean;
  height?: string;
  isFilterAppliedHeight?: string;
  autoSuggestApprove?: boolean;
  fromFacetsCuration?: boolean;
  fromModelConfiguration?: boolean;
  hideLogo?: boolean;
  sx?: SxProps<Theme>;
  rowsPerPageOptions?: number[];
  headerColor?: string;
  handleDrag?: any;
  showDragIndicator?: boolean;
  fromOnboardingFlow?: boolean;
  ifPageEqualZero?: boolean;
  isItFromConfigAutoSuggest?: boolean;
  width?: string;
  isFromFacetOnboarding?: boolean;
  isPaginationNotNeeded?: boolean;
};

export const CommonTable = (props: ITable) => {
  const {
    columns,
    children,
    info,
    rowsPerPage,
    msg,
    subMsg,
    handleChangePage,
    handleChangeRowsPerPage,
    loading,
    height,
    order,
    sortBy,
    onRequestSort,
    includingHeaderList,
    showCheckbox,
    rowCount,
    numSelected,
    onSelectAllClick,
    isFromRules,
    isFilterApplied = false,
    isFilterAppliedHeight,
    autoSuggestApprove,
    fromFacetsCuration,
    fromModelConfiguration,
    // hideLogo = false,
    sx = {},
    rowsPerPageOptions = [25, 50, 75],
    headerColor,
    // handleDrag,
    showDragIndicator,
    // fromOnboardingFlow,
    // ifPageEqualZero,
    isItFromConfigAutoSuggest,
    // width,
    isFromFacetOnboarding,
    // isPaginationNotNeeded,
  } = props;
  const classes = useStyles(theme);
  const page = info?.meta?.pagination?.page || 1;
  const sortHandler = (currentSortSelection: string) => {
    return onRequestSort ? onRequestSort(currentSortSelection) : null;
  };

  return (
    <Stack
      sx={{
        width: "-webkit-fill-available",
      }}
      spacing={0.5}
    >
      <TableContainer
        className={fromModelConfiguration ? undefined : classes.container}
        sx={{
          height:
            isFilterApplied || autoSuggestApprove
              ? isFilterAppliedHeight || "calc(100vh - 245px)"
              : isItFromConfigAutoSuggest || isFromFacetOnboarding
              ? "calc(100vh - 275px)"
              : height || "calc(100vh - 190px)",
          ...(fromFacetsCuration || fromModelConfiguration
            ? {
                marginTop: fromModelConfiguration ? "0px" : "-10px",
                border: "none",
              }
            : {
                backgroundColor: "#ffffff",
                border: `1px solid ${theme.palette.grey[300]}`,
                borderRadius: "6px",
              }),
          ...sx,
          // "&::-webkit-scrollbar": {
          //   width: "8px",
          //   height: "8px",
          // },
          // "&::-webkit-scrollbar-track": {
          //   background: "transparent",
          // },
          // "&::-webkit-scrollbar-thumb": {
          //   backgroundColor: "pink",
          //   borderRadius: "10px",
          //   border: "2px solid transparent",
          //   backgroundClip: "content-box",
          // },
          // scrollbarWidth: "thin",
          // scrollbarColor: "pink transparent",
          scrollbarWidth: "thin",
          scrollbarColor: "#1467c6 transparent",
          // "&::-webkit-scrollbar": {
          //   width: "8px",
          //   height: "8px",
          // },
          // "&::-webkit-scrollbar-track": {
          //   background: "transparent",
          // },
          // "&::-webkit-scrollbar-thumb": {
          //   background: "linear-gradient(top to bottom, #0a192f, #1467c6)",
          //   borderRadius: "10px",
          //   border: "2px solid transparent",
          //   backgroundClip: "content-box",
          // },
        }}
      >
        {/* <DragDropContext onDragEnd={(results) => handleDrag(results)}> */}
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            minWidth: fromFacetsCuration ? 220 : 650,
          }}
          size="small"
        >
          <TableHead
            className={classes.tHeader}
            sx={{
              ...(headerColor && {
                "& .MuiTableCell-stickyHeader": {
                  backgroundColor: `${headerColor} !important`,
                },
              }),
            }}
          >
            <TableRow>
              {showCheckbox && (
                <TableCell padding="checkbox">
                  {isFromRules ? (
                    <></>
                  ) : (
                    <Checkbox
                      color="primary"
                      onChange={onSelectAllClick}
                      checked={
                        rowCount
                          ? rowCount > 0 && numSelected === rowCount
                          : false
                      }
                    />
                  )}
                </TableCell>
              )}
              {showDragIndicator && (
                <TableCell>
                  <DragIndicatorIcon
                    sx={{ color: theme.palette.secondary.main }}
                  />
                </TableCell>
              )}
              {columns.map((item: any, index: number) => {
                return (
                  <React.Fragment key={String(index)}>
                    {typeof item === "string" ? (
                      <TableCell sx={{ horizontalAlign: "center" }}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          {includingHeaderList?.includes(item) ? (
                            <TableSortLabel
                              active={sortBy === item}
                              direction={order === -1 ? "desc" : "asc"}
                              onClick={() => sortHandler(item)}
                            >
                              <Typography fontWeight={600} fontSize="14px">
                                {item}
                              </Typography>
                            </TableSortLabel>
                          ) : (
                            // <>
                            //   {item ? (
                            //     <Typography fontWeight={600} fontSize="14px">
                            //       {item}
                            //     </Typography>
                            //   ) : (
                            //     <MoreVertIcon
                            //       sx={{ color: theme.palette.grey[600] }}
                            //     />
                            //   )}
                            // </>
                            <>
                              <Typography fontWeight={600} fontSize="14px">
                                {item}
                              </Typography>
                            </>
                          )}
                          <>
                            {index + 1 !== columns.length && (
                              <Divider
                                orientation="vertical"
                                sx={{
                                  height: "20px",
                                  borderRight: `1px solid ${theme.palette.grey[300]}`,
                                  // m: 1,
                                }}
                              />
                            )}
                          </>
                        </Stack>
                      </TableCell>
                    ) : (
                      <TableCell align={item?.align} sx={{ p: item?.p }}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          {includingHeaderList?.includes(item?.label) ? (
                            <TableSortLabel
                              active={sortBy === item?.label}
                              direction={order === -1 ? "desc" : "asc"}
                              onClick={() => sortHandler(item?.label)}
                            >
                              <Typography fontWeight={600} fontSize="14px">
                                {item?.label}
                              </Typography>
                            </TableSortLabel>
                          ) : (
                            // <>
                            //   {item?.name ? (
                            //     <Typography fontWeight={600} fontSize="14px">
                            //       {item?.name}
                            //     </Typography>
                            //   ) : (
                            //     <MoreVertIcon
                            //       sx={{ color: theme.palette.grey[600] }}
                            //     />
                            //   )}
                            // </>
                            <>
                              <Typography
                                fontWeight={600}
                                fontSize="14px"
                                sx={{
                                  display: "flex",
                                  gap: "0.5rem",
                                  alignItems: "center",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {item.label}
                                {/* {item?.helperTextRequired && (
                                  <MuiHtmlTooltip
                                    title={
                                      <Typography fontSize="13px">
                                        {item?.helperText}
                                      </Typography>
                                    }
                                  >
                                    <InfoOutlinedIcon
                                      sx={{
                                        color: theme.palette.grey[500],
                                        fontSize: "14px",
                                        marginTop: "3px",
                                      }}
                                    />
                                  </MuiHtmlTooltip>
                                )} */}
                              </Typography>
                            </>
                          )}
                          <>
                            {index + 1 !== columns.length && (
                              <Divider
                                orientation="vertical"
                                sx={{
                                  height: "20px",
                                  borderRight: `1px solid ${theme.palette.grey[300]}`,
                                  m: 1,
                                }}
                              />
                            )}
                          </>
                        </Stack>
                      </TableCell>
                    )}
                  </React.Fragment>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody
            // ref={provided.innerRef}
            // {...provided.droppableProps}
            data-testid="tbody"
          >
            {children}
          </TableBody>
          {/* <Droppable droppableId="tablebody">
            {(provided) => (
              <TableBody
                ref={provided.innerRef}
                {...provided.droppableProps}
                data-testid="tbody"
              >
                {children}
              </TableBody>
            )}
          </Droppable> */}
        </Table>
        {/* </DragDropContext> */}
        {info?.data?.length === 0 && !loading && msg && (
          <Typography
            variant="body2"
            data-testid="message"
            component={Stack}
            alignItems="center"
            justifyContent="center"
            sx={{
              // height: window.innerHeight * 0.6,
              height: "90%",
              // fontSize: "13px",
              fontSize: "26px",
              fontWeight: 400,
            }}
          >
            {msg}
            <Typography
              sx={{
                fontSize: "14px",
                color: "text.secondary",
              }}
            >
              {subMsg}
            </Typography>
          </Typography>
        )}
      </TableContainer>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            sx={{
              [`& .${tablePaginationClasses.actions}`]: {
                color: theme.palette.primary.main,
              },
              [`& .${tablePaginationClasses.displayedRows}`]: {
                fontWeight: 600,
              },
            }}
            component={Stack}
            count={info?.meta?.pagination?.total || 0}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
        <Stack
          sx={{
            justifyContent: "center",
            marginRight: "2rem",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              padding: "10px",
              background: "linear-gradient(to right, #0a192f, #1467c6)",
              color: "white",
              fontSize: "14px",
              borderRadius: "20px",
            }}
          >
            Total Sales: {loading ? <Loading /> : `₹${info?.meta?.totalSales}`}
          </Typography>
        </Stack>
      </Stack>
      {/* {!isFromFacetOnboarding && !isPaginationNotNeeded && (
        <Stack direction="row" justifyContent="space-between">
          <Stack
            sx={{
              ...(fromFacetsCuration && {
                position: "absolute",
                left: "0",
                bottom: "0",
              }),
            }}
          >
            {((!ifPageEqualZero && info?.meta && page && rowsPerPage) ||
              (info?.meta && rowsPerPage)) && (
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                sx={{
                  [`& .${tablePaginationClasses.actions}`]: {
                    color: theme.palette.secondary.main,
                  },
                  [`& .${tablePaginationClasses.displayedRows}`]: {
                    fontWeight: 600,
                  },
                }}
                component={Stack}
                count={
                  fromFacetsCuration
                    ? info?.meta?.pagination?.totalProducts
                    : info?.meta?.total
                }
                page={!ifPageEqualZero ? page - 1 : page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </Stack>
        </Stack>
      )} */}
    </Stack>
  );
};
