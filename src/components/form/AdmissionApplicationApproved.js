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
} from "@mui/icons-material";

export const AdmissionApplicationApproved = () => {
  const { token, user } = useContext(AuthContext);

  const menuItems = [
    { title: "Profile", icon: <AccountCircle />, link: "/profile" },
    { title: "Courses", icon: <Book />, link: "/courses" },
    { title: "Tuition Fee", icon: <Payment />, link: "/tuition" }, // Manage payments
    { title: "Accommodation", icon: <HomeWork />, link: "/accommodation" }, // Dormitory or housing options
    { title: "Application", icon: <School />, link: "/application" }, // Academic applications, enrollments
    { title: "Settings", icon: <Settings />, link: "/settings" },
    // Add more menu items as needed
  ];
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
        <Typography fontWeight={"bold"} sx={{ color: "#2E7D32" }}>
          ADMISSION APPROVED
        </Typography>
        <Typography variant="h6">
          Please come to the registry department for your Registration Number
        </Typography>
      </Stack>
    );
  }
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
        {/* <MdCheckCircle fontSize={"20px"} color="#4CAF50" />
        <Typography fontWeight={"bold"} sx={{ color: "#2E7D32" }}>
          ADMISSION APPROVED
        </Typography> */}
        <Typography variant="h6" fontWeight={"bold"}>
          Congratulations, {user?.first_name}! your Registration Number is:{" "}
          {user?.student_profile?.student_id}
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

      {/* <Stack
        marginTop={"100px"}
        sx={{
          backgroundColor: "#E8F5E9",
          padding: { xs: "20px", sm: "30px" },
          width: { xs: "100%", sm: "90%" },
          borderRadius: "5px",
        }}
        spacing={1}
      >
        <MdCheckCircle fontSize={"50px"} color="#4CAF50" />
        <Typography fontWeight={"bold"} sx={{ color: "#2E7D32" }}>
          ADMISSION APPROVED
        </Typography>
        <Typography sx={{ color: "#2E7D32" }}>
          We are thrilled to inform you that your application to Elrazi Medical University has been
          approved. Welcome to our community!
        </Typography>

        <Typography sx={{ mt: 4, color: "#2E7D32" }}>
          Please check your email to download and print your admission letter along with the invoice
          for your tuition fee. It is essential that you make the payment for your tuition fee as
          instructed in the invoice.
        </Typography>

        <Typography sx={{ mt: 2, color: "#2E7D32" }}>
          After making the payment, please upload the receipt of your tuition fee payment using the
          link below. This will complete your registration process.
        </Typography>

        // Assuming the link to the upload page is "/upload-payment-receipt" 
        <Link href="/tuition" passHref>
          <Button
            variant="contained"
            sx={{ mt: 2, bgcolor: "#4CAF50", "&:hover": { bgcolor: "#388E3C" } }}
          >
            Go To Payments
          </Button>
        </Link>
        <Typography textAlign={"end"} sx={{ mt: 2, color: "#2E7D32" }}>
          Best wishes,
        </Typography>
      </Stack> */}
    </Stack>
  );
};
