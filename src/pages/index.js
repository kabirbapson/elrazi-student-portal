import * as React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  FormControl,
  Unstable_Grid2 as Grid,
  Input,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { CalendarIcon } from "@mui/x-date-pickers";
import axiosInstance from "config";
import { toast } from "react-toastify";

const now = new Date();

const Page = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [paymentStatus, setPaymentStatus] = useState("Not Paid");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      // Handle no file selected case
      setUploadStatus("Please select a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("receipt", selectedFile);

      axiosInstance
        .post("/payments/", formData, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status === 201) {
            setUploadStatus("File uploaded successfully!");
            toast("File uploaded successfully!");
            setSelectedFile(null); // Clear selected file
            console.log("upload respnnse", response.data);
          }
        })
        .catch((error) => {
          console.log("upload error", error.response.data);
        });
      //
      // console.log(formData);
      // const response = await fetch("/api/upload", {
      //   method: "POST",
      //   body: formData,
      // });

      // if (response.ok) {

      // } else {
      //   // Handle server-side error
      //   setUploadStatus("Upload failed. Please try again.");
      // }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("An error occurred during upload.");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    setToken(user.token);
    if (!user) {
      // redirect to login
      router.push("/auth/login");
    }

    setUser(user?.user);
  }, []);

  useEffect(() => {
    if (user?.has_paid) {
      if (selectedFile) {
        setPaymentStatus("Confirmation Pending");
      } else {
        setPaymentStatus("Paid");
      }
    } else {
      setPaymentStatus("Not Paid");
    }
  }, [user?.has_paid, selectedFile]);
  console.log({paymentStatus});
  return (
    <>
      <Head>
        <title>Dashboard | Elrazi Medical University, Kano</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Box
              component="section"
              sx={{
                color: "green",
                // backgroundColor: "blue",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
                // p: 10,
              }}
            >
              <Grid>
                <Typography variant="h6" sx={{ marginBottom: "15px" }}>
                  Make payment of N30,000 Application Fee and Upload Receipt
                </Typography>
              </Grid>
            </Box>
          </Grid>

          <Grid
            container
            spacing={3}
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              backgroundColor: "lightgreen",
              display: "flex",
              justifyContent: "space-around" /* Align items to start and end */,
              borderRadius: "15px",
            }}
          >
            <Grid
              item
              xs={6}
              sx={{
                // backgroundColor: "red",
                display: "flex" /* Enable flexbox for centering */,
                flexDirection: "column" /* Arrange content vertically */,
                alignItems: "center" /* Center elements horizontally */,
                justifyContent: "center" /* Center elements vertically */,
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: "15px" }}>
                Payment Information
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Account Name:
              </Typography>
              <Typography textAlign={"center"} variant="body2">
                Elrazi Medical University kn-Revenue 
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Account Number:
              </Typography>
              <Typography variant="body2">0005035147</Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Bank Name:
              </Typography>
              <Typography variant="body2">Taj Bank Plc.</Typography>
            </Grid>

            <Grid
              sx={{
                // flexDirection: "column", /* Arrange elements vertically */
                alignItems: "center" /* Center elements horizontally */,
                justifyContent: "center" /* Center elements vertically */,
                // width: "100%" /* Ensure full width */,
              }}
            >
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <Typography variant="h6" sx={{ marginBottom: "15px" }}>
                    Upload Payment Receipt
                  </Typography>
                  <Input type="file" onChange={handleFileChange} accept=".jpg,.png,.pdf" />
                </FormControl>{" "}
                {uploadStatus && <p>{uploadStatus}</p>}
                <p>
                  <Button sx={{ textAlign: "center" }} type="submit" variant="contained">
                    Upload Receipt
                  </Button>
                </p>
              </form>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                title={"Session"}
                dateApplied={"Jan, 2024"}
                iconBg={"success.light"}
                icon={<CalendarIcon />}
                difference={12}
                positive
                sx={{ height: "100%" }}
                value="2023/2024"
              />
            </Grid>

            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                title={"Application Fee"}
                dateApplied={"20 January, 2024"}
                iconBg={"success.light"}
                icon={<CalendarIcon />}
                difference={12}
                positive
                sx={{ height: "100%" }}
                value={paymentStatus}
              />
            </Grid>

            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                title={"Program Applied"}
                dateApplied={"21 January, 2024"}
                iconBg={"success.light"}
                icon={<CalendarIcon />}
                difference={12}
                positive
                sx={{ height: "100%" }}
                value="No Course Applied"
              />
            </Grid>

            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                title={"Admission Status"}
                dateApplied={"31 January, 2024"}
                iconBg={"success.light"}
                icon={<CalendarIcon />}
                difference={12}
                positive
                sx={{ height: "100%" }}
                value="Pending"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
