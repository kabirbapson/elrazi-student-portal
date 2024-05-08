import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const ProfileOverview = ({ profile }) => {
  return (
    <Card sx={{ maxWidth: 600, m: 'auto', mt: 5 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Profile Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Name:</strong> {profile.first_name} {profile.last_name}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {profile.email}</Typography>
            <Typography variant="body1"><strong>Phone Number:</strong> {profile.phone_number}</Typography>
            <Typography variant="body1"><strong>Student ID:</strong> {profile.student_profile.student_id}</Typography>
            <Typography variant="body1"><strong>Address:</strong> {profile.address}, {profile.state}, {profile.country}</Typography>
            <Typography variant="body1"><strong>Date of Birth:</strong> {profile.dob}</Typography>
            <Typography variant="body1"><strong>Date Joined:</strong> {new Date(profile.date_joined).toLocaleDateString()}</Typography>
            <Typography variant="body1"><strong>Gender:</strong> {profile.gender}</Typography>
            <Typography variant="body1"><strong>Has Paid Fees:</strong> {profile.has_paid ? "Yes" : "No"}</Typography>
            <Typography variant="body1"><strong>Email Verified:</strong> {profile.is_email_verified ? "Yes" : "No"}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileOverview;
