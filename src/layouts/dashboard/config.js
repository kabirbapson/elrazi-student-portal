import { SvgIcon } from "@mui/material";
import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import AcademicCapIcon from "@heroicons/react/24/solid/AcademicCapIcon"; // For Tuition
import HomeIcon from "@heroicons/react/24/solid/HomeIcon"; // For Accommodation

export const items = [
  {
    title: "Dashboard",
    path: "/",
    icon: <SvgIcon component={ChartBarIcon} fontSize="small" />,
  },

  {
    title: "Bio Data",
    path: "/biodata",
    icon: <SvgIcon component={UserIcon} fontSize="small" />,
  },

  {
    title: "Tuition",
    path: "/tuition", // Adjust the path as needed
    icon: <SvgIcon component={AcademicCapIcon} fontSize="small" />,
  },

  {
    title: "Accommodation",
    path: "/accommodation", // Adjust the path as needed
    icon: <SvgIcon component={HomeIcon} fontSize="small" />,
  },

  {
    title: "Courses",
    path: "/courses", // Adjust the path as needed
    icon: <SvgIcon component={HomeIcon} fontSize="small" />,
  },

  {
    title: "Settings",
    path: "/settings",
    icon: <SvgIcon component={CogIcon} fontSize="small" />,
  },
];
