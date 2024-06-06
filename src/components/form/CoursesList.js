import React, { useContext } from "react";
import { MdCheckCircle } from "react-icons/md"; // Importing a checkmark icon for approval
import { AuthContext } from "src/context";
import Link from "next/link";
import {
  Button,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const CoursesDisplay = ({ coursesList }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>SN</TableCell>
            <TableCell>Course Code</TableCell>
            <TableCell>Course Title</TableCell>
            <TableCell>Credit Unit</TableCell>
            <TableCell>Lecturer</TableCell>
            {/* <TableCell>Email</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {coursesList.map((course, index) => (
            <TableRow
              key={index}
              sx={{
                bgcolor: course.id % 2 === 0 ? "grey.100" : "grey.200", // Softer shades of grey
                "&:hover": {
                  backgroundColor: "grey.300", // A slightly darker grey on hover
                  color: "common.black", // Ensuring text color is readable
                },
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{course.class_enrolled.course.subject_code}</TableCell>
              <TableCell>{course.class_enrolled.course.subject_title}</TableCell>
              <TableCell>{course.class_enrolled.course.credit_hours}</TableCell>
              <TableCell>{course.class_enrolled.teacher.bio.split("\r\n")[0]}</TableCell>
              {/* <TableCell>{course.class_enrolled.teacher.email}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const CoursesList = ({ name, coursesList }) => {
  const { token, user } = useContext(AuthContext);

    if (!user?.student_profile?.student_id) {
    return (
      <Stack
        sx={{
          backgroundColor: "#E8F5E9",
          padding: { xs: "20px", sm: "30px" },
          width: { xs: "100%", sm: "90%" },
          borderRadius: "5px",
        }}
        spacing={1}
      >
        <MdCheckCircle fontSize={"50px"} color="#4CAF50" />
        <Typography variant="h6">Please contact the registry department.</Typography>
      </Stack>
    );
  }
  return (
    <Stack spacing={2}>
      <div>
        <h2>Student Courses</h2>
        <CoursesDisplay coursesList={coursesList} />
      </div>

      <Button
        variant="contained"
        sx={{ mt: 2, bgcolor: "#4CAF50", "&:hover": { bgcolor: "#388E3C" } }}
        onClick={(event) => {
          event.preventDefault(); // Prevents any default action
          alert("Printing course registration slip...");
        }}
        disabled={true} // Disables the button
      >
        Print Course Registration Slip
      </Button>
    </Stack>
  );
};
