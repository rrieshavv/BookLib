import React, { useEffect, useState } from "react";
import {
  FiX,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const ChangePasswordModal = ({
  onClose,
  onSubmit,
  status,
  message,
  formState,
  setFormState,
  errors,
  setErrors,
  strength,
  setStrength,
}) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [onClose]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Change Password</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={20} />
          </button>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FiCheckCircle className="text-green-500 mb-4" size={48} />
            <p className="text-green-500 font-medium">{message}</p>
          </div>
        ) : (
          <div className="space-y-5">
            {[
              { label: "Current", name: "currentPassword", show: showCurrent, setShow: setShowCurrent },
              { label: "New", name: "newPassword", show: showNew, setShow: setShowNew },
              { label: "Confirm New", name: "confirmPassword", show: showConfirm, setShow: setShowConfirm },
            ].map(({ label, name, show, setShow }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">{label} Password</label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    name={name}
                    value={formState[name]}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors[name] ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:ring-2 focus:ring-emerald-500`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 text-gray-500"
                    onClick={() => setShow(!show)}
                  >
                    {show ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors[name] && (
                  <p className="text-xs text-red-500 mt-1 flex items-center">
                    <FiAlertCircle className="mr-1" /> {errors[name]}
                  </p>
                )}
              </div>
            ))}

            {formState.newPassword && (
              <PasswordStrengthMeter password={formState.newPassword} strength={strength} />
            )}

            {status === "error" && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="mr-2" /> {message}
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-2">
              <button onClick={onClose} className="px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200">
                Cancel
              </button>
              <button
                onClick={onSubmit}
                className={`px-4 py-2 rounded-md text-white ${
                  status === "loading" ? "bg-emerald-400" : "bg-emerald-500 hover:bg-emerald-600"
                }`}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordModal;
