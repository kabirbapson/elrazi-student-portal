import React, { useContext, useState } from "react";
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
import axiosInstance from "src/api/config";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { AuthContext } from "src/context";
import { BsHourglassSplit } from "react-icons/bs";

export const AdmissionApplicationRejected = ({ name, faculties }) => {
  const [courses, setCourses] = React.useState([]);
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);

  const handleSubmitApplication = async () => {
    const payload = { course_id: selectedCourse.id };
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    try {
      await axiosInstance.post("/students/admissions/", payload, config);
      toast.success("You application has been successfully submitted");
      router.reload();
    } catch (error) {
      toast.error(
        "Unable to submit your application please try again if the error persist you can contact us"
      );
      console.log(error);
    }
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
          ADMISSION REJECTED
        </Typography>

        <Typography color={"white"} variant="body2">
          Our admissions team is carefully reviewing your qualifications and fit for the selected
          program. Rest assured, we are dedicated to conducting a comprehensive and equitable
          assessment.
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

      <Typography>Admission - Elrazi Medical University, Kano. </Typography>
    </Stack>
  );
};
