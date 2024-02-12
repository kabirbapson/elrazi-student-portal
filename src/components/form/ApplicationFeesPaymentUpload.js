/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Stack, Typography, Button, CircularProgress } from "@mui/material";
import { MdUploadFile } from "react-icons/md";
import { IoReceiptSharp } from "react-icons/io5";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

const TextValue = ({ name, value }) => (
  <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
    <Typography>{name}:</Typography>
    <Typography fontWeight={"bold"}>{value}</Typography>
  </Stack>
);
export const ApplicationFeePaymentUpload = ({ onLoading, onUploadReceipt }) => {
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

  const handleUpload = () => {
    if (selectedFile) {
      // Perform upload action
      onUploadReceipt(selectedFile);
    } else {
      toast.warning("Please select a file to upload.");
    }
  };

  return (
    <Stack>
      {/* Welcome Message  */}
      <Stack direction={"row"} spacing={1}>
        <Typography variant="body2" fontSize={"20px"} fontWeight={"bold"}>
          {`Upload Receipt`},
        </Typography>
      </Stack>

      <Typography variant="body2" marginY={"4px"}>
        {`Now that you've made payment to the following account:`}
      </Typography>

      <TextValue name={"Bank Name"} value={"Elrazi Medical University kn-Revenue"} />
      <TextValue name={"Account Name"} value={"0005035147"} />
      <TextValue name={"Bank Name"} value={"Taj Bank Plc."} />

      <Typography marginY={"5px"} sx={{ width: { xs: "100%", md: "70%", marginBottom: "4" } }}>
        Great! please upload a clear image of your receipt in either JPG or PNG format to proceed
        with your application.
      </Typography>

      {/* bank account details */}

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
        {onLoading ? (
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
                <LoadingButton loading={onLoading} onClick={handleUpload} variant="contained">
                  Submit Receipt
                </LoadingButton>

                <LoadingButton
                  loading={onLoading}
                  onClick={() => setSelectedFile(null)}
                  variant="text"
                >
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
      <Typography color={"gray"} variant="body2">
        Image files only.
      </Typography>

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
