import React, { useEffect, useState } from "react";
import { getRole } from "../utils/authStorage";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../services/authService";

const ProfileSummary = () => {
  const nav = useNavigate();
  const [role, setRole] = useState();
  const [name, setName] = useState("loading");
  const [email, setEmail] = useState("loading");
  const [membershipCode, setMembershipCode] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    setRole(getRole());
    if (role !== "") {
      loadUserInfo();
    } else {
      nav("/login");
    }
  }, []);

  const loadUserInfo = async () => {
    const res = await getUserInfo();
    if (res.success) {
      setName(res.data.firstName + " " + res.data.lastName);
      setEmail(res.data.email);
      setImg(res.data.profileImage);
      setMembershipCode(res.data.membershipCode);
    }
  };

  return (
    <div className="p-6 text-center border-b border-gray-200">
      <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-3xl font-bold mx-auto mb-4">
        {img ? (
          <img
            src={img}
            alt={`${name} `}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          name.charAt(0)
        )}
      </div>
      <h2 className="font-bold text-xl mb-1">
      {name}
      </h2>
      <p className="text-gray-500 text-sm mb-4">{email}</p>
      {/* <div className="text-sm mb-2">
        <span className="font-medium">Member since:</span> {user.joinDate}
      </div> */}
      <div className="text-sm">
        <span className="font-medium">Membership ID:</span> {membershipCode}
      </div>
    </div>
  );
};

export default ProfileSummary;
