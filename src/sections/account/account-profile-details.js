import { use, useCallback, useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "src/context";

export const AccountProfileDetails = () => {
  // lets stringify the user object from local storage

  const { user } = useContext(AuthContext);
  // console.log(user)
  const formik = useFormik({
    initialValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      phone_number: user?.phone_number || "",
      dob: user?.dob || "",
      address: user?.address || "",
      state: user?.state || "",
      country: user?.country || "",
      gender: user?.gender || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      first_name: Yup.string().max(25).required("First Name is required"),
      last_name: Yup.string().max(25).required("Last Name is required"),
      email: Yup.string().email("Must be a valid email").max(50).required("Email is required"),
      phone_number: Yup.string().required("Phone Number is required"),
      // Add more validations as required for other fields
    }),
    onSubmit: (values) => {
      // Your update logic here
      try {
        console.log("hhhhyy", values);
      } catch (error) {
        console.log("hhhhyy", error);
      }
    },
  });

  // +true;
  // +false;
  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              {/* Repeat for each field */}
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First name"
                  name="first_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.first_name}
                  error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                  helperText={formik.touched.first_name && formik.errors.first_name}
                />
              </Grid>
              {/* ... other fields */}
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button disabled={false} type="submit" variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
