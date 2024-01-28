// FullScreenLoading.js
import { Box } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";
import LinearProgress from "@mui/material/LinearProgress";

const FullScreenLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div className={styles["pulse"]}>
        <img src="/assets/icon.svg" width={100} height={100} />
      </div>
      <Box width={'80px'} mt={'10px'}>
        <LinearProgress color={'error'} />
      </Box>
    </Box>
  );
};

export default FullScreenLoading;
