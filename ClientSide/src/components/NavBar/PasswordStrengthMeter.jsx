import React from "react";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const PasswordStrengthMeter = ({ password, strength }) => {
  const getStrengthColor = () => {
    const { score } = strength;
    if (score === 0) return "bg-gray-200";
    if (score === 1) return "bg-red-500";
    if (score === 2) return "bg-orange-500";
    if (score === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthLabel = () => {
    const { score } = strength;
    if (score === 0) return "";
    if (score === 1) return "Weak";
    if (score === 2) return "Fair";
    if (score === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500">Password strength:</span>
        <span
          className="text-xs font-medium"
          style={{ color: getStrengthColor().replace("bg-", "text-") }}
        >
          {getStrengthLabel()}
        </span>
      </div>
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getStrengthColor()} transition-all duration-300`}
          style={{ width: `${strength.score * 25}%` }}
        ></div>
      </div>

      <ul className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1">
        <li className="text-xs flex items-center">
          <span className={`mr-1 ${strength.hasMinLength ? "text-green-500" : "text-gray-400"}`}>
            {strength.hasMinLength ? <FiCheckCircle /> : <FiAlertCircle />}
          </span>
          At least 8 characters
        </li>
        <li className="text-xs flex items-center">
          <span className={`mr-1 ${strength.hasUpperCase ? "text-green-500" : "text-gray-400"}`}>
            {strength.hasUpperCase ? <FiCheckCircle /> : <FiAlertCircle />}
          </span>
          Uppercase letter
        </li>
        <li className="text-xs flex items-center">
          <span className={`mr-1 ${strength.hasLowerCase ? "text-green-500" : "text-gray-400"}`}>
            {strength.hasLowerCase ? <FiCheckCircle /> : <FiAlertCircle />}
          </span>
          Lowercase letter
        </li>
        <li className="text-xs flex items-center">
          <span className={`mr-1 ${strength.hasNumber ? "text-green-500" : "text-gray-400"}`}>
            {strength.hasNumber ? <FiCheckCircle /> : <FiAlertCircle />}
          </span>
          Number
        </li>
        <li className="text-xs flex items-center col-span-2">
          <span className={`mr-1 ${strength.hasSpecialChar ? "text-green-500" : "text-gray-400"}`}>
            {strength.hasSpecialChar ? <FiCheckCircle /> : <FiAlertCircle />}
          </span>
          Special character
        </li>
      </ul>
    </div>
  );
};

export default PasswordStrengthMeter;
