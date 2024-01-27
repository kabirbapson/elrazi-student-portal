import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentUpload, setPaymentUpload] = useState([]);

  const router = useRouter();

  const logOutUser = () => {
    localStorage.clear();
    router.push("/auth/login");
  };

  const handleFetchUserDetails = async (token) => {
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    try {
      const response = await axiosInstance.get("/auth/user/", config);
      setUser(response.data);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const handleFetchUserPayments = async (token) => {
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    try {
      const response = await axiosInstance.get("/payments/", config);
      setPaymentUpload(response.data[0]);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const loadUserSession = async () => {
    setIsLoading(true);

    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      logOutUser();
      return;
    }

    await handleFetchUserDetails(savedToken);
    await handleFetchUserPayments(savedToken);
    setToken(savedToken); // Set token to state
    setIsLoading(false);
  };

  useEffect(() => {
    loadUserSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, paymentUpload, isLoading, logOutUser, setPaymentUpload, loadUserSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};
