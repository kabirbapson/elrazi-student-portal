import Head from "next/head";
import { use, useCallback, useContext, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Box,
  Container,
  Card,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Stack,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { PersonalInfoForm } from "src/components/form/PersonalInfoForm";
import { AddressForm } from "src/components/form/AddressForm";
import { DocumentUploadForm } from "src/components/form/DocumentUploadForm";
import { AuthContext } from "src/context";
import axiosInstance from "config";
import { FaCircleInfo } from "react-icons/fa6";
import { useRouter } from "next/router";
import ProfileOverview from "src/components/ProfileOverview";
import { ApplicationFeeConfirmed, ApplicationFeePaymentProcess } from "src/components";
import { MdCheckCircle } from "react-icons/md";

const Page = () => {
  const methods = useForm();
  const router = useRouter();
  const [studentDocument, setStudentDocument] = useState({});

  const { user, token, documentsCompleted } = useContext(AuthContext);

  const handleGetStudentDocument = useCallback(async () => {
    axiosInstance
      .get("/students", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const uploadsData = response.data;
          setStudentDocument(uploadsData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    handleGetStudentDocument();
  }, [handleGetStudentDocument]);

  if (!user?.student_profile?.student_id) {
    return (
      <Stack
        sx={{
          marginTop: "50px",
          backgroundColor: "#E8F5E9",
          padding: { xs: "20px", sm: "30px" },
          width: { xs: "80%", sm: "90%" },
          borderRadius: "5px",
          margin: { xs: "0 auto", sm: "0 auto" }, // Center the Stack in its container
          boxSizing: "border-box", // Include padding and border in the width and height
        }}
        spacing={1}
      >
        <MdCheckCircle fontSize={"50px"} color="#4CAF50" />
        <Typography variant="h6">Please contact the registry department.</Typography>
      </Stack>
    );
  }

  return (
    <>
      <Head>
        <title>My Profile | Elrazi Medical University, Kano</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
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
              <Card sx={{ padding: { xs: "20px", sm: "40px" }, mb: "20px" }}>
                <ProfileOverview user={user} studentDocument={studentDocument} />
              </Card>
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
