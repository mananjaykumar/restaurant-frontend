/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  StepIconProps,
} from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import ElectricMopedIcon from "@mui/icons-material/ElectricMoped";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";

export default function CustomStepper(props: {
  map: {
    [k: string]: {
      step: number;
      //   component: React.FC<{
      //     handleNext: () => void;
      //   }>;
      label: string;
      value: string;
      updatedAt: string;
    };
  };
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  completed: {
    [k: number]: boolean;
  };
  setCompleted: React.Dispatch<
    React.SetStateAction<{
      [k: number]: boolean;
    }>
  >;
}) {
  const {
    map,
    activeStep,
    // setActiveStep,
    // completed,
    // setCompleted
  } = props;
  //   const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  const ColorlibConnector = styled(StepConnector)(({}) => ({
    // [`&.${stepConnectorClasses.alternativeLabel}`]: {
    //   top: 22,
    // },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#FC8019",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#FC8019",
      },
    },
    // [`& .${stepConnectorClasses.line}`]: {
    //   height: 3,
    //   border: 0,
    //   backgroundColor:
    //     theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    //   borderRadius: 1,
    // },
  }));

  const StepIconRoot = styled("div")<{
    ownerState: { active?: boolean; completed?: boolean };
  }>(({ ownerState }) => ({
    backgroundColor: "#fff",
    // border: `1px solid ${theme.palette.primary.main}`,
    // color: theme.palette.primary.main,
    color: "#949494",
    width: 30,
    height: 30,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: 500,
    ...(ownerState.active && {
      backgroundColor: "#fff",
      color: "#FC8019",
    }),
    ...(ownerState.completed && {
      backgroundColor: "#fff",
      color: "#FC8019",
    }),
  }));

  function StepIcon(props: StepIconProps) {
    const { active, className, icon, completed } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <HistoryToggleOffIcon fontSize="medium" />,
      2: <RamenDiningIcon fontSize="medium" />,
      3: <ElectricMopedIcon fontSize="medium" />,
      4: <DoneIcon fontSize="medium" />,
    };
    return (
      <StepIconRoot ownerState={{ active, completed }} className={className}>
        {Object.values(map).length === 1 ? (
          <CloseIcon fontSize="medium" sx={{ color: "red" }} />
        ) : completed ? (
          <DoneIcon fontSize="medium" />
        ) : (
          icons[String(icon)]
        )}
      </StepIconRoot>
    );
  }

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper
        activeStep={
          activeStep === Object.values(map).length - 1
            ? activeStep + 1
            : activeStep
        }
        orientation="vertical"
        connector={<ColorlibConnector />}
      >
        {Object.values(map)?.map((step) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={StepIcon}>
              <Typography fontSize="1rem" fontWeight={500}>
                {step.label}
              </Typography>
              {step?.updatedAt && (
                <Typography sx={{ color: "#7e808c" }}>
                  {dayjs(step.updatedAt).format("LLL")}
                </Typography>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

// import React, { useEffect, useState } from "react";
// // import { useLocation } from 'react-router-dom';
// import {
//   Box,
//   Stepper,
//   Step,
//   Button,
//   Typography,
//   StepIconProps,
//   StepLabel,
//   StepButton,
//   Stack,
//   CircularProgress,
// } from "@mui/material";
// // import theme from 'theme';
// import { styled } from "@mui/material/styles";
// import { useDispatch } from "react-redux";
// // import { GET_EXPERIMENTS, modelsDataAction } from 'store/actions/models';
// import { useSearchParams, useLocation } from "react-router-dom";
// // import { useAppId } from 'hooks';
// // import { showAlert } from 'store/actions/alert';

// const StepIconRoot = styled("div")<{
//   ownerState: { active?: boolean };
// }>(({ theme, ownerState }) => ({
//   backgroundColor: "#fff",
//   border: `1px solid ${theme.palette.primary.main}`,
//   color: theme.palette.primary.main,
//   width: 30,
//   height: 30,
//   display: "flex",
//   borderRadius: "50%",
//   justifyContent: "center",
//   alignItems: "center",
//   fontSize: "15px",
//   fontWeight: 500,
//   ...(ownerState.active && {
//     backgroundColor: theme.palette.primary.main,
//     color: "#fff",
//   }),
// }));

// function StepIcon(props: StepIconProps) {
//   const { active, className, icon } = props;

//   return (
//     <StepIconRoot ownerState={{ active }} className={className}>
//       {icon}
//     </StepIconRoot>
//   );
// }

// const CustomStepper = (props: {
//   map: {
//     [k: string]: {
//       step: number;
//       //   component: React.FC<{
//       //     handleNext: () => void;
//       //   }>;
//       label: string;
//     };
//   };
//   activeStep: number;
//   setActiveStep: React.Dispatch<React.SetStateAction<number>>;
//   completed: {
//     [k: number]: boolean;
//   };
//   setCompleted: React.Dispatch<
//     React.SetStateAction<{
//       [k: number]: boolean;
//     }>
//   >;
// }) => {
//   const location = useLocation();
//   const { map, activeStep, setActiveStep, completed, setCompleted } = props;
//   const modelType = location.pathname.split("/")?.[2]?.toUpperCase();

//   //   const [completed, setCompleted] = useState<{
//   //     [k: number]: boolean;
//   //   }>({});
//   const dispatch = useDispatch();
//   const [searchParams] = useSearchParams();
//   //   const appId = useAppId('search');
//   const [initialLoading, setInitialLoading] = useState(false);

//   const totalSteps = () => {
//     return Object.keys(map).length;
//   };

//   const completedSteps = () => {
//     return Object.keys(completed).length;
//   };

//   const allStepsCompleted = () => {
//     return completedSteps() === totalSteps();
//   };

//   const handleNext = () => {
//     setCompleted((prev) => ({ ...prev, [activeStep]: true }));
//     setActiveStep((prev) => prev + 1);
//   };

//   const handleStep = (step: number) => () => {
//     setActiveStep(step);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//     setCompleted({});
//   };

//   useEffect(() => {
//     // if (appId && searchParams.get('exp_id')) {
//     //   dispatch(
//     //     modelsDataAction(GET_EXPERIMENTS, {
//     //       params: {
//     //         app_id: appId,
//     //         experiment_id: searchParams.get('exp_id'),
//     //       },
//     //     })
//     //   )
//     //     .then((res: any) => {
//     //       setExperimentName(res?.data?.data?.name);
//     //       let stage = res?.data?.data?.stage || 'CONFIGURE';
//     //       if (modelType === 'CLS' && stage === 'CONFIGURE') stage = 'DATA_PREP';
//     //       setActiveStep(map[stage].step);
//     //       const index = map[stage].step;
//     //       setCompleted(prev => ({
//     //         ...prev,
//     //         ...Object.keys(map).reduce((acc, curr, i) => {
//     //           if (i < index) {
//     //             acc[map[curr].step] = true;
//     //           }
//     //           return acc;
//     //         }, {} as { [k: number]: boolean }),
//     //       }));
//     //     })
//     //     .catch((err: any) => {
//     //       dispatch(
//     //         showAlert({
//     //           message: err?.[0]?.msg || 'Something went wrong',
//     //           severity: 'error',
//     //         })
//     //       );
//     //     })
//     //     .finally(() => {
//     //       setInitialLoading(false);
//     //     });
//     // } else {
//     //   setInitialLoading(false);
//     // }
//   }, []);

//   console.log("activeStep", activeStep);

//   const main = (
//     <Box sx={{ width: "100%" }}>
//       <Stepper
//         orientation="vertical"
//         activeStep={activeStep}
//         // sx={{
//         //   mt: "25px !important",
//         //   mb: "25px !important",
//         //   "& .MuiStep-root": {
//         //     mx: 2.5,
//         //     "&:nth-of-type(1)": {
//         //       ml: 0,
//         //     },
//         //     "&:last-child": {
//         //       mr: 0,
//         //     },
//         //   },
//         //   "& .MuiStepConnector-line": {
//         //     // borderColor: theme.palette.text.disabled,
//         //   },
//         //   "& .MuiStepLabel-iconContainer": {
//         //     p: 0,
//         //     mr: 0.75,
//         //   },
//         //   "& .MuiStepLabel-label": {
//         //     fontSize: "15px",
//         //     fontWeight: 500,
//         //   },
//         // }}
//       >
//         {Object.values(map)?.map((step, index: number) => (
//           <Step
//             key={step.label}
//             // completed={completed[index]}
//             completed={true}
//             sx={{ cursor: "pointer" }}
//           >
//             {/* {console.log("test", completed[index])} */}
//             <StepButton
//               sx={{
//                 fontFamily: "inherit",
//               }}
//               onClick={handleStep(index)}
//               disableRipple
//               disabled={Object.keys(completed).length < index}
//             >
//               <StepLabel StepIconComponent={StepIcon}>{step?.label}</StepLabel>
//             </StepButton>
//           </Step>
//         ))}
//       </Stepper>
//     </Box>
//   );

//   return initialLoading ? (
//     <Stack
//       sx={{
//         height: "100%",
//         width: "100%",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <CircularProgress color="secondary" size="3rem" />
//     </Stack>
//   ) : (
//     main
//   );
// };

// export default CustomStepper;
