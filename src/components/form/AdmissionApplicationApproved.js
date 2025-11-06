import React, { useContext } from "react";
import { Button, Stack, Typography, Grid, Card, CardActionArea, CardContent } from "@mui/material";
import { MdCheckCircle } from "react-icons/md"; // Importing a checkmark icon for approval
import { AuthContext } from "src/context";
import Link from "next/link";
import {
  AccountCircle,
  Book,
  Info,
  Settings,
  Payment,
  HomeWork,
  School,
  Assessment,
  SupportAgent, // Importing the Results icon
} from "@mui/icons-material";

export const AdmissionApplicationApproved = () => {
  const { token, user } = useContext(AuthContext);

  const menuItems = [
    { title: "Profile", icon: <AccountCircle />, link: "/profile" },
    { title: "Application", icon: <School />, link: "/application" }, // Academic applications, enrollments
    { title: "Courses", icon: <Book />, link: "/courses" },
    { title: "Results", icon: <Assessment />, link: "/results" }, // New Results menu item
    { title: "Tuition Fee", icon: <Payment />, link: "/tuition" }, // Manage payments
    { title: "Accommodation", icon: <HomeWork />, link: "/accommodation" }, // Dormitory or housing options
    { title: "Support & Complaints", icon: <SupportAgent />, link: "/support" },
    { title: "Settings", icon: <Settings />, link: "/settings" },
    // Add more menu items as needed
  ];

  return (
    <Stack spacing={2}>
      {/* <Stack direction={"row"} spacing={1} alignItems="center">
        <Typography variant="h5" fontWeight={"bold"}>
          Congratulations, {user?.first_name}! your Registration Number is:{" "}
          {user?.student_profile?.student_id}
        </Typography>
      </Stack> */}
      <Stack
        marginTop={"100px"}
        sx={{
          backgroundColor: "#E8F5E9",
          padding: { xs: "20px", sm: "30px" },
          width: { xs: "100%", sm: "90%" },
          borderRadius: "5px",
        }}
        spacing={1}
      >
        <Typography variant="h6" fontWeight={"bold"}>
          Congratulations, {user?.first_name}! {user?.student_profile?.student_id}
        </Typography>
      </Stack>
      <Grid container spacing={2} padding={2}>
        {menuItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardActionArea href={item.link}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.icon}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
