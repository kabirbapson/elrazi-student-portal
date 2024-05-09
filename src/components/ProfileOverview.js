import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Chip, Divider } from '@mui/material';

const ProfileOverview = ({ user }) => {
  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', my: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Profile Overview
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Name:</strong> {user?.first_name} {user?.last_name} {user?.other_name || ""}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Student ID:</strong> {user?.student_profile?.student_id}</Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Phone Number:</strong> {user?.phone_number}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Address:</strong> {user?.address}, {user?.state}, {user?.country}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Date of Birth:</strong> {user?.dob}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Date Joined:</strong> {user?.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Gender:</strong> {user?.gender}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileOverview;
