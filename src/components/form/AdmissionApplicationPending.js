import React from "react";
import {
  Stack,
  Typography,
} from "@mui/material";
import { BsHourglassSplit } from "react-icons/bs";

export const AdmissionApplicationPending = ({ name }) => {

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
        Thank you for choosing your preferred faculty and course at Elrazi Medical University. Your
        application is now under review, and we appreciate your patience.
      </Typography>

      {/* bank account details */}

      <Stack
        marginTop={"100px"}
        sx={{
          backgroundColor: "#936B05",
          padding: { xs: "20px", sm: "30px" },
          width: { xs: "100%", sm: "90%" },
          borderRadius: "5px",
        }}
        spacing={1}
      >
        <BsHourglassSplit fontSize={"50px"} color="#FFE372" />
        <Typography fontWeight={"bold"} color={"white"}>
          ADMISSION PENDING
        </Typography>

        <Typography color={"white"} variant="body2">
          Our admissions team is carefully reviewing your qualifications and fit
          for the selected program. Rest assured, we are dedicated to conducting a comprehensive and
          equitable assessment.
        </Typography>
      </Stack>

      <Typography>
        You will be notified via email once a decision regarding your admission is reached. In the
        meantime, if you have any questions or require additional information, feel free to reach
        out to our support team.
      </Typography>

      <Stack mt={"10px"}>
        <Stack spacing={1} direction={"row"}>
          <Typography fontWeight={"bold"}>Email:</Typography>
          <Typography variant="body1">ict@elrazi.edu.ng</Typography>
        </Stack>
        {/* <Stack spacing={1} direction={"row"}>
          <Typography fontWeight={"bold"}>Phone:</Typography>
          <Typography variant="body1">+234 808 427 7233</Typography>
        </Stack> */}
      </Stack>

      <Typography>Admission - Elrazi Medical University, Kano. </Typography>
    </Stack>
  );
};
