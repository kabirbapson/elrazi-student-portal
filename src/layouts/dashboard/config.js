import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import Card from "@heroicons/react/24/solid/LockClosedIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { SvgIcon } from "@mui/material";
import CreditCardIcon from "@heroicons/react/24/solid/CreditCardIcon"; // Assuming you have this or a similar icon

export const items = [
  {
    title: "Dashboard",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },

  {
    title: "Bio Data",
    path: "/biodata",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },

  // {
  //   title: "Payments",
  //   path: "/payments",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CreditCardIcon />
  //     </SvgIcon>
  //   ),
  // },

  {
    title: "Settings",
    path: "/settings",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
];
