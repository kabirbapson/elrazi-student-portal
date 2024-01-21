import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import axiosInstance from "config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      other_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().max(25).required("First Name is required"),
      last_name: Yup.string().max(25).required("Last Name is required"),
      other_name: Yup.string().max(25),
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
      const { email, password, first_name, last_name } = values;
      try {
        // await auth.signIn(values.email, values.password);
        axiosInstance
          .post("/auth/register", { email, password, first_name, last_name })
          .then((response) => {
            if (response.status === 201) {
              const user = response.data;
              localStorage.setItem("email", JSON.stringify(email));
              console.log("CREATED USER", user);
              router.push("/auth/verify");
              // alert("Login successful");
              // setIsLoading(false);
              toast("Please check your email for OTP!");
            } else if (response.status === 400) {
              console.log(response.data);
              alert("Student with this email already exists!")
              // setIsLoading(false);
              toast("Student with this email already exists!");
            }
          })
          .catch((error) => {
            // setIsLoading(false);
            if (error.response.status === 400) {
              // setIsLoading(false);
              // alert("Student with this email already exists!");
              toast("Student with this email already exists!");
            } else {
              console.log("MY ERROR", error.response.data);
            }
          });

        const user = JSON.parse(localStorage.getItem("user"));

        // if (user.email === values.email && user.password === values.password) {
        //   alert("Login successful");
        // }
      } catch (err) {
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
              <Typography color="text.secondary" variant="body2">
                Already have an account? &nbsp;
                <Link component={NextLink} href="/auth/login" underline="hover" variant="subtitle2">
                  Log in
                </Link>
              </Typography>
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
                  error={!!(formik.touched.other_name && formik.errors.other_name)}
                  fullWidth
                  helperText={formik.touched.other_name && formik.errors.other_name}
                  label="Other Name"
                  name="other_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.other_name}
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
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Continue
              </Button>
            </form>
          </div>
        </Box>
        <ToastContainer />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
