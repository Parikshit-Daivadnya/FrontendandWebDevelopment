import axios from "axios";

const BASE_URL = "h p://localhost:4000";

export const getStudentList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getstudent`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student list:", error);
    return [];
  }
};

export const addStudent = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/addstudent`, payload);
    return response.data;
  } catch (error) {
    console.error("Error adding student:", error);
    return null;
  }
};

export const updateStudent = async (id, payload) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/updatestudent/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error upda ng student:", error);
    return null;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deletestudent/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error dele ng student:", error);
    return null;
  }
};
