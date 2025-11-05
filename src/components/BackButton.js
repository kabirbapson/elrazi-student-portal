
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = ({ fallback = "/support" }) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <Button
      variant="text"
      startIcon={<ArrowBackIcon />}
      onClick={handleBack}
      sx={{ mb: 2 }}
    >
      Back
    </Button>
  );
};

export default BackButton;
