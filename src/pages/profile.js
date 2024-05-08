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


const Page = () => {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm();
  const router = useRouter();

  const { user, token } = useContext(AuthContext);
  console.log('baosi',{user});




 
  


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
            <Stack>
              <FaCircleInfo fontSize={"60px"} color={"#D89136"} />
              <Typography mt={"20px"} fontWeight={"bold"} color={"#D89136"} marginTop={"20px"}>
                Application Fee Payment is Required
              </Typography>
              <Typography mt={"10px"} color={"black"} variant="body2">
                Please Click on the button below to make payment for your application fee.
              </Typography>
              <Button
                onClick={() => router.push("/")}
                sx={{
                  marginTop: "20px",
                  width: {
                    xs: "100%",
                    sm: "60%",
                  },
                }}
                variant="contained"
              >
                Dashboard
              </Button>
            </Stack>
            <ProfileOverview profile={user} />
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
