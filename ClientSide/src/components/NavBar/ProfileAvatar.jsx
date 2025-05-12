import React from "react";

const ProfileAvatar = ({ name, img }) => {
  if (!img) {
    return (
      <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>
    );
  }

  return (
    <img
      src={img}
      alt={name}
      className="h-10 w-10 rounded-full object-cover"
    />
  );
};

export default ProfileAvatar;
