import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Grid,
  Input,
  InputLabel,
  Switch,
  FormGroup,
  FormControlLabel,
  Stack,
  Typography,
  IconButton,
  styled,
  Card,
} from "@mui/material";
import { MdCloudUpload } from "react-icons/md";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { LoadingButton } from "@mui/lab";
import { FaCheckCircle } from "react-icons/fa";
import axiosInstance from "config";
import { useRouter } from "next/router";
import { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "src/context";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const initialData = [
  {
    name: "jamb_document",
    title: "Upload Your JAMB",
  },
  {
    name: "waec_document",
    title: "Upload Your WAEC",
  },
  {
    name: "neco_document",
    title: "Upload Your NECO",
  },
  {
    name: "nabteb_document",
    title: "Upload Your NABTEB",
  },
  {
    name: "cob_document",
    title: "Upload Certificate of Birth",
  },
  {
    name: "passport_photo",
    title: "Upload Passport",
  },
  {
    name: "primary_certificate",
    title: "Upload Primary Certificate",
  },
  {
    name: "international_student_document",
    title: "Upload International Student Document",
  },
];

export const DocumentUploadForm = ({ onBack, document }) => {
  const { control, handleSubmit, setValue, watch } = useForm();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    setLoading(true);
    try {
      const request = await axiosInstance.post("/students", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (request.status === 201) {
        toast.success("Documents uploaded successfully");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const form = watch();

  const validateFile = (file) => {
    if (!file) return true; // No file selected is allowed
    const isImageOrPdf = file.type.startsWith("image/") || file.type === "application/pdf";
    const isSizeValid = file.size <= 1048576; // 1MB in bytes
    return isImageOrPdf && isSizeValid;
  };

  const handleFileChange = (fieldName, file) => {
    if (validateFile(file)) {
      setValue(fieldName, file);
    } else {
      // Handle invalid file (e.g., show an error message)
      toast.warning("Invalid file format or size");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography textAlign={"center"} mt={"10px"} variant="h6" color={"black"}>
        Upload Your Documents Here
      </Typography>
      <Typography
        paddingInline={{ xs: "10", sm: "60px" }}
        mt={"10px"}
        textAlign={"center"}
        variant="body1"
        color={"black"}
      >
        Please note that not all the document are required also all documents must be in PDF or
        Image format and not more than 1MB
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        sx={{
          width: "100%",
          minHeight: 360,

          paddingInline: { xs: "10px", sm: "40px" },
          backgroundColor: "background.paper",
          marginTop: "20px",
        }}
      >
        {/* Repeat this Grid item for each jamb document */}
        {initialData.map((data, index) => (
          <Grid item key={index} xs={12} sm={"6"}>
            <Card
              maxWidth={"400px"}
              sx={{
                borderRadius: "10px",
                padding: "10px",
                border: `1px solid ${
                  form[data.name] || document[data.name] ? "#31ea19" : "#A2A4FA"
                }`,
              }}
            >
              <Stack
                sx={{
                  padding: "5px",
                  borderRadius: "5px",
                }}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant="body1" color={"black"}>
                  {data.title}
                </Typography>
                <IconButton component="label" aria-label="fingerprint" color="#3133AD">
                  {form[data.name] || document[data.name] ? (
                    <FaCheckCircle color={"#31ea19"} />
                  ) : (
                    <MdCloudUpload color="#3133AD" />
                  )}
                  <VisuallyHiddenInput
                    type="file"
                    accept=".pdf, .jpg, .jpeg, .png"
                    onChange={(e) => handleFileChange(data.name, e.target.files[0])}
                  />
                </IconButton>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Stack marginTop={"20px"} direction={"row"} justifyContent={"flex-end"}>
        <Button variant="outlined" onClick={onBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <LoadingButton loading={loading} variant="contained" type="submit">
          Submit
        </LoadingButton>
      </Stack>
    </form>
  );
};
