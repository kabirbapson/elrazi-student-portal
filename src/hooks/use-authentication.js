import { useRouter } from "next/router";
import { useState, useEffect, useCallback, createContext, useContext } from "react";
import axiosInstance from "config";
import { set } from "nprogress";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentUpload, setPaymentUpload] = useState(null);
  const [documentsCompleted, setDocumentsCompleted] = useState(false);
  const [facultyCourses, setFacultyCourses] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [tuitionFeeUpload, setTuitionFeeUpload] = useState(false);
  const [accommodationFeeUpload, setAccommodationFeeUpload] = useState(false);

  const router = useRouter();

  const logOutUser = useCallback(() => {
    setUser(null);
    setToken(null);

    localStorage.clear();
    router.push("/auth/login");
  }, [router]);

  const checkDocumentsCompleted = useCallback(async (userToken) => {
    try {
      const response = await axiosInstance.get("/students/document-status", {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      if (response.status === 200) {
        setDocumentsCompleted(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getAppliedAdmissions = useCallback(async (userToken) => {
    try {
      const response = await axiosInstance.get("/students/admissions/", {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      if (response.status === 200) {
        setAdmissions(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getFacultyCourses = useCallback(async (userToken) => {
    const config = {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    };

    try {
      const response = await axiosInstance.get("/faculty-courses/", config);
      const courses = response.data;
      setFacultyCourses(courses);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const getStudentCourses = useCallback(async (userToken) => {
    const config = {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    };

    try {
      const response = await axiosInstance.get("/students/enroll/", config);
      const courses = response.data;
      setStudentCourses(courses);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

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

  const handleFetchUserPaymentsTuition = useCallback(
    async (token) => {
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      try {
        const response = await axiosInstance.get("/payments/tuition_fee/", config);
        if (response.data.length > 0) {
          setTuitionFeeUpload(true);
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          logOutUser();
        }
        console.log(error?.response?.data);
      }
    },
    [logOutUser]
  );

  const handleFetchUserAccommodationFee = useCallback(
    async (token) => {
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      try {
        const response = await axiosInstance.get("/payments/accommodation_fee/", config);
        if (response.data.length > 0) {
          setAccommodationFeeUpload(true);
        }
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

    // Call the newly created function within loadUserSession
    await handleFetchUserDetails(savedToken);
    await handleFetchUserPayments(savedToken);
    await handleFetchUserPaymentsTuition(savedToken); // Add this line
    await handleFetchUserAccommodationFee(savedToken);
    await checkDocumentsCompleted(savedToken);
    await getFacultyCourses(savedToken);
    await getStudentCourses(savedToken);
    await getAppliedAdmissions(savedToken);
    setToken(savedToken);

    setIsLoading(false);
  }, [
    checkDocumentsCompleted,
    getAppliedAdmissions,
    getFacultyCourses,
    getStudentCourses,
    handleFetchUserDetails,
    handleFetchUserPayments,
    handleFetchUserPaymentsTuition,
    handleFetchUserAccommodationFee,
    logOutUser,
  ]);

  useEffect(() => {
    if (typeof window !== undefined) {
      loadUserSession();
    }
  }, [loadUserSession]);

  return {
    user,
    isLoading,
    paymentUpload,
    tuitionFeeUpload,
    accommodationFeeUpload,
    token,
    documentsCompleted,
    facultyCourses,
    studentCourses,
    admissions,
    logOutUser,
  };
};
