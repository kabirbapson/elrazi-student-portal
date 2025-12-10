import { useState, useContext } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, CircularProgress, Link, Stack, TextField, Typography } from "@mui/material";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import axiosInstance from "config";
import { toast } from "react-toastify";
import { AuthContext } from "src/context";

const Page = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async ({ email, password }) => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.post("/auth/login", {
          email: email.toLowerCase(),
          password,
        });

        // ✅ Ensure user object does not include token key twice
        const userData = { ...data };
        delete userData.token;

        // ✅ Store to Auth Context + LocalStorage
        login(userData, data.token);

        toast.success("Welcome back!");
        router.push("/");
      } catch (error) {
        toast.error("Incorrect email or password");
      } finally {
        setLoading(false);
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
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ maxWidth: 550, px: 3, width: "100%" }}>
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4">Login</Typography>
          </Stack>

          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={(e) => formik.setFieldValue("email", e.target.value.toLowerCase())}
                error={!!formik.errors.email && formik.touched.email}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.errors.password && formik.touched.password}
                helperText={formik.touched.password && formik.errors.password}
                fullWidth
              />
            </Stack>

            <Button
              fullWidth
              size="large"
              sx={{ mt: 2 }}
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>

            <Typography sx={{ mt: 2, textAlign: "center" }} variant="h6">
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

          <Typography mt="30px" textAlign="center" variant="body2">
            Need help? Email: <strong>ict@elrazi.edu.ng</strong> — Call:{" "}
            <strong>+234 808 427 7233</strong>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
export default Page;
