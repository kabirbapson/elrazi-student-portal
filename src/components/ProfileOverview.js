import React from "react";
import { Card, CardContent, Typography, Grid, Divider, Avatar } from "@mui/material";

// Utility function to convert strings to sentence case
const toSentenceCase = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const ProfileOverview = ({ user, studentDocument }) => {

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", my: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Profile Overview
        </Typography>
        <Divider sx={{ my: 2 }} />

        {/* Add Avatar here */}
        <Grid container justifyContent="center" sx={{ mb: 2 }}>
          {/* Center the avatar */}
          <Avatar
            alt="Passport Photo"
            src={studentDocument?.passport_photo} // Use studentDocument data
            sx={{ width: 150, height: 150 }} // Adjust size as needed
          />
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Name:</strong> {toSentenceCase(user?.first_name)}{" "}
              {toSentenceCase(user?.last_name)} {toSentenceCase(user?.other_name || "")}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Student ID:</strong> {user?.student_profile?.student_id}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Phone Number:</strong> {user?.phone_number}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Address:</strong> {toSentenceCase(user?.address)},{" "}
              {toSentenceCase(user?.state)}, {toSentenceCase(user?.country)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Date of Birth:</strong> {user?.dob}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Gender:</strong> {toSentenceCase(user?.gender)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileOverview;
