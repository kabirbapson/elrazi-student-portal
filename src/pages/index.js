import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  FormControl,
  Unstable_Grid2 as Grid,
  Input,
  Stack,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { CalendarIcon } from "@mui/x-date-pickers";
import axiosInstance from "src/api/config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AuthContext } from "src/context";
import {
  AdmissionApplication,
  AdmissionApplicationProcess,
  ApplicationFeeConfirmed,
  ApplicationFeePaymentProcess,
} from "src/components";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Page = () => {
  const {
    user,
    token,
    paymentUpload,
    setPaymentUpload,
    handleFetchUserDetails,
    facultyCourses,
    documentsCompleted,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [userData, setUserData] = useState(user);

  // lets write a modal pop up for the user to with an inout field to add phone number if not added
  // if user.phone_number is null, show modal

  useEffect(() => {
    if (
      user &&
      (user.phone_number === null || user.phone_number === "" || user.phone_number.length < 6)
    ) {
      setOpenModal(true);
    }
  }, [user]);

  // Modified to prevent closing the modal by clicking away
  const handleModalClose = () => {
    // Prevent closing if needed by not implementing body of this function
    // setOpenModal(false); // Commented out to disable closing the modal by clicking away
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    // Allow + as the first character, followed by digits only
    const formattedValue =
      value.charAt(0) === "+"
        ? "+" + value.slice(1).replace(/[^0-9]/g, "")
        : value.replace(/[^0-9]/g, "");

    setPhoneNumber(formattedValue);

    // Optionally, check for invalid characters and update helper text accordingly
    // Check if the first character is + and the rest are digits, or all characters are digits
    if (
      (value.charAt(0) === "+" && !/^\+\d*$/.test(value)) ||
      (value.charAt(0) !== "+" && !/^\d*$/.test(value))
    ) {
      setPhoneNumberError(`Only digits are allowed. '+' is allowed only as the first character.`);
    } else if (phoneNumberError) {
      setPhoneNumberError(""); // Clear the error if the input is now valid
    }
  };

  const updateUserPhoneNumber = async () => {
    // Validate the new phone number as needed
    if (!phoneNumber.trim()) {
      setPhoneNumberError("Phone number is required.");
      return;
    }
    if (phoneNumber.length < 8) {
      setPhoneNumberError("Phone number must be at least 8 characters.");
      return;
    }

    setLoading(true); // Start loading

    const updateData = {
      phone_number: phoneNumber,
    };

    try {
      await axiosInstance.put(
        "/auth/user/",
        { ...userData, ...updateData },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success("Phone number updated successfully");
      setOpenModal(false); // Close the modal on success
    } catch (error) {
      toast.error("Error updating phone number. Please try again.");
      console.error("Error updating phone number:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard | Elrazi Medical University, Kano</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Card sx={{ padding: { xs: "20px", sm: "40px" }, mb: "20px" }}>
            {!documentsCompleted ? (
              <>
                {user?.has_paid ? (
                  <ApplicationFeeConfirmed name={user?.first_name} />
                ) : (
                  <ApplicationFeePaymentProcess name={user?.first_name} />
                )}
              </>
            ) : (
              <AdmissionApplicationProcess user={user.first_name} faculties={facultyCourses} />
            )}
          </Card>
        </Container>
      </Box>
      <Modal
        open={openModal}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleModalClose();
          }
          // This effectively prevents the modal from closing on clicking away or pressing escape.
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disablebackdropclick // This prop prevents the modal from closing when the backdrop is clicked
        disableEscapeKeyDown // This prop prevents the modal from closing when the escape key is pressed
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Phone Number
          </Typography>
          <TextField
            fullWidth
            error={!!phoneNumberError}
            helperText={phoneNumberError || "Enter your phone number (digits only)."}
            label="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            margin="normal"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }} // Encourages numeric keyboard on mobile devices
          />
          <Button
            onClick={() => updateUserPhoneNumber(phoneNumber)}
            variant="contained"
            sx={{
              my: 2,
              width: "100%", // Makes the button full width of its parent container
              display: "flex",
              justifyContent: "center", // Ensures the content is centered
              alignItems: "center", // Vertically centers the loading indicator and text
            }}
            disabled={
              !phoneNumber.trim() || !!phoneNumberError || loading || phoneNumber.length < 8
            }
          >
            {loading ? <CircularProgress size={20} /> : "Submit"}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
