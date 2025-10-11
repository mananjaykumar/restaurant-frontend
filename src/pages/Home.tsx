import { Stack } from "@mui/material";
import Banner from "../components/Home/Banner";
import MostLoved from "../components/Home/MostLoved";
import React from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { setProgress } from "../store/slices/ProgressSlice";
// import AOS from "aos";
import bannerData from "../data/banner.json";
import mostLovedData from "../data/mostLoved.json";
import AllProducts from "../components/Home/AllProducts";

const Home = () => {
  // const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  // const [items, setItems] = React.useState([]);
  // const [carouselItems, setCarouselItems] = React.useState([]);

  // React.useEffect(() => {
  //   dispatch(setProgress({ progress: 30 }));
  //   axios
  //     .get(`${import.meta.env.VITE_BACKEND_URL}/api/home/banner`)
  //     .then((res) => {
  //       setItems(res?.data?.data?.reverse());
  //       // setLoading(false);
  //       AOS.init();
  //       axios
  //         .get(`${import.meta.env.VITE_BACKEND_URL}/api/home/most-loved`)
  //         .then((res) => {
  //           setCarouselItems(res?.data?.data);
  //           dispatch(setProgress({ progress: 70 }));
  //           // setItems([]);
  //           setLoading(false);
  //           dispatch(setProgress({ progress: 100 }));
  //           // signal the pre-renderer that the page is ready
  //           document.dispatchEvent(new Event("render-event"));
  //         })
  //         .catch((err) => {
  //           toast.error(err?.response?.data?.message);
  //           setLoading(false);
  //           dispatch(setProgress({ progress: 100 }));
  //         });
  //     })
  //     .catch((err) => {
  //       toast.error(err?.response?.data?.message);
  //       setLoading(false);
  //     });
  // }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // simulate loading
    return () => clearTimeout(timer);
  }, []);
  return (
    <Stack
      sx={{
        backgroundColor: "rgb(255, 255, 255)",
        gap: "2rem",
      }}
    >
      <Banner items={bannerData} loading={loading} />
      <MostLoved carouselItems={mostLovedData} loading={loading} />
      <AllProducts />
    </Stack>
  );
};

export default Home;
