import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import { FaCircleInfo } from "react-icons/fa6";

export const ApplicationFeePaymentConfirmation = ({ name }) => {
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

      <Typography sx={{ width: { xs: "100%", md: "70%" } }}>
        Thank you for submitting your payment receipt. Our team will now review the information and
        confirm the successful processing of your payment.
      </Typography>

      {/* bank account details */}

      <Stack
        marginTop={"100px"}
        sx={{
          backgroundColor: "#0A8779",
          padding: { xs: "20px", sm: "30px" },
          width: { xs: "100%", sm: "90%" },
          borderRadius: "5px",
        }}
        spacing={1}
      >
        <FaCircleInfo fontSize={"50px"} color="#FFE372" />
        <Typography fontWeight={"bold"} color={"white"}>
          Confirming your payment
        </Typography>

        <Typography color={"white"} variant="body2">
          Please allow 1-2 business days for this verification process. Once confirmed, you will
          receive a notification via email indicating the status of your payment and the next steps
          in the application process.
        </Typography>
      </Stack>

      <Typography>
        If you do not receive any confirmation within the specified timeframe or if you have any
        concerns, please do not hesitate to reach out to our support team at
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

      <Typography>We appreciate your patience and cooperation. Best regards,</Typography>
      <Typography fontWeight={'bold'}>Elrazi Medical University Admission Team</Typography>
    </Stack>
  );
};
