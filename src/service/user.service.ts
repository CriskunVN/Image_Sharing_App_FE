import axios from "axios";
import authHeader from "./auth.header";
import { getUserId } from "../utils/userID.utils";
const API_URL = "http://localhost:4000/api";
import type { FileType } from "../utils/type.until";

const upload = (data: FormData): Promise<any> => {
  return axios.post(`${API_URL}/upload`, data, {
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
  });
};

const getFiles = (): Promise<any> => {
  console.log("Getting files for userID:", getUserId());
  return axios.get(`${API_URL}/file/${getUserId()}`, { headers: authHeader() });
};

const updateFile = (file: FileType): Promise<FileType> => {
  return axios.put(
    `${API_URL}/file/${file._id}`,
    { ...file },
    { headers: authHeader() }
  );
};

const deleteFile = (fileId: string): Promise<any> => {
  return axios.delete(`${API_URL}/file/${fileId}`, { headers: authHeader() });
};

const UserService = {
  upload,
  getFiles,
  updateFile,
  deleteFile,
};

export default UserService;
