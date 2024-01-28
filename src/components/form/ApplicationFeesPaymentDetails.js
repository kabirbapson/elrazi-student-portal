import React from "react";
import { Stack, Typography, Button } from "@mui/material";

const TextValue = ({ name, value }) => (
  <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
    <Typography color={"white"} fontWeight={"bold"}>
      {name}
    </Typography>
    <Typography color={"white"}>{value}</Typography>
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

        <TextValue name={"Bank Name"} value={"Elrazi Medical University kn-Revenue"} />
        <TextValue name={"Account Name"} value={"0005035147"} />
        <TextValue name={"Bank Name"} value={"Taj Bank Plc."} />

        <TextValue />

        <Typography color={"white"} variant="body2">
          Once the payment is complete, click the button below to confirm that you have made the
          payment.
        </Typography>
      </Stack>

      <Button
        onClick={onMadePaymentPress}
        sx={{ mt: "50px", width: { xs: "100%", sm: "50%", md: "40%" } }}
        variant="contained"
      >
        I Have Made the Payment
      </Button>

      <Typography>Thank you for choosing Elrazi Medical University.</Typography>
    </Stack>
  );
};
