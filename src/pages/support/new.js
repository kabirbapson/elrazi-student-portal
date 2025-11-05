import Head from "next/head";
import { useContext, useState } from "react";
import { Box, Container, Card, Typography, Alert } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AuthContext } from "src/context";
import axiosInstance from "config";
import BackButton from "src/components/BackButton";
import { useRouter } from "next/router";

import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Stack,
} from "@mui/material";

const SupportForm = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      category: "",
      subject: "",
      message: "",
      priority: "normal",
    },
  });

  const handleFormSubmit = (data) => {
    const formattedData = {
      subject: data.subject,
      description: `[${data.category}] ${data.message}`,
      priority: data.priority.toLowerCase(),
    };
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2} my={"20px"}>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel id="category-label">Type of Issue</InputLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select {...field} labelId="category-label" label="Type of Issue">
                  <MenuItem value="Academic">Academic Issue</MenuItem>
                  <MenuItem value="Finance">Tuition / Fee Issue</MenuItem>
                  <MenuItem value="Accommodation">Accommodation / Hostel Issue</MenuItem>
                  <MenuItem value="Exam/Results">Exam / Result Issue</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select {...field} labelId="priority-label" label="Priority">
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="high">High (Urgent)</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Subject" required fullWidth />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Message / Complaint Details"
                multiline
                rows={5}
                required
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>

      <Stack justifyContent="flex-end" direction="row" spacing={2}>
        <Button variant="contained" type="submit" color="primary">
          Submit Complaint
        </Button>
      </Stack>
    </form>
  );
};

const Page = () => {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data) => {
    try {
      await axiosInstance.post(`/tickets/`, data, {
        headers: { Authorization: `Token ${token}` },
      });
      setSuccess(true);
      setTimeout(() => router.push("/support"), 1500);
    } catch (error) {
      console.log("Ticket Submit Error:", error);
      alert("Failed to submit ticket, try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Create Support Ticket | Elrazi Medical University</title>
      </Head>

      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="md">
          <BackButton fallback="/support" />

          <Card sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Create Support Ticket
            </Typography>

            {success && <Alert severity="success">Ticket Submitted Successfully!</Alert>}

            <SupportForm onSubmit={handleSubmit} />
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
