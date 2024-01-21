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
import { toast } from "react-toastify";

const Page = () => {
  const [user, setUser] = useState();
  // useEffect(() => {
  //   const email = JSON.parse(localStorage.getItem("email"));

  //   if (!email) {
  //     // redirect to login
  //     router.push("/auth/login");
  //   }
  //   // console.log({ email });
  //   setUser(email);
  // }, []);

  // console.log("za user", user);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string().max(70).required("OTP is required"),
    }),
    onSubmit: async (values, helpers) => {
      const { otp } = values;
      const email = JSON.parse(localStorage.getItem("email"));
      console.log('email for local', email);
      console.log(email, otp);
      axiosInstance
        .get(`/auth/verify-email?otp=${otp}&email=${email}`)
        .then((response) => {
          if (response.status === 200) {
            const user = response.data;
            console.log('response',user);
            alert("Email has been successfully verified.");
            // setIsLoading(false);
            toast("Welcome back!");
            localStorage.clear();
            router.push("/auth/login");
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          // setIsLoading(false);
          alert("Something went wrong");
          toast.error("Something went wrong");
        });

      // try {
      //   // await auth.signIn(values.email, values.password);
      //   console.log({ values });
      //   if (values.otp.length > 4) {
      //     alert("Account verified successfully");
      //     router.push("/");
      //   }

      //   // router.push("/");
      // } catch (err) {
      //   helpers.setStatus({ success: false });
      //   helpers.setErrors({ submit: err.message });
      //   helpers.setSubmitting(false);
      // }
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
              <Typography variant="h4">Verify</Typography>
              <Typography color="text.secondary" variant="body2">
                Please verify your email address
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Enter the code sent to {user?.email}
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
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Continue
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
