import { useRouter } from "next/router";
import { useState, useEffect, useCallback, createContext, useContext } from "react";
import axiosInstance from "config";
import { set } from "nprogress";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentUpload, setPaymentUpload] = useState(null);

  const router = useRouter();

  const logOutUser = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    router.push("/auth/login");
  }, [router]);

  const handleFetchUserDetails = useCallback(
    async (token) => {
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      try {
        const response = await axiosInstance.get("/auth/user/", config);
        setUser(response.data);
      } catch (error) {
        if (error?.response?.status === 401) {
          logOutUser();
        }
        console.log(error?.response?.data);
      }
    },
    [logOutUser]
  );

  const handleFetchUserPayments = useCallback(
    async (token) => {
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      try {
        const response = await axiosInstance.get("/payments/", config);
        setPaymentUpload(response.data[0]);
      } catch (error) {
        if (error?.response?.status === 401) {
          logOutUser();
        }
        console.log(error?.response?.data);
      }
    },
    [logOutUser]
  );

  const loadUserSession = useCallback(async () => {
    setIsLoading(true);

    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      logOutUser();
      return;
    }

    await handleFetchUserDetails(savedToken);
    await handleFetchUserPayments(savedToken);
    setToken(savedToken);

    setIsLoading(false);
  }, [handleFetchUserDetails, handleFetchUserPayments, logOutUser]);

  useEffect(() => {
    if (typeof window !== undefined) {
      loadUserSession();
    }
  }, [loadUserSession]);

  return { user, isLoading, paymentUpload, token, logOutUser};
};
