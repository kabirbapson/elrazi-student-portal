// pages/_app.js
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "src/theme";
import { createEmotionCache } from "src/utils/create-emotion-cache";
import "simplebar-react/dist/simplebar.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "src/context";

const clientSideEmotionCache = createEmotionCache();
const theme = createTheme();

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AuthProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Elrazi Medical University, Kano</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
            <ToastContainer position="top-right" autoClose={1200} hideProgressBar />
          </ThemeProvider>
        </LocalizationProvider>
      </CacheProvider>
    </AuthProvider>
  );
};

export default App;
