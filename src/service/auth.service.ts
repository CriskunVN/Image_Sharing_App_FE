import axios from "axios"; // HTTP Client

const API_URL = "http://localhost:4000/api"; // The API endpoint to communicate with the server

/**
 * Handles the signup HTTP request to add a new user to the database
 * The data needed for each user is First Name, Last Name, Username, Email, and Password
 */

type SignupData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};
type LoginData = {
  emailOrUsername: string;
  password: string;
};

const signup = (data: SignupData): Promise<any> => {
  return axios.post(`${API_URL}/signup/`, data);
};

/**
 * Handles the login HTTP request to access your user profile
 * The data needed for each user is the username or email along with the password
 */
const login = (data: LoginData): Promise<any> => {
  return axios.post(`${API_URL}/login/`, data).then((res) => {
    /**
     * If successfully logged in, store the user data, inlucding the token, in the localStorage
     */
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  });
};

const logout = (): void => {
  localStorage.removeItem("user");
};

const getCurrentUser = (): any => {
  return JSON.parse(localStorage.getItem("user") || "null");
};

const verify = (confirmationToken: string): Promise<any> => {
  return axios.get(`${API_URL}/verify/${confirmationToken}`);
};

const AuthService = {
  signup,
  login,
  logout,
  getCurrentUser,
  verify,
};

export default AuthService;
