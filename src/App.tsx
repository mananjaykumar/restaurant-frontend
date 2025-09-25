import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
// import Sidebar from "./components/Layout/Sidebar";
import { Stack } from "@mui/material";
import TopAppBar from "./components/Layout/TopAppBar";
import Dashboard from "./components/Dashboard";
import AdminBanner from "./components/Admin/uploads/AdminBanner";
import AdminMostLoved from "./components/Admin/uploads/AdminProducts";
import AddAdminCategory from "./components/Admin/Add/AddAdminCategory";
import AddAdminSubCategory from "./components/Admin/Add/AddAdminSubCategory";
import { NoMatch } from "./pages/NoMatch";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import Protected from "./routes/Protected";
import Admin from "./components/Admin";
import NewSidebarMain from "./components/Admin/AdminLayout/Sidebar";
import * as navLinks from "./routes/constants";
import UsersList from "./components/Admin/Users/UsersList";
import Footer from "./components/Layout/Footer";
import "aos/dist/aos.css";
import LoadingBar from "react-top-loading-bar";
import EnhancedTable from "./components/reusable/MuiTable";
import AdminOrders from "./components/Admin/Orders";
import { socket } from "./socket";
import NewOrder from "./components/Orders/NewOrder";
import CheckOut from "./components/Orders/CheckOut";
import Orders from "./components/Orders";
import OrderDetails from "./components/Orders/OrderDetails";
import Settings from "./components/Admin/Settings";

interface Props {
  children: React.ReactNode;
}
const HOC = ({ children }: Props) => {
  const { progress } = useSelector((state: any) => state.progress);
  return (
    <>
      <TopAppBar />
      <LoadingBar color="#f11946" progress={progress} height={3} />
      {children}
      <Footer />
    </>
  );
};
const HOCAdmin = ({ children }: Props) => {
  return <NewSidebarMain>{children}</NewSidebarMain>;
};

function DynamicTitle() {
  const location = useLocation();
  // const appName = "| Restaurant Application";
  const appName = "| Khane Khana";

  useEffect(() => {
    const titles: Record<string, string> = {
      [`${navLinks.ROOT}`]: `Home ${appName}`,
      [`${navLinks.ORDERS}`]: `Orders ${appName}`,
      [`${navLinks.DASHBOARD}`]: `Dashboard ${appName}`,
      [`${navLinks.CHECKOUT}`]: `Checkout ${appName}`,
      [`${navLinks.PROFILE}`]: `Profile ${appName}`,
      [`${navLinks.SEARCH}`]: `Search ${appName}`,
      [`${navLinks.HELP}`]: `Help ${appName}`,
      // Admin routes start here
      [`${navLinks.R_UPLOAD_BANNER}`]: "Upload Banner",
      [`${navLinks.R_UPLOAD_PRODUCTS}`]: "Upload Products",
      [`${navLinks.R_ADD_CATEGORY}`]: "Add Category",
      [`${navLinks.R_ADD_SUB_CATEGORY}`]: "Add Sub Category",
      [`${navLinks.R_ORDERS}`]: "Orders",
      [`${navLinks.R_USERS_LIST}`]: "Users",
      [`${navLinks.R_SETTINGS}`]: "Settings",
    };

    // Handling dynamic routes like "/user/order/:id"
    if (
      location.pathname.startsWith(navLinks.ORDER_DETAILS.replace(":id", "")) ||
      location.pathname.startsWith(navLinks.PRODUCT_DETAILS.replace(":id", ""))
    ) {
      document.title = location.pathname.startsWith(
        navLinks.ORDER_DETAILS.replace(":id", "")
      )
        ? `Order Details ${appName}`
        : `Product Details ${appName}`;
    } else if (location.pathname.startsWith(navLinks.R_ROOT)) {
      // document.title = `${
      //   titles[location.pathname] || "Restaurant Application"
      // }  | Admin`;
      document.title = `${
        titles[location.pathname] || "Khane Khana"
      }  | Admin`;
    } else {
      // document.title = titles[location.pathname] || "Restaurant Application";
      document.title = titles[location.pathname] || "Khane Khana";
    }
  }, [location.pathname]);

  return null;
}

function App() {
  const { userData } = useSelector((state: any) => state.auth);
  const location = useLocation();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connection established");
    });
  });
  return (
    <div style={{ display: "flex", flexFlow: "column" }}>
      <DynamicTitle />
      {/* <Sidebar /> */}
      <div style={{ flex: 1 }}>
        {/* <TopAppBar /> */}
        <Stack mt={location.pathname.includes("admin") ? "90px" : "130px"}>
          <Routes>
            <Route
              path={navLinks.ROOT}
              element={
                <HOC>
                  <Home />
                </HOC>
              }
            />
            <Route path={navLinks.R_ROOT} element={<Admin />} />
            <Route
              element={
                <Protected
                  redirectPath={navLinks.ROOT}
                  isAllowed={
                    (userData?.token ? true : false) &&
                    (userData?.role?.includes("user") ? true : false)
                  }
                />
              }
            >
              <Route
                path={navLinks.DASHBOARD}
                element={
                  <HOC>
                    <Dashboard />
                  </HOC>
                }
              />
              <Route
                path={navLinks.CHECKOUT}
                element={
                  <HOC>
                    <CheckOut />
                  </HOC>
                }
              />
              <Route
                path={navLinks.ORDERS}
                element={
                  <HOC>
                    <Orders />
                  </HOC>
                }
              />
              <Route
                path={navLinks.ORDER_DETAILS}
                element={
                  <HOC>
                    <OrderDetails />
                  </HOC>
                }
              />

              {/* Temporary Route */}
              <Route
                path="/place-order"
                element={
                  <HOC>
                    <NewOrder />
                  </HOC>
                }
              />
            </Route>

            <Route
              element={
                <Protected
                  redirectPath={navLinks.R_ROOT}
                  isAllowed={
                    (userData?.token ? true : false) &&
                    (userData?.role?.includes("admin") ? true : false)
                  }
                />
              }
            >
              <Route
                path={navLinks.R_ADD_CATEGORY}
                element={
                  <HOCAdmin>
                    <AddAdminCategory />
                  </HOCAdmin>
                }
              />
              <Route
                path={navLinks.R_ADD_SUB_CATEGORY}
                element={
                  <HOCAdmin>
                    <AddAdminSubCategory />
                  </HOCAdmin>
                }
              />
              <Route
                path={navLinks.R_UPLOAD_BANNER}
                element={
                  <HOCAdmin>
                    <AdminBanner />
                  </HOCAdmin>
                }
              />
              {/* <Route
                path={navLinks.R_UPLOAD_BANNER}
                element={
                  <HOCAdmin>
                    <AdminBanner />
                  </HOCAdmin>
                }
              /> */}
              <Route
                path={navLinks.R_UPLOAD_PRODUCTS}
                element={
                  <HOCAdmin>
                    <AdminMostLoved />
                  </HOCAdmin>
                }
              />
              <Route
                path={navLinks.R_TEST}
                element={
                  <HOCAdmin>
                    <Stack
                      sx={{
                        padding: "5px 20px",
                        marginTop: "50px",
                      }}
                    >
                      <EnhancedTable />
                    </Stack>
                  </HOCAdmin>
                }
              />
              <Route
                path={navLinks.R_ORDERS}
                element={
                  <HOCAdmin>
                    <Stack
                      sx={{
                        padding: "5px 20px",
                        marginTop: "40px",
                      }}
                    >
                      <AdminOrders />
                    </Stack>
                  </HOCAdmin>
                }
              />
              <Route
                path={navLinks.R_USERS_LIST}
                element={
                  <HOCAdmin>
                    <UsersList />
                  </HOCAdmin>
                }
              />
              <Route
                path={navLinks.R_SETTINGS}
                element={
                  <HOCAdmin>
                    <Settings />
                  </HOCAdmin>
                }
              />
            </Route>
            <Route
              path="*"
              element={
                <HOC>
                  <NoMatch />
                </HOC>
              }
            />

            {/* <Route
              path="/"
              element={
                <HOC>
                  <Home />
                </HOC>
              }
            />
            <Route
              path="/admin/uploads/most-loved"
              element={<AdminMostLoved />}
            />
            {userData?.token ? (
              <>
                <Route
                  path="/dashboard"
                  element={
                    <HOC>
                      <Dashboard />
                    </HOC>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <HOC>
                      <Users />
                    </HOC>
                  }
                />
              </>
            ) : (
              <Route
                path="*"
                element={
                  <HOC>
                    <LoginFirst>
                      <Home />
                    </LoginFirst>
                  </HOC>
                }
              />
            )}

            {userData?.token && AdminData?.token ? (
              <Route path="/admin/uploads/banner" element={<AdminBanner />} />
            ) : (
              userData?.token && (
                <Route path="*" element={<>Admin Login First</>} />
              )
            )}
            <Route
              path="*"
              element={
                <HOC>
                  <NoMatch />
                </HOC>
              }
            /> */}
          </Routes>
        </Stack>
      </div>
    </div>
  );
}

export default App;
