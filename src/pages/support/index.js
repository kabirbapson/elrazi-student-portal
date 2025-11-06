import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { Box, Container, Card, Typography, Button, Chip, Stack, Divider } from "@mui/material";
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
    switch (status?.toLowerCase()) {
      case "open":
        return "success";
      case "in progress":
        return "warning";
      case "closed":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <>
      <Head>
        <title>Support Tickets | Elrazi Medical University</title>
      </Head>

      <Box
        sx={{
          p: 3,
          minHeight: "100vh",
          background: "linear-gradient(135deg, #EEF7FF 0%, #F7F9FC 100%)",
        }}
      >
        <Container maxWidth="md">
          {/* Page Heading */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h4" fontWeight={700} color="primary.dark">
              My Support Tickets
            </Typography>

            <Link href="/support/new" passHref>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                + Create Ticket
              </Button>
            </Link>
          </Stack>

          {/* If No Tickets */}
          {tickets.length === 0 && (
            <Card sx={{ p: 4, textAlign: "center", borderRadius: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No tickets submitted yet.
              </Typography>
            </Card>
          )}

          {/* Ticket List */}
          {tickets.map((ticket) => (
            <Card
              key={ticket.id}
              sx={{
                mb: 3,
                p: 3,
                borderRadius: 4,
                background: "#FFFFFF",
                borderLeft: `6px solid`,
                borderColor:
                  ticket.status === "closed"
                    ? "error.main"
                    : ticket.status === "in progress"
                    ? "warning.main"
                    : "success.main",
                boxShadow: "0 3px 12px rgba(0,0,0,0.07)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
              >
                {/* LEFT SIDE */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      whiteSpace: "nowrap", // ✅ prevent line wrap
                      overflow: "hidden",
                      textOverflow: "ellipsis", // ✅ add ... if too long
                    }}
                  >
                    {ticket.subject}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Created: {new Date(ticket.created_at).toLocaleString()}
                  </Typography>
                </Box>

                {/* RIGHT SIDE */}
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="flex-end"
                  sx={{
                    flexShrink: 0,
                    minWidth: { sm: 220 }, // Gives stable layout on desktop
                  }}
                >
                  {/* Status Chip */}
                  <Chip
                    label={ticket.status.toUpperCase()}
                    color={statusColor(ticket.status)}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      px: 1.5,
                      borderRadius: 1.5,
                      whiteSpace: "nowrap",
                    }}
                  />

                  {/* View Button */}
                  <Link href={`/support/${ticket.id}`} style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 1.5,
                        px: { xs: 2, sm: 3 },
                        whiteSpace: "nowrap",
                      }}
                    >
                      View
                    </Button>
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
