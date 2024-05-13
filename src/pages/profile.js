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

const Page = () => {
  const methods = useForm();
  const router = useRouter();

  const { user, token, documentsCompleted } = useContext(AuthContext);

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
                <ProfileOverview user={user} />
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
