// import { Button, styled, Stack, Skeleton } from "@mui/material";
// import { ArrowForward } from "@mui/icons-material";
// import React from "react";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Carousel from "react-elastic-carousel";

// const ButtonPropsModified = ({ isNextButton, ...props }): any => (
//   <Button {...props} />
// );

// const RoundedButton = styled(ButtonPropsModified)(
//   ({ theme, isNextButton }) => ({
//     // borderRadius: "100%",
//     // padding: "0.5rem",
//     // minWidth: "0",
//     // alignSelf: "center",
//     // background: theme.palette.secondary.main,
//     // color: theme.palette.common.white,
//     // zIndex: 10,
//     // position: "absolute",
//     // left: isNextButton ? "auto" : 0,
//     // right: isNextButton ? 0 : "auto",
//     // transform: isNextButton ? "translateX(-15%)" : "translateX(-25%)",
//     // ":hover": {
//     //   background: theme.palette.secondary.main,
//     //   color: theme.palette.common.white,
//     // },
//     position: "absolute",
//     top: "-30px",
//     left: isNextButton ? "auto" : 0,
//     right: isNextButton ? 0 : "auto",
//     // justifyContent: !isNextButton && "right",
//     width: "fit-content",
//     color: "black",
//     [theme.breakpoints.between("xs", "lg")]: {
//       display: "none",
//     },
//   })
// );

// const CustomCarousel = ({
//   items,
//   breakPoints,
//   loading,
//   skeletonH,
//   skeletonW,
//   children,
// }) => {
//   return (
//     <Stack>
//       <Carousel
//         breakPoints={breakPoints}
//         pagination={false}
//         renderArrow={({ type, onClick, isEdge }) => (
//           <RoundedButton onClick={onClick} isNextButton={type === "NEXT"}>
//             {type === "PREV" ? <ArrowBackIcon /> : <ArrowForward />}
//           </RoundedButton>
//         )}
//         itemPadding={[15]}
//         sx={{ position: "relative" }}
//       >
//         {loading
//           ? [1, 2, 3, 4].map((_, i) => (
//               <Skeleton
//                 key={String(i)}
//                 variant="rounded"
//                 height={skeletonH}
//                 width={skeletonW}
//                 animation="wave"
//               />
//             ))
//           : items?.map((item, i) => (
//               <React.Fragment key={i}>
//                 {React.cloneElement(children, { item })}
//               </React.Fragment>
//             ))}
//       </Carousel>
//     </Stack>
//   );
// };

// export default CustomCarousel;

import React from "react";
import { Button, styled, Stack, Skeleton } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Carousel, { RenderArrowProps } from "react-elastic-carousel";

// Define types for ButtonPropsModified
interface ButtonPropsModified extends React.ComponentProps<typeof Button> {
  isNextButton?: boolean;
}

const ButtonPropsModified: React.FC<ButtonPropsModified> = ({ isNextButton, ...props }) => (
  <Button {...props} />
);

const RoundedButton = styled(ButtonPropsModified)<{ isNextButton?: boolean }>(
  ({ theme, isNextButton }) => ({
    position: "absolute",
    top: "-30px",
    left: isNextButton ? "auto" : 0,
    right: isNextButton ? 0 : "auto",
    width: "fit-content",
    color: "black",
    [theme.breakpoints.between("xs", "lg")]: {
      display: "none",
    },
  })
);

interface CustomCarouselProps {
  items?: any[];
  breakPoints: { width: number; itemsToShow: number }[];
  loading?: boolean;
  skeletonH?: number | string;
  skeletonW?: number | string;
  children: React.ReactElement;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  items,
  breakPoints,
  loading = false,
  skeletonH,
  skeletonW,
  children,
}) => {
  return (
    <Stack>
      <Carousel
        breakPoints={breakPoints}
        pagination={false}
        renderArrow={({ type, onClick }: RenderArrowProps) => (
          <RoundedButton onClick={onClick} isNextButton={type === "NEXT"}>
            {type === "PREV" ? <ArrowBackIcon /> : <ArrowForward />}
          </RoundedButton>
        )}
        itemPadding={[15]}
        style={{ position: "relative" }}
      >
        {loading
          ? [1, 2, 3, 4].map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                height={skeletonH}
                width={skeletonW}
                animation="wave"
              />
            ))
          : items?.map((item, i) => (
              <React.Fragment key={i}>
                {React.cloneElement(children, { item })}
              </React.Fragment>
            ))}
      </Carousel>
    </Stack>
  );
};

export default CustomCarousel;
