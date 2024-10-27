import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import axiosInstance from "config";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [email, setEmail] = useState("");

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string().min(4).required("OTP is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const { otp } = values;
      axiosInstance
        .get(`/auth/verify-email?otp=${otp}&email=${email}`)
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            const user = response.data;
            toast.success("Email verified, please login to continue");
            localStorage.removeItem("email");
            router.push("/auth/login");
          }
        })
        .catch((error) => {
          // if error is 400 then otp is wrong
          if (error.response.status === 400) {
            setLoading(false);
            toast.error("Incorrect OTP, please check your email and try again");
            return;
          } else {
            setLoading(false);
            // console.log('error verifying email',error.response.data);
            toast.error("Something went wrong");
          }
        });
    },
  });

  const handleResendOTP = () => {
    setOtpLoading(true);
    // You can add logic here to resend OTP via email
    // For example, make an API call to trigger OTP resend
    axiosInstance
      .post("/auth/resend-verification-email", { email })
      .then((response) => {
        if (response.status === 200) {
          setOtpLoading(false);
          toast.success("OTP has been resent successfully.");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setOtpLoading(false);
          toast.error("User with this email does not exist.");
          return;
        }
        setOtpLoading(false);
        console.error("Error resending OTP:", error);
        toast.error("Failed to resend OTP. Please try again.");
      });
  };

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("email"));

    if (!email) {
      // redirect to login
      router.push("/auth/login");
    }
    setEmail(email);
  }, []);

  return (
    <>
      <Head>
        <title>Verify | Elrazi Medical University, Kano</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Verify</Typography>
              <Typography color="text.secondary" variant="body2">
                Please verify your email address
              </Typography>
              <Typography color="text.primary" variant="body1">
                Enter the code sent to{" "}
                <b>
                  <u>{email && email}</u>
                </b>
              </Typography>
            </Stack>

            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.otp && formik.errors.otp)}
                  fullWidth
                  helperText={formik.touched.otp && formik.errors.otp}
                  label="One Time Password"
                  name="otp"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="otp"
                  value={formik.values.otp}
                />
              </Stack>

              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <Typography>Continue</Typography>
                )}
              </Button>
            </form>

            <Button
              fullWidth
              size="medium"
              sx={{ mt: 2 }}
              variant="text"
              disabled={otpLoading}
              onClick={handleResendOTP}
            >
              {otpLoading ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <Typography variant="body2">Resend OTP</Typography>
              )}
            </Button>
          </div>

          <Typography mt={"20px"} variant="body2">
            If you encounter any issues or have questions, feel free to contact our support team.
          </Typography>
          <Stack mt={"10px"}>
            <Stack spacing={1} direction={"row"}>
              <Typography fontWeight={"bold"}>Phone:</Typography>
              <Typography variant="body1">+234 808 427 7233</Typography>
            </Stack>
          </Stack>

          <Typography>Thank you for choosing Elrazi Medical University.</Typography>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
