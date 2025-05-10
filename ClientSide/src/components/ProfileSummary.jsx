import React from "react";

const ProfileSummary = ({ user }) => {
  return (
    <div className="p-6 text-center border-b border-gray-200">
      <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-3xl font-bold mx-auto mb-4">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          user.firstName.charAt(0)
        )}
      </div>
      <h2 className="font-bold text-xl mb-1">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-gray-500 text-sm mb-4">{user.email}</p>
      <div className="text-sm mb-2">
        <span className="font-medium">Member since:</span> {user.joinDate}
      </div>
      <div className="text-sm">
        <span className="font-medium">Membership ID:</span> {user.membershipId}
      </div>
    </div>
  );
};

export default ProfileSummary;
