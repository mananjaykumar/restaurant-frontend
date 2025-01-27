import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Stack, Typography } from "@mui/material";
// import BoltIcon from "@mui/icons-material/Bolt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import CustomCarousel from "../reusable/CustomCarousel.jsx";
import CustomCard from "../reusable/CustomCard";
import toast from "react-hot-toast";
import AOS from "aos";
import { useDispatch } from "react-redux";
import { setProgress } from "../../store/slices/ProgressSlice";
// import SectionHeader from "./SectionHeader";

// const carouselItems = [
//   {
//     id: 1,
//     discount: "25",
//     title: "Biryani",
//     discountedPrice: "187.50",
//     originalPrice: "250.00",
//     imgSrc:
//       "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/Biryani_2.png",
//     rating: 4,
//   },
//   {
//     id: 2,
//     discount: "15",
//     title: "Pizza",
//     discountedPrice: "297.50",
//     originalPrice: "350.00",
//     imgSrc:
//       "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029856/PC_Creative%20refresh/3D_bau/banners_new/Pizza.png",
//     rating: 3,
//   },
//   {
//     id: 3,
//     discount: "28",
//     title: "North Indian",
//     discountedPrice: "108.00",
//     originalPrice: "150.00",
//     imgSrc:
//       "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/North_Indian_4.png",
//     rating: 5,
//   },
//   {
//     id: 4,
//     discount: "21",
//     title: "Dosa",
//     discountedPrice: "142.20",
//     originalPrice: "180.00",
//     imgSrc:
//       "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029850/PC_Creative%20refresh/3D_bau/banners_new/Dosa.png",
//     rating: 4,
//   },
//   {
//     id: 5,
//     discount: "25",
//     title: "Burger",
//     discountedPrice: "187.50",
//     originalPrice: "250.00",
//     imgSrc:
//       "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Burger.png",
//     rating: 4,
//   },
//   {
//     id: 6,
//     discount: "15",
//     title: "Rolls",
//     discountedPrice: "297.50",
//     originalPrice: "350.00",
//     imgSrc:
//       "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029858/PC_Creative%20refresh/3D_bau/banners_new/Rolls.png",
//     rating: 3,
//   },
//   {
//     id: 7,
//     discount: "28",
//     title: "Chinese",
//     discountedPrice: "108.00",
//     originalPrice: "150.00",
//     imgSrc:
//       "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029848/PC_Creative%20refresh/3D_bau/banners_new/Chinese.png",
//     rating: 5,
//   },
//   {
//     id: 8,
//     discount: "21",
//     title: "Cakes",
//     discountedPrice: "142.20",
//     originalPrice: "180.00",
//     imgSrc:
//       "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Cakes.png",
//     rating: 4,
//   },
// ];

const breakPoints = [
  {
    width: 1,
    itemsToShow: 1,
  },
  {
    width: 450,
    itemsToShow: 2,
  },
  {
    width: 650,
    itemsToShow: 3,
  },
  {
    width: 950,
    itemsToShow: 4,
  },
  {
    width: 1300,
    itemsToShow: 7,
  },
];

interface ISectionHeader {
  title: string;
  headerSize?: string;
  Icon: any;
}

const SectionHeader = ({ title, Icon, headerSize }: ISectionHeader) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap="0.5rem"
      marginBottom="1rem"
      marginLeft="1.2rem"
      //   sx={headerSize}
    >
      <Box display="flex" alignItems="center" gap="0.5rem">
        {Icon && <Icon color="warning" />}
        <Typography color="text.primary" fontSize="25px" fontWeight="600">
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

const MostLoved = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [carouselItems, setCarouselItems] = useState([]);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const result = await axios.get(
  //         import.meta.env.VITE_BACKEND_URL + "/shop/product?type=flash-deals"
  //       );
  //       setCarouselItems(result.data);
  //     };

  //     fetchData();
  //   }, []);

  useEffect(() => {
    dispatch(setProgress({ progress: 10 }));
    AOS.init();
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/home/most-loved`)
      .then((res) => {
        dispatch(setProgress({ progress: 30 }));
        setCarouselItems(res?.data?.data);
        dispatch(setProgress({ progress: 70 }));
        // setItems([]);
        setLoading(false);
        dispatch(setProgress({ progress: 100 }));
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setLoading(false);
        dispatch(setProgress({ progress: 100 }));
      });
  }, []);

  // if (loading) {
  //   return <>Loding...</>;
  // }
  return (
    // <section className="flash-deals" style={{ margin: "3rem 0 0 0" }}>
    <Stack
      data-aos="zoom-in-up"
      sx={{
        marginTop: "50px",
        marginLeft: {
          sm: "calc(10% + 36px)",
          // xs: "calc(2%)",
        },
        marginRight: {
          sm: "calc(10% + 36px)",
          // xs: "calc(2%)",
        },
        gap: "1.5rem",
      }}
    >
      <SectionHeader title="Most Loved" Icon={FavoriteIcon} />
      <Box position="relative">
        <CustomCarousel
          items={carouselItems}
          breakPoints={breakPoints}
          loading={loading}
          skeletonH={388}
          skeletonW={248}
        >
          <CustomCard />
        </CustomCarousel>
      </Box>
      {/* </section> */}
    </Stack>
  );
};

export default MostLoved;
