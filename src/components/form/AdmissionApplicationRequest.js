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

export const AdmissionApplicationRequest = ({ name, faculties }) => {
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
        Congratulations on successfully completing the initial steps of your application process at
        Elrazi Medical University.
      </Typography>

      <Stack
        marginTop={"100px"}
        sx={{
          border: "1px solid #0A8779",
          padding: { xs: "20px", sm: "30px" },
          width: { xs: "100%", sm: "90%" },
          borderRadius: "5px",
        }}
        spacing={2}
      >
        {/* <FaCircleInfo fontSize={"50px"} color="#FFE372" /> */}
        <Typography fontWeight={"bold"} color={"black"}>
          Faculty Selection:
        </Typography>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Select Faculty</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={(e) => setCourses(faculties[e.target.value])}
            label="Select Faculty"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {faculties.map((facultyCourse, index) => (
              <MenuItem key={index} value={index}>
                {facultyCourse.faculty.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack>
          <Typography fontWeight={"bold"} color={"black"}>
            Course Selection (for selected Faculty):
          </Typography>

          <Typography color={"black"} variant="body2">
            Note: Courses available may vary based on the chosen Faculty.
          </Typography>
        </Stack>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Select Course</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={(e) => setSelectedCourse(e.target.value)}
            label="Select Course"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {courses?.courses?.map((course, index) => (
              <MenuItem key={index} value={course}>
                {course.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography color={"black"} variant="body2">
          Once you have made your selections, click the Submit Selection button below to proceed.
          Our admissions team will then review your preferences and guide you through the remaining
          steps.
        </Typography>

        <LoadingButton
          disabled={!selectedCourse}
          loading={loading}
          onClick={handleSubmitApplication}
          variant="contained"
        >
          Submit Selection
        </LoadingButton>
      </Stack>

      <Typography>
        Should you have any questions or need further assistance, please do not hesitate to contact
        our support team at
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
        Thank you for choosing Elrazi Medical University. We are excited to continue this journey
        with you.
      </Typography>
      <Typography >Admission - Elrazi Medical University, Kano. </Typography>

    </Stack>
  );
};
