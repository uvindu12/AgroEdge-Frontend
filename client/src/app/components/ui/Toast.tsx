import React, { useState } from "react";

interface ToastProps {
  title: string;
  description?: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ title, type = "info", onClose }) => {
  return (
    <div
      className={`fixed bottom-5 right-5 px-4 py-2 rounded shadow-lg text-white ${
        type === "success"
          ? "bg-green-500"
          : type === "error"
          ? "bg-red-500"
          : "bg-blue-500"
      }`}
    >
      {title}
      <button className="ml-4 text-white font-bold" onClick={onClose}>
        ✖
      </button>
    </div>
  );
};

export default Toast;
