import React from "react";

interface CustomPopupProps {
  message: string;
  type: "success" | "error"; // Type determines style
  onClose: () => void; // Function to close the popup
}

const CustomPopup: React.FC<CustomPopupProps> = ({ message, type, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000,
        backgroundColor: type === "success" ? "green" : "red",
        color: "white",
        padding: "15px 20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <p>{message}</p>
      <button
        onClick={onClose}
        style={{
          marginTop: "10px",
          backgroundColor: "transparent",
          border: "1px solid white",
          color: "white",
          padding: "5px 10px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  );
};

export default CustomPopup;
