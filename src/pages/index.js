import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  FormControl,
  Unstable_Grid2 as Grid,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { CalendarIcon } from "@mui/x-date-pickers";
import axiosInstance from "src/api/config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AuthContext } from "src/context";
import {
  AdmissionApplication,
  AdmissionApplicationProcess,
  ApplicationFeeConfirmed,
  ApplicationFeePaymentProcess,
} from "src/components";

const Page = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, token, paymentUpload, setPaymentUpload, facultyCourses, documentsCompleted } =
    useContext(AuthContext);

  const router = useRouter();

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
          <Card sx={{ padding: { xs: "20px", sm: "40px" }, mb: "20px" }}>
            {!documentsCompleted ? (
              <>
                {user?.has_paid ? (
                  <ApplicationFeeConfirmed name={user?.first_name} />
                ) : (
                  <ApplicationFeePaymentProcess name={user?.first_name} />
                )}
              </>
            ) : (
              <AdmissionApplicationProcess name={user?.first_name} faculties={facultyCourses} />
            )}
          </Card>
          {/* <Grid container spacing={3}>
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
                value={
                  user?.has_paid ? "Paid" : paymentUpload ? "Pending confirmation" : "Not Paid"
                }
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
          </Grid> */}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
