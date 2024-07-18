import React, { useContext } from "react";
import { MdCheckCircle } from "react-icons/md"; // Importing a checkmark icon for approval
import { AuthContext } from "src/context";
import {
  Button,
  Stack,
  Typography,
} from "@mui/material";

export const StudentResult = () => {
  const { user } = useContext(AuthContext);

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
        <h2>Student Result</h2>
      </div>

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Print/Preview Result by Semester
        </Typography>
        {user?.semester_results?.map((semester, index) => (
          semester?.result_pdf && (
            <Button
              key={index}
              variant="contained"
              sx={{ bgcolor: "teal", "&:hover": { bgcolor: "green.700" } }} // Grey color
              onClick={() => window.open(semester?.result_pdf, "_blank")}
            >
              Year {semester?.year} Semester {semester?.semester}
            </Button>
          )
        ))}
      </Stack>
    </Stack>
  );
};
