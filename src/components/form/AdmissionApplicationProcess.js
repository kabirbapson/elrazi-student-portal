import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FaCircleInfo } from "react-icons/fa6";
import { LoadingButton } from "@mui/lab";
import { AdmissionApplicationRequest } from "./AdmissionApplicationRequest";
import { AdmissionApplicationPending } from "./AdmissionApplicationPending";
import { AdmissionApplicationApproved } from "./AdmissionApplicationApproved"; // Import the Approved component
import { AdmissionApplicationRejected } from "./AdmissionApplicationRejected"; // Import the Rejected component
import { AuthContext } from "src/context";

export const AdmissionApplicationProcess = ({ user, faculties }) => {
  const { admissions } = useContext(AuthContext);
  const [pending, setPending] = useState(false);
  const [approved, setApproved] = useState(false); // New state for approved
  const [rejected, setRejected] = useState(false); // New state for rejected
  const [loading, setLoading] = useState(true);
  // console.log('object of name', name);
  // console.log('object of user', user);
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
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {!pending && !approved && !rejected && (
            <AdmissionApplicationRequest name={user} faculties={faculties} />
          )}
          {pending && <AdmissionApplicationPending name={user} faculties={faculties} />}
          {approved && <AdmissionApplicationApproved name={user} faculties={faculties} />}
          {rejected && <AdmissionApplicationRejected name={user} faculties={faculties} />}
        </>
      )}
    </>
  );
};
