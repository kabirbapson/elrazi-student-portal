import React from "react";
import {
  Stack,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FaCircleInfo } from "react-icons/fa6";
import { LoadingButton } from "@mui/lab";
import { BsHourglassSplit } from "react-icons/bs";

export const AdmissionApplicationPending = ({ name, faculties }) => {
  const [courses, setCourses] = React.useState([]);
  const [selectedCourse, setSelectedCourse] = React.useState(null);

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
        Thank you for selecting your desired Faculty and Course at Elrazi Medical University. Your
        application is currently under review, and we appreciate your patience during this process.
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
          Our admissions team is diligently assessing your qualifications, achievements, and
          suitability for the chosen program. Please be assured that we are committed to ensuring a
          thorough and fair evaluation.
        </Typography>
      </Stack>

      <Typography>
        You will be notified via email once a decision regarding your admission is reached. In the
        meantime, if you have any questions or require additional information, feel free to reach
        out to our support team at
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

      <Typography>
        We understand that waiting can be challenging, and we appreciate your understanding. Thank
        you for choosing Elrazi Medical University, and we look forward to the possibility of
        welcoming you into our academic community.
      </Typography>
      <Typography fontWeight={"bold"}>Elrazi Medical University Admission Team</Typography>
    </Stack>
  );
};
