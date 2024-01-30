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
  Box,
  ButtonGroup,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
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

const personalDocument = [
  {
    name: "primary_certificate",
    title: "Primary Certificate",
  },
  {
    name: "cob_document",
    title: "Certificate of Birth",
  },
];

const nonInternationalStudent = [
  {
    name: "jamb_document",
    title: "JAMB Result",
  },
];

const additionalDocument = [
  {
    name: "waec_document",
    title: "WAEC",
  },
  {
    name: "neco_document",
    title: "NECO",
  },
  {
    name: "nabteb_document",
    title: "NABTEB",
  },
];

const internationalStudent = [
  {
    name: "international_student_document",
    title: "International Student Certificate Equivalent",
  },
];

export const DocumentUploadForm = ({ onBack, document }) => {
  const { control, handleSubmit, setValue, watch } = useForm();
  const router = useRouter();

  const form = watch();

  const [previewImageUrl, setPreviewImageUrl] = useState(
    form["passport_photo"] || document["passport_photo"] || "/assets/img_placeholder_avatar.jpg"
  );

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

  const handleImageChange = (fieldName, file) => {
    if (validateFile(file)) {
      setValue(fieldName, file);

      // Set the state with the data URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // Handle invalid file (e.g., show an error message)
      toast.warning("Invalid file format or size");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography mt={"10px"} variant="h6" color={"black"}>
        Upload Your Documents Here
      </Typography>
      <Typography
        mt={"10px"}
        // textAlign={"center"}
        variant="body1"
        color={"black"}
        sx={{ maxWidth: "800px" }}
      >
        Please note that not all the document are required also all documents must be in PDF or
        Image format and not more than 1MB
      </Typography>

      {/* upload passport_photo */}
      <Stack direction={"column"} mt={"10px"}>
        <img
          src={previewImageUrl}
          width={150}
          height={150}
          alt="passport"
          style={{ borderRadius: "5px", border: "1px solid #31ea19" }}
        />

        <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"}>
          <Typography>Passport Photo</Typography>
          <IconButton component="label" aria-label="fingerprint" color="#3133AD">
            <VisuallyHiddenInput
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handleImageChange("passport_photo", e.target.files[0])}
            />
            {form["passport_photo"] || document["passport_photo"] ? (
              <FaCheckCircle color={"#31ea19"} />
            ) : (
              <MdCloudUpload color="#3133AD" />
            )}
          </IconButton>
        </Stack>
      </Stack>

      {/* personal documents  */}
      <Stack direction={"column"} mt={"10px"}>
        <Typography variant="h6" color={"black"}>
          Personal Documents
        </Typography>
        <Stack mt={"10px"} spacing={1} direction={"row"} maxWidth={400}>
          {personalDocument.map((data, index) => (
            <Box key={index}>
              <Card
                maxWidth={"100px"}
                sx={{
                  borderRadius: "5px",
                  // padding: "10px",
                  border: `1px solid ${
                    form[data.name] || document[data.name] ? "#31ea19" : "#A2A4FA"
                  }`,
                }}
              >
                <Stack
                  sx={{
                    px: "6px",
                    borderRadius: "5px",
                  }}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography variant="body2" fontSize={"70%"} color={"black"}>
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
            </Box>
          ))}
        </Stack>
      </Stack>

      {/* non international student documents  */}
      <Stack direction={"column"} mt={"10px"}>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Are you an International Student?
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={form["is_international"] || document["is_international"]}
            onChange={(e) =>
              setValue("is_international", e.target.value === "true" ? true : false)
            }
          >
            <FormControlLabel value={false} control={<Radio />} label="No" />
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Yes, I'm international Student"
            />
          </RadioGroup>
        </FormControl>
      </Stack>

      <Stack direction={"column"} mt={"20px"}>
        {form["is_international"] || document["is_international"] ? (
          <>
            <Typography variant="h6" color={"black"}>
              International Student Documents
            </Typography>
            <Typography variant={"body1"} mt={"7px"}>
              Please upload your examination result equivalent certificate
            </Typography>
            <Stack mt={"10px"} spacing={1} direction={"row"} maxWidth={400}>
              {internationalStudent.map((data, index) => (
                <Box key={index}>
                  <Card
                    maxWidth={"100px"}
                    sx={{
                      borderRadius: "5px",
                      // padding: "10px",
                      border: `1px solid ${
                        form[data.name] || document[data.name] ? "#31ea19" : "#A2A4FA"
                      }`,
                    }}
                  >
                    <Stack
                      sx={{
                        px: "6px",
                        borderRadius: "5px",
                      }}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="body2" fontSize={"70%"} color={"black"}>
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
                </Box>
              ))}
            </Stack>
          </>
        ) : (
          <>
            <Typography variant="h6" color={"black"}>
              Student Documents
            </Typography>
            <Typography variant={"body1"} mt={"7px"}>
              Please upload your examination result equivalent certificate
            </Typography>
            <Stack mt={"10px"} spacing={1} direction={"row"} maxWidth={400}>
              {nonInternationalStudent.map((data, index) => (
                <Box key={index}>
                  <Card
                    maxWidth={"100px"}
                    sx={{
                      borderRadius: "10px",
                      // padding: "10px",
                      border: `1px solid ${
                        form[data.name] || document[data.name] ? "#31ea19" : "#A2A4FA"
                      }`,
                    }}
                  >
                    <Stack
                      sx={{
                        px: "6px",
                        borderRadius: "5px",
                      }}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography variant="body2" fontSize={"70%"} color={"black"}>
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
                </Box>
              ))}
            </Stack>
          </>
        )}
      </Stack>

      <Stack direction={"column"} mt={"20px"}>
        <Typography variant="h6" color={"black"}>
          Additional Documents
        </Typography>
        <Typography variant={"body1"} mt={"7px"}>
          Note: These documents are not required but if you have them you can upload them
        </Typography>
        <Stack mt={"10px"} spacing={1} direction={"row"} maxWidth={400}>
          {additionalDocument.map((data, index) => (
            <Box key={index}>
              <Card
                maxWidth={"100px"}
                sx={{
                  borderRadius: "5px",
                  // padding: "10px",
                  px: "10px",
                  border: `1px solid ${
                    form[data.name] || document[data.name] ? "#31ea19" : "#A2A4FA"
                  }`,
                }}
              >
                <Stack
                  sx={{
                    px: "6px",
                    borderRadius: "5px",
                  }}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography variant="body2" fontSize={"70%"} color={"black"}>
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
            </Box>
          ))}
        </Stack>
      </Stack>
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
