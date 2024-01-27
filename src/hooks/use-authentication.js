import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loadUserData = useCallback(() => {
    setLoading(true);
    const session = localStorage.getItem("user");

    if (session) {
      setUser(JSON.parse(session));
      setLoading(false);
      return;
    }

    router.push("/login");
  }, [router]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return { user, loading };
};
