import axios from "axios";

import authHeader from "./auth.header";

const API_URL = "http://localhost:4000/api"; // The API endpoint to communicate with the server

const upload = (data) => {
  return axios.post(`${API_URL}/upload`, data, {
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
  });
};
const getFiles = () => {
  return axios.get(`${API_URL}/file`, {
    headers: { ...authHeader() },
  });
};
const updateFile = (file) => {
  return axios.put(
    `${API_URL}/file/${file._id}`,
    { ...file },
    {
      headers: { ...authHeader() },
    }
  );
};

const deleteFile = (id) => {
  return axios.delete(`${API_URL}/file/${id}`, {
    headers: { ...authHeader() },
  });
};

const UserService = {
  upload,
  getFiles,
  deleteFile,
  updateFile,
};

export default UserService;
