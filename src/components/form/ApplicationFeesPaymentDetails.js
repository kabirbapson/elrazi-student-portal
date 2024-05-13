import React from "react";
import { Stack, Typography, Button } from "@mui/material";

const TextValue = ({ name, value }) => (
  <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
    <Typography color={"white"} >
      {name}:
    </Typography>
    <Typography color={"white"} fontWeight={"bold"}>
      {value}
    </Typography>
  </Stack>
);

export const ApplicationFeePaymentDetails = ({ name, onMadePaymentPress }) => {
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
        To continue with your application process, kindly make a payment of N30,000 as the
        application fee using the following details:
      </Typography>

      {/* bank account details */}

      <Stack
        marginTop={"100px"}
        sx={{
          backgroundColor: "#DB5A3A",
          padding: { xs: "20px", sm: "30px" },
          width: { xs: "100%", sm: "90%" },
          borderRadius: "5px",
        }}
        spacing={1}
      >
        <Typography fontWeight={"bold"} color={"white"}>
          Payment Information
        </Typography>

        <TextValue name={"Account Name"} value={"ALRAZI MEDICAL UNIVERSITY LIMITED"} />
        <TextValue name={"Account Number"} value={"1229145749"} />
        <TextValue name={"Bank Name"} value={"Zenith Bank Plc. Plc."} />

        <br />

        <Typography color={"white"} variant="body2">
          Once the payment is complete, click the button below and upload receipt to confirm that
          you have made the payment.
        </Typography>
      </Stack>

      <Button
        onClick={onMadePaymentPress}
        sx={{ mt: "50px", width: { xs: "100%", sm: "50%", md: "40%" } }}
        variant="contained"
      >
        I Have Made the Payment
      </Button>

      <Typography mt={"20px"} variant="body2">
        If you encounter any issues or have questions, feel free to contact our support team at
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
