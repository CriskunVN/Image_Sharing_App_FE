import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:4000/api";

const upload = (data: FormData): Promise<any> => {
  return axios.post(`${API_URL}/upload`, data, {
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
  });
};

const UserService = {
  upload,
};

export default UserService;
