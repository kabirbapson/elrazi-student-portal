// FullScreenLoading.js
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import styles from "./styles.module.css";

const FullScreenLoading = ({ overlay = false }) => {
  return (
    <Box
      sx={{
        position: overlay ? "absolute" : "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: overlay ? "100%" : "100vh",
        backgroundColor: overlay ? "rgba(255,255,255,0.6)" : "#fff",
        zIndex: 2000,
      }}
    >
      <div className={styles["pulse"]}>
        <img src="/assets/icon.svg" width={100} height={100} />
      </div>
      <Box width={"80px"} mt={"10px"}>
        <LinearProgress color="error" />
      </Box>
    </Box>
  );
};

export default FullScreenLoading;
