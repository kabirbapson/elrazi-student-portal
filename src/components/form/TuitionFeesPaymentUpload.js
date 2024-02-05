/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Stack, Typography, Button, CircularProgress, IconButton, Box, Container, Paper, Divider, Card, styled } from "@mui/material";
import { MdCloudUpload, MdUploadFile } from "react-icons/md";
import { IoReceiptSharp } from "react-icons/io5";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

// Extracted UploadStack component for reusability and readability
const UploadStack = ({ uploaded, handleFileChange, fieldName, label }) => (
  <Stack
    sx={{
      borderRadius: "5px",
      px: "10px",
      border: `1px solid ${uploaded ? green[500] : "black"}`,
      alignItems: "center",
    }}
  >
    <Typography>{label}</Typography>
    <IconButton
      component="label"
      sx={{
        color: uploaded ? green[500] : "inherit",
      }}
    >
      <MdCloudUpload />
      <VisuallyHiddenInput
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => handleFileChange(fieldName, e.target.files)}
      />
    </IconButton>
  </Stack>
);

const TextValue = ({ name, value }) => (
  <Stack direction={{ xs: "column", sm: "row" }}  spacing={1}>
    <Typography>{name}:</Typography>
    <Typography fontWeight={"bold"}>{value}</Typography>
  </Stack>
);
export const TuitionFeesPaymentUpload = ({ onLoading, onUploadReceipt }) => {
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
      if (file.size > 1024 * 1024) {
        alert("File size exceeds the limit of 1MB. Please choose a smaller file.");
        return;
      }

      // Set selected file
      setSelectedFile(file);
    }
  };

  // const handleUpload = () => {
  //   if (selectedFile) {
  //     // Perform upload action
  //     onUploadReceipt(selectedFile);
  //   } else {
  //     toast.warning("Please select a file to upload.");
  //   }
  // };

  return (
    <Stack>
      {/* Welcome Message  */}
      <Stack direction={"row"} spacing={1} >
        <Typography variant="body2" fontSize={"20px"} fontWeight={"bold"}>
          {`Upload Receipt`},
        </Typography>
      </Stack>

      <Typography variant="body2" marginY={'4px'} >
        Now that you've made payment to the following account:
      </Typography>

      <TextValue name={"Bank Name"} value={"Elrazi Medical University kn-Revenue"} />
      <TextValue name={"Account Name"} value={"0005035147"} />
      <TextValue name={"Bank Name"} value={"Taj Bank Plc."} />

      <Typography marginY={'5px'} sx={{ width: { xs: "100%", md: "70%", marginBottom: "4" } }}>
        Great! please upload a clear image of your receipt in either JPG or PNG format to proceed
        with your application.
      </Typography>

      {/* bank account details */}

   <Box component="main" sx={{ flexGrow: 1, py: 8 }}> 
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center">
            Payment Information
          </Typography>
          <Typography variant="body1" gutterBottom>
            Please make your payments to the following account and upload the receipts below.
          </Typography>
          <Paper elevation={3} sx={{ my: 2, p: 2 }}>
            <Typography variant="h6">Account Details:</Typography>
            <Typography>Bank Name: XYZ Bank</Typography>
            <Typography>Account Number: 1234567890</Typography>
            <Typography>Account Name: Your University</Typography>
            <Typography>SWIFT/BIC: XYZBANK</Typography>
          </Paper>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            *Accommodation payment is optional for students who do not require university
            accommodation.
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Card sx={{ padding: { xs: "20px", sm: "40px" }, mb: "20px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3} alignItems="center">
                <Stack direction="row" spacing={3} alignItems="center" justifyContent="center">

                  <UploadStack
                    uploaded={uploaded.tuitionReceipt}
                    handleFileChange={handleFileChange}
                    fieldName="tuitionReceipt"
                    label="Tuition Receipt"
                  />

                  <UploadStack
                    uploaded={uploaded.accommodationReceipt}
                    handleFileChange={handleFileChange}
                    fieldName="accommodationReceipt"
                    label="Accommodation Receipt (Optional)"
                  />
                </Stack>
                <Button variant="contained" type="submit" disabled={loading}>
                  {loading ? "Uploading..." : "Submit"}
                </Button>
              </Stack>
            </form>
          </Card>
        </Container>
      </Box> 

      <Typography mt={"20px"} variant="body2">
        If you encounter any issues or have questions, feel free to contact our support team at
      </Typography>
      <Stack mt={"10px"}>
        <Stack spacing={1} direction={"row"}>
          <Typography fontWeight={"bold"}>Email:</Typography>
          <Typography variant="body1">support@elrazi.edu.ng</Typography>
        </Stack>
        <Stack spacing={1} direction={"row"}>
          <Typography fontWeight={"bold"}>Phone:</Typography>
          <Typography variant="body1">+234 808 427 7233</Typography>
        </Stack>
      </Stack>

      <Typography mt={"20px"}>
        Thank you. We look forward to processing your application.
      </Typography>
    </Stack>
  );
};
