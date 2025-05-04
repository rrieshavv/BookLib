import AdminDashboard from "../pages/admin/AdminDashboard";
import CustomerProfile from "../pages/customer/CustomerProfile";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

export const routeConfig = [
  {
    path: "/",
    component: HomePage,
    public: true,
  },
  {
    path: "/login",
    component: LoginPage,
    public: true,
  },
  {
    path: "/admin/dashboard",
    component: AdminDashboard,
    allowedRoles: ["admin"],
  },
  {
    path: "/customer/profile",
    component: CustomerProfile,
    allowedRoles: ["customer"],
  },
];
