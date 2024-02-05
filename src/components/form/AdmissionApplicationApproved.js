import React, { useContext } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { MdCheckCircle } from "react-icons/md"; // Importing a checkmark icon for approval
import { AuthContext } from "src/context";
import Link from "next/link";

export const AdmissionApplicationApproved = ({ name }) => {
  const { token } = useContext(AuthContext);

  return (
    <Stack spacing={2}>
      <Stack direction={"row"} spacing={1} alignItems="center">
        <Typography variant="h5" fontWeight={"bold"}>
          Congratulations, {name}!
        </Typography>
      </Stack>

      <Stack
        marginTop={"100px"}
        sx={{
          backgroundColor: "#E8F5E9",
          padding: { xs: "20px", sm: "30px" },
          width: { xs: "100%", sm: "90%" },
          borderRadius: "5px",
        }}
        spacing={1}
      >
        <MdCheckCircle fontSize={"50px"} color="#4CAF50" />
        <Typography fontWeight={"bold"} sx={{ color: "#2E7D32" }}>
          ADMISSION APPROVED
        </Typography>
        <Typography sx={{ color: "#2E7D32" }}>
          We are thrilled to inform you that your application to Elrazi Medical University has been
          approved. Welcome to our community!
        </Typography>

        <Typography sx={{ mt: 4, color: "#2E7D32" }}>
          Please check your email to download and print your admission letter along with the invoice
          for your tuition fee. It is essential that you make the payment for your tuition fee as
          instructed in the invoice.
        </Typography>

        {/* <Typography sx={{ mt: 2, color: "#2E7D32" }}>
          After making the payment, please upload the receipt of your tuition fee payment using the
          link below. This will complete your admission process.
        </Typography> */}

        {/* Assuming the link to the upload page is "/upload-payment-receipt" */}
        {/* <Link href="/payments" passHref>
          <Button
            variant="contained"
            sx={{ mt: 2, bgcolor: "#4CAF50", "&:hover": { bgcolor: "#388E3C" } }}
          >
            Upload Payment Receipt
          </Button>
        </Link> */}
        <Stack mt={"20px"} spacing={1}>
          <Typography fontWeight={"bold"} sx={{ color: "#2E7D32",marginTop:4 }}>
            Need assistance?
          </Typography>
          <Typography sx={{ color: "#2E7D32" }}>Email: admission@elrazi.edu.ng</Typography>
          <Typography sx={{ color: "#2E7D32" }}>Phone: +234 703 078 5761</Typography>
        </Stack>

        <Typography sx={{ mt: 2, color: "#2E7D32" }}>Best wishes,</Typography>
        <Typography sx={{ color: "#2E7D32" }}>
          Admissions Team, Elrazi Medical University, Kano.
        </Typography>
      </Stack>
    </Stack>
  );
};
