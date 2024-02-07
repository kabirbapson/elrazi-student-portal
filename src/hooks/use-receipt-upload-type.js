import axiosInstance from "config"; // Ensure this path is correct
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "src/context"; // Ensure this path is correct

export const useReceiptUploadType = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [receiptUploaded, setReceiptUploaded] = useState(false);

  const { token, paymentUpload } = useContext(AuthContext);

  const uploadPaymentReceiptType = async (type, receiptFile) => {
    setLoading(true);
    setError(null); // Reset error state before attempting upload

    const formData = new FormData();
    formData.append("receipt", receiptFile);

    try {
      const response = await axiosInstance.post(`/payments/${type}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setLoading(false);
        setReceiptUploaded(true);
        toast.success("Receipt uploaded successfully!");
      }
    } catch (error) {
      setLoading(false);
      setError(error); // Set error state to the caught error
      if (error?.response?.status === 400) {
        toast.error("Unable to upload your receipt");
        toast.warn("Please upload a valid image/picture!");
      } else {
        toast.error("An error occurred during upload.");
        console.error("Upload error", error?.response?.data); // Changed from console.log to console.error for better error logging
      }
    }
  };

  return {
    loading,
    error,
    receiptUploaded,
    paymentUpload,
    uploadPaymentReceiptType,
  };
};
