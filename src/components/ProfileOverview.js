import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const ProfileOverview = ({ user }) => {
  return (
    <Card sx={{ maxWidth: 600, m: 'auto', mt: 5 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Profile Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Name:</strong> {user?.first_name} {user?.last_name} {user?.other_name}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {user?.email}</Typography>
            <Typography variant="body1"><strong>Phone Number:</strong> {user?.phone_number}</Typography>
            <Typography variant="body1"><strong>Student ID:</strong> {user?.student_profile?.student_id}</Typography>
            <Typography variant="body1"><strong>Address:</strong> {user?.address}, {user?.state}, {user?.country}</Typography>
            <Typography variant="body1"><strong>Date of Birth:</strong> {user?.dob}</Typography>
            <Typography variant="body1"><strong>Date Joined:</strong> {new Date(user?.date_joined).toLocaleDateString()}</Typography>
            <Typography variant="body1"><strong>Gender:</strong> {user?.gender}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileOverview;
