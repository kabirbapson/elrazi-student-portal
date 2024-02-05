import Head from "next/head";
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Container,
  Card,
  Typography,
  Button,
  IconButton,
  styled,
  Stack,
  Paper,
  Divider,
} from "@mui/material";
import { MdCloudUpload } from "react-icons/md";
import { green } from "@mui/material/colors"; // Importing green color
import { toast } from "react-toastify";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AuthContext } from "src/context";
import { useRouter } from "next/router";
import { TuitionFeesPaymentConfirmation } from "src/components/form/TuitionFeesPaymentConfirmation";
import { TuitionFeesPaymentDetails } from "src/components/form/TuitionFeesPaymentDetails";
import { TuitionFeesPaymentUpload } from "src/components/form/TuitionFeesPaymentUpload";

const PaymentsPage = () => {
  const [pending, setPending] = useState(false);
  const [approved, setApproved] = useState(false); // New state for approved
  const [rejected, setRejected] = useState(false); // New state for rejected
  const [loading, setLoading] = useState(true);
  const [uploaded, setUploaded] = useState({ tuitionReceipt: false, accommodationReceipt: false });
  const router = useRouter();

  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [madePayment, setMadePayment] = useState(false);

  const toggleMadePayment = () => setMadePayment(!madePayment);

  // const uploadPaymentReceipt = async () => {
  //   // Placeholder for uploading receipts logic
  //   console.log("Uploading payment receipt...");
  //   // Simulate uploading process
  //   setLoading(true);
  //   setTimeout(() => {
  //     setReceiptUploaded(true);
  //     setLoading(false);
  //     toast.success("Payment receipt uploaded successfully");
  //   }, 3000);
  // };

  const {
    user,
    token,
    admissions,
    paymentUpload,
    handleFetchUserDetails,
    facultyCourses,
    documentsCompleted,
  } = useContext(AuthContext);

  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      tuitionReceipt: null,
      accommodationReceipt: null,
    },
  });

  // Add logic for onSubmit, handleFileChange, etc. here
  const onSubmit = async (data) => {
    setLoading(true);
    if (!data.tuitionReceipt || data.tuitionReceipt.length === 0) {
      toast.error("Tuition receipt is required.");
      return;
    }

    const formData = new FormData();
    // Since tuition receipt is mandatory, append it directly.
    formData.append("tuitionReceipt", data.tuitionReceipt[0]);

    // Check if the accommodation receipt is uploaded. If yes, append it.
    if (data.accommodationReceipt && data.accommodationReceipt.length > 0) {
      formData.append("accommodationReceipt", data.accommodationReceipt[0]);
    }
    console.log(formData);
    // settimeout after 3 seconds loading false
    setTimeout(() => {
      toast.success("Receipts uploaded successfully");
      setLoading(false);
    }, 3000);
    // setLoading(false);
    // setLoading(true);
  };

  const handleFileChange = (fieldName, files) => {
    const file = files[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }
    const isSizeValid = file.size <= 10485760; // 10MB
    if (isSizeValid) {
      setValue(fieldName, files);
      setUploaded((prev) => ({ ...prev, [fieldName]: true }));
    } else {
      toast.error("File size should not exceed 10MB");
    }
  };
  console.log({ admissions, paymentUpload  }); 
  const handleGetStudentDocument = useCallback(async () => {
    axiosInstance
      .get("/students", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const uploadsData = response.data;
          setStudentDocument(uploadsData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const admissionCheck = useCallback(() => {
    if (admissions?.length < 1) {
      setLoading(false);
      return;
    }

    const admissionStatus = admissions?.find((admission) => admission.status);

    switch (admissionStatus?.status) {
      case "PENDING":
        setPending(true);
        break;
      case "APPROVED":
        setApproved(true);
        break;
      case "REJECTED":
        setRejected(true);
        break;
      default:
        break;
    }

    setLoading(false);
  }, [admissions]);

  useEffect(() => {
    admissionCheck();
  }, [admissionCheck]);

  return (
    <>
      <Head>
        <title>Payments | Elrazi Medical University</title>
      </Head>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Stack spacing={2}>
          {!receiptUploaded ? (
            <TuitionFeesPaymentConfirmation name={user?.first_name} />
          ) : (
            <>
              {!madePayment ? (
                <TuitionFeesPaymentDetails
                  name={user?.first_name}
                  onMadePaymentPress={toggleMadePayment}
                />
              ) : (
                <TuitionFeesPaymentUpload
                  onLoading={loading}
                  onUploadReceipt={uploadPaymentReceipt}
                />
              )}
            </>
          )}
        </Stack>
      )}
    </>
  );
};

PaymentsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PaymentsPage;
