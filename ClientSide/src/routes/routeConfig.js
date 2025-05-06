import AdminDashboard from "../pages/admin/AdminDashboard";
import CustomerProfile from "../pages/customer/CustomerProfile";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OtpVerificationPage from "../pages/OtpVerificationPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import AboutUsPage from "../pages/AboutUs";
import Deals from "../pages/Deals";

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
  {
    path: "/customer/cart",
    component: CartPage,
    public: true,
  },
  {
    path: "/customer/checkout",
    component: CheckoutPage,
    public: true,
  },
  {
    path: "/customer/otp-verification",
    component: OtpVerificationPage,
    public: true,
  },
  {
    path: "/customer/reset-password",
    component: ResetPasswordPage,
    public: true,
  },
  {
    path: "/about-us",
    component: AboutUsPage,
    public: true,
  },
  {
    path: "/deals",
    component: Deals,
    public: true,
  }
];
