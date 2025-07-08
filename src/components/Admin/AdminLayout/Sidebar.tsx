// /* eslint-disable no-nested-ternary */
// import React, { useState } from "react";
// import { styled, Theme, CSSObject } from "@mui/material/styles";
// import {
//   Box,
//   List,
//   CssBaseline,
//   Divider,
//   IconButton,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import MuiDrawer from "@mui/material/Drawer";
// // import classNames from "classnames";
// import { useNavigate, useLocation } from "react-router-dom";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { logout } from "../../../store/slices/AuthSlice";
// import { Collapse, Stack, Toolbar, Tooltip } from "@mui/material";
// import AppsIcon from "@mui/icons-material/Apps";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import theme from "../../../theme";
// import logo from "../../../assets/logo.png";
// import ViewCarouselOutlinedIcon from "@mui/icons-material/ViewCarouselOutlined";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
// import ClassIcon from "@mui/icons-material/Class";
// import CategoryIcon from "@mui/icons-material/Category";
// // import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
// import AddIcon from "@mui/icons-material/Add";
// import ReorderOutlinedIcon from "@mui/icons-material/ReorderOutlined";
// import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import * as navLinks from "../../../routes/constants";
// import { AppBar } from "./AppBar";
// import LoadingBar from "react-top-loading-bar";
// // import css from "../../css/modules/sidebarMain.module.scss";

// const drawerWidth = 240;

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 5px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const menuItems1 = [
//   {
//     icon: <ViewCarouselOutlinedIcon />,
//     activeIcon: <ViewCarouselOutlinedIcon />,
//     label: "Banner",
//     link: navLinks.R_UPLOAD_BANNER,
//   },
//   {
//     icon: <InsertPhotoIcon />,
//     activeIcon: <InsertPhotoIcon />,
//     label: "Products",
//     link: navLinks.R_UPLOAD_PRODUCTS,
//   },
// ];
// const menuItems2 = [
//   {
//     icon: <CategoryIcon />,
//     activeIcon: <CategoryIcon />,
//     label: "Category",
//     link: navLinks.R_ADD_CATEGORY,
//   },
//   {
//     icon: <ClassIcon />,
//     activeIcon: <ClassIcon />,
//     label: "Sub Category",
//     link: navLinks.R_ADD_SUB_CATEGORY,
//   },
// ];

// // const menuItems2 = [
// //   {
// //     icon: <AnalyticsWhiteIcon />,
// //     activeIcon: <AnalyticsHoverIcon />,
// //     label: "Analytics",
// //     // link: navLinks.R_AUTO_SUGGEST_ANALYTICS_OVERVIEW,
// //     link: navLinks.R_ROOT,
// //   },
// //   {
// //     icon: <KeywordsWhiteIcon />,
// //     activeIcon: <KeywordsHoverIcon />,
// //     label: "Curations",
// //     // link: navLinks.R_CURATION_PROMOTED_GLOBAL,
// //     link: navLinks.R_ROOT,
// //   },
// //   {
// //     icon: <VisibilityWhiteIcon />,
// //     activeIcon: <VisibilityHoverIcon />,
// //     label: "Preview",
// //     // link: navLinks.R_AUTO_SUGGEST_PREVIEW,
// //     link: navLinks.R_ROOT,
// //   },
// //   {
// //     icon: <SettingsWhiteIcon />,
// //     activeIcon: <SettingsHoverIcon />,
// //     label: "Settings",
// //     // link: navLinks.R_AUTO_SUGGEST_MANAGE_PATTERNS,
// //     link: navLinks.R_ROOT,
// //   },
// // ];

// // const menuItems3 = [
// //   {
// //     icon: <KeywordsWhiteIcon />,
// //     activeIcon: <KeywordsHoverIcon />,
// //     label: "Classifiers",
// //     // link: navLinks.R_MODELS_OVERVIEW("cls"),
// //     link: navLinks.R_ROOT,
// //   },
// //   {
// //     icon: <SettingsWhiteIcon />,
// //     activeIcon: <SettingsHoverIcon />,
// //     label: "NER",
// //     // link: navLinks.R_MODELS_OVERVIEW("ner"),
// //     link: navLinks.R_ROOT,
// //   },
// //   {
// //     icon: <SettingsWhiteIcon />,
// //     activeIcon: <SettingsHoverIcon />,
// //     label: "Spell",
// //     // link: navLinks.R_MODELS_SPELL_DATASETS,
// //     link: navLinks.R_ROOT,
// //   },
// //   {
// //     icon: <SettingsWhiteIcon />,
// //     activeIcon: <SettingsHoverIcon />,
// //     label: "Ranking",
// //     // link: navLinks.R_MODELS_OVERVIEW("ranking"),
// //     link: navLinks.R_ROOT,
// //   },
// // ];

// const bottomItems = [
//   {
//     icon: <GroupsOutlinedIcon />,
//     activeIcon: <GroupsOutlinedIcon />,
//     label: "Users",
//     collapsable: false,
//     // link: navLinks.R_TEAM,
//     link: navLinks.R_USERS_LIST,
//   },
//   {
//     icon: <SettingsOutlinedIcon />,
//     activeIcon: <SettingsOutlinedIcon />,
//     label: "Settings",
//     collapsable: false,
//     // link: navLinks.R_TEAM,
//     link: navLinks.R_SETTINGS,
//   },
// ];

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// // interface IMenuButton {
// //   item: {
// //     icon: React.ReactNode;
// //     activeIcon: React.ReactNode;
// //     label: string;
// //     link: string;
// //   };
// //   index: number;
// //   location: any;
// //   open: boolean;
// //   selectedHover: null;
// //   handleOnHover: (index: number) => void;
// //   setSelectedHover: React.Dispatch<React.SetStateAction<null>>;
// //   selectedIndexForStyle: number | undefined;
// //   handleListItemClick: (
// //     e: React.MouseEvent<HTMLDivElement, MouseEvent>,
// //     link: string,
// //     index: number
// //   ) => void;
// //   label?: string | React.ReactNode;
// //   isBottomSection?: boolean;
// // }

// // const MenuButton = (props: IMenuButton) => {
// //   const {
// //     item,
// //     index,
// //     location,
// //     open,
// //     selectedHover,
// //     handleOnHover,
// //     setSelectedHover,
// //     selectedIndexForStyle,
// //     handleListItemClick,
// //     label = item.label,
// //     isBottomSection = false,
// //   } = props;

// //   const urlParts = location.pathname.split("/");

// //   const shouldHighlight =
// //     item.link === location.pathname ||
// //     (isBottomSection
// //       ? urlParts[1] !== "" && item.link.startsWith(`/${urlParts[1]}`)
// //       : item.link.startsWith(`/${urlParts[1]}/${urlParts[2]}`));

// //   const selected = selectedIndexForStyle === index || shouldHighlight;

// //   const hovered = selectedHover === index || shouldHighlight;

// //   return (
// //     <Box
// //       sx={{
// //         padding: "0px 12px",
// //         ...(selected
// //           ? {
// //               borderLeft: `4px solid ${theme.palette.primary.main}`,
// //               borderTopRightRadius: "2px",
// //               borderBottomRightRadius: "2px",
// //               padding: "0px 8px !important",
// //             }
// //           : {}),
// //       }}
// //     >
// //       <ListItem
// //         onMouseOver={() => handleOnHover(index)}
// //         onMouseOut={() => setSelectedHover(null)}
// //         disablePadding
// //         sx={{ display: "block", marginTop: "5px" }}
// //       >
// //         <ListItemButton
// //           selected={selected}
// //           onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
// //             handleListItemClick(e, item.link, index)
// //           }
// //           sx={{
// //             minHeight: 26,
// //             justifyContent: open ? "initial" : "center",
// //             px: 2.5,
// //             height: "10px",
// //             borderRadius: "5px",
// //             cursor: "pointer",
// //             "&.Mui-selected": {
// //               backgroundColor: theme.palette.primary.light,
// //               color: theme.palette.primary.main,
// //               "&:hover": {
// //                 backgroundColor: `${theme.palette.primary.hover} !important`,
// //               },
// //             },
// //             "&:hover": {
// //               backgroundColor: theme.palette.primary.hover,
// //               color: theme.palette.primary.main,
// //             },
// //             ...(shouldHighlight && {
// //               color: theme.palette.primary.main,
// //             }),
// //           }}
// //         >
// //           <ListItemIcon
// //             sx={{
// //               minWidth: 0,
// //               mr: open ? 3 : "auto",
// //               justifyContent: "center",
// //               color: hovered
// //                 ? theme.palette.primary.main
// //                 : theme.palette.primary.main,
// //               "& .MuiSvgIcon-root": {
// //                 maxWidth: "13px",
// //                 maxHeight: "15px",
// //                 color: theme.palette.primary.main,
// //               },
// //             }}
// //           >
// //             {hovered ? item.activeIcon : item.icon}
// //           </ListItemIcon>
// //           {typeof label !== "string" ? (
// //             label
// //           ) : (
// //             <ListItemText
// //               primary={item.label}
// //               sx={{
// //                 opacity: open ? 1 : 0,
// //                 "& .MuiTypography-root": {
// //                   fontSize: "13px",
// //                   marginLeft: "-17px",
// //                 },
// //               }}
// //             />
// //           )}
// //         </ListItemButton>
// //       </ListItem>
// //     </Box>
// //   );
// // };

// const MenuButton = (props: any) => {
//   const {
//     item,
//     handleCollapse,
//     index,
//     open,
//     handleItemClick,
//     handleDrawerOpen,
//   } = props;

//   const location = useLocation();
//   return (
//     <Box sx={{ padding: "0px 12px" }}>
//       <ListItem
//         // onMouseOver={() => handleOnHover(index)}
//         // onMouseOut={() => setSelectedHover(null)}
//         disablePadding
//         sx={{ display: "block", marginTop: "5px" }}
//       >
//         <ListItemButton
//           selected={
//             item.collapsable
//               ? item.items.some((it: any) => location.pathname === it.link)
//               : location.pathname === item.link
//           }
//           onClick={() => {
//             if (item.collapsable) {
//               if (!open) {
//                 handleDrawerOpen();
//               }
//               handleCollapse(item, index);
//             } else {
//               handleItemClick(item);
//             }
//           }}
//           sx={{
//             minHeight: 56,
//             justifyContent: open ? "initial" : "center",
//             px: 2.5,
//             height: "10px",
//             borderRadius: "5px",
//             cursor: "pointer",
//             // "&.Mui-selected": {
//             //   backgroundColor: theme.palette.primary.light,
//             //   color: theme.palette.primary.main,
//             //   "&:hover": {
//             //     backgroundColor: `${theme.palette.primary.hover} !important`,
//             //   },
//             // },
//             // "&:hover": {
//             //   backgroundColor: theme.palette.primary.hover,
//             //   color: theme.palette.primary.main,
//             // },
//             // ...(shouldHighlight && {
//             //   color: theme.palette.primary.main,
//             // }),
//           }}
//         >
//           <ListItemIcon
//             sx={{
//               minWidth: 0,
//               mr: open ? 3 : "auto",
//               justifyContent: "center",
//               // color: hovered
//               //   ? theme.palette.primary.main
//               //   : theme.palette.primary.main,
//               "& .MuiSvgIcon-root": {
//                 maxWidth: "23px",
//                 maxHeight: "25px",
//                 // color: theme.palette.primary.main,
//               },
//             }}
//           >
//             {/* <InboxIcon /> */}
//             {item.icon}
//           </ListItemIcon>
//           {open && (
//             <>
//               <ListItemText primary={item.label} />
//               {item.collapsable ? (
//                 item.collapseOpen ? (
//                   <ExpandLess />
//                 ) : (
//                   <ExpandMore />
//                 )
//               ) : (
//                 <></>
//               )}
//             </>
//           )}{" "}
//         </ListItemButton>
//       </ListItem>

//       {item.collapsable && (
//         <Collapse in={item.collapseOpen} timeout="auto" unmountOnExit>
//           <List
//             component="div"
//             sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
//           >
//             {item.items.map((it: any) => (
//               <ListItemButton
//                 key={it.label}
//                 selected={location.pathname === it.link}
//                 sx={{
//                   pl: 4,
//                   minHeight: 46,
//                   height: "8px",
//                   justifyContent: open ? "initial" : "center",
//                   px: 2.5,
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => {
//                   handleItemClick(it);
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : "auto",
//                     justifyContent: "center",
//                     // color: hovered
//                     //   ? theme.palette.primary.main
//                     //   : theme.palette.primary.main,
//                     "& .MuiSvgIcon-root": {
//                       maxWidth: "23px",
//                       maxHeight: "25px",
//                       // color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   {/* <StarBorder /> */}
//                   {it.icon}
//                 </ListItemIcon>
//                 {open && <ListItemText primary={it.label} />}
//                 {/* <ListItemText primary={it.label} /> */}
//               </ListItemButton>
//             ))}
//           </List>
//         </Collapse>
//       )}
//     </Box>
//   );
// };

// export type NoApplicationModalType = {
//   show: boolean;
//   type: "no_applications" | "incomplete_onboarding";
// };
// interface ISidebar {
//   children?: React.ReactNode;
// }

// export default function Sidebar({ children }: ISidebar) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   // const location = useLocation();
//   const [open, setOpen] = useState(false);
//   // const [collapseOpen, setCollapseOpen] = useState(false);
//   const { userData } = useSelector((store: any) => store.auth);
//   const { progress } = useSelector((store: any) => store.progress);
//   // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   // const menuOpen = Boolean(anchorEl);
//   const [sidebarItems, setSidebarItems] = useState([
//     {
//       label: "Uploads",
//       icon: <CloudUploadOutlinedIcon />,
//       items: menuItems1,
//       collapsable: true,
//       collapseOpen: false,
//     },
//     {
//       label: "Add",
//       icon: <AddIcon />,
//       items: menuItems2,
//       collapsable: true,
//       collapseOpen: false,
//     },
//     {
//       label: "Orders",
//       icon: <ReorderOutlinedIcon />,
//       items: menuItems2,
//       collapsable: false,
//       collapseOpen: false,
//       link: navLinks.R_ORDERS,
//     },
//   ]);

//   const handleCollapse = (_: any, index?: any) => {
//     setSidebarItems((prev: any) => {
//       const newSidebarItems = [...prev];
//       newSidebarItems[index] = {
//         ...newSidebarItems[index],
//         collapseOpen: !newSidebarItems[index].collapseOpen,
//       };
//       return newSidebarItems;
//     });
//   };

//   const handleItemClick = (item: any) => {
//     navigate(item.link);
//   };

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         scrollbarColor: theme.palette.secondary.main,
//       }}
//     >
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           {/* <Typography variant="h6" noWrap component="div">
//             Mini variant drawer
//           </Typography> */}
//         </Toolbar>
//       </AppBar>
//       <LoadingBar color="#f11946" progress={progress} height={3} />
//       <Drawer
//         // className={classNames(css.root)}
//         variant="permanent"
//         open={open}
//         sx={{
//           "& .MuiPaper-root": {
//             backgroundColor: theme.palette.background.paper,
//             position: "absolute",
//             height: "100vh",
//           },
//         }}
//       >
//         <DrawerHeader
//           sx={{
//             // padding: "0px 0px 0px 10px",
//             justifyContent: "space-between",
//             position: "sticky",
//             // ...(open && { alignItems: "center" }),
//             // ...(!open && { alignItems: "flex-end" }),
//             top: 0,
//             height: open ? "165px" : "170px",
//           }}
//         >
//           <img
//             src={logo}
//             alt="Topiq"
//             style={{
//               // height: "37px",
//               height: "47px",
//               ...(!open && {
//                 display: "none",
//               }),
//             }}
//           />
//           <IconButton
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             // edge="end"
//             disableRipple
//             sx={{
//               // margin: "0px -2px 0px -2px",
//               ...(open && { display: "none" }),
//               // backgroundColor: theme.palette.primary.light,
//               // color: theme.palette.primary.main,
//               // borderRadius: "6px !important",
//             }}
//           >
//             <ArrowForwardIcon
//               sx={{
//                 color: theme.palette.primary.main,
//                 backgroundColor: theme.palette.primary.light,
//                 width: "33px",
//                 height: "26px",
//                 padding: "3px",
//                 borderRadius: "6px",
//                 "&:hover": {
//                   color: theme.palette.primary.main,
//                 },
//               }}
//             />
//           </IconButton>
//           <IconButton
//             onClick={handleDrawerClose}
//             sx={{
//               ...(!open && { display: "none" }),
//             }}
//             disableRipple
//           >
//             <ArrowBackIcon
//               sx={{
//                 color: theme.palette.primary.main,
//                 backgroundColor: theme.palette.primary.light,
//                 width: "33px",
//                 height: "26px",
//                 padding: "3px",
//                 borderRadius: "6px",
//                 "&:hover": {
//                   color: theme.palette.primary.main,
//                 },
//               }}
//             />
//           </IconButton>
//         </DrawerHeader>
//         <Box
//           sx={{
//             position: "sticky",
//             top: "65px",
//           }}
//         >
//           <Divider
//             // color={theme.palette.primary.divider}
//             sx={{ margin: "-5px 10px 16px 10px" }}
//           />
//           <List
//             sx={{
//               color: "black",
//               marginTop: "5px",
//               padding: "0px 10px",
//             }}
//           >
//             <ListItem
//               disablePadding
//               sx={{ display: "block", marginTop: "-4px" }}
//             >
//               <ListItemButton
//                 onClick={() => navigate("/")}
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? "initial" : "center",
//                   px: 2.5,
//                   // backgroundColor: theme.palette.primary.light,
//                   // color: theme.palette.text.primary,
//                   borderRadius: "5px",
//                   // "&:hover": {
//                   //   backgroundColor: theme.palette.primary.hover,
//                   // },
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : "auto",
//                     justifyContent: "center",
//                     // color: theme.palette.primary.main,
//                   }}
//                 >
//                   <AppsIcon />
//                 </ListItemIcon>
//                 <Tooltip title="Back To Application">
//                   <ListItemText
//                     primary={open && "Back To Application"}
//                     sx={{
//                       //   opacity: open ? 1 : 0,
//                       "& .MuiTypography-root": {
//                         fontSize: "13px",
//                         fontWeight: "600",
//                         marginLeft: "-15px",
//                         textTransform: "capitalize",
//                         whiteSpace: "nowrap",
//                         maxWidth: "15ch",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                       },
//                     }}
//                   />
//                 </Tooltip>
//               </ListItemButton>
//             </ListItem>
//           </List>
//           <Divider
//             // color={theme.palette.primary.divider}
//             sx={{ margin: "12px 10px 0px 10px" }}
//           />
//         </Box>
//         <Box
//           sx={{
//             height: "100vh",
//             overflowY: "auto",
//             overflowX: "hidden",
//             "&::-webkit-scrollbar": {
//               display: "none",
//             },
//             msOverflowStyle: "none",
//           }}
//         >
//           {/* {sidebarItems.map((app, i: number) => (
//             <React.Fragment key={app.label}>
//               <List
//                 sx={{
//                   color: theme.palette.text.primary,
//                   marginTop: "2px",
//                 }}
//               >
//                 {open && (
//                   <Stack
//                     sx={{
//                       position: "sticky",
//                       top: "0px",
//                       backgroundColor: theme.palette.background.paper,
//                       paddingLeft: "1rem",
//                       zIndex: 1,
//                     }}
//                   >
//                     <Typography
//                       variant="body1"
//                       sx={{
//                         fontWeight: 500,
//                         fontSize: "15px",
//                       }}
//                     >
//                       {app.label}
//                     </Typography>
//                   </Stack>
//                 )}
//                 {app.items.map((item: any, index: number) => (
//                   <MenuButton
//                     item={item}
//                     // index={2}
//                     index={
//                       i === 0
//                         ? index + 1
//                         : i === 1
//                         ? sidebarItems[i - 1].items.length + index + 1
//                         : sidebarItems[i - 2].items.length +
//                           sidebarItems[i - 1].items.length +
//                           index +
//                           1
//                     }
//                     key={item.label}
//                     open={open}
//                     selectedHover={selectedHover}
//                     location={location}
//                     handleOnHover={handleOnHover}
//                     setSelectedHover={setSelectedHover}
//                     selectedIndexForStyle={index}
//                     handleListItemClick={handleListItemClick}
//                   />
//                 ))}
//               </List>
//               <Divider
//                 // color={theme.palette.primary.divider}
//                 sx={{ margin: "0px 10px" }}
//               />
//             </React.Fragment>
//           ))} */}

//           {sidebarItems.map((item, index) => (
//             <MenuButton
//               item={item}
//               index={index}
//               handleCollapse={handleCollapse}
//               open={open}
//               handleItemClick={handleItemClick}
//               handleDrawerOpen={handleDrawerOpen}
//               key={item.label}
//             />
//           ))}
//         </Box>
//         <Stack
//           sx={{
//             position: "sticky",
//             bottom: 0,
//             width: "-webkit-fill-available",
//           }}
//         >
//           <Divider
//             // color={theme.palette.primary.divider}
//             sx={{ margin: "10px 10px 0px 10px" }}
//           />
//           <List sx={{ color: theme.palette.text.primary }}>
//             {bottomItems.map((item, index) => (
//               <MenuButton
//                 item={item}
//                 index={
//                   sidebarItems.reduce(
//                     (acc, curr) => acc + curr.items.length,
//                     0
//                   ) +
//                   index +
//                   1
//                 }
//                 handleCollapse={handleCollapse}
//                 open={open}
//                 handleItemClick={handleItemClick}
//                 handleDrawerOpen={handleDrawerOpen}
//                 key={item.label}
//               />
//             ))}
//           </List>
//           <Divider
//             // color={theme.palette.primary.divider}
//             sx={{ margin: "0px 10px" }}
//           />
//           <List sx={{ color: theme.palette.primary.light, marginTop: "5px" }}>
//             <Box
//               sx={{
//                 padding: "0px 12px",
//                 display: "flex",
//                 flexDirection: open ? "row" : "column",
//                 alignItems: "center",
//                 gap: "0.5rem",
//                 // ...(selectedIndexForStyle === userProfileButtonIndex ||
//                 // location.pathname === navLinks.R_SETTINGS
//                 //   ? {
//                 //       borderLeft: `4px solid ${theme.palette.secondary.main}`,
//                 //       padding: "0px 8px !important",
//                 //     }
//                 //   : {}),
//               }}
//             >
//               <ListItem
//                 // onMouseOver={() => handleOnHover(userProfileButtonIndex)}
//                 // onMouseOut={() => setSelectedHover(null)}
//                 disablePadding
//                 sx={{ display: "block", width: "80%" }}
//               >
//                 <ListItemButton
//                   // selected={
//                   //   // selectedIndexForStyle === userProfileButtonIndex ||
//                   //   location.pathname === navLinks.R_SETTINGS
//                   // }
//                   //   onClick={(e) =>
//                   //     handleListItemClick(
//                   //       e,
//                   //       navLinks.R_SETTINGS,
//                   //     //   userProfileButtonIndex
//                   //     )
//                   //   }
//                   sx={{
//                     minHeight: 30,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                     height: "10px",
//                     borderRadius: "5px",
//                     color: theme.palette.text.primary,
//                     // "&.Mui-selected": {
//                     //   backgroundColor: theme.palette.primary.light,
//                     //   "&:hover": {
//                     //     backgroundColor: `${theme.palette.primary.hover} !important`,
//                     //   },
//                     //   ...(open &&
//                     //     location.pathname !== navLinks.R_SETTINGS && {
//                     //       color: theme.palette.primary.light,
//                     //     }),
//                     // },
//                     // "&:hover": {
//                     //   backgroundColor: theme.palette.primary.hover,
//                     //   color: theme.palette.text.primary,
//                     // },
//                     // ...(location.pathname === navLinks.R_SETTINGS && {
//                     //   color: theme.palette.primary.main,
//                     // }),
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 2 : "auto",
//                       justifyContent: "center",
//                     }}
//                   >
//                     {/* {selectedHover === userProfileButtonIndex ||
//                     location.pathname === navLinks.R_SETTINGS ? (
//                       <UserAccountHoverIcon />
//                     ) : (
//                       <UserAccountWhiteIcon />
//                     )} */}
//                   </ListItemIcon>
//                   {userData.email?.length > 20 ? (
//                     <Tooltip title={userData?.email}>
//                       <ListItemText
//                         primary={userData?.email}
//                         sx={{
//                           opacity: open ? 1 : 0,
//                           "& .MuiTypography-root": {
//                             fontSize: "13px",
//                             marginLeft: "-10px",
//                             whiteSpace: "nowrap",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                           },
//                         }}
//                       />
//                     </Tooltip>
//                   ) : (
//                     <ListItemText
//                       primary={userData?.email}
//                       sx={{
//                         opacity: open ? 1 : 0,
//                         "& .MuiTypography-root": {
//                           fontSize: "13px",
//                           marginLeft: "-17px",
//                         },
//                       }}
//                     />
//                   )}
//                 </ListItemButton>
//               </ListItem>
//               <Tooltip title="Log Out" placement="right">
//                 <LogoutIcon
//                   sx={{
//                     transform: "rotate(180deg)",
//                     color: "rgba(0, 0, 0, 0.54)",
//                     height: "28px",
//                     width: "28px",
//                     background: theme.palette.primary.light,
//                     border: "2px solid",
//                     borderColor: theme.palette.primary.light,
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => dispatch(logout())}
//                 />
//               </Tooltip>
//             </Box>
//           </List>
//         </Stack>
//       </Drawer>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           // backgroundColor: "white",
//           // height: "100vh",
//           height: "calc(100vh  - 90px)",
//           overflow: "auto",
//           "::-webkit-scrollbar": {
//             display: "none",
//           },
//           // marginTop: "-25px",
//           // height: {
//           //   xs: "450px",
//           //   sm: "450px",
//           //   md: "600px",
//           // },
//           // overflow: "auto",
//         }}
//       >
//         {/* <DrawerHeader /> */}
//         {/* <MainLayout /> */}
//         {children}
//         {/* <Typography paragraph>
//           // Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do //
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus //
//           dolor purus non enim praesent elementum facilisis leo vel. Risus at //
//           ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
//           // quisque non tellus. Convallis convallis tellus id interdum velit //
//           laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed //
//           adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies //
//           integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
//           // eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
//           // quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat //
//           vivamus at augue. At augue eget arcu dictum varius duis at consectetur
//           // lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
//           sapien // faucibus et molestie ac.
//         </Typography>
//         <Typography paragraph>
//           // Consequat mauris nunc congue nisi vitae suscipit. Fringilla est //
//           ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar //
//           elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
//           // sed nisi lacus sed viverra tellus. Purus sit amet volutpat
//           consequat // mauris. Elementum eu facilisis sed odio morbi. Euismod
//           lacinia at quis // risus sed vulputate odio. Morbi tincidunt ornare
//           massa eget egestas // purus viverra accumsan in. In hendrerit gravida
//           rutrum quisque non // tellus orci ac. Pellentesque nec nam aliquam sem
//           et tortor. Habitant // morbi tristique senectus et. Adipiscing elit
//           duis tristique // sollicitudin nibh sit. Ornare aenean euismod
//           elementum nisi quis // eleifend. Commodo viverra maecenas accumsan
//           lacus vel facilisis. Nulla // posuere sollicitudin aliquam ultrices
//           sagittis orci a.
//         </Typography> */}
//       </Box>
//     </Box>
//   );
// }

// ******------------------------------Updated Below---------------------------------------------*****

/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import {
  Box,
  List,
  CssBaseline,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
// import classNames from "classnames";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../../store/slices/AuthSlice";
import { Collapse, Stack, Toolbar, Tooltip } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import theme from "../../../theme";
import logo from "../../../assets/logo.png";
import ViewCarouselOutlinedIcon from "@mui/icons-material/ViewCarouselOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AddIcon from "@mui/icons-material/Add";
import ReorderOutlinedIcon from "@mui/icons-material/ReorderOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import * as navLinks from "../../../routes/constants";
import { AppBar } from "./AppBar";
import LoadingBar from "react-top-loading-bar";
// import css from "../../css/modules/sidebarMain.module.scss";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 5px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const menuItems1 = [
  {
    icon: <ViewCarouselOutlinedIcon sx={{ color: "#ffffff" }} />,
    activeIcon: <ViewCarouselOutlinedIcon />,
    label: "Banner",
    link: navLinks.R_UPLOAD_BANNER,
  },
  {
    icon: <InsertPhotoIcon sx={{ color: "#ffffff" }} />,
    activeIcon: <InsertPhotoIcon />,
    label: "Products",
    link: navLinks.R_UPLOAD_PRODUCTS,
  },
];
const menuItems2 = [
  {
    icon: <CategoryIcon sx={{ color: "#ffffff" }} />,
    activeIcon: <CategoryIcon />,
    label: "Category",
    link: navLinks.R_ADD_CATEGORY,
  },
  {
    icon: <ClassIcon sx={{ color: "#ffffff" }} />,
    activeIcon: <ClassIcon />,
    label: "Sub Category",
    link: navLinks.R_ADD_SUB_CATEGORY,
  },
];

const bottomItems = [
  {
    icon: <GroupsOutlinedIcon sx={{ color: "#ffffff" }} />,
    activeIcon: <GroupsOutlinedIcon />,
    label: "Users",
    collapsable: false,
    // link: navLinks.R_TEAM,
    link: navLinks.R_USERS_LIST,
  },
  {
    icon: <SettingsOutlinedIcon sx={{ color: "#ffffff" }} />,
    activeIcon: <SettingsOutlinedIcon />,
    label: "Settings",
    collapsable: false,
    // link: navLinks.R_TEAM,
    link: navLinks.R_SETTINGS,
  },
];

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MenuButton = (props: any) => {
  const {
    item,
    handleCollapse,
    index,
    open,
    handleItemClick,
    handleDrawerOpen,
  } = props;

  const location = useLocation();
  return (
    <Box sx={{ padding: "0px 12px" }}>
      <ListItem
        // onMouseOver={() => handleOnHover(index)}
        // onMouseOut={() => setSelectedHover(null)}
        disablePadding
        sx={{ display: "block", marginTop: "5px" }}
      >
        <ListItemButton
          selected={
            item.collapsable
              ? item.items.some((it: any) => location.pathname === it.link)
              : location.pathname === item.link
          }
          onClick={() => {
            if (item.collapsable) {
              if (!open) {
                handleDrawerOpen();
              }
              handleCollapse(item, index);
            } else {
              handleItemClick(item);
            }
          }}
          sx={{
            minHeight: 40,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
            height: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            ...(item.collapsable &&
            item.items.some((it: any) => location.pathname === it.link)
              ? { background: "linear-gradient(to right, #0a192f, #1467c6)" }
              : location.pathname === item.link
              ? {
                  // background: "linear-gradient(to right, #1e3a8a, #007bff)"
                  background: "linear-gradient(to right, #0a192f, #1467c6)",
                }
              : {}),
            "&:hover": {
              background: "linear-gradient(to right, #0a192f, #1467c6)",
            },

            // "&.Mui-selected": {
            //   backgroundColor: theme.palette.primary.light,
            //   color: theme.palette.primary.main,
            //   "&:hover": {
            //     backgroundColor: `${theme.palette.primary.hover} !important`,
            //   },
            // },
            // "&:hover": {
            //   backgroundColor: theme.palette.primary.hover,
            //   color: theme.palette.primary.main,
            // },
            // ...(shouldHighlight && {
            //   color: theme.palette.primary.main,
            // }),
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
              // color: hovered
              //   ? theme.palette.primary.main
              //   : theme.palette.primary.main,
              "& .MuiSvgIcon-root": {
                maxWidth: "23px",
                maxHeight: "25px",
                // color: theme.palette.primary.main,
              },
            }}
          >
            {/* <InboxIcon /> */}
            {item.icon}
          </ListItemIcon>
          {open && (
            <>
              <ListItemText primary={item.label} />
              {item.collapsable ? (
                item.collapseOpen ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : (
                <></>
              )}
            </>
          )}{" "}
        </ListItemButton>
      </ListItem>

      {item.collapsable && (
        <Collapse in={item.collapseOpen} timeout="auto" unmountOnExit>
          <List
            component="div"
            sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {item.items.map((it: any) => (
              <ListItemButton
                key={it.label}
                selected={location.pathname === it.link}
                sx={{
                  pl: 4,
                  minHeight: 30,
                  height: "8px",
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  borderRadius: "5px",
                  cursor: "pointer",
                  ...(location.pathname === it.link && {
                    background: "linear-gradient(to right, #0a192f, #1467c6)",
                  }),
                  "&:hover": {
                    background: "linear-gradient(to right, #0a192f, #1467c6)",
                  },
                }}
                onClick={() => {
                  handleItemClick(it);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    // color: hovered
                    //   ? theme.palette.primary.main
                    //   : theme.palette.primary.main,
                    "& .MuiSvgIcon-root": {
                      maxWidth: "23px",
                      maxHeight: "25px",
                      // color: theme.palette.primary.main,
                    },
                  }}
                >
                  {/* <StarBorder /> */}
                  {it.icon}
                </ListItemIcon>
                {open && <ListItemText primary={it.label} />}
                {/* <ListItemText primary={it.label} /> */}
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  );
};

export type NoApplicationModalType = {
  show: boolean;
  type: "no_applications" | "incomplete_onboarding";
};
interface ISidebar {
  children?: React.ReactNode;
}

export default function Sidebar({ children }: ISidebar) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  const [open, setOpen] = useState(false);
  // const [collapseOpen, setCollapseOpen] = useState(false);
  const { userData } = useSelector((store: any) => store.auth);
  const { progress } = useSelector((store: any) => store.progress);
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const menuOpen = Boolean(anchorEl);
  const [sidebarItems, setSidebarItems] = useState([
    {
      label: "Uploads",
      icon: <CloudUploadOutlinedIcon sx={{ color: "#ffffff" }} />,
      items: menuItems1,
      collapsable: true,
      collapseOpen: false,
    },
    {
      label: "Add",
      icon: <AddIcon sx={{ color: "#ffffff" }} />,
      items: menuItems2,
      collapsable: true,
      collapseOpen: false,
    },
    {
      label: "Orders",
      icon: <ReorderOutlinedIcon sx={{ color: "#ffffff" }} />,
      items: menuItems2,
      collapsable: false,
      collapseOpen: false,
      link: navLinks.R_ORDERS,
    },
  ]);

  const handleCollapse = (_: any, index?: any) => {
    setSidebarItems((prev: any) => {
      const newSidebarItems = [...prev];
      newSidebarItems[index] = {
        ...newSidebarItems[index],
        collapseOpen: !newSidebarItems[index].collapseOpen,
      };
      return newSidebarItems;
    });
  };

  const handleItemClick = (item: any) => {
    navigate(item.link);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        scrollbarColor: theme.palette.secondary.main,
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {/* <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography> */}
        </Toolbar>
      </AppBar>
      <LoadingBar
        // color="linear-gradient(to right, #0a192f, #1467c6)"
        color="linear-gradient(to right,#1467c6, #0a192f)"
        progress={progress}
        height={3}
      />
      <Drawer
        // className={classNames(css.root)}
        variant="permanent"
        open={open}
        sx={{
          "& .MuiPaper-root": {
            // backgroundColor: theme.palette.background.paper,
            // backgroundColor: "#121212",
            background: "linear-gradient(to bottom, #212121, #000000)",
            color: "#ffffff",
            position: "absolute",
            height: "100vh",
          },
        }}
      >
        <DrawerHeader
          sx={{
            // padding: "0px 0px 0px 10px",
            justifyContent: "space-between",
            position: "sticky",
            // ...(open && { alignItems: "center" }),
            // ...(!open && { alignItems: "flex-end" }),
            top: 0,
            height: open ? "165px" : "170px",
          }}
        >
          <img
            src={logo}
            alt="Topiq"
            style={{
              // height: "37px",
              height: "47px",
              ...(!open && {
                display: "none",
              }),
            }}
          />
          <Typography
            sx={{
              ...(!open && {
                display: "none",
              }),
              fontWeight: "bold",
            }}
          >
            Admin Portal
          </Typography>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            // edge="end"
            disableRipple
            sx={{
              // margin: "0px -2px 0px -2px",
              ...(open && { display: "none" }),
              // backgroundColor: theme.palette.primary.light,
              // color: theme.palette.primary.main,
              // borderRadius: "6px !important",
            }}
          >
            <ArrowForwardIcon
              fontSize="large"
              sx={{
                // color: theme.palette.primary.main,
                // backgroundColor: theme.palette.primary.light,
                color: "#ffff",
                width: "33px",
                height: "26px",
                padding: "3px",
                borderRadius: "6px",
                "&:hover": {
                  // color: theme.palette.primary.main,
                  color: "#1467c6",
                },
              }}
            />
          </IconButton>
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              ...(!open && { display: "none" }),
            }}
            disableRipple
          >
            <ArrowBackIcon
              sx={{
                // color: theme.palette.primary.main,
                // backgroundColor: theme.palette.primary.light,
                color: "#ffff",
                width: "33px",
                height: "26px",
                padding: "3px",
                borderRadius: "6px",
                "&:hover": {
                  // color: theme.palette.primary.main,
                  color: "#1467c6",
                },
              }}
            />
          </IconButton>
        </DrawerHeader>
        <Box
          sx={{
            position: "sticky",
            top: "65px",
          }}
        >
          <Divider
            // color={theme.palette.primary.divider}
            sx={{ margin: "-5px 10px 16px 10px" }}
          />
          <List
            sx={{
              color: "black",
              marginTop: "5px",
              padding: "0px 10px",
            }}
          >
            <ListItem
              disablePadding
              sx={{ display: "block", marginTop: "-4px" }}
            >
              <ListItemButton
                onClick={() => navigate("/")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  // backgroundColor: theme.palette.primary.light,
                  // color: theme.palette.text.primary,
                  borderRadius: "5px",
                  // "&:hover": {
                  //   backgroundColor: theme.palette.primary.hover,
                  // },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    // color: theme.palette.primary.main,
                  }}
                >
                  <AppsIcon sx={{ color: "#ffffff" }} />
                </ListItemIcon>
                <Tooltip
                  title="Back To Application"
                  placement="top-start"
                  PopperProps={{
                    modifiers: [
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "window",
                        },
                      },
                    ],
                  }}
                  componentsProps={{
                    tooltip: {
                      sx: {
                        color: "#ffff", // 🔥 Custom Text Color
                        backgroundColor: "#1467c6", // 🔥 Custom Background Color
                        fontSize: "12px",
                        fontWeight: "bold",
                      },
                    },
                  }}
                >
                  <ListItemText
                    primary={open && "Back To Application"}
                    sx={{
                      //   opacity: open ? 1 : 0,
                      "& .MuiTypography-root": {
                        fontSize: "13px",
                        fontWeight: "600",
                        marginLeft: "-15px",
                        textTransform: "capitalize",
                        whiteSpace: "nowrap",
                        maxWidth: "15ch",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "#ffffff",
                      },
                    }}
                  />
                </Tooltip>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider
            // color={theme.palette.primary.divider}
            sx={{ margin: "12px 10px 0px 10px" }}
          />
        </Box>
        <Box
          sx={{
            height: "100vh",
            overflowY: "auto",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
          }}
        >
          {sidebarItems.map((item, index) => (
            <MenuButton
              item={item}
              index={index}
              handleCollapse={handleCollapse}
              open={open}
              handleItemClick={handleItemClick}
              handleDrawerOpen={handleDrawerOpen}
              key={item.label}
            />
          ))}
        </Box>
        <Stack
          sx={{
            position: "sticky",
            bottom: 0,
            width: "-webkit-fill-available",
          }}
        >
          <Divider
            // color={theme.palette.primary.divider}
            sx={{ margin: "10px 10px 0px 10px" }}
          />
          <List
            sx={{
              // color: theme.palette.text.primary
              color: "#ffffff",
            }}
          >
            {bottomItems.map((item, index) => (
              <MenuButton
                item={item}
                index={
                  sidebarItems.reduce(
                    (acc, curr) => acc + curr.items.length,
                    0
                  ) +
                  index +
                  1
                }
                handleCollapse={handleCollapse}
                open={open}
                handleItemClick={handleItemClick}
                handleDrawerOpen={handleDrawerOpen}
                key={item.label}
              />
            ))}
          </List>
          <Divider
            // color={theme.palette.primary.divider}
            sx={{ margin: "0px 10px" }}
          />
          <List sx={{ color: theme.palette.primary.light, marginTop: "5px" }}>
            <Box
              sx={{
                padding: "0px 12px",
                display: "flex",
                flexDirection: open ? "row" : "column",
                alignItems: "center",
                gap: "0.5rem",
                // ...(selectedIndexForStyle === userProfileButtonIndex ||
                // location.pathname === navLinks.R_SETTINGS
                //   ? {
                //       borderLeft: `4px solid ${theme.palette.secondary.main}`,
                //       padding: "0px 8px !important",
                //     }
                //   : {}),
              }}
            >
              <ListItem
                // onMouseOver={() => handleOnHover(userProfileButtonIndex)}
                // onMouseOut={() => setSelectedHover(null)}
                disablePadding
                sx={{ display: "block", width: "80%" }}
              >
                <ListItemButton
                  // selected={
                  //   // selectedIndexForStyle === userProfileButtonIndex ||
                  //   location.pathname === navLinks.R_SETTINGS
                  // }
                  //   onClick={(e) =>
                  //     handleListItemClick(
                  //       e,
                  //       navLinks.R_SETTINGS,
                  //     //   userProfileButtonIndex
                  //     )
                  //   }
                  sx={{
                    minHeight: 30,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    height: "10px",
                    borderRadius: "5px",
                    color: theme.palette.text.primary,
                    // "&.Mui-selected": {
                    //   backgroundColor: theme.palette.primary.light,
                    //   "&:hover": {
                    //     backgroundColor: `${theme.palette.primary.hover} !important`,
                    //   },
                    //   ...(open &&
                    //     location.pathname !== navLinks.R_SETTINGS && {
                    //       color: theme.palette.primary.light,
                    //     }),
                    // },
                    // "&:hover": {
                    //   backgroundColor: theme.palette.primary.hover,
                    //   color: theme.palette.text.primary,
                    // },
                    // ...(location.pathname === navLinks.R_SETTINGS && {
                    //   color: theme.palette.primary.main,
                    // }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {/* {selectedHover === userProfileButtonIndex ||
                    location.pathname === navLinks.R_SETTINGS ? (
                      <UserAccountHoverIcon />
                    ) : (
                      <UserAccountWhiteIcon />
                    )} */}
                  </ListItemIcon>
                  {userData.email?.length > 20 ? (
                    <Tooltip
                      title={userData?.email}
                      PopperProps={{
                        modifiers: [
                          {
                            name: "preventOverflow",
                            options: {
                              boundary: "window",
                            },
                          },
                        ],
                      }}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            color: "#ffff", // 🔥 Custom Text Color
                            backgroundColor: "#1467c6", // 🔥 Custom Background Color
                            fontSize: "12px",
                            fontWeight: "bold",
                          },
                        },
                      }}
                    >
                      <ListItemText
                        primary={userData?.email}
                        sx={{
                          opacity: open ? 1 : 0,
                          "& .MuiTypography-root": {
                            fontSize: "13px",
                            marginLeft: "-10px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            color: "#ffffff",
                          },
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <ListItemText
                      primary={userData?.email}
                      sx={{
                        opacity: open ? 1 : 0,
                        "& .MuiTypography-root": {
                          fontSize: "13px",
                          marginLeft: "-17px",
                          color: "#ffffff",
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
              <Tooltip
                title="Log Out"
                placement="top"
                PopperProps={{
                  modifiers: [
                    {
                      name: "preventOverflow",
                      options: {
                        boundary: "window",
                      },
                    },
                  ],
                }}
                componentsProps={{
                  tooltip: {
                    sx: {
                      color: "#ffff", // 🔥 Custom Text Color
                      backgroundColor: "#1467c6", // 🔥 Custom Background Color
                      fontSize: "12px",
                      fontWeight: "bold",
                    },
                  },
                }}
              >
                <LogoutIcon
                  sx={{
                    transform: "rotate(180deg)",
                    // color: "rgba(0, 0, 0, 0.54)",
                    height: "28px",
                    width: "28px",
                    // background: theme.palette.primary.light,
                    // border: "2px solid",
                    // borderColor: theme.palette.primary.light,
                    // borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => dispatch(logout())}
                />
              </Tooltip>
            </Box>
          </List>
        </Stack>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // backgroundColor: "white",
          // height: "100vh",
          height: "calc(100vh  - 90px)",
          overflow: "auto",
          "::-webkit-scrollbar": {
            display: "none",
          },
          // marginTop: "-25px",
          // height: {
          //   xs: "450px",
          //   sm: "450px",
          //   md: "600px",
          // },
          // overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
