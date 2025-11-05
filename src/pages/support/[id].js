import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import axiosInstance from "config";
import { AuthContext } from "src/context";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import BackButton from "src/components/BackButton";

const TicketDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { token, user } = useContext(AuthContext);

  const [ticket, setTicket] = useState(null);
  const [messageText, setMessageText] = useState("");

  const fetchTicket = async () => {
    try {
      const res = await axiosInstance.get(`/tickets/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setTicket(res.data);
    } catch (err) {
      console.log("Ticket load error:", err);
    }
  };

  useEffect(() => {
    if (id && token) fetchTicket();
  }, [id, token]);

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    try {
      await axiosInstance.post(
        `/tickets/${id}/messages/`,
        { content: messageText },
        { headers: { Authorization: `Token ${token}` } }
      );
      setMessageText("");
      fetchTicket(); // refresh
    } catch (err) {
      console.log("Send message error:", err);
    }
  };

  if (!ticket) return null;

  const statusColor = ticket.status === "open" ? "success" : "error";

  return (
    <>
      <Head>
        <title>Support Ticket | Elrazi Medical University</title>
      </Head>

      <Box sx={{ p: 3 }}>
        <BackButton />
        <Card sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5">{ticket.subject}</Typography>

          <Stack direction="row" spacing={2} mt={1}>
            <Chip label={ticket.status.toUpperCase()} color={statusColor} />
            <Chip label={`Priority: ${ticket.priority}`} />
          </Stack>

          <Typography mt={2} color="text.secondary">
            {ticket.description}
          </Typography>
        </Card>

        <Card sx={{ p: 2, height: "60vh", overflowY: "auto", mb: 2 }}>
          {ticket.messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                mb: 2,
                textAlign: msg.is_staff ? "left" : "right",
              }}
            >
              <Typography fontSize={12} color="text.secondary">
                {msg.sender.first_name} {msg.sender.last_name}
              </Typography>

              <Box
                sx={{
                  display: "inline-block",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: msg.is_staff ? "#e3f2fd" : "#d1ffd6",
                  maxWidth: "70%",
                }}
              >
                <Typography>{msg.content}</Typography>
              </Box>

              <Typography fontSize={11} color="text.secondary" mt={0.5}>
                {new Date(msg.timestamp).toLocaleString()}
              </Typography>

              <Divider sx={{ my: 1 }} />
            </Box>
          ))}
        </Card>

        {/* Reply Input */}
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            placeholder="Type your reply..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <Button variant="contained" onClick={handleSendMessage}>
            Send
          </Button>
        </Stack>
      </Box>
    </>
  );
};

TicketDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default TicketDetails;
