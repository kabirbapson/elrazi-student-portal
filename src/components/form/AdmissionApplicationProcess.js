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
import { AuthContext } from "src/context";

export const AdmissionApplicationProcess = ({ name, faculties }) => {
  const { admissions } = useContext(AuthContext);
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reject, setReject] = useState(false);

  const admissionCheck = useCallback(() => {
    if (admissions?.length < 1) {
      setLoading(false);
      return;
    }

    const isPendingFound = admissions?.find((admission) => admission.status === "PENDING");
    if (isPendingFound) {
      setPending(true);
      setLoading(false);
      return;
    }

    setReject(true);
    setLoading(false);
  }, [admissions]);

  useEffect(() => {
    admissionCheck();
  }, [admissionCheck]);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          {!pending && <AdmissionApplicationRequest name={name} faculties={faculties} />}
          {pending && <AdmissionApplicationPending name={name} faculties={faculties} />}
        </>
      )}
    </>
  );
};
