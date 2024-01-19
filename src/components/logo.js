import { useTheme } from "@mui/material/styles";
import Image from "next/image";

export const Logo = () => {
  const theme = useTheme();
  const logoPath = theme.palette.mode === "light" ? "/assets/logos/LogoElrazi.jpg" : "/assets/logos/LogoElrazi.png";

  return (
    <Image
      src={logoPath} // Replace with the actual path to your logo image
      alt="Logo"
      width="50"
      height="50"
      objectFit="contain" // Ensures proper image fitting within the container
    />
  );
};
