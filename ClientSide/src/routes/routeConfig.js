import AdminDashboard from "../pages/admin/AdminDashboard";
import StaffDashboard from "../pages/staff/StaffDashboard";
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
import InvoicePage from "../pages/InvoicePage";
import CatalogPage from "../pages/CatalogPage";
import BookDetailsPage from "../pages/BookDetailsPage";
import ProfilePage from "../pages/ProfilePage";
import BooksDashboard from "../pages/admin/BooksDashboard";
import AdminBookDetailsPage from "../pages/admin/components/BookDetailPage";

import AdminAnnouncement from "../pages/admin/AdminAnnouncement";

import ProcessOrders from "../pages/staff/ProcessOrders";
import AddBookForm from "../pages/admin/components/AddBookForm";
import DiscountHistory from "../pages/admin/DiscountHistory";
import BookDiscountHistory from "../pages/admin/components/BookDiscountHistory";
import AddBookDiscount from "../pages/admin/components/AddBookDiscount";
import EditBookDiscount from "../pages/admin/components/EditBookDiscount";
import FavouritesPage from "../pages/FavouritesPage";

export const routeConfig = [
  {
    path: "/",
    component: HomePage,
    public: true,
  },

  {
  path: "/customer/favorites",
    component: FavouritesPage,
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
    path: "/otp-verification",
    component: OtpVerificationPage,
    public: true,
  },
  {
    path: "/reset-password",
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
  },
  {
    path: "/books/:id",
    component: BookDetailsPage,
    public: true,
  },
  {
    path: "/invoice",
    component: InvoicePage,
    public: true,
  },
  {
    path: "/catalog",
    component: CatalogPage,
    public: true,
  },
  {
    path: "/profile",
    component: ProfilePage,
    public: true,
  },
  {
    path: "/staff/dashboard",
    component: StaffDashboard,
    allowedRoles: ["staff"],
  },
  {
    path: "/staff/process-orders",
    component: ProcessOrders,
    allowedRoles: ["staff"],
  },
  {
    path: "/admin/dashboard",
    component: AdminDashboard,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/books",
    component: BooksDashboard,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/books/:id",
    component: AdminBookDetailsPage,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/announcements",
    component: AdminAnnouncement,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/books/add",
    component: AddBookForm,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/books/discount",
    component: DiscountHistory,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/books/discount/:bookId",
    component: BookDiscountHistory,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/books/:bookId/add-discount",
    component: AddBookDiscount,
    allowedRoles: ["admin"],
  },
  {
    path: "/admin/books/:bookId/edit-discount/:discountId",
    component: EditBookDiscount,
    allowedRoles: ["admin"],
  },

];
