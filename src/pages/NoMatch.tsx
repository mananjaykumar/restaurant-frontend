import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles, createStyles } from "@mui/styles";
import { Grid, Typography, Theme, Button } from "@mui/material";
// import { ROOT } from "../routes/constants";
import theme from "../theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text404: {
      fontSize: `${
        1.25 * 1.25 * 1.25 * 1.25 * 1.25 * 1.25 * 1.25 * 1.25 * 1.25 * 1.25
      }rem`,
      fontWeight: 800,
      lineHeight: 1.2,
    },
    text2: {
      fontWeight: 600,
    },
    text3: {
      color: theme.palette?.text?.secondary,
    },
  })
);

export const NoMatch: React.FC = () => {
  const classes = useStyles(theme);
  const navigate = useNavigate();

  return (
    <Grid container rowSpacing={2} direction="column" alignItems="center" p={2}>
      <Grid item>
        <Grid
          className={classes.text404}
          color="primary"
          data-testid="page_not_found"
        >
          <b>404</b>
        </Grid>
      </Grid>
      <Grid item>
        <Typography className={classes.text2}>Oops! Page not found</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.text3} textAlign="center">
          We are sorry. The page you are requesting does not exist.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          disableElevation
          sx={{
            // padding: '16px',
            fontWeight: 600,
            // letterSpacing: '0.125em',
          }}
          onClick={() => navigate("/")}
          data-testid="backBtn"
        >
          Return to Application
        </Button>
      </Grid>
    </Grid>
  );
};
