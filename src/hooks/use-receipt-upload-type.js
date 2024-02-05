import axiosInstance from "config";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "src/context";

export const useReceiptUpload = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [madePayment, setMadePayment] = React.useState(false);
  const [receiptUploaded, setReceiptUploaded] = useState(false);

  const { token, paymentUpload } = useContext(AuthContext);

  const uploadPaymentReceipt = async (receiptFile) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("receipt", receiptFile);

    axiosInstance
      .post("/payments/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setLoading(false);
          setReceiptUploaded(true);
          toast.success("Receipt uploaded successfully!");
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          toast.error("Unable to upload your receipt");
          toast.warn("Please upload a valid image/picture!");
          setLoading(false);
        } else {
          setLoading(false);
          toast.error("Unable to upload your receipt");
          console.log("upload error", error?.response?.data);
        }
      });
  };

  const toggleMadePayment = () => {
    setMadePayment(true);
  };

  return {
    loading,
    error,
    toggleMadePayment,
    madePayment,
    receiptUploaded,
    paymentUpload,
    uploadPaymentReceipt,
  };
};
