import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { clearAuthData, getRole } from "../../utils/authStorage";
import { toast } from "react-toastify";
import { getUserInfo, changePassword } from "../../services/authService";
import NavLinks from "./NavLinks";
import UserDropdown from "./UserDropdown";
import ChangePasswordModal from "./ChangePasswordModal";

const NavBar = ({ theme = "dark" }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState();
  const [name, setName] = useState("loading");
  const [email, setEmail] = useState("loading");
  const [img, setImg] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Form state
  const [formState, setFormState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const isDark = theme === "dark";

  useEffect(() => {
    const roleValue = getRole();
    setRole(roleValue);
    if (roleValue) {
      loadUserInfo();
    }
  }, []);

  const loadUserInfo = async () => {
    const res = await getUserInfo();
    if (res.success) {
      setName(res.data.firstName + " " + res.data.lastName);
      setEmail(res.data.email);
      setImg(res.data.profileImage);
    }
  };

  const toggleProfile = () => setProfileOpen(!profileOpen);
  const togglePasswordModal = () => {
    setShowPasswordModal(!showPasswordModal);
    if (!showPasswordModal) {
      resetPasswordForm();
    }
  };

  const resetPasswordForm = () => {
    setFormState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setFormErrors({});
    setSubmitStatus("");
    setStatusMessage("");
    setPasswordStrength({
      score: 0,
      hasMinLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false,
    });
  };

  // Password validation
  useEffect(() => {
    const { newPassword } = formState;
    if (newPassword) {
      const strength = {
        hasMinLength: newPassword.length >= 8,
        hasUpperCase: /[A-Z]/.test(newPassword),
        hasLowerCase: /[a-z]/.test(newPassword),
        hasNumber: /[0-9]/.test(newPassword),
        hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(newPassword),
      };
      const score = Object.values(strength).filter(Boolean).length;
      setPasswordStrength({ ...strength, score });
    }
  }, [formState.newPassword]);

  const validatePasswordForm = () => {
    const errors = {};
    const { currentPassword, newPassword, confirmPassword } = formState;

    if (!currentPassword) errors.currentPassword = "Current password is required";
    if (!newPassword) errors.newPassword = "New password is required";
    else if (newPassword.length < 8) errors.newPassword = "Password must be at least 8 characters";
    else if (passwordStrength.score < 3) errors.newPassword = "Password is too weak";
    if (!confirmPassword) errors.confirmPassword = "Please confirm your new password";
    else if (newPassword !== confirmPassword) errors.confirmPassword = "Passwords do not match";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordUpdate = async () => {
    if (!validatePasswordForm()) return;
    setSubmitStatus("loading");
    try {
      const res = await changePassword(formState.currentPassword, formState.newPassword);
      if (res.success) {
        setSubmitStatus("success");
        setStatusMessage(res.message || "Password updated successfully!");
        setTimeout(() => togglePasswordModal(), 1500);
      } else {
        setSubmitStatus("error");
        setStatusMessage(res.message || "Failed to update password");
      }
    } catch (err) {
      setSubmitStatus("error");
      setStatusMessage("Something went wrong. Try again.");
    }
  };

  const handleLogout = () => {
    clearAuthData();
    setRole();
    setProfileOpen(false);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      <header
        className={`absolute top-0 left-0 w-full z-20 px-6 md:px-16 py-4 flex items-center justify-between ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <h1 className="text-xl font-bold">BookLib</h1>
        <div className="flex items-center space-x-6">
          <NavLinks role={role} />
          {role && (
            <div className="relative ml-4">
              <button
                onClick={toggleProfile}
                className="text-xl hover:text-emerald-500 flex items-center justify-center h-full"
                aria-label="User Profile"
              >
                <FiUser className="align-middle" />
              </button>
              {profileOpen && (
                <UserDropdown
                  name={name}
                  email={email}
                  img={img}
                  role={role}
                  onLogout={handleLogout}
                  onChangePassword={togglePasswordModal}
                />
              )}
            </div>
          )}
        </div>
      </header>

      {showPasswordModal && (
        <ChangePasswordModal
          onClose={togglePasswordModal}
          onSubmit={handlePasswordUpdate}
          status={submitStatus}
          message={statusMessage}
          formState={formState}
          setFormState={setFormState}
          errors={formErrors}
          setErrors={setFormErrors}
          strength={passwordStrength}
          setStrength={setPasswordStrength}
        />
      )}
    </>
  );
};

export default NavBar;
