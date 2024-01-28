import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "config";

export const AuthContext = createContext();
