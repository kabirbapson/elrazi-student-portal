import NextLink from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import { Box, Divider, Drawer, Stack, SvgIcon, Typography, useMediaQuery } from "@mui/material";
import { Logo } from "src/components/logo";
import { Scrollbar } from "src/components/scrollbar";
import { items } from "./config";
import { SideNavItem } from "./side-nav-item";
import { useContext } from "react";
import { AuthContext } from "src/context";

export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const { user } = useContext(AuthContext);

  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: "inline-flex",
            }}
          >
            <Logo />
            <Typography
              sx={{
                color: "white",
                fontSize: "1rem",
                fontWeight: "bold",
                marginLeft: 1,
              }}
            >
              Elrazi Medical University, Kano
            </Typography>
          </Box>

          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderRadius: 1,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              p: "12px",
            }}
          >
            <div>
              <Typography color="inherit" variant="subtitle1">
                Welcome {user?.first_name}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {user?.student_profile?.student_id}
              </Typography>
            </div>
            <SvgIcon fontSize="small" sx={{ color: "neutral.500" }}>
              <UserIcon />
            </SvgIcon>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "neutral.700" }} />

        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            {items.map((item) => {
              const active = item.path ? pathname === item.path : false;

              return (
                <SideNavItem
                  key={item.title}
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  path={item.path}
                  url={item.url} // <-- THE FIX
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>

        <Divider sx={{ borderColor: "neutral.700" }} />

        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color="neutral.500" variant="body2">
            Elrazi ICT Department.
          </Typography>

          <Box
            sx={{
              display: "flex",
              mt: 2,
              mx: "auto",
              width: "160px",
              "& img": {
                width: "100%",
              },
            }}
          ></Box>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
