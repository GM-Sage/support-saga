"use client";

import React, { createContext, useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomModal from "../components/CustomModal/CustomModal"; // Adjusted path



interface ModalContent {
  title: string;
  content: string;
  onConfirm: () => void;
}

interface NotificationContextProps {
  showToast: (message: string, type: "success" | "error") => void;
  showModal: (modalContent: ModalContent) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>({
    title: "",
    content: "",
    onConfirm: () => {},
  });

  // Function to show toast notifications
  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  // Function to show modal
  const showModal = (content: ModalContent) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <NotificationContext.Provider value={{ showToast, showModal }}>
      {children}
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
      {/* Custom Modal */}
      <CustomModal
        isOpen={isModalOpen}
        title={modalContent.title}
        content={modalContent.content}
        onClose={handleCloseModal}
        onConfirm={() => {
          modalContent.onConfirm();
          handleCloseModal();
        }}
      />
    </NotificationContext.Provider>
  );
};

// Custom hook for using the notification system
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
