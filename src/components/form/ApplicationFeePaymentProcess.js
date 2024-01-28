/* eslint-disable react/jsx-max-props-per-line */
import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import { ApplicationFeePaymentDetails } from "./ApplicationFeesPaymentDetails";
import { useReceiptUpload } from "src/hooks/use-receipt-upload";
import { ApplicationFeePaymentUpload } from "./ApplicationFeesPaymentUpload";
import { ApplicationFeePaymentConfirmation } from "./ApplicationFeesPaymentConfirmation";

export const ApplicationFeePaymentProcess = ({ name }) => {
  const {
    loading,
    toggleMadePayment,
    uploadPaymentReceipt,
    paymentUpload,
    madePayment,
    receiptUploaded,
  } = useReceiptUpload();

  return (
    <Stack spacing={2}>
      {receiptUploaded || paymentUpload ? (
        <ApplicationFeePaymentConfirmation name={name} />
      ) : (
        <>
          {!madePayment ? (
            <ApplicationFeePaymentDetails name={name} onMadePaymentPress={toggleMadePayment} />
          ) : (
            <ApplicationFeePaymentUpload
              onLoading={loading}
              onUploadReceipt={uploadPaymentReceipt}
            />
          )}
        </>
      )}
    </Stack>
  );
};
