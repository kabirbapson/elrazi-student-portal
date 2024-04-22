import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, CircularProgress, Link, Stack, TextField, Typography } from "@mui/material";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import axiosInstance from "config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().max(25).required("First Name is required"),
      last_name: Yup.string().max(25).required("Last Name is required"),
      phone_number: Yup.string()
        .min(8, "Phone number cannot be less than 8 characters")
        .max(15, "Phone number cannot exceed 15 characters")
        .required("Phone number is required"),
      email: Yup.string().email("Must be a valid email").max(50).required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-zA-Z]+/, "Password must contain at least one letter")
        .matches(/[!@#$%^&*(),.?":{}|<>]+/, "Password must contain at least one symbol")
        .label("Password"),
      confirm_password: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      const { email, password, phone_number, first_name, last_name } = values;
      setLoading(true);
      try {
        axiosInstance
          .post("/auth/register", { email, password, phone_number, first_name, last_name })
          .then((response) => {
            if (response.status === 201) {
              localStorage.setItem("email", JSON.stringify(email));
              router.push("/auth/verify");
              setLoading(false);
              toast.success("Account created, please check your email for OTP!");
            } else if (response.status === 400) {
              setLoading(false);
              toast.success("Account with this email already exists!");
            }
          })
          .catch((error) => {
            setLoading(false);
            if (error.response.status === 400) {
              toast.error("Account with this email already exists!");
            } else {
              toast.error("Something went wrong!");
            }
          });
        const user = JSON.parse(localStorage.getItem("user"));
      } catch (err) {
        toast.error("Something went wrong!");
        setLoading(false);
        console.log(err);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Register | Elrazi Medical University, Kano</title>
      </Head>
      <Box
        sx={{
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
              <Typography variant="h4">Register</Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.first_name && formik.errors.first_name)}
                  fullWidth
                  helperText={formik.touched.first_name && formik.errors.first_name}
                  label="First Name"
                  name="first_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                />
                <TextField
                  error={!!(formik.touched.last_name && formik.errors.last_name)}
                  fullWidth
                  helperText={formik.touched.last_name && formik.errors.last_name}
                  label="Last Name"
                  name="last_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                />
                <TextField
                  error={!!(formik.touched.phone_number && formik.errors.phone_number)}
                  fullWidth
                  helperText={formik.touched.phone_number && formik.errors.phone_number}
                  label="Phone Number"
                  name="phone_number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone_number}
                />
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
                <TextField
                  error={!!(formik.touched.confirm_password && formik.errors.confirm_password)}
                  fullWidth
                  helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                  label="Confirm Password"
                  name="confirm_password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.confirm_password}
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
                  <Typography>Register</Typography>
                )}
              </Button>
            </form>
          </div>

          <Typography sx={{ pt: 2 }} textAlign={"center"} color="text.secondary" variant="h6">
            Already have an account? &nbsp;
            <Link component={NextLink} href="/auth/login" underline="hover" variant="h6">
              Log in
            </Link>
          </Typography>

          <Typography mt={"20px"} variant="body2">
            If you encounter any issues or have questions, feel free to contact our support team at
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
