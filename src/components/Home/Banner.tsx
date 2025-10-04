// import React from "react";
import { Box, Typography, Grid, Stack, Skeleton } from "@mui/material";
import Carousel from "react-material-ui-carousel";
// import axios from "axios";
// import toast from "react-hot-toast";

// function arrayBufferToBase64(buffer: any) {
//   var binary = "";
//   var bytes = [].slice.call(new Uint8Array(buffer));
//   bytes.forEach((b) => (binary += String.fromCharCode(b)));
//   return window.btoa(binary);
// }

const Banner = ({ items, loading }: any) => {
  // const [loading, setLoading] = React.useState(true);
  // const [items, setItems] = React.useState([]);
  // const items = [
  //   {
  //     name: "Random Name #1",
  //     description: "Probably the most random thing you have ever seen!",
  //     image:
  //       "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/b4178cc2ecc1ccb1f6b2b0638f609f0f",
  //   },
  //   {
  //     name: "Random Name #2",
  //     description: "Hello World!",
  //     image:
  //       "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/345b2c3e5d0064046c07b0fe01de8e66",
  //   },
  // ];

  // React.useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_BACKEND_URL}/api/home/banner`)
  //     .then((res) => {
  //       setItems(res?.data?.data?.reverse());
  //       // setItems([]);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       toast.error(err?.response?.data?.message);
  //       setLoading(false);
  //     });
  // }, []);

  if (loading) {
    return (
      <Stack
        sx={{
          marginLeft: {
            sm: "calc(10% + 36px)",
            // xs: "calc(2%)",
          },
          marginRight: {
            sm: "calc(10% + 36px)",
            // xs: "calc(2%)",
          },
          alignItems: "center",
          padding: "10px 25px",
          // height: "330px",
          height: { xs: "220px", sm: "250px" },
        }}
      >
        <Skeleton
          variant="rounded"
          animation="wave"
          width="100%"
          height="100%"
          // width={1055}
          // height={330}
        />
      </Stack>
    );
  }
  return (
    <Carousel
      sx={{
        marginLeft: {
          sm: "calc(10% + 36px)",
          // xs: "calc(2%)",
        },
        marginRight: {
          sm: "calc(10% + 36px)",
          // xs: "calc(2%)",
        },
      }}
    >
      {items?.length > 0
        ? items.map((item: any, i: number) => (
            <Item key={i} item={item} defaultItems={false} />
          ))
        : [1].map((item, i) => (
            <Item key={i} item={item} defaultItems={true} />
          ))}
    </Carousel>
  );
};

function Item(props: any) {
  const { defaultItems, item } = props;
  return (
    <Grid
      // key={index}
      container
      alignItems="center"
      // maxWidth="80%"
      justifyContent="space-between"
      width="100%"
    >
      <Grid
        container
        direction="column"
        item
        sm={12}
        md={6}
        // padding="1.5rem 0 0 1.5rem"
        gap="1rem"
        justifyContent="space-between"
        width="fullWidth"
        sx={{
          padding: { sm: "1.5rem", xs: "1.5rem 1.5rem 0 1.5rem" },
        }}
      >
        <Typography
          fontSize="2rem"
          fontWeight="700"
          color="#2B3445"
          sx={{
            fontSize: {
              lg: 50,
              md: 30,
              sm: 25,
              xs: 20,
            },
            textAlign: {
              xs: defaultItems ? "center" : "left",
            },
          }}
        >
          {/* 50% Off On Your First Order */}
          {defaultItems ? "No Items to display" : item.title}
        </Typography>
        <Typography
          fontWeight="400"
          color="#0F3460"
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis
          consequat eu, quam etiam at quis ut convalliss. */}
          {defaultItems
            ? "Please add items from Admin Portal"
            : item.description}
        </Typography>
      </Grid>
      <Grid
        item
        sm={12}
        md={6}
        sx={{
          padding: "1.5rem",
        }}
      >
        <Box
          maxWidth="100%"
          display="block"
          marginLeft="auto"
          // marginRight="0"
          component={"img"}
          sx={{
            height: {
              xs: "220px",
              sm: "250px",
            },
            marginRight: {
              xs: "auto",
              sm: "auto",
              md: "auto",
              lg: "auto",
              xl: 0,
            },
          }}
          // src={props.item.image}
          src={
            defaultItems
              ? "https://app.lssquare.com/static/media/empty_product_banner.c076afe7.png"
              : `data:image/${item.img.contentType};base64,
          ${item.img.data}`
          }
          // src={
          //   defaultItems
          //     ? "https://app.lssquare.com/static/media/empty_product_banner.c076afe7.png"
          //     : `${import.meta.env.VITE_BACKEND_URL}/${item.img}`
          // }
        ></Box>
      </Grid>
    </Grid>
  );
}

export default Banner;
