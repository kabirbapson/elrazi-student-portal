import Head from "next/head";
import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Container, Card, Typography, Stack } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AuthContext } from "src/context";
import { TuitionFeesPaymentDetails } from "src/components/form/TuitionFeesPaymentDetails";
import { AdmissionApplicationPending, AdmissionApplicationRejected } from "src/components";
import { AccommodationFeesPaymentDetails } from "src/components/form/AccommodationFeesPaymentDetails";

const PaymentsPage = () => {
  const [pending, setPending] = useState(false);
  const [approved, setApproved] = useState(false); // New state for approved
  const [rejected, setRejected] = useState(false); // New state for rejected
  const [loading, setLoading] = useState(true);
  const [mBBS, setMBBS] = useState(false);

  const { user, token, admissions, tuitionFeeUpload, accommodationFeeUpload } =
    useContext(AuthContext);

  const admissionCheck = useCallback(() => {
    if (!admissions || admissions.length < 1) {
      setLoading(false);
      return;
    }

    // Find an admission where the course name is "Medicine and Surgery MBBS"
    const appliedForMedicineAndSurgery = admissions.find(
      (admission) => admission.course.name === "Medicine and Surgery (MBBS)"
    );

    if (appliedForMedicineAndSurgery) {
      setMBBS(true);
    } else {
      setMBBS(false);
    }

    const admissionStatus = admissions?.find((admission) => admission.status);

    switch (admissionStatus?.status) {
      case "PENDING":
        setPending(true);
        break;
      case "APPROVED":
        setApproved(true);
        break;
      case "REJECTED":
        setRejected(true);
        break;
      default:
        break;
    }

    setLoading(false);
  }, [admissions]);

  useEffect(() => {
    admissionCheck();
  }, [admissionCheck]);

  return (
    <>
      <Head>
        <title>Payments | Elrazi Medical University</title>
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
            {loading ? (
              <Typography>Loading...</Typography>
            ) : (
              <Stack spacing={2}>
                <>
                  {pending && <AdmissionApplicationPending name={user?.first_name} />}
                  {approved && (
                    <AccommodationFeesPaymentDetails
                      mBBS
                      name={user?.first_name}
                      accommodationFeeUpload
                    />
                  )}
                  {rejected && <AdmissionApplicationRejected name={user?.first_name} />}
                </>
              </Stack>
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

PaymentsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PaymentsPage;
