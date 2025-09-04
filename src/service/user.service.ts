import axios from "axios";
import authHeader from "./auth.header";
import { getUserId } from "../utils/userID.utils";
const API_URL = "http://localhost:4000/api";

const upload = (data: FormData): Promise<any> => {
  return axios.post(`${API_URL}/upload`, data, {
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
  });
};

const getFiles = (): Promise<any> => {
  console.log("Getting files for userID:", getUserId());
  return axios.get(`${API_URL}/file/${getUserId()}`, { headers: authHeader() });
};

const UserService = {
  upload,
  getFiles,
};

export default UserService;
