import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import AdjustIcon from "@mui/icons-material/Adjust";
import { Button, Divider, Grid, Stack, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function CustomAccordion(props: any) {
  const navigate = useNavigate();
  const { item } = props;
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion
      expanded={expanded === item._id}
      onChange={handleChange(item._id)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Tooltip title={item._id}>
          <Typography
            sx={{
              width: "33%",
              flexShrink: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Order #{item._id}
          </Typography>
        </Tooltip>
        <Typography
          sx={{
            color: "text.secondary",
            // whiteSpace: "nowrap",
            // overflow: "hidden",
            // textOverflow: "ellipsis",
          }}
        >
          {item.address || "N/A"} ({dayjs(item.createdAt).format("LLL")})
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Grid container direction="row" justifyContent="space-between">
          <Grid item spacing={1}>
            {item.products.map((product: any) => (
              <Stack>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "2rem",
                  }}
                >
                  <Stack>
                    <img
                      src={`data:image/${product.item.img.contentType};base64,${product.item.img.data}`}
                      alt={product.item.img.contentType}
                      style={{ height: "100px", width: "100px" }}
                    />
                  </Stack>
                  <Stack>
                    <Typography sx={{ fontSize: "14px" }}>
                      {product.item.title} x {product.quantity}
                    </Typography>
                    <Typography sx={{ fontSize: "10px", color: "#7d879c" }}>
                      &#8377; {product.item.discountedPrice} x{" "}
                      {product.quantity}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "error.main",
                      }}
                    >
                      &#8377; {product.quantity * product.item.discountedPrice}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Grid>
          {item.status === "COMPLETED" ? (
            <Grid
              item
              direction="row"
              alignItems="flex-start"
              sx={{ display: "flex", gap: "0.3rem" }}
            >
              <Typography
                sx={{ color: "#686b78", marginTop: "2px", fontSize: "12px" }}
              >
                DELIVERED on {dayjs(item.updatedAt).format("LLL")}
              </Typography>
              <CheckCircleOutlineIcon
                sx={{ color: "#60b246" }}
                fontSize="small"
              />
            </Grid>
          ) : item.status === "CANCELLED" ? (
            <Grid
              item
              direction="row"
              alignItems="flex-start"
              sx={{ display: "flex", gap: "0.3rem" }}
            >
              <Typography
                sx={{ color: "#686b78", marginTop: "2px", fontSize: "12px" }}
              >
                {item.status} on {dayjs(item.updatedAt).format("LLL")}
              </Typography>
              <CancelIcon sx={{ color: "red" }} fontSize="small" />
            </Grid>
          ) : (
            <Grid
              item
              direction="row"
              alignItems="flex-start"
              sx={{ display: "flex", gap: "0.3rem" }}
            >
              <Typography
                sx={{
                  color: "#686b78",
                  marginTop: "2px",
                  fontSize: "12px",
                  textTransform: "capitalize",
                }}
              >
                {item.status.split("_").join(" ").toUpperCase()}
              </Typography>
              <AdjustIcon sx={{ color: "#F29339" }} fontSize="small" />
            </Grid>
          )}
        </Grid>
        {item.status !== "CANCELLED" && (
          <Stack>
            <Divider sx={{ borderStyle: "dotted" }} />
            <Stack>
              <Typography sx={{ textAlign: "right", color: "#686b78" }}>
                Total Paid: &#8377; {item.amount}
              </Typography>
            </Stack>
          </Stack>
        )}
        <Stack
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              backgroundColor: "#FC8019",
              "&:hover": {
                backgroundColor: "#FC8019",
              },
              "&.Mui-disabled": {
                backgroundColor: "#f3f3f3",
              },
            }}
            onClick={() => {
              navigate(`/user/order/${item._id}`);
            }}
          >
            Track Order
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
