import AdminDashboard from "../pages/admin/AdminDashboard";
import CustomerProfile from "../pages/customer/CustomerProfile";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";

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
    path: "/register",
    component: RegisterPage,
    public: true,
  },
  {
    path: "/forget-password",
    component: ForgetPasswordPage,
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
