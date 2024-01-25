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
        console.log("Fetched error", error.response.data);
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
                {!hasUploaded ? (
                  <Typography
                    textAlign={"center"}
                    color="black"
                    variant="h6"
                    sx={{ marginBottom: "15px" }}
                  >
                    Please make payment of N30,000 application fee and upload receipt to continue.
                  </Typography>
                ) : (
                  <Typography variant="h6" sx={{ marginBottom: "15px" }}>
                    Payment receipt uploaded, please wait for confirmation
                  </Typography>
                )}
              </Grid>
            </Box>
          </Grid>

          {!hasUploaded && (
            <>
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
                  <Typography variant="h6" textAlign={"center"} sx={{ marginBottom: "15px" }}>
                    Payment Information {user.first_name}
                  </Typography>

                  <Typography variant="body2">Account Name:</Typography>
                  <Typography textAlign={"center"} variant="body1" sx={{ fontWeight: "bold" }}>
                    Elrazi Medical University kn-Revenue
                  </Typography>

                  <Typography variant="body2">Account Number:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    0005035147
                  </Typography>

                  <Typography variant="body2">Bank Name:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Taj Bank Plc.
                  </Typography>
                </Grid>

                <Grid
                  sx={{
                    // flexDirection: "column", /* Arrange elements vertically */
                    alignItems: "center" /* Center elements horizontally */,
                    justifyContent: "center" /* Center elements vertically */,
                    // width: "100%" /* Ensure full width */,
                  }}
                >
                  <form onSubmit={handleUploadReceipt}>
                    <FormControl>
                      <Typography variant="h6" sx={{ marginBottom: "15px" }}>
                        Upload Receipt (jpg/png)
                      </Typography>
                      <Input type="file" onChange={handleFileChange} accept=".jpg,.png,.pdf" />
                    </FormControl>{" "}
                    {uploadStatus && <p>{uploadStatus}</p>}
                    <p>
                      <Button
                        sx={{ textAlign: "center" }}
                        type="submit"
                        variant="contained"
                        disabled={loading}
                      >
                        {loading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          <Typography>Upload Payment Receipt</Typography>
                        )}
                      </Button>
                    </p>
                  </form>
                </Grid>
              </Grid>
            </>
          )}
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
