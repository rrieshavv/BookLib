import React from 'react'

const InputField = ({ id, label, type = "text", value, onChange, half = false }) => (
    <div className={half ? "w-1/2" : ""}>
      <label htmlFor={id} className="block text-sm text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={label}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
      />
    </div>
  );
  

export default InputField