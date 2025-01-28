import { Stack, Typography } from "@mui/material";

type NoDataProps = {
  text: string;
  subText?: string;
  isFilterApplied?: boolean;
  isSubTabs?: boolean;
};

export const NoData = (props: NoDataProps) => {
  const { text, subText, isFilterApplied = false, isSubTabs = false } = props;

  return (
    <Stack
      gap={1}
      justifyContent="center"
      alignItems="center"
      sx={{
        ...(!isSubTabs
          ? {
              position: "absolute",
              transform: "translate(-50%, -50%)",
              top: isFilterApplied ? "57%" : "50%",
              left: "50%",
            }
          : {}),
      }}
    >
      <Typography
        sx={{
          fontSize: "26px",
        }}
      >
        {text}
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "text.secondary",
        }}
      >
        {subText}
      </Typography>
    </Stack>
  );
};
