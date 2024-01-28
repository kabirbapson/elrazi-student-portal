import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "src/context";

export const AccountProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={"/assets/userIcon.jpg"}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography gutterBottom variant="h5">
            {user?.first_name} {user?.last_name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user?.email}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user?.state} {user?.country}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};
