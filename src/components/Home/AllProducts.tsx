import { Grid, Grid2, Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomCard from "../reusable/CustomCard";
import { SectionHeader } from "./MostLoved";
import { setProgress } from "../../store/slices/ProgressSlice";
import InventoryIcon from "@mui/icons-material/Inventory";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((state: any) => state.search);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const myComponentRef: any = useRef(null);

  // Debounce API call
  useEffect(() => {
    setLoading(true);
    dispatch(setProgress({ progress: 10 }));
    const timeout = setTimeout(async () => {
      dispatch(setProgress({ progress: 50 }));
      if (searchText.trim() !== "") {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/home/products?search=${searchText}`
        );
        // console.log("Fetched Products:", res.data.data);
        setProducts(res.data.data);
        dispatch(setProgress({ progress: 100 }));
        setLoading(false);
      } else {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/home/products`
        );
        // console.log("All Products:", res.data.data);
        setProducts(res.data.data);
        dispatch(setProgress({ progress: 100 }));
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchText]);

  useEffect(() => {
    if (searchText) {
      // Do something with the component when searchText is not empty
      if (myComponentRef.current) {
        // Example: scroll it into view
        myComponentRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchText]);
  return (
    <Grid2
      ref={myComponentRef}
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
      <Grid container gap={2} sx={{ display: "flex", flexDirection: "column" }}>
        <Grid>
          <SectionHeader title="All Products" Icon={InventoryIcon} />
        </Grid>
        <Grid
          container
          gap={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {loading
            ? [1, 2, 3, 4].map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  height={388}
                  width={248}
                  animation="wave"
                />
              ))
            : products.map((item, index) => {
                return <CustomCard item={item} index={index} />;
              })}
        </Grid>
      </Grid>
    </Grid2>
  );
};

export default AllProducts;
