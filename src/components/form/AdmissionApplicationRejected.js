import React, { useContext, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { AuthContext } from "src/context";
import { BsHourglassSplit } from "react-icons/bs";
import { MdCancel } from "react-icons/md"; // Importing a cancel icon

export const AdmissionApplicationRejected = ({ name }) => {
  const { admissions } = useContext(AuthContext);

  const [admission, setAdmission] = useState(admissions?.[0] ?? null);

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
        Thank you for your interest in Elrazi Medical University and for the effort you put into
        your application. After careful consideration, we regret to inform you that we are unable to
        offer you admission to your chosen faculty and course at this time.
      </Typography>

      <Stack
        marginTop={"100px"}
        sx={{
          backgroundColor: "#610821",
          padding: { xs: "20px", sm: "30px" },
          width: { xs: "100%", sm: "90%" },
          borderRadius: "5px",
        }}
        spacing={1}
      >
        <MdCancel fontSize={"50px"} color="#FFFFFF" /> {/* Changed icon to MdCancel */}
        <Typography fontWeight={"bold"} color={"white"}>
          ADMISSION REJECTED
        </Typography>
        <Typography color={"white"} variant="h6">
          Reason: {admission?.rejection_reason || "Please contact Admission Office."}
        </Typography>
        <Typography color={"white"} variant="body2">
          {`We're sorry your application was not successful this time. If you have questions or want
          to talk about your next steps, please contact our admissions office.`}
          <Stack mt={"10px"}>
            <Stack spacing={1} direction={"row"}>
              <Typography fontWeight={"bold"} color={"white"}>
                Email:
              </Typography>
              <Typography variant="body1" color={"white"}>
                admission@elrazi.edu.ng
              </Typography>
            </Stack>
            <Stack spacing={1} direction={"row"}>
              <Typography fontWeight={"bold"} color={"white"}>
                Phone:
              </Typography>
              <Typography variant="body1" color={"white"}>
                +234 703 078 5761
              </Typography>
            </Stack>
          </Stack>

          {/* <Typography mt={2} color={"white"} variant="body2">
            Best, Admissions Team
          </Typography> */}
        </Typography>
      </Stack>

      <Typography>Admission - Elrazi Medical University, Kano. </Typography>
    </Stack>
  );
};
