import axios from "axios";
const base_url = "http://localhost:8000";
const access_token = localStorage.getItem("access_token");
const headers = { Authorization: `Bearer ${access_token}` };
export const fetchInstitutes = async () => {
  axios
    .get(`${base_url}/institutes/`, headers)
    .then((response) => {
      const updatedData = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      console.warn("Updated Institutes: ", response.data);
      return updatedData;
    })
    .catch((err) => {
      return "error";
    });
};
