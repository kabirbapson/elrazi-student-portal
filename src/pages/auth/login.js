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
import axios from "axios";
import axiosInstance from "config";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   toast("Wow so easy!");
  // }, []);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      // submit: null
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(70).required("Email is required"),
      password: Yup.string().max(50).required("Password is required"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      setLoading(true);
      try {
        // await auth.signIn(values.email, values.password);
        axiosInstance
          .post("/auth/login", { email, password })
          .then((response) => {
            if (response.status === 200) {
              const user = response.data;
              localStorage.setItem("user", JSON.stringify(user.user));
              localStorage.setItem("token", JSON.stringify(user.token));

              toast("Welcome back!");
              router.push("/");
              setLoading(false);
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              setLoading(false);
              alert("Please verify/check your email and password");
              toast("Something went wrong, please check your email");
            } else {
              setLoading(false);
              console.log("MY ERROR", error.response.data);
            }
          });
      } catch (err) {
        console.log(err);
      }
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
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
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
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
