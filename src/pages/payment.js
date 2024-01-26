import * as React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  CircularProgress,
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
import { useRouter } from "next/navigation";

const Page = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadReceipt = async (event) => {
    setLoading(true);
    event.preventDefault();

    if (!selectedFile) {
      // Handle no file selected case
      setUploadStatus("Please select a file to upload.");
      return;
    }

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
          setLoading(false);
          const uploadsData = response.data;
          setUploadStatus("File uploaded successfully!");
          toast("File uploaded successfully!");
          setSelectedFile(null);
          fetchUserPaymentStatus(token);
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setLoading(false);
          setUploadStatus("Please select a valid image to upload.");
          toast("Please upload a valid image");
        } else if (error.response.status === 401) {
          localStorage.clear();
          router.push("/auth/login");
        } else {
          setLoading(false);
          console.log("upload error", error.response.data);
        }
      });
  };

  const fetchUserPaymentStatus = (token) => {
    axiosInstance
      .get("/payments/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        // if the response has data, it means user has uploaded receipt
        //  let's write the code
        const uploadsData = response.data;
        if (uploadsData.length > 0) {
          setHasUploaded(true);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          toast("Session expired, please login again");
          localStorage.clear();
          router.push("/auth/login");
        }
        toast("Something went wrong!, try again");
      });
  };

  const fetchUserDetails = (token) => {
    axiosInstance
      .get("/auth/user/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const user = response.data;
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          // localStorage.setItem("user", JSON.stringify(user));
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast("Session expired, please login again");
          localStorage.clear();
          router.push("/auth/login");
        } else {
          console.log("Fetched error", error.response.data);
        }
      });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      fetchUserPaymentStatus(token);
      fetchUserDetails(token);
    }
    if (!user) {
      router.push("/auth/login");
    }
    setUser(user);
    setToken(token);
  }, []);

  const router = useRouter();

  //   // settimeout to clear storage after 3 hour
  // useEffect(() => {
  //   setTimeout(() => {
  //     localStorage.clear();
  //     router.push("/auth/login");
  //   }, 10800000);
  // }, []);

  return (
    <>
      <Head>
        <title>Payment | Elrazi Medical University, Kano</title>
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
                {user?.has_paid ? (
                  <Typography
                    textAlign={"center"}
                    color="green"
                    variant="h6"
                    sx={{ marginBottom: "15px" }}
                  >
                    Application fee paid, please update your Bio-data and upload required documents
                  </Typography>
                ) : (
                  <Typography
                    textAlign={"center"}
                    color="maroon"
                    variant="h6"
                    sx={{ marginBottom: "15px" }}
                  >
                    Please go to Dashboard, make payment of N30,000 application fee and upload
                    receipt to continue.
                  </Typography>
                )}
              </Grid>
            </Box>
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
                value={user?.has_paid ? "Paid" : hasUploaded ? "Pending confirmation" : "Not Paid"}
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
                value="Not Applied"
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
