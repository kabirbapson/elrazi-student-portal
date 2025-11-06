import Head from "next/head";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Card,
  Typography,
  Stack,
  Grid,
  Button,
  Divider
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AuthContext } from "src/context";

import {
  AdmissionApplicationPending,
  AdmissionApplicationRejected,
  ApplicationFeeConfirmed,
  ApplicationFeePaymentProcess,
} from "src/components";
import { AccommodationFeesPaymentDetails } from "src/components/form/AccommodationFeesPaymentDetails";

const Accommodation = () => {
  const [pending, setPending] = useState(false);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [mBBS, setMBBS] = useState(false);

  const { user, admissions, documentsCompleted } = useContext(AuthContext);

  const admissionCheck = useCallback(() => {
    if (!admissions || admissions.length < 1) return;

    const appliedForMedicineAndSurgery = admissions.find(
      (admission) => admission.course.name === "Medicine and Surgery (MBBS)"
    );

    setMBBS(Boolean(appliedForMedicineAndSurgery));

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
  }, [admissions]);

  useEffect(() => {
    admissionCheck();
  }, [admissionCheck]);

  return (
    <>
      <Head>
        <title>Accommodation | Elrazi Medical University</title>
      </Head>

      <Box component="main" sx={{ flexGrow: 1, py: 6 }}>
        <Container maxWidth="lg">

          {/* ---- HEADER ---- */}
          <Stack spacing={1} mb={4}>
            <Typography variant="h4" fontWeight={700}>
              Student Hostels & Accommodation
            </Typography>
            <Typography color="text.secondary" maxWidth="700px">
              Comfortable, safe and community-focused living spaces for our students.
              Designed to support academic success, wellbeing, and campus life.
            </Typography>
          </Stack>

          {/* ---- HOSTEL PLANS ---- */}
          <Grid container spacing={3} mb={5}>
            {/* Two Occupants */}
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700}>Two Occupants Room</Typography>
                <Typography variant="h5" fontWeight={700} mt={1}>₦1,000,000 / Session</Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Spacious and well-furnished for shared comfort.
                </Typography>

                <Stack spacing={1} mt={2}>
                  <Typography>• 2 Beds & Study Desks</Typography>
                  <Typography>• Shared Bathroom</Typography>
                  <Typography>• Free Wi-Fi Access</Typography>
                  <Typography>• 24/7 Security</Typography>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" fontWeight={600}>International: $1,000 / Session</Typography>
              </Card>
            </Grid>

            {/* Three Occupants */}
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700}>Three Occupants Room</Typography>
                <Typography variant="h5" fontWeight={700} mt={1}>₦750,000 / Session</Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  A cost-effective and social living option.
                </Typography>

                <Stack spacing={1} mt={2}>
                  <Typography>• 3 Beds & Study Desks</Typography>
                  <Typography>• Shared Bathroom</Typography>
                  <Typography>• Ventilated & Well-lit Rooms</Typography>
                  <Typography>• Secure Entry System</Typography>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" fontWeight={600}>International: $750 / Session</Typography>
              </Card>
            </Grid>
          </Grid>

          {/* ---- STATUS / ACTION SECTION ---- */}
          <Card sx={{ p: 4 }}>
            {!admissions || admissions.length < 1 ? (
              <Typography color="text.secondary">
                Your admission details are being processed. Please check again later.
              </Typography>
            ) : (
              <>
                {!documentsCompleted ? (
                  user?.has_paid
                    ? <ApplicationFeeConfirmed name={user?.first_name} />
                    : <ApplicationFeePaymentProcess name={user?.first_name} />
                ) : (
                  <>
                    {pending && <AdmissionApplicationPending name={user?.first_name} />}
                    {approved && (
                      <AccommodationFeesPaymentDetails
                        mBBS={mBBS}
                        name={user?.first_name}
                      />
                    )}
                    {rejected && <AdmissionApplicationRejected name={user?.first_name} />}
                  </>
                )}
              </>
            )}
          </Card>

        </Container>
      </Box>
    </>
  );
};

Accommodation.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Accommodation;
