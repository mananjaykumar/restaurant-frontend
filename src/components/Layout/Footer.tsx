// import { useEffect } from "react";
// import { IconButton, Stack, Typography } from "@mui/material";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookIcon from "@mui/icons-material/Facebook";
// // import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";
// // import FavoriteIcon from "@mui/icons-material/Favorite";
// import AOS from "aos";

// const Footer = () => {
//   useEffect(() => {
//     AOS.init();
//   }, []);
//   return (
//     <Stack
//       data-aos="zoom-in-up"
//       sx={{
//         backgroundColor: "rgb(2, 6, 12)",
//         color: "white",
//         padding: "100px 10px",
//         marginTop: "10rem",
//       }}
//     >
//       <Stack
//         sx={{
//           marginLeft: {
//             sm: "calc(10% + 36px)",
//             // xs: "calc(2%)",
//           },
//           marginRight: {
//             sm: "calc(10% + 36px)",
//             // xs: "calc(2%)",
//           },
//         }}
//         gap={2}
//       >
//         <Stack direction="row" justifyContent="center">
//           <IconButton
//             sx={{
//               color: "white",
//             }}
//             onClick={() => (window.location.href = "https://www.youtube.com")}
//             // onClick={() =>
//             //   (window.location.href =
//             //     "https://www.youtube.com/channel/UCU889rxrmHpf-dnB__hD8xQ")
//             // }
//           >
//             <YouTubeIcon fontSize="large" />
//           </IconButton>
//           <IconButton
//             sx={{
//               color: "white",
//             }}
//             onClick={() => (window.location.href = "https://www.instagram.com")}
//             // onClick={() =>
//             //   (window.location.href = "https://www.instagram.com/__mj_28_/")
//             // }
//           >
//             <InstagramIcon fontSize="large" />
//           </IconButton>
//           <IconButton
//             sx={{
//               color: "white",
//             }}
//             onClick={() => (window.location.href = "https://www.facebook.com")}
//             // onClick={() =>
//             //   (window.location.href =
//             //     "https://www.facebook.com/rishab.sinha.56/")
//             // }
//           >
//             <FacebookIcon fontSize="large" />
//           </IconButton>
//         </Stack>
//         <Stack textAlign="center">
//           {/* <Typography>
//             250 Executive Park Blvd, Suite 3400, San Francisco CA 94134, United
//             States
//           </Typography> */}
//           <Typography>
//             Patna, Bihar, India
//           </Typography>

//         </Stack>
//         <Stack
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "center",
//             gap: "3rem",
//           }}
//         >
//           {/* <Stack direction="row" alignItems="center" gap={0.5}>
//             <PhoneIcon />
//             <Typography>+91 8507</Typography>
//           </Stack> */}
//           <Stack direction="row" alignItems="center" gap={0.5}>
//             <EmailIcon />
//             <Typography>khanekhana0102@gmail.com</Typography>
//           </Stack>
//         </Stack>
//         <Stack
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "2rem",
//           }}
//         >
//           {/* <Stack direction="row" alignItems="center" gap={0.5}>
//             <Typography>Made with</Typography> <FavoriteIcon fontSize="small" />
//             <Typography>by Mananjay Kumar</Typography>
//           </Stack> */}
//           <Stack>
//             <Typography> Copyright &copy; 2023 </Typography>
//           </Stack>
//         </Stack>
//       </Stack>
//     </Stack>
//   );
// };

// export default Footer;

import {
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
  Link,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  YouTube,
  Email,
  LocationOn,
  Phone,
  Business,
} from "@mui/icons-material";
import Logo from "../../assets/logo.png"; // adjust path based on your project

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "#472009", // Dark brown
        color: "#FFF8E7", // Cream tone
        py: 4,
        mt: "inherit",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Left side - Logo and tagline */}
          <Grid item xs={12} sm={6} md={4} display="flex" alignItems="center">
            <Box
              component="img"
              src={Logo}
              alt="Khane Khana Logo"
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                mr: 2,
              }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Khane Khana
              </Typography>
              <Typography variant="body2">
                Affordable, Ambrosial, Authentic
              </Typography>
            </Box>
          </Grid>

          {/* Center - Social Links */}
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            <IconButton
              component="a"
              href="https://youtube.com"
              target="_blank"
              sx={{ color: "#FFF8E7" }}
            >
              <YouTube />
            </IconButton>
            <IconButton
              component="a"
              href="https://instagram.com"
              target="_blank"
              sx={{ color: "#FFF8E7" }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              component="a"
              href="https://facebook.com"
              target="_blank"
              sx={{ color: "#FFF8E7" }}
            >
              <Facebook />
            </IconButton>
          </Grid>

          {/* Right side - Contact Info */}
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            textAlign={{ xs: "center", md: "right" }}
          >
            {/* Email */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-end" }}
              mb={1}
            >
              <Email sx={{ mr: 1 }} />
              <Typography variant="body2">
                <Link
                  href="mailto:khanekhana0102@gmail.com"
                  color="inherit"
                  underline="hover"
                >
                  khanekhana0102@gmail.com
                </Link>
              </Typography>
            </Box>

            {/* Phone */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-end" }}
              mb={1}
            >
              <Phone sx={{ mr: 1 }} />
              <Typography variant="body2">
                <Link href="tel:9006992491" color="inherit" underline="hover">
                  +91 90069 92491
                </Link>
              </Typography>
            </Box>

            {/* Location */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-end" }}
            >
              <LocationOn sx={{ mr: 1 }} />
              <Typography variant="body2">Patna, Bihar, India</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Line */}
        <Box textAlign="center" mt={3}>
          <Typography variant="caption" sx={{ color: "#EADBC8" }}>
            © {new Date().getFullYear()} Khane Khana. All Rights Reserved.
          </Typography>
          <Box
            display="flex"
            alignItems="flex-end"
            justifyContent={{ xs: "center" }}
          >
            <Business sx={{ mr: 1 }} />
            <Typography variant="caption" sx={{ color: "#EADBC8" }}>
              Since 2023
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
