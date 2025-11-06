import React, { useEffect, useState } from "react";
import { Stack, Typography, Button, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IoReceiptSharp } from "react-icons/io5";
import { MdUploadFile } from "react-icons/md";
import { useReceiptUploadType } from "src/hooks/use-receipt-upload-type";
import { toast } from "react-toastify";

const TextValue = ({ name, value }) => (
  <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
    <Typography color={"white"}>{name}:</Typography>
    <Typography color={"white"} fontWeight={"bold"}>
      {value}
    </Typography>
  </Stack>
);

export const TuitionFeesPaymentDetails = ({ name, mBBS, tuitionFeeUpload }) => {
  const [madePayment, setMadePayment] = useState(false);
  const { loading, error, paymentUpload, receiptUploaded, uploadPaymentReceiptType } =
    useReceiptUploadType();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check file type (allow only image or PDF)
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a valid image (JPEG, PNG) or PDF file.");
        return;
      }

      // Check file size (1MB limit)
      if (file.size > 1024 * 2048) {
        alert("File size exceeds the limit of 2MB. Please choose a smaller file.");
        return;
      }

      // Set selected file
      setSelectedFile(file);
    }
  };

  const toggleMadePayment = () => setMadePayment(true);

  const handleUpload = () => {
    if (selectedFile) {
      // Perform upload action
      uploadPaymentReceiptType("tuition_fee", selectedFile);
    } else {
      toast.warning("Please select a file to upload.");
    }
  };

  const tuitionFee = `${mBBS ? "N6,020,000" : "N2,520,000"}`;

  // For MBBS or N2,520,000 for other Allied Health Science Courses
  return (
    <Stack spacing={2}>
      {/* Welcome Message  */}
      <Stack direction={"row"} spacing={1}>
        <Typography variant="body2" fontSize={"20px"}>
          Dear
        </Typography>
        <Typography variant="body2" fontSize={"20px"} fontWeight={"bold"}>
          {`${name}`},
        </Typography>
      </Stack>

      <Typography variant="body3" fontWeight={"bold"}>
        Congratulations on Your Admission, we are excited to welcome you to EMUK community.
      </Typography>
      {tuitionFeeUpload && (
        <Typography
          variant="body2"
          color={"maroon"}
          sx={{ width: { xs: "100%", md: "70%" } }}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          We have received your payment for tuition fee before, if the payment is on installment
          please upload another receipt.
        </Typography>
      )}

      <Typography sx={{ width: { xs: "100%", md: "70%" } }}>
        1. To secure your spot, a tuition fee of {tuitionFee} is required. Please make your payment
        using the following details and upload your receipt as proof of payment.
      </Typography>

      {/* bank account details */}

      <Stack
        marginTop={"100px"}
        sx={{
          backgroundColor: "green",
          padding: { xs: "20px", sm: "30px" },
          width: { xs: "100%", md: "70%" },
          borderRadius: "5px",
        }}
        spacing={1}
      >
        <Typography fontWeight={"bold"} color={"white"}>
          Payment Information
        </Typography>

        <TextValue name={"Account Name"} value={"Elrazi Medical University KN-Revenue "} />
        <TextValue name={"Account Number"} value={"0005035147"} />
        <TextValue name={"Bank Name"} value={"Taj Bank Plc."} />

        <br />

        <Typography color={"white"} variant="body2">
          Once the payment is complete, click the button below and upload receipt to confirm that
          you have made the payment.
        </Typography>
        <Button
          disabled={receiptUploaded}
          onClick={toggleMadePayment}
          sx={{ mt: "70px", width: { xs: "100%", sm: "50%", md: "40%" } }}
          variant="contained"
        >
          {receiptUploaded ? "Confirming your payment" : "I Have Made the Payment"}
        </Button>
      </Stack>
      {madePayment && !receiptUploaded && (
        <Stack
          marginTop={"30px"}
          sx={{
            border: `1px dashed ${selectedFile ? "#20EA96" : "#DB5A3A"}`,
            padding: { xs: "20px", sm: "30px" },
            width: { xs: "100%", sm: "90%" },
            height: { xs: "250px", sm: "250px" },
            borderRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: selectedFile ? "#D2FDDA" : "#FFEFDC",
          }}
          spacing={2}
          paddingY={"6px"}
        >
          {loading ? (
            <Stack alignItems={"center"} spacing={2}>
              <CircularProgress />
              <Typography variant="body2">Uploading Receipt Please wait...</Typography>
            </Stack>
          ) : (
            <>
              {selectedFile ? (
                <IoReceiptSharp color={"#06706E"} fontSize={"40px"} />
              ) : (
                <MdUploadFile fontSize={"40px"} color={"DB5A3A"} />
              )}
              {selectedFile ? (
                <Typography variant="body1" color={"#06706E"}>
                  Receipt Selected
                </Typography>
              ) : (
                <Typography variant="body2">Click Button below to upload receipt</Typography>
              )}
              {/* File input for selecting the file */}
              {selectedFile ? (
                <Stack spacing={1}>
                  <LoadingButton loading={loading} onClick={handleUpload} variant="contained">
                    Submit Receipt
                  </LoadingButton>

                  <LoadingButton onClick={() => setSelectedFile(null)} variant="text">
                    Re-upload
                  </LoadingButton>
                </Stack>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/jpeg, image/png, application/pdf"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    id="fileInput"
                  />
                  <label htmlFor="fileInput">
                    <Button component="span">Browse</Button>
                  </label>
                </>
              )}
            </>
          )}
        </Stack>
      )}
      <Typography sx={{ width: { xs: "100%", md: "70%" } }}>
        2. Document Submission and Verification: In addition to online submission, it is mandatory
        for all students to present their credentials in hard copy for physical verification. This
        step is crucial to complete your registration process.
      </Typography>

      <Typography mt={"20px"} variant="body2">
        If you encounter any issues or have questions, feel free to contact our support team.
      </Typography>
      <Stack mt={"10px"}>
        <Stack spacing={1} direction={"row"}>
          <Typography fontWeight={"bold"}>Email:</Typography>
          <Typography variant="body1">ict@elrazi.edu.ng</Typography>
        </Stack>
        <Stack spacing={1} direction={"row"}>
          <Typography fontWeight={"bold"}>Phone:</Typography>
          <Typography variant="body1">+234 808 427 7233</Typography>
        </Stack>
      </Stack>

      <Typography>Thank you for choosing Elrazi Medical University.</Typography>
    </Stack>
  );
};
