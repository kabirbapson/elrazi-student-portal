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

const steps = ["Personal Info", "Address", "Document Upload"];

const Page = () => {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm();
  const router = useRouter();

  const { user, token } = useContext(AuthContext);
  const [userData, setUserData] = useState(user);
  const [studentDocument, setStudentDocument] = useState({});

  const updateUserInfo = async (data) => {
    axiosInstance
      .put(
        "/auth/user/",
        { ...userData, ...data },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const handleNext = (data) => {
    if (data) {
      updateUserInfo(data);
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalInfoForm onNext={handleNext} user={userData} />;
      case 1:
        return <AddressForm onBack={handleBack} user={userData} onNext={handleNext} />;
      case 2:
        return <DocumentUploadForm onBack={handleBack} document={studentDocument} />;
      default:
        return "Unknown step";
    }
  };

  useEffect(() => {
    handleGetStudentDocument();
  }, [handleGetStudentDocument]);

  return (
    <>
      <Head>
        <title>Account | Elrazi Medical University, Kano</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          {user?.has_paid ? (
            <Card sx={{ padding: { xs: "20px", sm: "40px" }, mb: "20px" }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <FormProvider {...methods}>{getStepContent(activeStep)}</FormProvider>
            </Card>
          ) : (
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
            </Card>
          )}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
