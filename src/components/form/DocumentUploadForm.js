import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Stack,
  Typography,
  IconButton,
  styled,
  Card,
  Box,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { MdCloudUpload } from "react-icons/md";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import { LoadingButton } from "@mui/lab";
import axiosInstance from "config";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/context";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
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
    title: "International Result Equivalent",
  },
];

export const DocumentUploadForm = ({ onBack, document }) => {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      is_international: document["is_international"] || false,
      student_type: document["student_type"] || "fresh", // Pre-populate based on fetched data
      transcript: null,
      de_hnd_certificate: null,
    },
  });

  const router = useRouter();
  const form = watch();
  const [previewImageUrl, setPreviewImageUrl] = useState(
    form["passport_photo"] || document["passport_photo"] || "/assets/img_placeholder_avatar.jpg"
  );
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const formData = new FormData();
    // Append common fields

    formData.append("is_international", data.is_international);
    formData.append("student_type", data.student_type);

    // Validate and append passport photo
    if (data.passport_photo && validateFile(data.passport_photo)) {
      formData.append("passport_photo", data.passport_photo);
    } else if (data.passport_photo) {
      toast.warning("Invalid passport photo format or size");
      return;
    }

    // Append documents if they exist and pass validations 
    if (data.waec_document && validateFile(data.waec_document)) {
      formData.append("waec_document", data.waec_document);
    }
    if (data.neco_document && validateFile(data.neco_document)) {
      formData.append("neco_document", data.neco_document);
    }
    if (data.nabteb_document && validateFile(data.nabteb_document)) {
      formData.append("nabteb_document", data.nabteb_document);
    }
    if (data.jamb_document && validateFile(data.jamb_document)) {
      formData.append("jamb_document", data.jamb_document);
    }

    if (data.student_type === "transfer") {
      if (!data.transcript && !data.de_hnd_certificate) {
        toast.warning("Transfer students must upload either a transcript or DE/HND certificate.");
        return;
      }

      if (data.transcript && validateFile(data.transcript)) {
        formData.append("transcript", data.transcript);
      }

      if (data.de_hnd_certificate && validateFile(data.de_hnd_certificate)) {
        formData.append("de_hnd_certificate", data.de_hnd_certificate);
      }
    }

    if (data.is_international && data.international_student_document) {
      formData.append("international_student_document", data.international_student_document);
    }

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
      console.error(error);
      toast.error("Failed to upload documents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateFile = (file) => {
    if (!file) return true;
    const isImageOrPdf = file.type.startsWith("image/") || file.type === "application/pdf";
    const isSizeValid = file.size <= 2 * 1048576;
    return isImageOrPdf && isSizeValid;
  };

  const handleFileChange = (fieldName, file) => {
    if (validateFile(file)) {
      setValue(fieldName, file);
      if (fieldName === "passport_photo" && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => setPreviewImageUrl(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      toast.warning("Invalid file format or size");
    }
  };

  useEffect(() => {
    if (document["is_international"]) {
      setValue("is_international", document["is_international"]);
    }
    if (document["student_type"]) {
      setValue("student_type", document["student_type"]);
    }
  }, [document, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography mt={"10px"} variant="h6" color={"black"}>
        Upload Your Documents
      </Typography>
      <Typography mt={"10px"} variant="body1" color={"black"}>
        Files should be in PDF or image format and should not exceed 2MB.
      </Typography>

      {/* Passport Photo Upload */}
      <Stack direction={"column"} mt={"10px"}>
        <img
          src={previewImageUrl}
          width={150}
          height={150}
          alt="passport"
          style={{
            borderRadius: "5px",
            border: `1px solid ${
              form["passport_photo"] || document["passport_photo"] ? "#31ea19" : "#A2A4FA"
            }`,
          }}
        />
        <Stack direction={"row"} alignItems={"center"}>
          <Typography>Passport Photo</Typography>
          <IconButton component="label" color="#3133AD">
            <VisuallyHiddenInput
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handleFileChange("passport_photo", e.target.files[0])}
            />
            {form["passport_photo"] || document["passport_photo"] ? (
              <FaCheckCircle color={"#31ea19"} />
            ) : (
              <MdCloudUpload color="#3133AD" />
            )}
          </IconButton>
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
            name="is_international"
            value={form["is_international"]}
            onChange={(e) => setValue("is_international", e.target.value === "true" ? true : false)}
          >
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="No, I am a Nigerian Student"
            />
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Yes, I am an international Student"
            />
          </RadioGroup>
        </FormControl>
      </Stack>

      <Stack direction={"column"} mt={"20px"}>
        {form["is_international"] ? (
          <>
            <Typography variant="h6" color={"black"}>
              International Student Documents
            </Typography>
            <Typography variant={"body1"} mt={"7px"}>
              Upload the certificate equivalent to your examination results
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
              Student JAMB Result
            </Typography>
            <Typography variant={"body1"} mt={"7px"}>
              Please upload your JAMB examination result.
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

      {/* Fresh / Transfer */}
      <>
        <Typography variant="h6" color="black" mt={"20px"} gutterBottom>
          Select Student Type
        </Typography>
        <Stack direction="column" spacing={2}>
          <FormControl>
            <FormLabel id="student-type-label">
              Are you a Fresh Student or a Transfer/Direct Entry Student?
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="student-type-label"
              name="student_type"
              value={form["student_type"]}
              onChange={(e) => {
                const selectedType = e.target.value;
                setValue("student_type", selectedType);

                // Clear specific fields if switching to "Fresh Student"
                if (selectedType === "fresh") {
                  setValue("transcript", null);
                  setValue("de_hnd_certificate", null);
                }
              }}
            >
              <FormControlLabel
                value="fresh"
                control={<Radio />}
                label="Fresh Student (100 Level)"
              />
              <FormControlLabel
                value="transfer"
                control={<Radio />}
                label="Transfer/Direct Entry Student (200 Level)"
              />
            </RadioGroup>
          </FormControl>
          {/* Conditional rendering */}
          {form["student_type"] === "transfer" && (
            <Stack direction="column" spacing={2} maxWidth={400}>
              <Typography variant="h6" color="black">
                Upload Your Transcript and DE/HND Certificate
              </Typography>
              <Card
                sx={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: `1px solid ${
                    form["transcript"] || document["transcript"] ? "#31ea19" : "#A2A4FA"
                  }`,
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="body2" fontSize="90%" color="black">
                    Transcript
                  </Typography>
                  <IconButton component="label" aria-label="upload transcript" color="#3133AD">
                    {form["transcript"] || document["transcript"] ? (
                      <FaCheckCircle color="#31ea19" />
                    ) : (
                      <MdCloudUpload color="#3133AD" />
                    )}
                    <VisuallyHiddenInput
                      type="file"
                      accept=".pdf, .jpg, .jpeg, .png"
                      onChange={(e) => handleFileChange("transcript", e.target.files[0])}
                    />
                  </IconButton>
                </Stack>
              </Card>
              <Card
                sx={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: `1px solid ${
                    form["de_hnd_certificate"] || document["de_hnd_certificate"]
                      ? "#31ea19"
                      : "#A2A4FA"
                  }`,
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="body2" fontSize="90%" color="black">
                    DE/HND Certificate
                  </Typography>
                  <IconButton
                    component="label"
                    aria-label="upload de/hnd certificate"
                    color="#3133AD"
                  >
                    {form["de_hnd_certificate"] || document["de_hnd_certificate"] ? (
                      <FaCheckCircle color="#31ea19" />
                    ) : (
                      <MdCloudUpload color="#3133AD" />
                    )}
                    <VisuallyHiddenInput
                      type="file"
                      accept=".pdf, .jpg, .jpeg, .png"
                      onChange={(e) => handleFileChange("de_hnd_certificate", e.target.files[0])}
                    />
                  </IconButton>
                </Stack>
              </Card>
            </Stack>
          )}
        </Stack>
      </>

      <Stack direction={"column"} mt={"20px"}>
        <Typography variant="h6" color={"black"}>
          Additional Documents (For Nigerian Students)
        </Typography>
        <Typography variant={"body1"} mt={"7px"}>
          Upload your WAEC or NECO certificates, or a combination of both from no more than two
          sittings.{" "}
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
