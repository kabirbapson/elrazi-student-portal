import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { Box, Container, Card, Typography, Button, Chip, Stack } from "@mui/material";
import Link from "next/link";
import axiosInstance from "config";
import { AuthContext } from "src/context";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const { user, token } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get(`/tickets/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setTickets(response.data);
      } catch (error) {
        console.log("Ticket fetch error:", error);
      }
    };

    if (user && token) fetchTickets();
  }, [user, token]);

  const statusColor = (status) => {
    switch (status) {
      case "open":
        return "success";
      case "closed":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <>
      <Head>
        <title>My Support Tickets | Elrazi Medical University</title>
      </Head>

      <Box sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">My Support Tickets</Typography>

          <Link href="/support/new" passHref>
            <Button variant="contained">Create New Ticket</Button>
          </Link>
        </Stack>

        <Container maxWidth="md">
          {tickets.length === 0 && (
            <Typography textAlign="center" color="text.secondary" mt={3}>
              You have not created any support tickets yet.
            </Typography>
          )}

          {tickets.map((ticket) => (
            <Card key={ticket.id} sx={{ p: 2, mb: 2 }}>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="h6">{ticket.subject}</Typography>
                  <Typography fontSize={14} color="text.secondary">
                    Created: {new Date(ticket.created_at).toLocaleString()}
                  </Typography>
                </Box>

                <Stack spacing={1} alignItems="flex-end">
                  <Chip label={ticket.status?.toUpperCase()} color={statusColor(ticket.status)} size="small" />
                  <Chip label={`Priority: ${ticket.priority}`} size="small" />
                  <Link href={`/support/${ticket.id}`} style={{ textDecoration: "none" }}>
                    <Button size="small" variant="outlined">View</Button>
                  </Link>
                </Stack>
              </Stack>
            </Card>
          ))}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;



// import Head from "next/head";
// import { useContext, useState } from "react";
// import { Box, Container, Card, Typography, Button, Stack, Alert } from "@mui/material";
// import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
// import { AuthContext } from "src/context";
// import axiosInstance from "config";
// import { SupportForm } from "src/components/form/SupportForm";
// import { ConnectingAirportsOutlined } from "@mui/icons-material";

// const Page = () => {
//   const { user, token } = useContext(AuthContext);
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (data) => {
//     setLoading(true);
//     console.log(data);
//     console.log("User:", user);
//     console.log("Token:", token);
//     // try {
//     //   const response = await axiosInstance.post(
//     //     "/support-tickets/",
//     //     {
//     //       student: user?.id,
//     //       ...data,
//     //     },
//     //     {
//     //       headers: {
//     //         Authorization: `Token ${token}`,
//     //       },
//     //     }
//     //   );

//     //   if (response.status === 201 || response.status === 200) {
//     //     setSuccess(true);
//     //   }
//     // } catch (error) {
//     //   console.log("Support error:", error);
//     //   alert("Something went wrong. Please try again.");
//     // } finally {
//     //   setLoading(false);
//     // }
//   };

//   return (
//     <>
//       <Head>
//         <title>Support / Complaint | Elrazi Medical University, Kano</title>
//       </Head>

//       <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
//         <Container maxWidth="md">
//           <Card sx={{ padding: { xs: "20px", sm: "40px" } }}>
//             <Typography variant="h5" fontWeight="bold" gutterBottom>
//               Support / Complaint Form
//             </Typography>

//             <Typography variant="body2" color="text.secondary" mb={3}>
//               Submit your issue or complaint to the university management. You will receive a response soon.
//             </Typography>

//             {success && (
//               <Alert severity="success" sx={{ mb: 3 }}>
//                 Your complaint has been submitted successfully. Management will respond soon.
//               </Alert>
//             )}

//             <SupportForm onSubmit={handleSubmit} />

//             {/* <Stack direction="row" justifyContent="flex-end" mt={3}>
//               <Button variant="contained" disabled={loading} onClick={() => {}}>
//                 {loading ? "Submitting..." : "Submit Complaint"}
//               </Button>
//             </Stack> */}
//           </Card>
//         </Container>
//       </Box>
//     </>
//   );
// };

// Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export default Page;
