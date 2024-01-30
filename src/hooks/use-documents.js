import React, { useEffect } from "react";
import axiosInstance from "src/api/config";

export const useDocuments = () => {
  const [completed, setCompleted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const checkDocumentsCompleted = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/students/document-status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setCompleted(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkDocumentsCompleted();
  }, [checkDocumentsCompleted]);

  return { loading, completed, setCompleted };
};
