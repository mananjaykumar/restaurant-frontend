// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Grid,
//   Typography,
//   Paper,
//   Rating,
//   Avatar,
//   Divider,
//   CircularProgress,
// } from "@mui/material";
// import { useParams } from "react-router-dom";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch product details and reviews
//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         // Fetch full product details
//         const productRes = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/user/product/${id}`
//         );
//         console.log("productRes", productRes);
//         setProduct(productRes.data.data.product);
//       } catch (err: any) {
//         console.error("Error fetching product details:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductData();
//   }, [id]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={10}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!product) {
//     return (
//       <Box mt={10} textAlign="center">
//         <Typography variant="h6" color="error">
//           Product not found.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ padding: { xs: 2, sm: 4 } }}>
//       <Grid container spacing={4}>
//         {/* Image */}
//         <Grid item xs={12} md={6} sx={{alignItems: "center"}}>
//           <Paper elevation={2} sx={{ p: 2, width: "fit-content" }}>
//             {product.img && product.img.data ? (
//               <img
//                 src={`data:${product.img.contentType};base64,${btoa(
//                   new Uint8Array(product.img.data.data).reduce(
//                     (data, byte) => data + String.fromCharCode(byte),
//                     ""
//                   )
//                 )}`}
//                 alt={product.title}
//                 style={{ width: "250px", height: "250px", borderRadius: 8 }}
//               />
//             ) : (
//               <Typography>No Image Available</Typography>
//             )}
//           </Paper>
//         </Grid>

//         {/* Product Details */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h4" fontWeight={600}>
//             {product.title}
//           </Typography>

//           <Box display="flex" alignItems="center" mt={1}>
//             <Rating value={product.rating} precision={0.1} readOnly />
//             {/* <Typography variant="body2" ml={1}>
//               {product.rating.toFixed(1)} / 5
//             </Typography> */}
//           </Box>

//           <Box mt={2}>
//             <Typography variant="h6" color="text.primary">
//               ₹{product.discountedPrice}{" "}
//               <Typography
//                 component="span"
//                 color="text.secondary"
//                 sx={{ textDecoration: "line-through", ml: 1 }}
//               >
//                 ₹{product.originalPrice}
//               </Typography>
//               <Typography component="span" sx={{ ml: 2 }} color="success.main">
//                 {product.discount}% OFF
//               </Typography>
//             </Typography>
//           </Box>

//           <Box mt={3}>
//             <Typography variant="subtitle1">
//               Category: {product.category?.name}
//             </Typography>
//             <Typography variant="subtitle1">
//               Subcategory: {product.subCategory?.name}
//             </Typography>
//           </Box>
//         </Grid>

//         {/* Reviews Section */}
//         <Grid item xs={12}>
//           <Typography variant="h5" gutterBottom>
//             Customer Reviews
//           </Typography>
//           <Divider />

//           {product?.reviews?.length === 0 ? (
//             <Typography variant="body1" mt={2}>
//               No reviews yet.
//             </Typography>
//           ) : (
//             product?.reviews?.map((review: any, index: number) => (
//               <Paper
//                 key={index}
//                 elevation={1}
//                 sx={{ p: 2, mt: 2, borderLeft: "5px solid #3f51b5" }}
//               >
//                 <Box display="flex" alignItems="center" mb={1}>
//                   <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
//                     {review.reviewedBy?.name?.charAt(0).toUpperCase() || "U"}
//                   </Avatar>
//                   <Typography fontWeight={600}>
//                     {review.reviewedBy?.name || "Unknown User"}
//                   </Typography>
//                 </Box>

//                 <Rating value={review.ratings} readOnly size="small" />
//                 <Typography variant="body2" mt={1}>
//                   {review.reviewMsg || "No comment provided."}
//                 </Typography>
//                 <Typography
//                   variant="caption"
//                   color="text.secondary"
//                   mt={0.5}
//                   display="block"
//                 >
//                   Reviewed on{" "}
//                   {new Date(review.createdAt).toLocaleString("en-IN", {
//                     dateStyle: "medium",
//                     timeStyle: "short",
//                   })}
//                 </Typography>
//               </Paper>
//             ))
//           )}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ProductDetails;

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Rating,
  Avatar,
  Divider,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  // Review form state
  const [newRating, setNewRating] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/product/${id}`
        );
        setProduct(res.data.data.product);
        // Assume API response has a flag or check manually
        const checkRes = await axios.post(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/user/product/${id}/postReview`
        );
        console.log("checkRes", checkRes);
        if (checkRes.data.message === "ALREADY_REVIEWED_BY_USER") {
          setAlreadyReviewed(true);
        }
      } catch (err: any) {
        console.error("Error fetching product data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleReviewSubmit = async () => {
    // if (!newRating) return alert("Please select a rating");
    setSubmitting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/product/${id}/postReview`,
        {
          ratings: newRating,
          reviewMsg: newMessage,
        }
      );
      window.location.reload(); // refresh page to show new review
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error submitting review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress sx={{ color: "#FC8019" }} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box mt={10} textAlign="center">
        <Typography variant="h6" color="error">
          Product not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 } }}>
      {/* Product Image + Details */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
        sx={{ textAlign: { xs: "center", md: "left" } }}
      >
        {/* Image */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2 }}>
            {product.img && product.img.data ? (
              <img
                src={`data:${product.img.contentType};base64,${btoa(
                  new Uint8Array(product.img.data.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                )}`}
                alt={product.title}
                style={{
                  width: "100%",
                  maxWidth: "350px", // ✅ prevents it from being too large
                  height: "auto",
                  borderRadius: 12,
                  objectFit: "cover",
                  margin: "0 auto", // ✅ centers on small screens
                  display: "block",
                }}
              />
            ) : (
              <Typography>No Image Available</Typography>
            )}
          </Paper>
        </Grid>

        {/* Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight={700}>
            {product.title}
          </Typography>

          <Box
            display="flex"
            justifyContent={{ xs: "center", md: "flex-start" }}
            alignItems="center"
            mt={1}
          >
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body2" ml={1}>
              {product.rating.toFixed(1)} / 5
            </Typography>
          </Box>

          <Box mt={2}>
            <Typography variant="h6" color="text.primary">
              ₹{product.discountedPrice}{" "}
              <Typography
                component="span"
                color="text.secondary"
                sx={{ textDecoration: "line-through", ml: 1 }}
              >
                ₹{product.originalPrice}
              </Typography>
              <Typography component="span" sx={{ ml: 2 }} color="success.main">
                {product.discount}% OFF
              </Typography>
            </Typography>
          </Box>

          <Box mt={3}>
            <Typography variant="subtitle1">
              <b>Category:</b> {product.category?.name || "N/A"}
            </Typography>
            {/* <Typography variant="subtitle1">
              Subcategory: {product.subCategory?.name || "N/A"}
            </Typography> */}
            <Typography variant="subtitle1">
              <b>Description:</b> {product.description || "N/A"}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Reviews Section */}
      <Grid container spacing={2} mt={6}>
        <Grid item xs={12}>
          <Typography
            gutterBottom
            sx={{ fontWeight: "bold", fontSize: "16px" }}
          >
            Customer Reviews
          </Typography>
          <Divider />
        </Grid>

        {product.reviews.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" mt={2}>
              No reviews yet.
            </Typography>
          </Grid>
        ) : (
          product.reviews.map((review: any, index: number) => (
            <Grid item xs={12} key={index}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  borderLeft: "5px solid #FC8019",
                  borderRadius: 2,
                  mb: 1,
                }}
              >
                <Box display="flex" alignItems="center" mb={1}>
                  <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                    {review.reviewedBy?.name?.charAt(0).toUpperCase() || "U"}
                  </Avatar>
                  <Typography fontWeight={600}>
                    {review.reviewedBy?.name || "Unknown User"}
                  </Typography>
                </Box>

                <Rating value={review.ratings} readOnly size="small" />
                <Typography variant="body2" mt={1}>
                  {review.reviewMsg || "No comment provided."}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  mt={0.5}
                  display="block"
                >
                  Reviewed on{" "}
                  {new Date(review.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Typography>
              </Paper>
            </Grid>
          ))
        )}

        {/* Review Form */}
        {!alreadyReviewed && (
          <Grid item xs={12} mt={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Write a Review
              </Typography>
              <Rating
                value={newRating}
                onChange={(_, value: any) => setNewRating(value)}
              />
              <TextField
                fullWidth
                multiline
                minRows={3}
                placeholder="Write your review..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                sx={{ mt: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleReviewSubmit}
                disabled={submitting}
                sx={{
                  mt: 2,
                  backgroundColor: "#FC8019",
                  "&:hover": {
                    backgroundColor: "#FC8019",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#f3f3f3",
                  },
                }}
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ProductDetails;
