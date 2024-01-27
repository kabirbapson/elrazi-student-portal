import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { AuthContext } from "src/context";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const { user, logOutUser } = useContext(AuthContext);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">My Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {user?.first_name} {user?.last_name}
        </Typography>
        {/* <Typography color="text.secondary" variant="body2">
          {user?.email}
        </Typography> */}
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={logOutUser}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
