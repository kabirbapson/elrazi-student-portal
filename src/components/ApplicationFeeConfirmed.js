import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import { FaCircleInfo } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/router";

export const ApplicationFeeConfirmed = ({ name }) => {
  const router = useRouter();

  const handleContinueToApplication = () => {
    router.push("/application");
  };
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
        We are delighted to inform you that your payment of N30,000 for the application fee has been
        successfully confirmed. Your commitment to pursuing education at Elrazi Medical University
        is greatly appreciated.
      </Typography>

      {/* bank account details */}

      <Stack
        marginTop={"100px"}
        sx={{
          //   backgroundColor: "#0A8779",
          border: "1px solid #0A8779",
          padding: { xs: "20px", sm: "30px" },
          width: { xs: "100%", sm: "90%" },
          borderRadius: "5px",
        }}
        // spacing={1}
      >
        <FaCheckCircle fontSize={"60px"} color="#0A8779" />
        <Typography fontWeight={"bold"} color={"black"} marginTop={"20px"}>
          Payment Confirmed
        </Typography>

        <Typography color={"black"} variant="body2">
          With the payment confirmation, your application process is now in progress. To proceed to
          the next step, kindly submit your bio data through the following instructions:{" "}
        </Typography>

        <Button
          onClick={handleContinueToApplication}
          sx={{ width: { xs: "100%", sm: "60%" }, mt: "20px" }}
          variant="contained"
        >
          Continue to Application
        </Button>
      </Stack>

      <Typography>
        Should you have any questions or require assistance, please feel free to contact our support
        team at
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

      <Typography>
        Thank you for choosing Elrazi Medical University. We wish you the best of luck in the
        application process,
      </Typography>
      <Typography >Admission - Elrazi Medical University, Kano. </Typography>
    </Stack>
  );
};
