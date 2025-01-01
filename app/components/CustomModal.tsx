import React from "react";

interface CustomModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  title,
  content,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "var(--color-secondary)",
          color: "var(--color-text)",
          padding: "24px",
          borderRadius: "12px",
          maxWidth: "500px",
          width: "90%",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "var(--color-primary)" }}>{title}</h2>
        <p>{content}</p>
        <div style={{ marginTop: "16px" }}>
          <button
            style={{
              marginRight: "8px",
              padding: "10px 20px",
              border: "2px solid var(--color-primary)",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-text)",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            style={{
              padding: "10px 20px",
              border: "2px solid var(--color-error)",
              backgroundColor: "transparent",
              color: "var(--color-error)",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
