import { useCallback, useContext, useEffect, useState } from "react";
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
import axios from "axios";
import axiosInstance from "config";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "src/context";

const Page = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(70).required("Email is required"),
      password: Yup.string().max(50).required("Password is required"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      setLoading(true);
      axiosInstance
        .post("/auth/login", { email, password })
        .then((response) => {
          if (response.status === 200) {
            const user = response.data;
            localStorage.setItem("token", user.token);
            toast.success("Welcome back!");
            router.push("/");
            setLoading(false);
          }
        })
        .catch((error) => {
          if (error?.response?.status === 400) {
            if (
              error?.response?.data?.non_field_errors[0] === "Incorrect Password or Email Address"
            ) {
              toast.warning("Incorrect credentials");
              alert("Incorrect email or password");
              console.log("Error: Incorrect Email or Password");
              setLoading(false);
            } else {
              console.log("An error occurred, but it's not related to incorrect password.");
              setLoading(false);
              toast.warning("Something went wrong, please check your credentials");
            }
          }
        });
    },
  });

  return (
    <>
      <Head>
        <title>Login | Elrazi Medical University, Kano</title>
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
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
            </Stack>

            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
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
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <Typography>Login</Typography>
                )}
              </Button>

              <Typography sx={{ mt: 2, textAlign: "center" }} variant="h6" color="textSecondary">
                or
              </Typography>

              <Button
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                component={NextLink}
                href="/auth/register"
                variant="outlined"
              >
                Create Account
              </Button>
            </form>

            <Typography sx={{ pt: 4 }} textAlign="center" color="text.secondary" variant="h6">
              Don&apos;t have an account? &nbsp;
              <Link component={NextLink} href="/auth/register" underline="hover" variant="h6">
                Register here
              </Link>
            </Typography>

            <Typography sx={{ mt: 4 }} textAlign="center" color="text.secondary" variant="h6">
              If you encounter any issues or have questions, feel free to contact our support team
              at:
            </Typography>
            <Stack mt="10px" alignItems="center">
              <Stack spacing={1} direction="row">
                <Typography fontWeight="bold">Email:</Typography>
                <Typography variant="body1">ict@elrazi.edu.ng</Typography>
              </Stack>
              <Stack spacing={1} direction="row">
                <Typography fontWeight="bold">Phone:</Typography>
                <Typography variant="body1">+234 808 427 7233</Typography>
              </Stack>
            </Stack>
            <Typography mt="20px" textAlign="center" variant="body2">
              Thank you for choosing Elrazi Medical University.
            </Typography>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
